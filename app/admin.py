from django.contrib import admin

# Register your models here.
from app.models import Product, CustomUser

admin.site.register(Product)
admin.site.site_header = 'Admin Dashboard'
admin.site.site_title = 'Admin Dashboard'
admin.site.index_title = 'Welcome to Admin Dashboard'
admin.site.register(CustomUser)