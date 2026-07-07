from django.urls import path

from .views import (
    ProductListCreateAPIView,
    ProductDetailAPIView,
    ProductSearchAPIView,
    ProductsByCategoryAPIView,
    ProductsByBrandAPIView,
    FeaturedProductsAPIView,
    LatestProductsAPIView,
)

urlpatterns = [

    path(
        "",
        ProductListCreateAPIView.as_view(),
        name="product-list-create",
    ),

    path(
        "<str:product_id>/",
        ProductDetailAPIView.as_view(),
        name="product-detail",
    ),

    path(
        "search/",
        ProductSearchAPIView.as_view(),
        name="product-search",
    ),

    path(
        "category/<str:category_id>/",
        ProductsByCategoryAPIView.as_view(),
        name="products-by-category",
    ),

    path(
        "brand/<str:brand_id>/",
        ProductsByBrandAPIView.as_view(),
        name="products-by-brand",
    ),

    path(
        "featured/",
        FeaturedProductsAPIView.as_view(),
        name="featured-products",
    ),

    path(
        "latest/",
        LatestProductsAPIView.as_view(),
        name="latest-products",
    ),
]