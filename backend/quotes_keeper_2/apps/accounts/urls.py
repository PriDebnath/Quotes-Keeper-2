from django.urls import path , include
from quotes_keeper_2.apps.accounts import views
from rest_framework.routers import DefaultRouter

defaultRouter = DefaultRouter()
defaultRouter.register("", views.UserView)

 
urlpatterns = [
  path("registration", views.UserAPIView.as_view() ),
  path("login", views.UserLoginAPIView.as_view() ),
  path("users", views.UserAPIView.as_view() ),
  path("users/<int:pk>", views.UserAPIView.as_view() ),
  path("users-drf/", include(defaultRouter.urls))
]