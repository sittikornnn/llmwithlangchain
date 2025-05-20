from django.urls import path
from .views import chat

urlpatterns = [
    path('ask/', chat, name='chat'),
]
