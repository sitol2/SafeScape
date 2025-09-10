from django.urls import path
from . import views

urlpatterns = [
    path('', views.kids_zone_home, name='kids_zone_home'),
    path('hazard-house/', views.hazard_house_game, name='hazard_house_game'),
    path('stop-drop-roll/', views.stop_drop_roll_game, name='stop_drop_roll_game'),
    path('hero-academy/', views.hero_academy_game, name='hero_academy_game'),
]
