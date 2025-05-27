from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _

class NGO(models.Model):
    """Organização Não-Governamental que registra animais para adoção"""
    name = models.CharField(_('Nome'), max_length=100)
    city = models.CharField(_('Cidade'), max_length=100)
    email = models.EmailField(_('E-mail'))
    phone = models.CharField(_('Telefone'), max_length=20, blank=True, null=True)
    address = models.TextField(_('Endereço'), blank=True, null=True)
    description = models.TextField(_('Descrição'), blank=True, null=True)
    # Campos comentados para evitar erros no banco de dados
    # logo = models.ImageField(_('Logo'), upload_to='ngos/', blank=True, null=True)
    # website = models.URLField(_('Website'), blank=True, null=True)
    # state = models.CharField(_('Estado'), max_length=2, blank=True, null=True)
    # zip_code = models.CharField(_('CEP'), max_length=10, blank=True, null=True)
    created_at = models.DateTimeField(_('Criado em'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Atualizado em'), auto_now=True)
    
    class Meta:
        verbose_name = _('ONG')
        verbose_name_plural = _('ONGs')
    
    def __str__(self):
        return self.name

class Animal(models.Model):
    """Animal disponível para adoção"""
    ANIMAL_TYPES = (
        ('dog', _('Cachorro')),
        ('cat', _('Gato')),
        ('other', _('Outro')),
    )
    SIZE_CHOICES = (
        ('small', _('Pequeno')),
        ('medium', _('Médio')),
        ('large', _('Grande')),
    )
    
    name = models.CharField(_('Nome'), max_length=100)
    type = models.CharField(_('Tipo'), max_length=10, choices=ANIMAL_TYPES)
    breed = models.CharField(_('Raça'), max_length=100)
    age = models.PositiveIntegerField(_('Idade'), help_text=_('Idade em meses'))
    size = models.CharField(_('Tamanho'), max_length=10, choices=SIZE_CHOICES, default='medium')
    gender = models.CharField(_('Gênero'), max_length=10, choices=(
        ('male', _('Macho')),
        ('female', _('Fêmea')),
    ))
    # Campo comentado para evitar erros no banco de dados
    # color = models.CharField(_('Cor'), max_length=50, blank=True, null=True)
    description = models.TextField(_('Descrição'))
    photo = models.ImageField(_('Foto'), upload_to='animals/', blank=True, null=True)
    ngo = models.ForeignKey(NGO, verbose_name=_('ONG'), related_name='animals', on_delete=models.CASCADE)
    is_available = models.BooleanField(_('Disponível para adoção'), default=True)
    created_at = models.DateTimeField(_('Criado em'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Atualizado em'), auto_now=True)
    
    class Meta:
        verbose_name = _('Animal')
        verbose_name_plural = _('Animais')
    
    def __str__(self):
        return f"{self.name} ({self.type})"

class Adoption(models.Model):
    """Representa o relacionamento N:N entre Usuário e Animal para adoção"""
    STATUS_CHOICES = (
        ('pending', _('Pendente')),
        ('approved', _('Aprovado')),
        ('rejected', _('Rejeitado')),
        ('cancelled', _('Cancelado')),
        ('completed', _('Concluído')),
    )
    
    user = models.ForeignKey(User, verbose_name=_('Usuário'), related_name='adoptions', on_delete=models.CASCADE)
    animal = models.ForeignKey(Animal, verbose_name=_('Animal'), related_name='adoptions', on_delete=models.CASCADE)
    status = models.CharField(_('Status'), max_length=10, choices=STATUS_CHOICES, default='pending')
    # Usando o campo adoption_date existente como request_date
    adoption_date = models.DateTimeField(_('Data da solicitação'), auto_now_add=True)
    # Campos comentados para evitar erros no banco de dados
    # request_date = models.DateTimeField(_('Data da solicitação'), auto_now_add=True)
    # approval_date = models.DateTimeField(_('Data de aprovação'), blank=True, null=True)
    updated_at = models.DateTimeField(_('Atualizado em'), auto_now=True)
    notes = models.TextField(_('Observações'), blank=True, null=True)
    
    class Meta:
        unique_together = ('user', 'animal', 'status')
        verbose_name = _('Adoção')
        verbose_name_plural = _('Adoções')
    
    def __str__(self):
        return f"{self.user.username} - {self.animal.name} ({self.get_status_display()})"
    
    def save(self, *args, **kwargs):
        # If adoption is approved, set animal as not available
        if self.status == 'approved':
            self.animal.is_available = False
            self.animal.save()
        super().save(*args, **kwargs)

class Review(models.Model):
    """Avaliações dos usuários sobre as experiências de adoção"""
    user = models.ForeignKey(User, verbose_name=_('Usuário'), related_name='reviews', on_delete=models.CASCADE)
    animal = models.ForeignKey(Animal, verbose_name=_('Animal'), related_name='reviews', on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(
        _('Avaliação'),
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text=_('Avaliação de 1 a 5')
    )
    comment = models.TextField(_('Comentário'))
    created_at = models.DateTimeField(_('Criado em'), auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'animal')
        verbose_name = _('Avaliação')
        verbose_name_plural = _('Avaliações')
    
    def __str__(self):
        return f"{self.user.username}'s review of {self.animal.name} - {self.rating}/5"

