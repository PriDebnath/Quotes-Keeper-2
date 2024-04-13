from rest_framework import serializers
from quotes_keeper_2.apps.quote.models import Quote , Category, QuoteCategory
from quotes_keeper_2.apps.accounts.serializers import UserSerializer 

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']
        
class QuoteCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = QuoteCategory
        fields = "__all__"

class QuoteSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only = True)
  categories = QuoteCategorySerializer(many=True, source='quotecategory_set')

  class Meta:
     model = Quote
     fields = "__all__"
  
  def create(self, validated_data):
        user = self.context['request'].user # Take user from request
        validated_data['user'] = user
        return super().create(validated_data)

  def update(self, instance, validated_data):
        # Ensure user is not updated on patch requests
        validated_data.pop('user', None)
        return super().update(instance, validated_data)