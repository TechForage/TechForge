from bson import ObjectId
from bson.errors import InvalidId

from core.database import db

collection = db.brands


class BrandRepository:

    @staticmethod
    def create(brand: dict):
        result = collection.insert_one(brand)
        return str(result.inserted_id)

    @staticmethod
    def get_all():
        return list(collection.find())

    @staticmethod
    def get_by_id(brand_id: str):
        try:
            return collection.find_one(
                {"_id": ObjectId(brand_id)}
            )
        except InvalidId:
            return None

    @staticmethod
    def get_by_name(name: str):
        return collection.find_one(
            {
                "name": {
                    "$regex": f"^{name}$",
                    "$options": "i"
                }
            }
        )

    @staticmethod
    def update(brand_id: str, data: dict):
        try:
            return collection.update_one(
                {"_id": ObjectId(brand_id)},
                {"$set": data}
            )
        except InvalidId:
            return None

    @staticmethod
    def delete(brand_id: str):
        try:
            return collection.delete_one(
                {"_id": ObjectId(brand_id)}
            )
        except InvalidId:
            return None