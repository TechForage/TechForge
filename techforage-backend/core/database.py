import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

if not MONGODB_URI:
    raise ValueError("MONGODB_URI environment variable is not set.")

if not DATABASE_NAME:
    raise ValueError("DATABASE_NAME environment variable is not set.")

client = MongoClient(MONGODB_URI)
db = client[DATABASE_NAME]