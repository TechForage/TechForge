from django.http import JsonResponse

def hello(request):
    return JsonResponse({
        "message": "hi this is from techforge backend team!"
    })