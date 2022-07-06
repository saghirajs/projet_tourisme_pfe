import pymongo
import pandas as pd
from pymongo import MongoClient
client = MongoClient("mongodb://localhost:27017/") # your connection string
db = client["mydatabase"]
users_collection = db["users"]