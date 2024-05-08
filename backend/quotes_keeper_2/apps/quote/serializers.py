from rest_framework import status
from rest_framework import serializers
from django.db import transaction, IntegrityError
from rest_framework.exceptions import ValidationError
from quotes_keeper_2.apps.accounts.serializers import UserSerializer 
from quotes_keeper_2.apps.quote.models import Quote , Category, QuoteCategory

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        
class QuoteCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = QuoteCategory
        fields = "__all__"

class QuoteSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only = True)
  categories = QuoteCategorySerializer( many = True, read_only = True, source='quotecategory_set')
  category_list = serializers.ListField(write_only=True, required=False)
  
  class Meta:
     model = Quote
     fields = "__all__"
  
  def create(self, validated_data):
        user = self.context['request'].user # Take user from request
        if user:
          validated_data['user'] = user
          
        category_list = validated_data.pop('category_list', [])
        quote_instance = super().create(validated_data) # creating a quote first
        if category_list:
            for category in category_list:
                category_instance, created = Category.objects.get_or_create(**category)
                try:
                    QuoteCategory.objects.create(quote=quote_instance, category=category_instance)
                except IntegrityError:
                    raise ValidationError("Unique constraint violated for QuoteCategory.", code=status.HTTP_400_BAD_REQUEST)
        return quote_instance
 
  def update(self, instance, validated_data):
    user = self.context['request'].user
    # Ensure only the creator can update the quote
    if instance.user == user:
        # Remove all previously attached quote categories
        instance.quotecategory_set.all().delete()
        
        # Ensure user is not updated on patch requests
        validated_data.pop('user', None)
        
        # Update the quote instance
        instance = super().update(instance, validated_data)

        # Attach new categories provided in update data
        category_list = validated_data.get('category_list', [])
        for category in category_list:
            category_instance, created = Category.objects.get_or_create(**category)
            try:
              QuoteCategory.objects.create(quote=quote_instance, category=category_instance)
            except IntegrityError:
              raise ValidationError("Unique constraint violated for QuoteCategory.", code=status.HTTP_400_BAD_REQUEST)
        return instance
    else:
        raise serializers.ValidationError("You are not allowed to modify this quote.")


  def delete(self, instance):
        user = self.context['request'].user
        # Ensure only the creator can delete the quote
        if instance.user == user:
            instance.delete()
        else:
            raise serializers.ValidationError("You are not allowed to modify this quote.")
  
  
  