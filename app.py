from flask import Flask, request, render_template
import pandas as pd
import pickle as p
import numpy as np
from flask_cors import CORS
import warnings
import csv
from sklearn.metrics import mean_squared_error, mean_absolute_error
import openpyxl
import pymongo
from pymongo import MongoClient
from connexionBD import *
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from connexionBD import mydb
import json
from flask import jsonify
from flask import Response
import pprint
import datetime
import hashlib
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, create_access_token


from pathlib import Path
app = Flask(__name__)
CORS(app)

# If true this will only allow the cookies that contain your JWTs to be sent
# over https. In production, this should always be set to True
jwt = JWTManager(app)  # initialize JWTManager
app.config['JWT_SECRET_KEY'] = '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'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(
    days=1)  # define the life span of the token


@app.route("/login", methods=["post"])
def login():
    login_details = request.get_json()  # store the json body request
    user_from_db = users_collection.find_one(
        {'username': login_details['username']})  # search for user in database

    if user_from_db:
        encrpted_password = hashlib.sha256(
            login_details['password'].encode("utf-8")).hexdigest()
        if encrpted_password == user_from_db['password']:
            access_token = create_access_token(
                identity=user_from_db['username'])  # create jwt token
            return jsonify(access_token=access_token), 200

    return jsonify({'msg': 'The username or password is incorrect'}), 401


# ----------------------- Register ---------------------------
@app.route("/register", methods=["POST"])
def register():
    new_user = request.get_json()  # store the json body request
    new_user["password"] = hashlib.sha256(
        new_user["password"].encode("utf-8")).hexdigest()
    new_user["username"]
    doc = users_collection.find_one(
        {"email": new_user["email"]})  # check if user exist
    if not doc:
        users_collection.insert_one(new_user)
        return jsonify({'msg': 'User created successfully'}), 201
    else:
        return jsonify({'msg': 'Email already exists'}), 409

# --------------------- Profile ---------------------------------


@app.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    current_user = get_jwt_identity()  # Get the identity of the current user
    user_from_db = users_collection.find_one({'username': current_user})
    if user_from_db:
        # delete data we don't want to return
        del user_from_db['_id'], user_from_db['password']
        return jsonify({'profile': user_from_db}), 200
    else:
        return jsonify({'msg': 'Profile not found'}), 404


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


warnings.filterwarnings("ignore")
# Loading the model
model = p.load(open('model.h5', 'rb'))


@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('upload.html')


@app.route('/predict', methods=['Get', 'POST'])
def predict():
    if request.method == 'POST':
        file = request.files['file']
        print('The file is : ', request.files['file'])
        print('file=', file.filename)
        # processing
        test_data = pd.read_excel(file)
        test_data['year'] = pd.to_datetime(
            test_data['year'], format='%Y-%m-%d')
        test_data.head(25)
        test_data['year'] = test_data['year'].dt.year.astype(
            'str')+'-'+test_data['year'].dt.month.astype('str')+'-01'
        test_data['year'] = pd.to_datetime(test_data['year'])
        print(test_data.info())
        test_data.head(25)
        predict_test_data = test_data.groupby(
            'year')['arrivals', 'employment'].sum()
        # print(predict_test_data)

        # predicting

        forecast_t = np.round(model.predict(start=len(predict_test_data)-12,
                                            end=len(predict_test_data)+11,
                                            typ='levels').rename('Forecast'), 0)

        frame = {'date': forecast_t.index, 'forecast': forecast_t}
        result = pd.DataFrame(frame)

        rmse = np.sqrt(mean_squared_error(
            predict_test_data['arrivals'].tail(12), forecast_t.head(12)))

        result.to_excel(r'Forecast.xlsx', index=False)
        df2 = pd.read_excel(r'Forecast.xlsx')
        x = pd.concat([test_data, df2], axis=1)
        cols = ['arrivals', 'employment', 'expenditures', 'year']
        # for col in cols:
        #    x[col] = x[col].apply(lambda y: str(y).replace('.',','))
        x.to_csv(r'result.csv', header=True, sep=';', index=False)

        # connexion_base
        insert_csv('result.csv')

        return render_template('result.html')


@app.route("/api/test",  methods=['GET'])
def stat():

    variab = mydb.tt.aggregate([

        {"$group": {"_id": "$year", "arrivals": {"$sum": 1}}}]
    )

    json_string = json.dumps(list(variab))
    print('varjson', json_string)
    return json_string


@app.route("/api/test13",  methods=['GET'])
def stat13():
    variab2 = mydb.tt.find(
        {},
        {"employment": 1, "year": 1, "_id": 0}).limit(24)
    json_string = json.dumps(list(variab2))
    print('varjson', json_string)
    return (json_string)


@app.route("/api/test14",  methods=['GET'])
def stat14():
    variab2 = mydb.tt.find(
        {},
        {"expenditures": 1, "year": 1, "_id": 0}).limit(24)
    json_string = json.dumps(list(variab2))
    print('varjson', json_string)
    return (json_string)


@app.route("/api/test2",  methods=['GET'])
def stat2():
    variab2 = mydb.tt.find(
        {},
        {"forecast": 1, "date": 1, "_id": 0}).limit(24)
    json_string = json.dumps(list(variab2))
    print('varjson', json_string)
    return (json_string)


@app.route("/api/test22",  methods=['GET'])
def stat22():
    variab2 = mydb.tt.find(
        {},
        {"forecast": 1, "date": 1, "_id": 0}).limit(24)
    json_string = json.dumps(list(variab2))
    print('varjson', json_string)
    return (json_string)


@app.route("/api/test3",  methods=['GET'])
def stat3():
    variab2 = mydb.tt.find(
        {},
        {"arrivals": 1, "year": 1, "_id": 0}).limit(24)
    json_string = json.dumps(list(variab2))
    print('varjson', json_string)
    return (json_string)


@app.route("/api/test4",  methods=['GET'])
def stat4():
    variab2 = mydb.tt.find(
        {},
        {"arrivals": 1, "employment": 1, "_id": 0}).limit(24)
    json_string = json.dumps(list(variab2))
    print('varjson', json_string)
    return (json_string)


@app.route("/api/test5",  methods=['GET'])
def stat5():
    variab2 = mydb.tt.find(
        {},
        {"employment": 1, "arrivals": 1, "_id": "$date"}).limit(24)
    json_string = json.dumps(list(variab2))
    print('forecast', json_string)
    return (json_string)


@app.route("/api/test6",  methods=['GET'])
def stat6():
    variab2 = mydb.tt.find(
        {},
        {"employment": 1, "arrivals": 1, "_id": "$year"}).limit(24)
    json_string = json.dumps(list(variab2))
    print('forecast', json_string)
    return (json_string)


@app.route("/api/test7",  methods=['GET'])
def stat7():
    variab2 = mydb.tt.find(
        {},
        {"arrivals": 1, "year": 1, "_id": 0}).limit(24)
    json_string = json.dumps(list(variab2))
    print('varjson', json_string)
    return (json_string)


if __name__ == "__main__":
    app.run(debug=True)
