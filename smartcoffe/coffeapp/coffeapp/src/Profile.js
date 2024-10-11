import styles  from './Profilecss';
import profilephoto from '../assets/profileicons/profilephoto.png';
import gold  from '../assets/profileicons/gold.png';
import wallet from '../assets/profileicons/wallet.png';
import pen from '../assets/profileicons/pen.png';
import purchase1 from '../assets/profileicons/purchase.png';






import shop from '../assets/purchaseicons/shop.png'



import newwallet from '../assets/purchaseicons/pay.png';
import blackwallet from '../assets/profileicons/blackwallet.png';
import blackshop from '../assets/profileicons/blackshop.png';
import date from '../assets/profileicons/date.png';
import receive from '../assets/purchaseicons/receive.png';
import logout from '../assets/profileicons/logout.png';
import rate from '../assets/purchaseicons/rate.png';
import settings from '../assets/profileicons/settings.png';
import notification from '../assets/profileicons/notification.png';
import help from '../assets/profileicons/help.png';


import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import axios from 'axios';



import coffephoto1 from '../assets/productimages/coffe1.png';
import coffephoto2 from '../assets/productimages/coffe2.png';

import { 
    SafeAreaView,
    Text, 
    Image,
    View ,
    ImageBackground,
    Dimensions,
    Button,
    TouchableOpacity,
    ActivityIndicator,
  
     } from 'react-native';
import Footer from './Footer';
import Purchase from './Purchase';
import Profilehistory from './Profilehistory';


function Profile()
{


   const [userData, setUserData] = useState({
      fullnames: '',
      balance: '',
      profilephoto: '',
      membership: ''
   });
   const [notifications, setNotifications] = useState([]);

  

   useEffect(() => {
      const fetchUserNotification = async () => {
        try {
          const notiResponse = await fetch('http://127.0.0.1:8000/api/notifications/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await notiResponse.json();
  
          if (notiResponse.ok) {
            setNotifications(data); 
          } else {
            console.error('Error fetching user notification:', data.error);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchUserNotification();
    }, []);



   useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/getuserdetails/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          const data = await response.json();
  
          if (response.ok) {
            setUserData({
              fullnames: data.fullnames,
              profilephoto: `http://127.0.0.1:8000${data.profilephoto}`,  
              membership: data.membership,
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
  
    console.log("userdata:",userData)

    const dot='.'
    const purchase='View purchase History >';
    const navigation = useNavigation();
  return(<>
       <View style={styles.grandview}>
           <View style={styles.blackview}>

           <View style={styles.account}>
                 <View style={styles.accountphoto}>
                    <Image source={profilephoto} style={{width:'90%',height:'90%'}}/>
                 </View>
                 <View style={styles.accounttext}>
                    <Text style={{color:'white',fontWeight:'800',fontSize:18}}>Account</Text>
                 </View>
           </View>

              <View style={styles.crossview}>
                <View style={styles.profileview}>
                    <View style={styles.profilepart}>
                       <View style={styles.photo}>
                            <Image source={{ uri: userData.profilephoto }}  style={{width:'50%',height:'50%'}} />
                       </View>
                       <TouchableOpacity style={styles.changephoto}>
                           <Image source={pen} style={{width:'80%',height:'80%'}}/>   
                       </TouchableOpacity>
                       <View style={styles.bio}>

                          <Text style={{fontSize:12,fontWeight:'800'}}>{userData.fullnames}</Text>
                          
                          <View style={styles.biographview}>
                             <Image source={gold} style={{width:'20%',height:'100%'}}/>
                             <Text style={{fontSize:11,color:'hsl(0, 1%, 62%)',fontWeight:'700'}}>{userData.membership}</Text>
                          </View>
                       </View>
                    </View>
                    <View style={styles.profilepart2}>
                         <View style={styles.wallet}>
                              <Image  source={wallet} style={{marginTop:'20%'}}/>
                              <View style={styles.money}>
                                 <Text style={{fontWeight:'600',marginTop:'1%'}}>Balance</Text>
                                 <Text style={{ color:'hsl(34, 86%, 46%)',fontWeight:'800',marginLeft:'10%'}}>$ {userData.balance}.00</Text>
                              </View>
                         </View>
                    </View>
                </View>
                
                

                 <View style={styles.lowerprofile}>
                      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.purchase1}>
                         <Text style={{fontSize:13,fontWeight:'800'}}>purchase</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.purchase}>
                         <Text style={{fontSize:13,fontWeight:'800'}}>edit </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.purchase}>
                      <Text style={{fontSize:13,fontWeight:'800'}}>deposit</Text>
                      </TouchableOpacity>
                  </View>
                
              </View>



              
              
           </View>
           <View style={styles.scrollview}>


                <View style={styles.mypurchase}>
                     <View style={styles.purchaseheading}>
                         <Image style={{height:'60%',marginLeft:18}} source={purchase1}/>
                          <Text style={{fontWeight:'800',marginLeft:'2%'}}>My Purchase</Text>
                          <TouchableOpacity style={styles.purchaselink}>
                             <Text style={{fontWeight:'700',fontSize:11,marginRight:17}}>{purchase}</Text>
                          </TouchableOpacity>
                      </View>

                      <View style={styles.secondpurchase}>
                         <Purchase dispay='' image={newwallet} activity='to pay'/>
                         <Purchase dispay='none' image={shop} activity='to shop'/>
                         <Purchase dispay='' image={receive} activity='receive'/>
                         <Purchase dispay='none' image={rate} activity='to rate'/>
                      </View>
                      
                </View>
          
                <View style={styles.notification}>
                    <View style={styles.notificationheading}>
                        <Text style={{color:'black',fontWeight:'800',marginLeft:'4%'}}>Notifications</Text>
                        <Image style={{marginLeft:'63%'}} source={notification}/>
                    </View>
                    <View style={styles.recentview}>
                       {notifications.map((notification) => {
                           const { notitype, notiphoto, date, time, notid,id } = notification;
                           if (notitype === 'order') {
                             return (
                              <Profilehistory
                               key={notification.id}
                               title={notification.notitype}
                               ordertext={`The ${notitype} payment of your order: ${notification.notiid} has been approved`}
                               image={notiphoto}
                               date={date}
                               hour={time}
                               />
                                );
                              } else if (notitype === 're-order') {
                                 return (
                            <Profilehistory
                               key={id}
                               title={notitype}
                               ordertext={`The ${notitype} payment of your order ${notid} has been approved`}
                               image={notiphoto}
                               date={date}
                               hour={time}
                               />
                               );
                              } else if (notitype === 'cancelled') {
                             return (
                         <Profilehistory
                                key={id}
                                title={notitype}
                                ordertext={`The ${notitype} order ${notid} has been cancelled`}
                                image={notiphoto}
                                date={date}
                                hour={time}
                               />
                              );
                            } else {
                            return null; 
                               }
                             })}
                      
                      
                     </View>
                </View>

                <View style={styles.more}>
                    <View style={styles.innerabout}>
                         <TouchableOpacity   onPress={() => navigation.navigate('Settings')} style={{width:'30%',height:'100%',flexDirection:'row',borderColor:'red',alignItems:'center',justifyContent:'center'}}>
                            <Image source={settings} style={{width:'20%',height:'100%'}}/>
                            <Text style={{fontSize:11,fontWeight:'700',marginLeft:'3%'}}>profile settings</Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={{width:'30%',height:'100%',flexDirection:'row',borderColor:'red',alignItems:'center',justifyContent:'center'}}>
                            <Image source={help} style={{width:'20%',height:'100%'}}/>
                            <Text style={{fontSize:11,fontWeight:'700',marginLeft:'3%'}}>help  center</Text>
                         </TouchableOpacity>
                         <TouchableOpacity  onPress={() => navigation.navigate('Login')}  style={{width:'30%',height:'100%',flexDirection:'row',borderColor:'red',alignItems:'center',justifyContent:'center'}}>
                            <Image source={logout} style={{width:'20%',height:'100%'}}/>
                            <Text style={{fontSize:11,fontWeight:'700',marginLeft:'3%'}}>Logout</Text>
                         </TouchableOpacity>
                    </View>
                </View>
           </View>
           
       </View>
       <View style={styles.footer}>
             <Footer/>
        </View>


        </>)
}
export default Profile