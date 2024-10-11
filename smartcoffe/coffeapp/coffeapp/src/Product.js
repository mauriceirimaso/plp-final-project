import styles from './Homecss';
import Order from './Order';

import star from '../assets/icons/rating.png';
import { useNavigation } from '@react-navigation/native';





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


     
function Production(props)
{
   const imagepath=`../assets/productimages/${props.photo}.png`
   const navigation = useNavigation();
   let getid=props.id;
   console.log("product id",getid)


   return(<>
          <View style={styles.coffeproduct}>
           
             <View style={styles.imageview}>
               <View style={styles.rateus}>
                  <View style={styles.rateusicon}>
                   <Image source={star} style={{width:'100%',height:'100%'}}></Image>
                  </View>
                  <View style={styles.rateusicon}>
                       <Text style={{fontSize:12,color:'white',fontWeight:'900',marginTop:5}}>{props.rating}</Text>
                  </View>
               </View>
                <Image source={{uri:props.photo}} style={{borderRadius:20,width:'100%',height:'100%'}}></Image> 
                
             </View>
            
             <View style={styles.imagedescr}>
                <Text style={styles.coffeproductword}>{props.coffename}</Text>
                <Text style={styles.lowtext}>{props.status}</Text>
             </View>
             <View style={styles.price}>
                <View style={styles.dollars}>
                  <Text style={styles.dollarstext}>$ {props.price}</Text>
                </View> 

                <TouchableOpacity style={styles.addsign} onPress={() => navigation.navigate('Order',{ productId: getid })}>
                 <View style={{}}>
                  
                     <Text style={styles.addsigntext}>+</Text>
                  
                 </View>
                </TouchableOpacity>  
                           
             </View>
          </View>

          </>)
}
export default Production

