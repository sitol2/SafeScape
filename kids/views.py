from django.shortcuts import render

def kids_zone_home(request):
    return render(request, 'kids/kids_zone.html')

def hazard_house_game(request):
    return render(request, 'kids/hazard_house.html')

def stop_drop_roll_game(request):
    return render(request, 'kids/stop_drop_roll.html')

def hero_academy_game(request):
    return render(request, 'kids/hero_academy_game.html')
