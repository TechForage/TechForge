from rest_framework import serializers


class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)

    email = serializers.EmailField()

    password = serializers.CharField(
        min_length=6,
        write_only=True
    )