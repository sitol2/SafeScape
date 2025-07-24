from django.shortcuts import render
from .models import Category, Resource

def home(request):
    # Fetch all categories and resources from the database
    categories = Category.objects.all()
    resources = Resource.objects.all()

    # Pass the data to the template
    context = {
        'categories': categories,
        'resources': resources
    }
    return render(request, 'resources/index.html', context)