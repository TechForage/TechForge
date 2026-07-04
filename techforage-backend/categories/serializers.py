from rest_framework import serializers


class CategoryCreateSerializer(serializers.Serializer):
    name = serializers.CharField(
        max_length=50,
        required=True,
        trim_whitespace=True
    )

    description = serializers.CharField(
        required=False,
        allow_blank=True,
        default=""
    )

    image_url = serializers.URLField(
        required=False,
        allow_blank=True,
        default=""
    )

    is_active = serializers.BooleanField(
        required=False,
        default=True
    )


class CategoryUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(
        max_length=50,
        required=False,
        trim_whitespace=True
    )

    description = serializers.CharField(
        required=False,
        allow_blank=True
    )

    image_url = serializers.URLField(
        required=False,
        allow_blank=True
    )

    is_active = serializers.BooleanField(
        required=False
    )


class CategoryResponseSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
    slug = serializers.CharField()
    description = serializers.CharField()
    image_url = serializers.CharField()
    is_active = serializers.BooleanField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()