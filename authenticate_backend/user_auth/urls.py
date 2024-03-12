from django.contrib import admin
from django.urls import path
from .views import demo,signup,Login,user_info,update_data,delete_user,generate_otp
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('',demo,name="demo"),
    path('signup',signup.as_view(),name="signup"),
    path('login',Login.as_view(),name="login"),
    path('user_info',user_info.as_view(),name="info"),
    path('update_data',update_data.as_view(),name="update"),
    path('delete',delete_user.as_view(),name="delete"),
    path('generate_otp',generate_otp.as_view(),name="otp"),
    path('api/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]