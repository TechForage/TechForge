from django.http import JsonResponse
from django.contrib import admin
from django.urls import path
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

def home(request):
    return JsonResponse({
        "project": "TechForage API",
        "version": "1.0.0",
        "status": "Running"
    })

urlpatterns = [

    path("admin/", admin.site.urls),

    path(
        "api/categories/",
        include("categories.urls"),
    ),

    path(
        "api/schema/",
        SpectacularAPIView.as_view(),
        name="schema",
    ),

    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),

    path(
        "api/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
    path("auth/", include("accounts.urls")), 

    path("api/brands/", include("brands.urls")),
]