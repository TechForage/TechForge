from datetime import UTC, datetime

from django.utils.text import slugify
from rest_framework.exceptions import ValidationError

from .repository import BrandRepository


class BrandService:

    @staticmethod
    def create(data):
        name = data["name"].strip()

        if len(name) < 2:
            raise ValidationError(
                {"name": "Brand name must be at least 2 characters."}
            )

        if BrandRepository.get_by_name(name):
            raise ValidationError(
                {"name": "Brand already exists."}
            )

        brand = {
            "name": name,
            "slug": slugify(name),
            "description": data.get("description", ""),
            "logo_url": data.get("logo_url", ""),
            "website": data.get("website", ""),
            "country": data.get("country", ""),
            "is_active": data.get("is_active", True),
            "created_at": datetime.now(UTC),
            "updated_at": datetime.now(UTC),
        }

        brand_id = BrandRepository.create(brand)

        brand["id"] = brand_id

        return brand

    @staticmethod
    def get_all():
        brands = BrandRepository.get_all()

        for brand in brands:
            brand["id"] = str(brand.pop("_id"))

        return brands

    @staticmethod
    def get_by_id(brand_id):
        brand = BrandRepository.get_by_id(brand_id)

        if not brand:
            raise ValidationError(
                {"message": "Brand not found."}
            )

        brand["id"] = str(brand.pop("_id"))

        return brand

    @staticmethod
    def update(brand_id, data):
        brand = BrandRepository.get_by_id(brand_id)

        if not brand:
            raise ValidationError(
                {"message": "Brand not found."}
            )

        if "name" in data:
            duplicate = BrandRepository.get_by_name(data["name"])

            if duplicate and str(duplicate["_id"]) != brand_id:
                raise ValidationError(
                    {"name": "Brand already exists."}
                )

            data["slug"] = slugify(data["name"])

        data["updated_at"] = datetime.now(UTC)

        BrandRepository.update(brand_id, data)

        updated_brand = BrandRepository.get_by_id(brand_id)

        updated_brand["id"] = str(updated_brand.pop("_id"))

        return updated_brand

    @staticmethod
    def delete(brand_id):
        brand = BrandRepository.get_by_id(brand_id)

        if not brand:
            raise ValidationError(
                {"message": "Brand not found."}
            )

        BrandRepository.delete(brand_id)

        return {
            "message": "Brand deleted successfully."
        }