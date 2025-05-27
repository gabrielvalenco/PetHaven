from rest_framework import serializers
from django.contrib.auth.models import User
from .models import NGO, Animal, Adoption, Review

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']

class NGOSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGO
        fields = '__all__'

class AnimalSerializer(serializers.ModelSerializer):
    ngo_name = serializers.ReadOnlyField(source='ngo.name')
    
    class Meta:
        model = Animal
        fields = '__all__'
        extra_kwargs = {
            'is_available': {'read_only': True}
        }
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['type_display'] = instance.get_type_display()
        representation['size_display'] = instance.get_size_display()
        representation['gender_display'] = instance.get_gender_display()
        return representation

class AdoptionSerializer(serializers.ModelSerializer):
    user_details = UserSerializer(source='user', read_only=True)
    animal_details = AnimalSerializer(source='animal', read_only=True)
    
    class Meta:
        model = Adoption
        fields = '__all__'
        read_only_fields = ['adoption_date', 'updated_at']
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['status_display'] = instance.get_status_display()
        return representation

class ReviewSerializer(serializers.ModelSerializer):
    user_details = UserSerializer(source='user', read_only=True)
    animal_details = AnimalSerializer(source='animal', read_only=True)
    
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['created_at']
        
    def validate(self, data):
        """
        Check that the user has actually adopted the animal before reviewing
        """
        user = data['user']
        animal = data['animal']
        
        # Check if user has adopted this animal
        if not Adoption.objects.filter(
            user=user, animal=animal, status='approved'
        ).exists():
            raise serializers.ValidationError(
                "You can only review animals you have adopted."
            )
        
        return data
