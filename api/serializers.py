from rest_framework import serializers
from app.models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','name', 'quantity', 'price']

    # class Meta:
    #     model = Product
    #     fields = '__all__'