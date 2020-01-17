from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('play/', views.play, name='play'),
    path('insertscores/', views.insertscores, name='insertscores'),
    
]