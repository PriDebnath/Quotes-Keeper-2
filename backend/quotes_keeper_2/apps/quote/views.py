from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from quotes_keeper_2.apps.quote.models import Quote 
from quotes_keeper_2.apps.quote.serializers import QuoteSerializer 

class QuoteModelViewSet(ModelViewSet):
  queryset = Quote.objects.all()
  serializer_class =  QuoteSerializer
  filterset_fields = ['user']