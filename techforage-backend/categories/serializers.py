from rest_framework import serializers


class CategorySerializer(serializers.Serializer):
    name = serializers.CharField(
        max_length=50,
        required=True,
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
        default=True
    )