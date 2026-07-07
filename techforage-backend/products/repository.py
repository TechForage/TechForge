from bson import ObjectId
from bson.errors import InvalidId

from core.database import db

collection = db.products


class ProductRepository:

    @staticmethod
    def create(product: dict):
        result = collection.insert_one(product)
        return str(result.inserted_id)

    @staticmethod
    def get_all():
        return list(collection.find())

    @staticmethod
    def get_by_id(product_id: str):
        try:
            return collection.find_one(
                {"_id": ObjectId(product_id)}
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
    def get_by_sku(sku: str):
        return collection.find_one({"sku": sku})

    @staticmethod
    def get_by_category(category_id: str):
        return list(
            collection.find(
                {"category_id": category_id}
            )
        )

    @staticmethod
    def get_by_brand(brand_id: str):
        return list(
            collection.find(
                {"brand_id": brand_id}
            )
        )

    @staticmethod
    def get_featured():
        return list(
            collection.find(
                {"is_featured": True}
            )
        )

    @staticmethod
    def get_latest(limit=10):
        return list(
            collection.find()
            .sort("created_at", -1)
            .limit(limit)
        )

    @staticmethod
    def search(keyword: str):
        return list(
            collection.find(
                {
                    "$or": [
                        {
                            "name": {
                                "$regex": keyword,
                                "$options": "i"
                            }
                        },
                        {
                            "description": {
                                "$regex": keyword,
                                "$options": "i"
                            }
                        }
                    ]
                }
            )
        )

    @staticmethod
    def update(product_id: str, data: dict):
        try:
            return collection.update_one(
                {"_id": ObjectId(product_id)},
                {"$set": data},
            )
        except InvalidId:
            return None

    @staticmethod
    def delete(product_id: str):
        try:
            return collection.delete_one(
                {"_id": ObjectId(product_id)}
            )
        except InvalidId:
            return None