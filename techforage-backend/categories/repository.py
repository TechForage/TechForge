from bson import ObjectId
from bson.errors import InvalidId

from core.database import db

collection = db.categories


class CategoryRepository:

    @staticmethod
    def create(category: dict):
        result = collection.insert_one(category)
        return str(result.inserted_id)

    @staticmethod
    def get_all():
        return list(collection.find())

    @staticmethod
    def get_by_id(category_id: str):
        try:
            return collection.find_one(
                {"_id": ObjectId(category_id)}
            )
        except InvalidId:
            return None

    @staticmethod
    def get_by_name(name: str):
        return collection.find_one(
            {"name": {"$regex": f"^{name}$", "$options": "i"}}
        )

    @staticmethod
    def update(category_id: str, data: dict):
        try:
            return collection.update_one(
                {"_id": ObjectId(category_id)},
                {"$set": data}
            )
        except InvalidId:
            return None

    @staticmethod
    def delete(category_id: str):
        try:
            return collection.delete_one(
                {"_id": ObjectId(category_id)}
            )
        except InvalidId:
            return None