import styles from './Homecss';
import  home from '../assets/icons/home.png';
import  notification from '../assets/icons/notification.png';
import  wallet from '../assets/icons/wallet.png';
import  favourite from '../assets/icons/heart.png';
import { useNavigation } from '@react-navigation/native';

import profile from '../assets/footericons/account.png'
import order from '../assets/footericons/orders.png'
import settings from '../assets/footericons/settings.png'

import star from '../assets/icons/rating.png';

import { 
    SafeAreaView,
    Text, 
    Image,
    View ,
    ImageBackground,
    Dimensions,
    Button,
    TouchableOpacity,
  
     } from 'react-native';

     function Footer()
     {
      const navigation = useNavigation();
        return(<>
               <View style={styles.lowerlink}>
                       <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:'100%',height:'100%',}} onPress={() => navigation.navigate('Home')}>
                        <Image source={home} style={{justifyContent:'center',alignItems:'center',width:'25%',height:'80%'}} ></Image>
                       </TouchableOpacity>   
                     </View>
                     <View style={styles.lowerlink}>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:'114%',height:'80%'}} onPress={() => navigation.navigate('Trade')} >
                             <Image source={order} style={{width:'27%',height:'95%',}} ></Image>
                       </TouchableOpacity>
                     </View>
                     
                    
                     <View style={styles.lowerlink}>
                         <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:'100%',height:'130%'}} onPress={() => navigation.navigate('Settings')}>
                              <Image source={settings} style={{width:'30%',height:'57%'}} ></Image>
                         </TouchableOpacity>  
                     </View>
                     <View style={styles.lowerlink}>
                       <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:'120%',height:'80%'}} onPress={() => navigation.navigate('Profile')}>
                         <Image source={profile} style={{width:'27%',height:'95%'}} ></Image>
                       </TouchableOpacity> 
                     </View>
              </>)
     }
     export default Footer