from bson import ObjectId

from core.database import db


collection = db.categories


def create_category(category_data):
    result = collection.insert_one(category_data)
    return str(result.inserted_id)


def get_all_categories():
    return list(collection.find())


def get_category_by_id(category_id):
    return collection.find_one({"_id": ObjectId(category_id)})


def get_category_by_name(name):
    return collection.find_one({"name": name})


def update_category(category_id, data):
    return collection.update_one(
        {"_id": ObjectId(category_id)},
        {"$set": data}
    )


def delete_category(category_id):
    return collection.delete_one(
        {"_id": ObjectId(category_id)}
    )