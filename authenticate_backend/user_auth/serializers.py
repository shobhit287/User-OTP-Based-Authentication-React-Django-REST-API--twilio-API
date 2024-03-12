from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import CustomUser

class customUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['email','password','first_name','last_name','phone_no']
        extra_kwargs = {'password': {'write_only': True}}  # Make password write-only


    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)
    
    def validate(self, data):
        email_exists = CustomUser.objects.filter(email=data.get('email')).exists()
        if email_exists:
            raise serializers.ValidationError("Email is already registered")

        phone_exists = CustomUser.objects.filter(phone_no=data.get('phone_no')).exists()
        if phone_exists:
            raise serializers.ValidationError("Phone number is already registered")

        return data
    

    def create(self, validated_data):
        # Hash the password before saving
        
        return CustomUser.objects.create_user(**validated_data)

