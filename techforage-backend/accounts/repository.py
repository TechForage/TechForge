from core.database import db

users_collection = db["users"]


def create_user(user_data):
    """
    Insert a new user into MongoDB.
    """
    result = users_collection.insert_one(user_data)
    print("Inserted ID:", result.inserted_id)
    print(users_collection.full_name)
    return result

def get_user_by_email(email):   #to check if the user is already registered or not by checking the email in the database
    print("Searching for user with email:", email)
    return users_collection.find_one({"email": email})