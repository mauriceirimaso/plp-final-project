import styles from './Settingscss';
import settingsphoto from '../assets/profileicons/settings.png';
import search from '../assets/settingsicon/search.png';
import search2 from '../assets/settingsicon/searchsubmit.png';
import profilephoto from '../assets/settingsicon/profilephoto.png';
import gold from '../assets/settingsicon/gold.png';
import profile from '../assets/settingsicon/smallicons/profile.png';
import password from '../assets/settingsicon/smallicons/password.png';
import deposit from '../assets/settingsicon/smallicons/deposit.png';
import notification from '../assets/settingsicon/smallicons/notification.png';
import about from '../assets/settingsicon/smallicons/about.png';
import privacy from '../assets/settingsicon/smallicons/privacy.png';
import socials from '../assets/settingsicon/smallicons/socials.png';
import logout from '../assets/settingsicon/smallicons/logout.png';

import twitter from '../assets/settingsicon/twitter.png';
import apple from '../assets/settingsicon/apple.png';


import { useState,useEffect } from 'react';



import google from '../assets/settingsicon/google.png';

import watsapp from '../assets/settingsicon/smallicons/watsapp.png';



import Footer from './Footer.js';


import { 
    SafeAreaView,
    Text, 
    Image,
    View ,
    ImageBackground,
    TextInput,
    Dimensions,
    StatusBar,
    Button,
    TouchableOpacity,
    Switch,
  
     } from 'react-native';

     

     function Settings()
     {


          const [userDetails, setUserDetails] = useState(null);
          
      
          const baseurl = 'http://127.0.0.1:8000';
      
          useEffect(() => {
            const fetchUserDetails = async () => {
              try {
                const response = await fetch(`${baseurl}/api/getuserdetails/`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                const result = await response.json();
                console.log('Fetched user details:', result);
                setUserDetails(result);
              } catch (error) {
                console.error('Error fetching user details:', error);
              }
            };
        
            fetchUserDetails();
          }, []);



        const next='>';
      return(<>
          <StatusBar barStyle="light-content" backgroundColor={'rgb(28, 27, 27)'}  />
            <View style={styles.grandview}>
                 <View style={styles.blackview}>
                     <View style={styles.settings}>
                            <View style={styles.settingicon}>
                               <Image style={{width:'70%',height:'70%'}} source={settingsphoto}/>
                            </View>
                            <View style={styles.settingtext}>
                                      <Text style={{fontWeight:'800',color:'white'}}>Settings</Text>
                            </View>
                     </View>
                     <View style={styles.searchview}>
                         <View style={styles.searchicon}>
                            <Image style={{width:'60%',height:'60%'}} source={search}/>
                         </View>
                         <TextInput placeholder='search' placeholderTextColor='rgb(172, 168, 168)' style={styles.input}/>
                         <TouchableOpacity style={styles.searchsubmit}>
                              <Image style={{width:'100%',height:'100%',borderRadius:8}} source={search2}/>
                         </TouchableOpacity>
                     </View>

                     <View style={styles.settingsview}>
                          <View style={styles.profiledata}>
                               <View style={styles.profilepicture}>
                                  <Image style={{width:'70%',height:'85%'}} source={{uri:`${baseurl}${userDetails?.profilephoto}`}}/>
                               </View>

                               <View style={styles.profilename}>
                                      <Text style={{fontWeight:'900'}}>{userDetails?.fullnames}</Text>
                                      <View style={styles.horizontal}>
                                        <Image style={{width:'10%',height:'100%'}} source={gold}/>
                                        <Text style={{color:'rgb(91, 88, 88)',fontWeight:'800',fontSize:10}}>{userDetails?.membership}</Text>
                                      </View>
                               </View>
                          </View>



                          <View style={styles.lowersettings}>
                          <View style={styles.settingpara}>
                             <Text style={{color:'rgb(91, 88, 88)',fontWeight:'800',fontSize:14,marginLeft:'5%'}}>Account Settings</Text>
                          </View>


                          <View style={styles.links}>
                                <TouchableOpacity style={styles.addlink}>
                                     <View style={styles.linkp}>
                                          <Text style={{fontWeight:'500'}}>edit profile</Text>
                                     </View>
                                     <View style={styles.linksign}>
                                           <Image source={profile}/>
                                     </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.addlink}>
                                     <View style={styles.linkp}>
                                          <Text style={{fontWeight:'500'}}>change password</Text>
                                     </View>
                                     <View style={styles.linksign}>
                                           <Image source={password}/>
                                     </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.addlink}>
                                     <View style={styles.linkp}>
                                          <Text style={{fontWeight:'500'}}>add deposit method</Text>
                                     </View>
                                     <View style={styles.linksign}>
                                           <Image source={deposit}/>
                                     </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.addlink}>
                                     <View style={styles.linkp}>
                                          <Text  style={{fontWeight:'500'}}>push notification</Text>
                                     </View>
                                     <View style={styles.linksign}>
                                           <Image source={notification}/>
                                           <Text style={{color:'red',fontWeight:'900',marginTop:'-90%',marginLeft:'30%'}}>2</Text>
                                     </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.addlink}>
                                     <View style={{width:'80%',borderColor:'red'}}>
                                          <Text  style={{fontWeight:'500'}}>dark mode </Text>
                                     </View>
                                     <View style={{width:'20%',borderColor:'red',justifyContent:'center',alignItems:'center',marginLeft:'2%'}}>
                                           <Switch style={{color:'black'}}/>
                                     </View>
                                </TouchableOpacity>
                            </View>
                          </View>



                          <View style={styles.moresettings}>
                              <View>
                                  <Text style={{color:'rgb(91, 88, 88)',fontWeight:'900',marginLeft:'5%'}}>More</Text>
                             </View>
                             <View style={{height:'100%',marginLeft:'5%',marginTop:'5%'}} >
                                <TouchableOpacity style={styles.addlink2}>
                                     <View style={styles.linkp}>
                                          <Text  style={{fontWeight:'500'}}>about us </Text>
                                     </View>
                                     <View style={styles.linksign}>
                                           <Image source={about}/>
                                     </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.addlink2}>
                                     <View style={styles.linkp}>
                                          <Text  style={{fontWeight:'500'}}>privacy & policies </Text>
                                     </View>
                                     <View style={styles.linksign}>
                                          <Image source={privacy}/>
                                     </View>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.addlink2}>
                                     <View style={styles.linkp}>
                                          <Text  style={{fontWeight:'500'}}>our socials</Text>
                                     </View>
                                     <View style={styles.linksign}>
                                          <Image source={socials}/>
                                     </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.addlink2} >
                                     <View style={styles.linkp}>
                                          <Text  style={{fontWeight:'500'}}>logout</Text>
                                     </View>
                                     <View style={styles.linksign}>
                                           <Image source={logout}/>
                                     </View>
                                </TouchableOpacity>
                                </View>
                          </View>

                     </View>
                     
                 <View style={styles.socialsview}>
                      
                    <View style={styles.lowersocial}>
                      <TouchableOpacity style={styles.media}>
                          <Image source={apple}/>
                      </TouchableOpacity>
                      

                      <TouchableOpacity style={styles.media1}>
                          <Image style={{width:'80%',height:'80%'}} source={twitter}/>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.media}>
                          <Image source={google}/>
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
    export default Settings