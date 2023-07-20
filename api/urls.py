from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData, name='get_data'),
    path('add/', views.addItem, name='add_item'),
    path('getData/<int:id>/', views.getItem, name='get_item'),
    path('delete/<int:id>/', views.deleteItem, name='delete_item'),
    path('update/<int:id>/', views.updateItem, name='update_item'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]