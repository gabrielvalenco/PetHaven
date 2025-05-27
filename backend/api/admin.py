from django.contrib import admin
from .models import NGO, Animal, Adoption, Review

@admin.register(NGO)
class NGOAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'email', 'phone')
    search_fields = ('name', 'city', 'email')
    list_filter = ('city',)

@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'breed', 'age', 'ngo', 'is_available')
    list_filter = ('type', 'size', 'gender', 'ngo', 'is_available')
    search_fields = ('name', 'breed', 'description')

@admin.register(Adoption)
class AdoptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'animal', 'status', 'adoption_date')
    list_filter = ('status',)
    search_fields = ('user__username', 'animal__name')
    date_hierarchy = 'adoption_date'

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'animal', 'rating', 'created_at')
    list_filter = ('rating',)
    search_fields = ('user__username', 'animal__name', 'comment')
    date_hierarchy = 'created_at'

