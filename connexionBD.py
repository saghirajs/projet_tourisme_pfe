import pymongo
import pandas as pd
from pymongo import MongoClient
from bson.json_util import dumps
from bson import Binary, Code
client = MongoClient('mongodb://localhost:27017/')
mydb = client['test1']
mycol = mydb["tt"]
users_collection = mydb["users"]
def insert_csv(filepath):
    df = pd.read_csv(filepath,encoding = 'ISO-8859-1', delimiter=';') # loading csv file
    mydb['tt'].insert_many(df.to_dict('records'))
