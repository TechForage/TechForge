from django.urls import path

from .views import (
    BrandListCreateAPIView,
    BrandDetailAPIView,
)

urlpatterns = [
    path(
        "",
        BrandListCreateAPIView.as_view(),
        name="brand-list-create",
    ),
    path(
        "<str:brand_id>/",
        BrandDetailAPIView.as_view(),
        name="brand-detail",
    ),
]