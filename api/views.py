from rest_framework.response import Response
from rest_framework.decorators import api_view
from app.models import Product
from api.serializers import ProductSerializer

@api_view(['GET'])
def getData(request):
    data = Product.objects.all()
    serializer = ProductSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addItem(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)