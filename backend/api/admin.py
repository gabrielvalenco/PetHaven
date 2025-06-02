from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import NGO, Animal, Adoption, Review

# Personalizar o site de administração
admin.site.site_header = _('Administração do PetHaven')
admin.site.site_title = _('Painel de Administração do PetHaven')
admin.site.index_title = _('Bem-vindo ao Painel de Administração do PetHaven')

@admin.register(NGO)
class NGOAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'email', 'phone')
    search_fields = ('name', 'city', 'email')
    list_filter = ('city',)
    
    # Tradução dos campos
    fieldsets = (
        (_('Informações Básicas'), {
            'fields': ('name', 'description')
        }),
        (_('Contato'), {
            'fields': ('email', 'phone')
        }),
        (_('Localização'), {
            'fields': ('address', 'city')
        }),
    )

@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'breed', 'age', 'ngo', 'is_available')
    list_filter = ('type', 'size', 'gender', 'ngo', 'is_available')
    search_fields = ('name', 'breed', 'description')
    
    # Tradução dos campos
    fieldsets = (
        (_('Informações Básicas'), {
            'fields': ('name', 'type', 'breed', 'age')
        }),
        (_('Características'), {
            'fields': ('size', 'gender', 'description')
        }),
        (_('Situação'), {
            'fields': ('ngo', 'is_available', 'photo')
        }),
    )
    
    # Tradução dos valores booleanos
    def get_is_available(self, obj):
        return obj.is_available
    get_is_available.short_description = _('Disponível para adoção')
    get_is_available.boolean = True

@admin.register(Adoption)
class AdoptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'animal', 'status', 'adoption_date')
    list_filter = ('status',)
    search_fields = ('user__username', 'animal__name')
    date_hierarchy = 'adoption_date'
    
    # Tradução dos campos
    fieldsets = (
        (_('Informações da Adoção'), {
            'fields': ('user', 'animal', 'status')
        }),
        (_('Datas'), {
            'fields': ('adoption_date',)
        }),
        (_('Detalhes'), {
            'fields': ('notes',)
        }),
    )
    
    # Tradução dos status
    def get_status(self, obj):
        status_map = {
            'pending': _('Pendente'),
            'approved': _('Aprovado'),
            'rejected': _('Rejeitado'),
            'completed': _('Concluído')
        }
        return status_map.get(obj.status, obj.status)
    get_status.short_description = _('Status')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'animal', 'rating', 'created_at')
    list_filter = ('rating',)
    search_fields = ('user__username', 'animal__name', 'comment')
    date_hierarchy = 'created_at'
    
    # Tradução dos campos
    fieldsets = (
        (_('Informações da Avaliação'), {
            'fields': ('user', 'animal', 'rating')
        }),
        (_('Comentário'), {
            'fields': ('comment',)
        }),
        (_('Data'), {
            'fields': ('created_at',)
        }),
    )
    readonly_fields = ('created_at',)

