from django.shortcuts import HttpResponse
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.contrib.auth import authenticate 
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import customUserSerializer
from django.conf import settings
from twilio.rest import Client
import random
from rest_framework.response import Response
from .models import CustomUser

def demo(request):
    return HttpResponse("Server is running")

class signup(APIView):
    def post(self,request):
        serializer=customUserSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            return Response({"success":True})
        else:
            return Response({"success":False,"error":serializer.errors})
        
class Login(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            token = {
                'refresh':str(refresh),
                'access': str(refresh.access_token),
            }
            return Response({"success": True,"name":user.first_name,"token":token})
        else:
            return Response({"success": False})

        

    
class user_info(APIView):
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        user_details={
            "first_name":request.user.first_name,
            "email":request.user.email,
            "phone_no":request.user.phone_no
        }
        return Response({"details":user_details})
    

 
class update_data(APIView):  
    authentication_classes = [JWTAuthentication]
    def patch(self,request):
        print(request.user.id)
        instance = CustomUser.objects.get(id=request.user.id)
        serializer=customUserSerializer(instance,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success":True})
        else:
            return Response({"success":False})


class delete_user(APIView):   
    authentication_classes = [JWTAuthentication]
    def delete(self,request):
        user_del=CustomUser.objects.get(id=request.user.id)
        if user_del:
         user_del.delete()
         return Response({"success":True})
        else:
            return Response({"success":True})

    
class generate_otp(APIView):
    def post(self,request):
        mobile_no=request.data.get('mobile_number')
        otp = ''.join(random.choices('0123456789', k=6))
        print(otp)
        try:
         client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
         message = client.messages.create(
            body=f'Your OTP is: {otp}',
            from_=settings.TWILIO_PHONE_NUMBER,
            to=f"+91{mobile_no}"
         )
         return Response({"success":True,"otp":otp})
        except Exception as e:
         print('Error sending OTP:', e)
         return Response({"success":False})
        




    

        

