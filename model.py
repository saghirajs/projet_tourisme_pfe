from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn import metrics
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import urllib, json
import datetime as dt
import itertools
from dateutil.relativedelta import *
from sklearn.metrics import mean_squared_error, mean_absolute_error
from math import sqrt
from statsmodels.tsa.api import ExponentialSmoothing, SimpleExpSmoothing, Holt
import statsmodels.api as sm
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from statsmodels.tsa.statespace.sarimax import SARIMAX 
from pmdarima import auto_arima 
from statsmodels.tsa.stattools import adfuller
import warnings
import pickle
warnings.filterwarnings("ignore")
import joblib

pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', None)
pd.set_option('display.max_rows', None)

#test_data = open(r'C:\Users\MERIEM\Desktop\SOUTH AFRICA.xlsx')
test_data=pd.read_excel(r'C:\Users\MERIEM\saghir\SOUTH AFRICA.xlsx')
#test_data =pd.read_excel(url);
print(test_data.info())

test_data['year']=pd.to_datetime(test_data['year'], format='%Y-%m-%d')
test_data.head(25)

test_data['year'] = test_data['year'].dt.year.astype('str')+'-'+test_data['year'].dt.month.astype('str')+'-01'
test_data['year'] = pd.to_datetime(test_data['year'])
print(test_data.info())

test_data.head(25)

predict_test_data = test_data.groupby('year')['arrivals','employment'].sum()
print(predict_test_data)
#plot 
fig=plt.figure(0,figsize=(25,4))
ax=plt.gca()
plt.plot(predict_test_data['arrivals'])
ax.set_xlabel('Year')
ax.set_ylabel('Nomber of Orders')

#ax.set_ylabel('Total arrival')
test_model_tourism=auto_arima(predict_test_data['arrivals'],
                           start_p=1, start_q=1, max_p=8, max_q=8,
                           start_P=0, start_Q=0, max_P=8, max_Q=8,
                           m=12, seasonal=True, trace=True, d=1, D=1,
                           error_action='ignore', suppress_warnings=True,
                           random_state = 20, n_fits=30)
print(test_model_tourism.summary())

model_t = model_t = SARIMAX(predict_test_data['arrivals'],
                             order = test_model_tourism.order,
                             initialization='approximate_diffuse',
                             filter_concentrated=True,
                             seasonal_order =test_model_tourism.seasonal_order)
result_t = model_t.fit() 
 
result_t.save("C:/Users/Meriem/saghir/model.h5")
loaded_ARIMA = result_t.load("C:/Users/Meriem/saghir/model.h5")

forecast_t=np.round(result_t.predict(start = len(predict_test_data)-12,
                                     end = len(predict_test_data)+11,
                                     typ = 'levels').rename('Forecast Tourism'),0)
forecast_t=np.round(result_t.predict(start = len(predict_test_data)-12,
                                     end = len(predict_test_data)+11,
                                     typ = 'levels').rename('Forecast Tourism'),0)
result_t.plot_diagnostics(figsize=(16,8))
plt.show()

forecast_t=np.round(result_t.predict(start = len(predict_test_data)-12,
                                     end = len(predict_test_data)+11,
                                     typ = 'levels').rename('Forecasting of quantity tourism'),0)

print('je suis forecasttttttttttttttttttttttttttttttt')
print(forecast_t)
                                     
forecast_t.plot()

rmse=np.sqrt(mean_squared_error(predict_test_data['arrivals'].tail(12),forecast_t.head(12)))
print(rmse)

fig=plt.figure(0,figsize=(25,4))
ax=plt.gca()
plt.plot(predict_test_data['arrivals'])
ax.set_xlabel('Year')
ax.set_ylabel('Nomber of Orders')

fig, ax = plt.subplots()
fig.suptitle('Forecasting of arrivals order')
predict_test_data['arrivals'].plot(figsize=(26, 6),ax=ax, legend=True) 
plt.xlabel('year')
plt.ylabel('No. of Orders')
forecast_t.plot()
forecast_t.to_excel(r'Forecast.xlsx',index=True)