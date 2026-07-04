from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError

from drf_spectacular.utils import (
    extend_schema,
    OpenApiResponse,
)

from .serializers import (
    CategoryCreateSerializer,
    CategoryUpdateSerializer,
    CategoryResponseSerializer,
)

from .services import CategoryService


class CategoryListCreateAPIView(APIView):

    @extend_schema(
        summary="Get All Categories",
        description="Retrieve all categories.",
        responses={200: CategoryResponseSerializer(many=True)},
    )
    def get(self, request):
        categories = CategoryService.get_all()

        return Response(
            {
                "success": True,
                "message": "Categories fetched successfully.",
                "data": categories,
            },
            status=status.HTTP_200_OK,
        )

    @extend_schema(
        summary="Create Category",
        description="Create a new category.",
        request=CategoryCreateSerializer,
        responses={
            201: CategoryResponseSerializer,
            400: OpenApiResponse(description="Validation Error"),
        },
    )
    def post(self, request):
        serializer = CategoryCreateSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        category = CategoryService.create(serializer.validated_data)

        return Response(
            {
                "success": True,
                "message": "Category created successfully.",
                "data": category,
            },
            status=status.HTTP_201_CREATED,
        )


class CategoryDetailAPIView(APIView):

    @extend_schema(
        summary="Get Category",
        description="Retrieve a category by ID.",
        responses={200: CategoryResponseSerializer},
    )
    def get(self, request, category_id):
        category = CategoryService.get_by_id(category_id)

        return Response(
            {
                "success": True,
                "data": category,
            }
        )

    @extend_schema(
        summary="Update Category",
        description="Update a category.",
        request=CategoryUpdateSerializer,
        responses={200: CategoryResponseSerializer},
    )
    def patch(self, request, category_id):
        serializer = CategoryUpdateSerializer(
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)

        category = CategoryService.update(
            category_id,
            serializer.validated_data,
        )

        return Response(
            {
                "success": True,
                "message": "Category updated successfully.",
                "data": category,
            }
        )

    @extend_schema(
        summary="Delete Category",
        description="Delete a category.",
        responses={204: OpenApiResponse(description="Deleted")},
    )
    def delete(self, request, category_id):
        CategoryService.delete(category_id)

        return Response(
            {
                "success": True,
                "message": "Category deleted successfully.",
            },
             status=status.HTTP_200_OK,
        )