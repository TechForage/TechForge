from rest_framework import serializers


class ProductCreateSerializer(serializers.Serializer):
    name = serializers.CharField(
        max_length=200,
        required=True,
        trim_whitespace=True
    )

    short_description = serializers.CharField(
        max_length=300,
        required=False,
        allow_blank=True,
        default=""
    )

    description = serializers.CharField(
        required=False,
        allow_blank=True,
        default=""
    )

    brand_id = serializers.CharField(
        required=True
    )

    category_id = serializers.CharField(
        required=True
    )

    sku = serializers.CharField(
        max_length=100,
        required=True,
        trim_whitespace=True
    )

    price = serializers.FloatField(
        required=True,
        min_value=0
    )

    discount_price = serializers.FloatField(
        required=False,
        min_value=0,
        default=0
    )

    stock = serializers.IntegerField(
        required=False,
        min_value=0,
        default=0
    )

    images = serializers.ListField(
        child=serializers.URLField(),
        required=False,
        default=list
    )

    specifications = serializers.DictField(
        child=serializers.CharField(),
        required=False,
        default=dict
    )

    is_featured = serializers.BooleanField(
        required=False,
        default=False
    )

    is_active = serializers.BooleanField(
        required=False,
        default=True
    )


class ProductUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(
        max_length=200,
        required=False,
        trim_whitespace=True
    )

    short_description = serializers.CharField(
        required=False,
        allow_blank=True
    )

    description = serializers.CharField(
        required=False,
        allow_blank=True
    )

    brand_id = serializers.CharField(
        required=False
    )

    category_id = serializers.CharField(
        required=False
    )

    sku = serializers.CharField(
        required=False
    )

    price = serializers.FloatField(
        required=False,
        min_value=0
    )

    discount_price = serializers.FloatField(
        required=False,
        min_value=0
    )

    stock = serializers.IntegerField(
        required=False,
        min_value=0
    )

    images = serializers.ListField(
        child=serializers.URLField(),
        required=False
    )

    specifications = serializers.DictField(
        child=serializers.CharField(),
        required=False
    )

    is_featured = serializers.BooleanField(
        required=False
    )

    is_active = serializers.BooleanField(
        required=False
    )


class ProductResponseSerializer(serializers.Serializer):
    id = serializers.CharField()

    name = serializers.CharField()

    slug = serializers.CharField()

    short_description = serializers.CharField()

    description = serializers.CharField()

    brand_id = serializers.CharField()

    category_id = serializers.CharField()

    sku = serializers.CharField()

    price = serializers.FloatField()

    discount_price = serializers.FloatField()

    stock = serializers.IntegerField()

    images = serializers.ListField(
        child=serializers.CharField()
    )

    specifications = serializers.DictField(
        child=serializers.CharField()
    )

    rating = serializers.FloatField()

    review_count = serializers.IntegerField()

    is_featured = serializers.BooleanField()

    is_active = serializers.BooleanField()

    created_at = serializers.DateTimeField()

    updated_at = serializers.DateTimeField()