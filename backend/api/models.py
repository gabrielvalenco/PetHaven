from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class NGO(models.Model):
    """Non-Governmental Organization that registers animals for adoption"""
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class Animal(models.Model):
    """Animal available for adoption"""
    ANIMAL_TYPES = (
        ('dog', 'Dog'),
        ('cat', 'Cat'),
        ('other', 'Other'),
    )
    SIZE_CHOICES = (
        ('small', 'Small'),
        ('medium', 'Medium'),
        ('large', 'Large'),
    )
    
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=10, choices=ANIMAL_TYPES)
    breed = models.CharField(max_length=100)
    age = models.PositiveIntegerField(help_text='Age in months')
    size = models.CharField(max_length=10, choices=SIZE_CHOICES, default='medium')
    gender = models.CharField(max_length=10, choices=(
        ('male', 'Male'),
        ('female', 'Female'),
    ))
    description = models.TextField()
    photo = models.ImageField(upload_to='animals/', blank=True, null=True)
    ngo = models.ForeignKey(NGO, related_name='animals', on_delete=models.CASCADE)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} ({self.type})"

class Adoption(models.Model):
    """Represents the N:N relationship between User and Animal for adoption"""
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('cancelled', 'Cancelled'),
    )
    
    user = models.ForeignKey(User, related_name='adoptions', on_delete=models.CASCADE)
    animal = models.ForeignKey(Animal, related_name='adoptions', on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    adoption_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    notes = models.TextField(blank=True, null=True)
    
    class Meta:
        unique_together = ('user', 'animal', 'status')
    
    def __str__(self):
        return f"{self.user.username} - {self.animal.name} ({self.get_status_display()})"
    
    def save(self, *args, **kwargs):
        # If adoption is approved, set animal as not available
        if self.status == 'approved':
            self.animal.is_available = False
            self.animal.save()
        super().save(*args, **kwargs)

class Review(models.Model):
    """User reviews of adoption experiences"""
    user = models.ForeignKey(User, related_name='reviews', on_delete=models.CASCADE)
    animal = models.ForeignKey(Animal, related_name='reviews', on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text='Rating from 1 to 5'
    )
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'animal')
    
    def __str__(self):
        return f"{self.user.username}'s review of {self.animal.name} - {self.rating}/5"

