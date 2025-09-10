import os
import json
from django.shortcuts import render
from django.http import JsonResponse
from .models import Category, Resource, QuickQuestion

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

def chatbot_test(request):
    # Serve the chatbot test page
    return render(request, 'resources/chatbot_test.html')

def quick_questions(request):
    # Get all active quick questions ordered by category and order
    questions = QuickQuestion.objects.filter(is_active=True).order_by('category', 'order')
    
    # Group questions by category
    categorized_questions = {}
    for question in questions:
        category = question.get_category_display()
        if category not in categorized_questions:
            categorized_questions[category] = []
        categorized_questions[category].append({
            'id': question.id,
            'question_text': question.question_text,
            'response_text': question.response_text,
            'category': question.category
        })
    
    return JsonResponse(categorized_questions)
