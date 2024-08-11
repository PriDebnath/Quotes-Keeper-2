from django.shortcuts import render
from rest_framework.permissions import (
    AllowAny,
    BasePermission,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from quotes_keeper_2.apps.quote.models import Quote, Category
from quotes_keeper_2.apps.quote.serializers import QuoteSerializer, CategorySerializer


class QuoteModelViewSet(ModelViewSet):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ("user",)
    search_fields = ("text",)

    def initial(self, request, *args, **kwargs):
        user = request.user
        if user.is_authenticated:
            print("User:", user)
        else:
            print("User: Unknown")
        print("The view is going to initialize")
        super().initial(request, *args, **kwargs)


class CategoryModelViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
