from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_spectacular.utils import (
    extend_schema,
    OpenApiResponse,
)

from .serializers import (
    BrandCreateSerializer,
    BrandUpdateSerializer,
    BrandResponseSerializer,
)

from .services import BrandService


class BrandListCreateAPIView(APIView):

    @extend_schema(
        summary="Get All Brands",
        description="Retrieve all brands.",
        responses={200: BrandResponseSerializer(many=True)},
    )
    def get(self, request):
        brands = BrandService.get_all()

        return Response(
            {
                "success": True,
                "message": "Brands fetched successfully.",
                "data": brands,
            },
            status=status.HTTP_200_OK,
        )

    @extend_schema(
        summary="Create Brand",
        description="Create a new brand.",
        request=BrandCreateSerializer,
        responses={
            201: BrandResponseSerializer,
            400: OpenApiResponse(description="Validation Error"),
        },
    )
    def post(self, request):
        serializer = BrandCreateSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        brand = BrandService.create(serializer.validated_data)

        return Response(
            {
                "success": True,
                "message": "Brand created successfully.",
                "data": brand,
            },
            status=status.HTTP_201_CREATED,
        )


class BrandDetailAPIView(APIView):

    @extend_schema(
        summary="Get Brand",
        description="Retrieve a brand by ID.",
        responses={200: BrandResponseSerializer},
    )
    def get(self, request, brand_id):
        brand = BrandService.get_by_id(brand_id)

        return Response(
            {
                "success": True,
                "data": brand,
            },
            status=status.HTTP_200_OK,
        )

    @extend_schema(
        summary="Update Brand",
        description="Update a brand.",
        request=BrandUpdateSerializer,
        responses={200: BrandResponseSerializer},
    )
    def patch(self, request, brand_id):
        serializer = BrandUpdateSerializer(
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)

        brand = BrandService.update(
            brand_id,
            serializer.validated_data,
        )

        return Response(
            {
                "success": True,
                "message": "Brand updated successfully.",
                "data": brand,
            },
            status=status.HTTP_200_OK,
        )

    @extend_schema(
        summary="Delete Brand",
        description="Delete a brand.",
        responses={
            200: OpenApiResponse(description="Brand Deleted")
        },
    )
    def delete(self, request, brand_id):
        BrandService.delete(brand_id)

        return Response(
            {
                "success": True,
                "message": "Brand deleted successfully.",
            },
            status=status.HTTP_200_OK,
        )