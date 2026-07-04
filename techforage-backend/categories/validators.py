from rest_framework.exceptions import ValidationError


def validate_category_name(name):
    name = name.strip()

    if len(name) < 3:
        raise ValidationError("Category name must be at least 3 characters.")

    if len(name) > 50:
        raise ValidationError("Category name cannot exceed 50 characters.")

    return name