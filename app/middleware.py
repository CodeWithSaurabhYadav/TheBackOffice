from django.shortcuts import redirect
from django.urls import reverse

class CheckUserAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.user.is_authenticated and request.path != reverse('login'):
            return redirect('login')

        response = self.get_response(request)
        return response


# class CheckUserAuthenticationMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         # Check if the user is authenticated and allowed to access the dashboard
#         if not request.user.is_authenticated and request.path.startswith('/dashboard/'):
#             return redirect('/login/?next=/dashboard/')

#         response = self.get_response(request)
#         return response