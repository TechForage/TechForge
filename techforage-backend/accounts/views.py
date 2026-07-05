from .repository import create_user   #Insert a new user into MongoDB.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RegisterSerializer   #checking the user details are valid or not
from .services import register_user

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

        response = register_user(serializer.validated_data)

        if response["success"]:
            return Response(response, status=201)

        return Response(response, status=400)

    return Response(serializer.errors, status=400)