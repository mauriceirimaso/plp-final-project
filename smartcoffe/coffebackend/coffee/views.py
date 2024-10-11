from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Orders
from .models import History
from datetime import datetime
 
from django.apps import apps

from rest_framework import status
from .serializers import OrdersSerializer
from .serializers import HistorySerializer


from rest_framework_simplejwt.tokens import AccessToken
from .models import Coffetable  
from .models import Coffeproducts

from .serializers import Coffeproductsserializer
from .serializers import HistorySerializer


from .models import Notification
from .serializers import NotificationSerializer


from django.shortcuts import render

import jwt
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

  
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password  #


from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError
from django.utils.decorators import method_decorator

from .utils import get_email_from_token



globalemail = None

def setglobalemail(email):
    global globalemail
    globalemail = email


def getglobalemail():
    return globalemail   



@api_view(['POST'])
def signup(request):
    
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        
        serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    try:
        user = Coffetable.objects.get(email=email)
        
        if check_password(password, user.password):
            refresh = RefreshToken.for_user(user)
            setglobalemail(user.email)
            
            refresh['email'] = user.email
            
            return Response({
                'message': 'Login successful',
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'email': user.email
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Password does not match'}, status=status.HTTP_401_UNAUTHORIZED)
    except Coffetable.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    




@api_view(['GET'])
def getglobalemailview(request):
    email = getglobalemail()
    
    if email:
        return Response({'email': email}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'No user is logged in'}, status=status.HTTP_404_NOT_FOUND)











@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def getuseremail(request):
    try:
      
        user_email = request.user.email
        return Response({'email': user_email}, status=status.HTTP_200_OK)
    except TokenError:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    





@api_view(['GET'])
def getfirstuserfullname(request):
    email = "irimasomaurice100@gmail.com" 

    try:
        user =Coffetable.objects.get(email=email)  
        fullname = user.fullnames  
        return JsonResponse({'fullname': fullname}, status=200)
    except Coffetable.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
def getemailfromsession(request):

    email = request.session.get('email') 
    print("Session data:", request.session.items())  
    return email  





@api_view(['GET'])
def getallcoffe(request):
    coffetype = request.query_params.get('coffetype')  
    
    if not coffetype:
        return Response({'error': 'Coffetype parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        coffeproducts = Coffeproducts.objects.filter(coffetype=coffetype)
        
        if not coffeproducts.exists():
            return Response({'error': 'No coffee products found for the specified coffetype'}, status=status.HTTP_404_NOT_FOUND)

        serializer = Coffeproductsserializer(coffeproducts, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

 



@api_view(['GET'])
def getproductbyid(request):
    product_id = request.query_params.get('id')  

    if not product_id:
        return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        product = Coffeproducts.objects.get(id=product_id)  
        serializer = Coffeproductsserializer(product)  
        return Response(serializer.data, status=status.HTTP_200_OK)  
    except Coffeproducts.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)












@api_view(['GET'])
def getuserdetails(request):
    email = getglobalemail() 
    print("email being in use is ",email) 

    if email:
        try:
            
            user = Coffetable.objects.get(email=email)
            
            
            user_data = {
                'fullnames': user.fullnames,  
                'profilephoto': user.profilephoto.url if user.profilephoto else None,  
                'membership': user.membership,  
                'balance':user.balance,
            }
            
            return Response(user_data, status=status.HTTP_200_OK)
        except Coffetable.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'No email stored'}, status=status.HTTP_400_BAD_REQUEST)
    


    

def fetch_and_increment_orderid():
    try:
        latest_order = Orders.objects.latest('id')
        current_orderid = latest_order.orderid
        return increment_orderid(current_orderid)
    except Orders.DoesNotExist:
        return "A-000A"    

@api_view(['GET'])
def fetchandincrement(request):
    new_orderid = fetch_and_increment_orderid()
    return Response({'new_orderid': new_orderid}, status=200)




def increment_orderid(orderid):
    prefix = orderid[:2]
    number_part = orderid[2:-1]
    suffix = orderid[-1:]
    return f'{prefix}{str(int(number_part) + 1).zfill(len(number_part))}{suffix}'


def get_formatted_date():
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    current_date = datetime.now()
    day = current_date.strftime('%d')  
    year = current_date.strftime('%y')  
    month = months[current_date.month - 1] 
    return f"{month}-{day}-{year}"



def get_formatted_time():
    
    current_time = datetime.now()
    hours = current_time.hour
    minutes = current_time.strftime('%M')
    period = 'PM' if hours >= 12 else 'AM'
    hours = hours % 12 or 12  
    return f"{str(hours).zfill(2)}:{minutes}{period}"

@csrf_exempt
@api_view(['POST'])
def check_email_availability(request):
    
    email = request.data.get('email')
    if email:
     
        if Coffetable.objects.filter(email=email).exists():
            return Response({'available': False, 'message': 'Email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'available': True}, status=status.HTTP_200_OK)
    return Response({'error': 'Email not provided.'}, status=status.HTTP_400_BAD_REQUEST)


from rest_framework import status
from .serializers import OrdersSerializer

orderid = fetch_and_increment_orderid()
time = get_formatted_time()
date = get_formatted_date()
email = getglobalemail()

print(f"Order ID: {orderid}")
print(f"Email: {email}")

print(f"Time: {time}")
print(f"Date: {date}")











@api_view(['GET'])
def getallorders(request):
    email = getglobalemail()

    if not email:
        return Response({'error': 'No email stored, please provide one'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        orders = Orders.objects.filter(email=email)

        if not orders.exists():
            return Response({'message': 'No orders found at the moment'}, status=status.HTTP_200_OK)

        serializer = OrdersSerializer(orders, many=True)
        
        reversed_data = serializer.data[::-1]  
        
        return Response(reversed_data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    





@api_view(['GET'])
def getallhistory(request):
    email = getglobalemail() 

    if not email:
        return Response({'error': 'No email stored, please provide one'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        
        history = History.objects.filter(email=email)

        if not history.exists():
            return Response({'error': 'No history found at the moment'}, status=status.HTTP_200_OK)

        
        serializer = HistorySerializer(history, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    

@api_view(['GET'])
def getorderbyorderid(request):
    orderid = request.query_params.get('orderid')  
    if orderid:
        try:
            
            order = Orders.objects.get(id=int(orderid))  
            serializer = OrdersSerializer(order)
            return Response(serializer.data)
        except Orders.DoesNotExist:
            return Response({'error': 'Order not found'}, status=404)
        except ValueError:
            return Response({'error': 'Invalid orderid'}, status=400)
    else:
        return Response({'error': 'orderid is required'}, status=400)


@api_view(['GET'])
def gethistorybyorderid(request):
    orderid = request.query_params.get('orderid')  
    if orderid:
        try:
            
            order = History.objects.get(id=int(orderid))  
            serializer = HistorySerializer(order)
            return Response(serializer.data)
        except History.DoesNotExist:
            return Response({'error': 'Order not found'}, status=404)
        except ValueError:
            return Response({'error': 'Invalid orderid'}, status=400)
    else:
        return Response({'error': 'orderid is required'}, status=400)



















@api_view(['POST'])
def recordorder(request):
    try:
        serializer = OrdersSerializer(data=request.data)

        if serializer.is_valid():
            
            
            time = get_formatted_time()
            date = get_formatted_date()
            email = getglobalemail()
            status_value = "pending"
            
            orderid=serializer.validated_data['orderid']
            productname = serializer.validated_data['productname']
            producttype = serializer.validated_data['producttype']
            quantity = serializer.validated_data['quantity']
            price = serializer.validated_data['price']
            coffephoto = serializer.validated_data['coffephoto']
  
            Orders.objects.create(
                orderid=orderid,
                email=email,
                productname=productname,
                producttype=producttype,
                status=status_value,
                quantity=quantity,
                price=price,
                coffephoto=coffephoto,
                time=time,
                date=date
            )

            return Response({"message": "Order submitted successfully"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)







@api_view(['POST'])
def recordhistory(request):
    try:
        serializer = HistorySerializer(data=request.data)

        if serializer.is_valid():
            
            
            time = get_formatted_time()
            date = get_formatted_date()
            email = getglobalemail()

            history_status=serializer.validated_data['status']
            orderid=serializer.validated_data['orderid']
            productname = serializer.validated_data['productname']
            producttype = serializer.validated_data['producttype']
            quantity = serializer.validated_data['quantity']
            price = serializer.validated_data['price']
            coffephoto = serializer.validated_data['coffephoto']
  
            History.objects.create(
                orderid=orderid,
                email=email,
                productname=productname,
                producttype=producttype,
                status=history_status,
                quantity=quantity,
                price=price,
                coffephoto=coffephoto,
                time=time,
                date=date
            )

            return Response({"message": "History submitted successfully"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    






@api_view(['DELETE'])
def delete_order(request):
    order_id = request.query_params.get('orderid')
    
    try:
        order = Orders.objects.get(id=order_id)
        order.delete()
        return Response({"message": "Order deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Orders.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['DELETE'])
def delete_history(request):
    order_id = request.query_params.get('orderid')
    
    try:
        history = History.objects.get(id=order_id)
        history.delete()
        return Response({"message": "History deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except History.DoesNotExist:
        return Response({"error": "History not found"}, status=status.HTTP_404_NOT_FOUND)




@api_view(['POST'])
def recordnotification(request):
    try:
   
        notiid = request.data.get('notiid')
        notitype = request.data.get('notitype')
        notiphoto = request.data.get('notiphoto')
        
       
        email = getglobalemail()

        if not email:
            return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        
        date = get_formatted_date()
        time = get_formatted_time()

        
        notification_data = {
            'notiid': notiid,
            'notitype': notitype,
            'email': email,  
            'notiphoto': notiphoto,
            'date': date,
            'time': time
        }

        
        serializer = NotificationSerializer(data=notification_data)

        if serializer.is_valid():
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





@api_view(['GET'])
def fetch_notifications(request):
    email = getglobalemail()  
    notifications = Notification.objects.filter(email=email) 

    if notifications.exists():
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)
    else:
        return Response({'message': 'No notifications found for this email.'}, status=status.HTTP_404_NOT_FOUND)


def index(request):
    
    return render(request, 'index.html')
