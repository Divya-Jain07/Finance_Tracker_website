from django.shortcuts import render
from  django.views import View
import json,re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from validate_email import validate_email
# Create your views here.


class UsernameValidationView(View):
    #
    @csrf_exempt # <--- This allows Postman to "talk" to this view
    def post(self,request):
        data=json.loads(request.body)
        
        username=data['username']
        if not str(username).isalnum():
            return JsonResponse({'username_error':'username should only contain alphanumeric characters'},status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({'username_error':'sorry username in use,choose another one'},status=409)
        return JsonResponse({'username_valid':True})
    
class emailValidation(View):
    def post(self,request):
        data=json.loads(request.body)
        
        email=data['email']
        if not validate_email(email):
            return JsonResponse({'email_error':'email is invalid'},status=400)
        
        if User.objects.filter(email=email).exists():
            return JsonResponse({'email_error':'sorry email in use,choose another one'},status=409)
        return JsonResponse({'email_valid':True})

    
class RegistrationView(View):
    #handle get request
    def get(self,request):
        return render(request,'authentication/register.html')
    