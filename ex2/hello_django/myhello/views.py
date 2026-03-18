from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import Post
import logging

# 取得 django 的 logger
logger = logging.getLogger('django')

@api_view(['GET'])
def myhello_api(request):
    my_name = request.GET.get('name', None)
    
    # 印出 Debug 訊息到 logger
    logger.debug(" ************** myhello_api: " + str(my_name))
    
    if my_name:
        return Response({"data": "Hello" + my_name}, status=status.HTTP_200_OK)
    else:
        return Response(
            {"res": "parameter: name is None"},
            status=status.HTTP_400_BAD_REQUEST
        )
# 1. 新增資料的 API       
@api_view(['GET'])
def add_post(request):
    title = request.GET.get('title', '')
    content = request.GET.get('content', '')
    photo = request.GET.get('photo', '')
    location = request.GET.get('location', '')
    
    new_post = Post()
    new_post.title = title
    new_post.content = content
    new_post.photo = photo
    new_post.location = location
    new_post.save()
    
    logger.debug(" ************** add_post: " + title)
    
    if title:
        return Response({"data": title + " insert!"}, status=status.HTTP_200_OK)
    else:
        return Response(
            {"res": "parameter: title is None"},
            status=status.HTTP_400_BAD_REQUEST
        )

# 2. 列出資料的 API
@api_view(['GET'])
def list_post(request):
    posts = Post.objects.all().values()
    # 這裡就是投影片強調的重點！一定要加上 safe=False
    return JsonResponse(list(posts), safe=False)