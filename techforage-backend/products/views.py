from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
    OpenApiResponse,
)

from .serializers import (
    ProductCreateSerializer,
    ProductUpdateSerializer,
    ProductResponseSerializer,
)

from .services import ProductService


class ProductListCreateAPIView(APIView):

    @extend_schema(
        summary="Get All Products",
        responses={200: ProductResponseSerializer(many=True)},
    )
    def get(self, request):

        products = ProductService.get_all()

        return Response(
            {
                "success": True,
                "message": "Products fetched successfully.",
                "data": products,
            },
            status=status.HTTP_200_OK,
        )

    @extend_schema(
        summary="Create Product",
        request=ProductCreateSerializer,
        responses={201: ProductResponseSerializer},
    )
    def post(self, request):

        serializer = ProductCreateSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        product = ProductService.create(
            serializer.validated_data
        )

        return Response(
            {
                "success": True,
                "message": "Product created successfully.",
                "data": product,
            },
            status=status.HTTP_201_CREATED,
        )


class ProductDetailAPIView(APIView):

    @extend_schema(
        summary="Get Product",
        responses={200: ProductResponseSerializer},
    )
    def get(self, request, product_id):

        product = ProductService.get_by_id(product_id)

        return Response(
            {
                "success": True,
                "data": product,
            }
        )

    @extend_schema(
        summary="Update Product",
        request=ProductUpdateSerializer,
        responses={200: ProductResponseSerializer},
    )
    def patch(self, request, product_id):

        serializer = ProductUpdateSerializer(
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)

        product = ProductService.update(
            product_id,
            serializer.validated_data,
        )

        return Response(
            {
                "success": True,
                "message": "Product updated successfully.",
                "data": product,
            }
        )

    @extend_schema(
        summary="Delete Product",
        responses={
            200: OpenApiResponse(
                description="Deleted"
            )
        },
    )
    def delete(self, request, product_id):

        ProductService.delete(product_id)

        return Response(
            {
                "success": True,
                "message": "Product deleted successfully.",
            }
        )


class ProductSearchAPIView(APIView):

    @extend_schema(
        summary="Search Products",
        parameters=[
            OpenApiParameter(
                name="q",
                type=str,
                location=OpenApiParameter.QUERY,
                required=True,
            )
        ],
        responses={200: ProductResponseSerializer(many=True)},
    )
    def get(self, request):

        keyword = request.GET.get("q", "")

        products = ProductService.search(keyword)

        return Response(
            {
                "success": True,
                "data": products,
            }
        )


class ProductsByCategoryAPIView(APIView):

    @extend_schema(
        summary="Products By Category",
        responses={200: ProductResponseSerializer(many=True)},
    )
    def get(self, request, category_id):

        products = ProductService.get_by_category(
            category_id
        )

        return Response(
            {
                "success": True,
                "data": products,
            }
        )


class ProductsByBrandAPIView(APIView):

    @extend_schema(
        summary="Products By Brand",
        responses={200: ProductResponseSerializer(many=True)},
    )
    def get(self, request, brand_id):

        products = ProductService.get_by_brand(
            brand_id
        )

        return Response(
            {
                "success": True,
                "data": products,
            }
        )


class FeaturedProductsAPIView(APIView):

    @extend_schema(
        summary="Featured Products",
        responses={200: ProductResponseSerializer(many=True)},
    )
    def get(self, request):

        products = ProductService.get_featured()

        return Response(
            {
                "success": True,
                "data": products,
            }
        )


class LatestProductsAPIView(APIView):

    @extend_schema(
        summary="Latest Products",
        responses={200: ProductResponseSerializer(many=True)},
    )
    def get(self, request):

        products = ProductService.get_latest()

        return Response(
            {
                "success": True,
                "data": products,
            }
        )