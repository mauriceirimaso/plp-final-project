import styles from './Ordercss';
import Footer from './Footer';
import emojiimage from '../assets/ordericons/note.png';
import coffeimage from '../assets/productimages/coffe1.png';
import discount from '../assets/ordericons/discount.png';
import wallet from '../assets/ordericons/wallet.png';
import RNPickerSelect from 'react-native-picker-select';
import background from '../assets/ordericons/background1.png';
import adress from '../assets/ordericons/adress.png';
import coffephoto4 from '../assets/productimages/coffe4.png';
import note from '../assets/ordericons/note.png';
import Done from './Done';

import { useNavigation } from '@react-navigation/native';


import axios from 'axios';


import { useState,useEffect } from 'react';


import { 
    SafeAreaView,
    Text, 
    Image,
    Alert,
    View,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';


const Order=({route})=>
 {

    const navigation = useNavigation();
    const next='>'
   
    const { productId } = route.params; 

    {/*console.log("added product id is",productId)*/}

    const [productData, setProductData] = useState([]);

    const [userData, setUserData] = useState({balance: ''});

    
    const [Number, setNumber] = useState(1);

    const handleAdd = () => {
        setNumber(prevNumber => prevNumber + 1);
    };

    const handleReduce = () => {
        
        if (Number > 0) { 
            setNumber(prevNumber => prevNumber - 1);
            
        } else {
            
        }
    };

    const baseURL = 'http://127.0.0.1:8000'; 

    


    const [newOrderId, setNewOrderId] = useState(null); 
    const [error, setError] = useState(null);

    const fetchNewOrderId = async () => {
        try {
          const response = await fetch(`${baseURL}/api/latestorder/`);
          const data = await response.json();
          
          
          setNewOrderId(data.new_orderid); 
          setError(null); 
        } catch (err) {
          console.error("Error fetching new order ID:", err);
          setError("Failed to fetch new order ID"); 
        }
      };
     
    
      
      useEffect(() => {
        fetchNewOrderId();
        
      }, []);
      
      console.log("neworder id",newOrderId);

  
  

  function getFormattedDate() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    
    const day = String(date.getDate()).padStart(2, '0');  
    const month = months[date.getMonth()];  
    const year = String(date.getFullYear()).slice(-2); 
  
    return `${month}-${day}-${year}`;
  }
  
  
 
  
  function getFormattedTime() {
    const date = new Date();
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12 || 12;  
  
    return `${String(hours).padStart(2, '0')}:${minutes}${period}`;
  }
  
  
   


  
    useEffect(() => {
        const fetchProductData = async () => {
          try {
            
            const response = await fetch(`${baseURL}/api/getproduct/?id=${productId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                
              }
             
            });

            
    
            if (!response.ok) {
              throw new Error('Failed to fetch product data');
            }
    
            const data = await response.json();
            setProductData(data);
          } catch (error) {
            console.error('Error fetching product data:', error);
          }
        };
    
        fetchProductData();
      }, [productId]);



    
      




      useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const response = await fetch(`${baseURL}/api/getuserdetails/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            const data = await response.json();
    
            if (response.ok) {
              setUserData({
                balance: data.balance,   
              });
              
            } else {
              console.error('Error fetching user details:', data.error);
            }
          } catch (error) {
            console.error('Error:', error);
          }
          
        };
    
        fetchUserDetails();
      }, []);

      


      const fetchAndSubmitOrder = async () => {
        try {
         
          const response = await fetch(`${baseURL}/api/latestorder/`);
          const data = await response.json();
          const orderId = data.new_orderid;

      
          const coffephoto1 = `${productData.coffephoto}`;
          console.log("coffe photo url", coffephoto1);


          console.log("Product Name:", productData.coffename);
          console.log("Order ID:", orderId);
          console.log("Product Type:", productData.coffekind);
          console.log("Price:", productData.price * Number);
          console.log("Quantity:", Number);
          console.log("Coffee Photo URL:", coffephoto1);
          
          


          const submitResponse = await fetch(`${baseURL}/api/recordorder/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productname: productData.coffename,
              orderid: orderId,
              producttype: productData.coffekind,
              price: (productData.price) * Number,
              quantity: Number,
              coffephoto: coffephoto1,
            }),
          });
      
          if (submitResponse.ok) {
            
            const notificationResponse = await fetch(`${baseURL}/api/recordnotification/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                notiid: orderId,
                notitype: 'order',
                notiphoto: coffephoto1,
              }),
            });
      
            if (notificationResponse.ok) {
              navigation.navigate('Done');  
            } else {
              Alert.alert('Error', 'Failed to submit notification. Please try again.');
            }
          } else {
            Alert.alert('Error', 'Failed to submit order. Please try again.');
          }
      
        } catch (error) {
          Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
      };
      

     

     
      
    console.log("coffe photo",productData.coffephoto);
    
    return (
        <>
     <StatusBar barStyle="light-content" backgroundColor={'rgb(28, 27, 27)'} />
          
       <View style={styles.grandcontainer}>

            <View style={styles.blackview}>
              
             
               
            

            

          <View style={styles.newview}>
            
            <View style={styles.topphoto}>
                  <View style={styles.onto}>
                    <Image style={{width:'100%',height:'100%',borderRadius:16}} source={{ uri: `${baseURL}${productData.coffephoto}.png` }}/>
                  </View>
            </View>

             <View style={styles.petitview}>
                <View style={styles.orderview}>
                    <View style={styles.headingview}>
                        <TouchableOpacity style={styles.noteslink}>
                            <Image source={note} style={{width: '30%', height: '80%'}} />
                            <Text style={styles.adress}>edit address</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.noteslink}>
                            <Image source={note} style={{width: '30%', height: '90%'}} />
                            <Text style={styles.adress}>add note</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.coffeview}>
                        <View style={styles.coffephotoview}>
                            <Image source={{ uri: `${baseURL}${productData.coffephoto}.png` }}  style={{width: '100%', height: '100%',borderRadius:7}} />
                        </View>
                        <View style={styles.middleview}>
                            <Text style={{fontWeight: '900', fontSize: 16}}>{productData.coffename}</Text>
                            <Text style={{fontSize: 13, fontWeight: '800', color: 'rgb(99, 91, 77)'}}>{productData.coffekind}</Text>
                        </View>


                        <View style={styles.quantity}>
                            <TouchableOpacity style={styles.reduce} onPress={handleReduce}>
                                <Text style={{fontWeight: '800'}}>-</Text>
                            </TouchableOpacity>
                            <View style={styles.number}>
                                <Text style={{fontWeight: '800'}}>{Number}</Text>
                            </View>
                            <TouchableOpacity style={styles.add} onPress={handleAdd}>
                                <Text style={{fontWeight: '800'}}>+</Text>
                            </TouchableOpacity>
                        </View>



                    </View>
                    <View style={styles.discount}>
                        <View style={styles.firstdiscount}>
                            <Image source={discount} style={{width: '50%', height: '80%'}} />
                        </View>
                        <View style={styles.seconddiscount}>
                            <Text style={{fontWeight: '800',fontSize:12}}>1 discount is applied</Text>
                        </View>
                        <TouchableOpacity style={styles.thirddiscount}>
                            <Text style={{fontWeight: '800'}}>{next}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.payment}>
                        <View style={styles.paymentheading}>
                            <Text style={{fontWeight: '700', fontSize: 17}}>Payment details</Text>
                        </View>
                        <View style={styles.price1}>
                            <View style={styles.pricetext}>
                                <Text style={{fontWeight: '700'}}>price</Text>
                            </View>
                            <View style={styles.pricecontent}>
                                <Text style={{fontWeight: '600'}}>{(productData.price)*Number}$</Text>
                            </View>
                        </View>
                        <View style={styles.price}>
                            <View style={styles.pricetext2}>
                                <Text style={{fontWeight: '700'}}>delivery fee</Text>
                            </View>
                            <View style={styles.deliverycontent}>
                                <Text style={{fontWeight: '600', textDecorationLine: 'line-through'}}>2.1$</Text>
                                <Text style={{fontWeight: '600'}}>1.0$</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.wallet}>
                        <View style={styles.walletimage}>
                            <Image source={wallet} style={{width: '50%', height: '50%'}} />
                        </View>
                        <View style={styles.middlewallet}>
                            <View style={styles.wallettype}>
                                <Text style={{fontWeight:'900',color:'grey'}}>Balance</Text>
                            </View>
                            <View style={styles.wallettype}>
                                <Text style={{fontWeight: '700', color: 'rgb(228, 151, 18)'}}>${userData.balance}.00</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.ordersubmit}>
                        <TouchableOpacity style={styles.touchable} onPress={fetchAndSubmitOrder}>
                            <Text style={{fontWeight: '800', color: 'white', fontSize: 17}}>
                                Order 
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
            </View>
           </View>
          </View>
          
            <View style={styles.footer}>
                <Footer />
            </View>
        </>
    );
}  
export default Order;
