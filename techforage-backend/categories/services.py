from datetime import UTC, datetime

from django.utils.text import slugify
from rest_framework.exceptions import ValidationError

from .repository import CategoryRepository


class CategoryService:

    @staticmethod
    def create(data):
        name = data["name"].strip()

        if len(name) < 3:
            raise ValidationError({"name": "Category name must be at least 3 characters."})

        if CategoryRepository.get_by_name(name):
            raise ValidationError({"name": "Category already exists."})

        category = {
            "name": name,
            "slug": slugify(name),
            "description": data.get("description", ""),
            "image_url": data.get("image_url", ""),
            "is_active": data.get("is_active", True),
            "created_at": datetime.now(UTC),
            "updated_at": datetime.now(UTC),
        }

        category_id = CategoryRepository.create(category)

        category["id"] = category_id

        return category

    @staticmethod
    def get_all():
        categories = CategoryRepository.get_all()

        for category in categories:
            category["id"] = str(category.pop("_id"))

        return categories

    @staticmethod
    def get_by_id(category_id):
        category = CategoryRepository.get_by_id(category_id)

        if not category:
            raise ValidationError({"message": "Category not found."})

        category["id"] = str(category.pop("_id"))

        return category

    @staticmethod
    def update(category_id, data):
        category = CategoryRepository.get_by_id(category_id)

        if not category:
            raise ValidationError({"message": "Category not found."})

        if "name" in data:
            data["slug"] = slugify(data["name"])

        data["updated_at"] = datetime.now(UTC)

        CategoryRepository.update(category_id, data)

        updated = CategoryRepository.get_by_id(category_id)

        updated["id"] = str(updated.pop("_id"))

        return updated

    @staticmethod
    def delete(category_id):
        category = CategoryRepository.get_by_id(category_id)

        if not category:
            raise ValidationError({"message": "Category not found."})

        CategoryRepository.delete(category_id)

        return {
            "message": "Category deleted successfully."
        }