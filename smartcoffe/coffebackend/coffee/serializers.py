from rest_framework import serializers
from .models import Coffetable  
from .models import Coffeproducts
from .models import Orders
from .models import History
from .models import Notification

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coffetable 
        fields = ['fullnames', 'email', 'password', 'profilephoto', 'balance']
        extra_kwargs = {'password': {'write_only': True}}  

    def create(self, validated_data):
        
        if 'profilephoto' not in validated_data or not validated_data['profilephoto']:
            validated_data['profilephoto'] = 'profilepicture/profilephoto.png'  
        if 'balance' not in validated_data or validated_data['balance'] is None:
            validated_data['balance'] = 0.00 
        
        if 'membership' not in validated_data or not validated_data['membership']:
            validated_data['membership'] = 'gold member'
        
        
        user = Coffetable.objects.create(**validated_data)
        return user


class Coffeproductsserializer(serializers.ModelSerializer):
 class Meta:
     model = Coffeproducts
     fields = ['id','coffekind', 'rating', 'coffename', 'coffetype', 'coffephoto', 'price']


class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = ['id','orderid', 'email', 'productname', 'producttype', 'status', 'quantity', 'price', 'coffephoto', 'time', 'date']




class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ['id','orderid', 'email', 'productname', 'producttype', 'status', 'quantity', 'price', 'coffephoto', 'time', 'date']
       

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id','notiid', 'notitype', 'email', 'notiphoto', 'date', 'time']
 