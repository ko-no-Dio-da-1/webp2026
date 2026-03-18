from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Course
import logging

logger = logging.getLogger('django')

@api_view(['GET'])
def add_course(request):
    department = request.GET.get('department', '')
    coursetitle = request.GET.get('coursetitle', '')
    instructor = request.GET.get('instructor', '')

    new_course = Course()
    new_course.department = department
    new_course.coursetitle = coursetitle
    new_course.instructor = instructor
    new_course.save()

    if coursetitle:
        return Response({"data": coursetitle + " insert!"}, status=status.HTTP_200_OK)
    else:
        return Response({"res": "parameter error"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_course(request):
    courses = Course.objects.all().values()
    return JsonResponse(list(courses), safe=False)   # ←←← 這行就是「重點！一定要改！」