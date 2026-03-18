from django.urls import path
from . import views

urlpatterns = [
    path('courselist', views.list_course, name='list_course'),
    path('addcourse', views.add_course, name='add_course'),
]