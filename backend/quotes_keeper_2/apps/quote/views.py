from django.shortcuts import render
from rest_framework.permissions import AllowAny, BasePermission,IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet
from quotes_keeper_2.apps.quote.models import Quote 
from quotes_keeper_2.apps.quote.serializers import QuoteSerializer 


class QuoteModelViewSet(ModelViewSet):
  queryset = Quote.objects.all()
  serializer_class =  QuoteSerializer
  permission_classes = [IsAuthenticatedOrReadOnly]
  filterset_fields = ['user']
  
  def initial(self, request, *args, **kwargs):
        user = request.user
        if user.is_authenticated:
            print("User:", user)
        else:
            print("User: Unknown")
        print ("The view is going to initialize")
        super().initial(request, *args, **kwargs)
            