from rest_framework import serializers


class BrandCreateSerializer(serializers.Serializer):
    name = serializers.CharField(
        max_length=100,
        required=True,
        trim_whitespace=True
    )

    description = serializers.CharField(
        required=False,
        allow_blank=True,
        default=""
    )

    logo_url = serializers.URLField(
        required=False,
        allow_blank=True,
        default=""
    )

    website = serializers.URLField(
        required=False,
        allow_blank=True,
        default=""
    )

    country = serializers.CharField(
        max_length=100,
        required=False,
        allow_blank=True,
        default=""
    )

    is_active = serializers.BooleanField(
        required=False,
        default=True
    )


class BrandUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(
        max_length=100,
        required=False,
        trim_whitespace=True
    )

    description = serializers.CharField(
        required=False,
        allow_blank=True
    )

    logo_url = serializers.URLField(
        required=False,
        allow_blank=True
    )

    website = serializers.URLField(
        required=False,
        allow_blank=True
    )

    country = serializers.CharField(
        max_length=100,
        required=False,
        allow_blank=True
    )

    is_active = serializers.BooleanField(
        required=False
    )


class BrandResponseSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
    slug = serializers.CharField()
    description = serializers.CharField()
    logo_url = serializers.CharField()
    website = serializers.CharField()
    country = serializers.CharField()
    is_active = serializers.BooleanField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()