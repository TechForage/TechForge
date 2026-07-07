from datetime import UTC, datetime

from django.utils.text import slugify
from rest_framework.exceptions import ValidationError

from brands.repository import BrandRepository
from categories.repository import CategoryRepository

from .repository import ProductRepository


class ProductService:

    @staticmethod
    def create(data):

        if not BrandRepository.get_by_id(data["brand_id"]):
            raise ValidationError({
                "brand_id": "Brand not found."
            })

        if not CategoryRepository.get_by_id(data["category_id"]):
            raise ValidationError({
                "category_id": "Category not found."
            })

        if ProductRepository.get_by_sku(data["sku"]):
            raise ValidationError({
                "sku": "SKU already exists."
            })

        if data["discount_price"] > data["price"]:
            raise ValidationError({
                "discount_price":
                "Discount price cannot exceed price."
            })

        product = {
            "name": data["name"].strip(),
            "slug": slugify(data["name"]),
            "short_description": data.get(
                "short_description",
                ""
            ),
            "description": data.get(
                "description",
                ""
            ),
            "brand_id": data["brand_id"],
            "category_id": data["category_id"],
            "sku": data["sku"],
            "price": data["price"],
            "discount_price": data.get(
                "discount_price",
                0
            ),
            "stock": data.get(
                "stock",
                0
            ),
            "images": data.get(
                "images",
                []
            ),
            "specifications": data.get(
                "specifications",
                {}
            ),
            "rating": 0,
            "review_count": 0,
            "is_featured": data.get(
                "is_featured",
                False
            ),
            "is_active": data.get(
                "is_active",
                True
            ),
            "created_at": datetime.now(UTC),
            "updated_at": datetime.now(UTC),
        }

        product_id = ProductRepository.create(product)

        product["id"] = product_id

        return product

    @staticmethod
    def get_all():

        products = ProductRepository.get_all()

        for product in products:
            product["id"] = str(
                product.pop("_id")
            )

        return products

    @staticmethod
    def get_by_id(product_id):

        product = ProductRepository.get_by_id(
            product_id
        )

        if not product:
            raise ValidationError({
                "message":
                "Product not found."
            })

        product["id"] = str(
            product.pop("_id")
        )

        return product

    @staticmethod
    def update(product_id, data):

        product = ProductRepository.get_by_id(
            product_id
        )

        if not product:
            raise ValidationError({
                "message":
                "Product not found."
            })

        if "brand_id" in data:

            if not BrandRepository.get_by_id(
                data["brand_id"]
            ):
                raise ValidationError({
                    "brand_id":
                    "Brand not found."
                })

        if "category_id" in data:

            if not CategoryRepository.get_by_id(
                data["category_id"]
            ):
                raise ValidationError({
                    "category_id":
                    "Category not found."
                })

        if "sku" in data:

            duplicate = ProductRepository.get_by_sku(
                data["sku"]
            )

            if duplicate and str(
                duplicate["_id"]
            ) != product_id:

                raise ValidationError({
                    "sku":
                    "SKU already exists."
                })

        if "price" in data and "discount_price" in data:

            if data["discount_price"] > data["price"]:
                raise ValidationError({
                    "discount_price":
                    "Discount cannot exceed price."
                })

        if "name" in data:

            data["slug"] = slugify(
                data["name"]
            )

        data["updated_at"] = datetime.now(UTC)

        ProductRepository.update(
            product_id,
            data
        )

        updated = ProductRepository.get_by_id(
            product_id
        )

        updated["id"] = str(
            updated.pop("_id")
        )

        return updated

    @staticmethod
    def delete(product_id):

        product = ProductRepository.get_by_id(
            product_id
        )

        if not product:
            raise ValidationError({
                "message":
                "Product not found."
            })

        ProductRepository.delete(product_id)

        return {
            "message":
            "Product deleted successfully."
        }

    @staticmethod
    def search(keyword):

        products = ProductRepository.search(
            keyword
        )

        for product in products:
            product["id"] = str(
                product.pop("_id")
            )

        return products

    @staticmethod
    def get_by_brand(brand_id):

        products = ProductRepository.get_by_brand(
            brand_id
        )

        for product in products:
            product["id"] = str(
                product.pop("_id")
            )

        return products

    @staticmethod
    def get_by_category(category_id):

        products = ProductRepository.get_by_category(
            category_id
        )

        for product in products:
            product["id"] = str(
                product.pop("_id")
            )

        return products

    @staticmethod
    def get_featured():

        products = ProductRepository.get_featured()

        for product in products:
            product["id"] = str(
                product.pop("_id")
            )

        return products

    @staticmethod
    def get_latest():

        products = ProductRepository.get_latest()

        for product in products:
            product["id"] = str(
                product.pop("_id")
            )

        return products