from django.shortcuts import render, redirect
from app.models import Product
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout

# Create your views here.
@login_required
def index(request):
    print('user_id : ',request.user.id)
    # print('sessionid : ',request.session.get('user_id'))
    # print("sessionid:", request.session.session_key)

    if request.user.is_authenticated:
        if request.session.session_key:  # Check if 'user_id' exists in the session data
            object = Product.objects.all()
            context = {
                'object': object,
            }

            return render(request, 'app/index.html', context=context)        
        else:
            return redirect('login')
    else:
        # User is not logged in, handle the case for anonymous users
        return render(request, 'login.html')
    

def UserLogin(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')

        # print(email, password)

        user = authenticate(request, username=email, password=password)

        print(user)

        if user is not None:
            # print("sucess")
            login(request, user)
            request.session.save()
            # print("sessionid:", request.session.session_key)  # Check if session key is generated
            print('redirecting to dashboard')
            return redirect('index')
            return redirect('dashboard')
        else:
            # print("fail")
            error_message = 'Invalid credentials. Please try again.'
            return render(request, 'login.html', {'error_message': error_message})
    
    return render(request, 'login.html')

# @login_required
def UserLogout(request):
    logout(request)
    return redirect('login')