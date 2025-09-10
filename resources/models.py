from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    icon_path = models.CharField(max_length=200, default='assets/images/bulb.png')
    
    # This will make the category names appear correctly in the admin panel
    def __str__(self):
        return self.name

class Resource(models.Model):
    # This links the resource to a category. If a category is deleted, all resources in it are also deleted.
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    
    # We will store the path to the icon image here, e.g., 'assets/images/exitdrill.png'
    icon_path = models.CharField(max_length=200)

    # This will be for the YouTube link or other content URL
    content_url = models.URLField(blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True, null=True)
    # This will make the resource titles appear correctly in the admin panel
    def __str__(self):
        return self.title

class QuickQuestion(models.Model):
    CATEGORY_CHOICES = [
        ('emergency', 'Emergency Procedures'),
        ('prevention', 'Fire Prevention'),
        ('equipment', 'Safety Equipment'),
        ('kids', 'For Kids'),
        ('navigation', 'Website Navigation'),
        ('general', 'General Information'),
    ]
    
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='general')
    question_text = models.CharField(max_length=200)
    response_text = models.TextField()
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['category', 'order']
    
    def __str__(self):
        return f"[{self.get_category_display()}] {self.question_text}"
