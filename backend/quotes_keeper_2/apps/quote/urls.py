from django.urls import path , include
from quotes_keeper_2.apps.quote import views
from rest_framework.routers import DefaultRouter

defaultRouter = DefaultRouter()
defaultRouter.register("", views.QuoteModelViewSet)

urlpatterns = [
  path("", include(defaultRouter.urls)),
  ]