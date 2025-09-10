from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('chatbot-test/', views.chatbot_test, name='chatbot_test'),
    path('api/quick-questions/', views.quick_questions, name='quick_questions'),
]
