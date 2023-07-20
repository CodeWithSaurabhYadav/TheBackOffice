from django.shortcuts import render, redirect
from app.models import Product
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.cache import never_cache

# from api.serializers import ProductSerializer
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
# from app.models import Product


# Create your views here.
@never_cache
@login_required
def index(request):
    if request.user.is_authenticated:
        if request.session.session_key:  # Check if session exists
            object = Product.objects.all().order_by('id')
            context = {
                'object': object
            }
            return render(request, 'app/index.html', context)        
        else:
            return redirect('login')
    else:
        return render(request, 'login.html')  # User is not logged in, handle the case for anonymous users

def UserLogin(request):
    if not request.user.is_authenticated:
        if request.method == "POST":
            email = request.POST.get('email')
            password = request.POST.get('password')
            user = authenticate(request, username=email, password=password)
            if user is not None:
                # print("sucess")
                login(request, user)
                request.session.save()
                # print("sessionid:", request.session.session_key)  # Check if session key is generated
                # print('redirecting to dashboard')
                return redirect('index')
            else:
                # print("fail")
                error_message = 'Invalid credentials. Please try again.'
                return render(request, 'login.html', {'error_message': error_message})
    else:
        return redirect('index')
    
    return render(request, 'login.html')

# @login_required
def UserLogout(request):
    logout(request)
    request.session.clear()
    request.session.flush()
    return redirect('login')