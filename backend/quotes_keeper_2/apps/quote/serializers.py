from rest_framework import serializers
from quotes_keeper_2.apps.quote.models import Quote , Category, QuoteCategory
from quotes_keeper_2.apps.accounts.serializers import UserSerializer 
from django.db import transaction

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
  #category_list = CategorySerializer(many=True, write_only=True)
  #category_list = serializers.SerializerMethodField(method_name="get_category_list")
  category_list = serializers.ListField(write_only=True, required=False)
  class Meta:
     model = Quote
     fields = "__all__"
  
  def create(self, validated_data):
        user = self.context['request'].user # Take user from request
        print(user)
        print("validated_data=>",validated_data)
        if user:
          validated_data['user'] = user
          
        category_list = validated_data.pop('category_list', [])
        quote_instance = super().create(validated_data) # creating a quote first
        
        if category_list:
          
            for category in category_list:
              print("cat=>",category)
              try :
                category_instance, created = Category.objects.get_or_create(**category)
                print("category_instance",category_instance)
              except IntegrityError as e:
                    print("Error occurred while creating category:", e)
                    category_instance = Category.objects.get(**category)
              
                
             # if not created:
                # Category already exists, so no need to create it again
              #  category_instance = Category.objects.get(**category_data)
              QuoteCategory.objects.create(quote=quote_instance,category=category_instance )
              #print("instance=>",category_instance)
        
        print("quote_instance=>",quote_instance)
        return quote_instance

  def update(self, instance, validated_data):
        user = self.context['request'].user
        # Ensure only the creator can update or delete the quote
        if instance.user == user:
            # Ensure user is not updated on patch requests
            validated_data.pop('user', None)
            return super().update(instance, validated_data)
        else:
            raise serializers.ValidationError("You are not allowed to modify this quote.")

  def delete(self, instance):
        user = self.context['request'].user
        # Ensure only the creator can delete the quote
        if instance.user == user:
            instance.delete()
        else:
            raise serializers.ValidationError("You are not allowed to modify this quote.")
  
  
  def get_category_list(self, obj):
    return 7