
import styles  from './Donecss';
import Footer from './Footer';
import emojiimage from '../assets/ordericons/note.png';
import doneimage from '../assets/newordericons/done.png'
import Trade from './Trade';
import  Home from './Home';

import { useNavigation } from '@react-navigation/native';


import axios from 'axios';


import { useState,useEffect } from 'react';


import { 
    SafeAreaView,
    Text, 
    Image,
    View,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';


const Done=()=>
 {
     
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('viewOrders');

    const handleViewOrders = () => {
        setActiveButton('viewOrders'); 
    };

    const handleContinueShopping = () => {
        setActiveButton('continueShopping'); 
    };

    
    return (
        <>
     <StatusBar barStyle="light-content" backgroundColor={'rgb(28, 27, 27)'} />
          
       <View style={styles.grandcontainer}>

            <View style={styles.blackview}>
              
            </View>
            <View style={styles.lowerview}>
                   <View style={styles.successphoto}>
                     <Image source={doneimage} style={styles.donephoto}/>
                   </View>
                   <View style={styles.donetext}>
                      <Text style={{color:'green',fontWeight:'800',fontSize:16}}>Order Placed Successfully</Text>
                   </View>
                   <View style={styles.lowerdone}>
                      <Text style={styles.lowertext}>our coffeshop will call you to confirm the </Text>
                      <Text style={styles.secondtext}>coffe from your prescription</Text>
                   </View>
                   <View style={styles.opacities}>
                     <TouchableOpacity     style={[ activeButton === 'viewOrders' ? styles.activeButton : styles.ordersubmit]} onPress={() => {  handleViewOrders();   navigation.navigate('Trade')   }} >
      
       
   
                          <Text style={[activeButton === 'viewOrders' ? styles.activeText : styles.opacitytext]}>  View Orders </Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={[ activeButton === 'continueShopping' ? styles.activeButton : styles.ordersubmit]}    onPress={() => { handleContinueShopping();   navigation.navigate('Home')   }}>
                           <Text style={[activeButton === 'continueShopping' ? styles.activeText : styles.opacitytext, ]}>Continue Shopping</Text>
                     </TouchableOpacity>
                
                </View>
                    
            </View>

       </View>  
       <View style={styles.footer}>
          <Footer/>
       </View>     
         
        </>
    );
}  
export default Done;
