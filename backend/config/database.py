import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Read values from .env
MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)

# Select database
db = client[DATABASE_NAME]

print("MongoDB Connected Successfully")