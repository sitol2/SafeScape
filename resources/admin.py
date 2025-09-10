from django.contrib import admin
from .models import Category, Resource, QuickQuestion

# Register your models here.
admin.site.register(Category)
admin.site.register(Resource)

@admin.register(QuickQuestion)
class QuickQuestionAdmin(admin.ModelAdmin):
    list_display = ('question_text', 'category', 'order', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('question_text', 'response_text')
    list_editable = ('order', 'is_active')
