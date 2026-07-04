from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RegisterSerializer


@api_view(["GET"])
def hello(request):
    return Response({
        "success": True,
        "message": "Welcome to TechForge , THIS IS TECHFORGE BACKEND TEAM"
    })

#checks for register details validity and returns the data if valid else returns the errors
@api_view(["POST"])
def register(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():

        return Response({
            "success": True,
            "message": "Validation successful!",
            "data": serializer.validated_data
        })

    return Response({
        "success": False,
        "errors": serializer.errors
    }, status=400)

