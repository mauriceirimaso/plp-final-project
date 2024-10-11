import styles from './Profilecss'


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
function Purchase(props)
{
    const {display,image,activity}=props;
    const getimage=image;
    const getactivity=activity;
    const getdisplay=display

   return(<>
           <TouchableOpacity style={styles.purchasecontent}>
                            <Image style={{width:'40%',height:'40%',}} source={getimage}/>
                            <View style={{borderWidth:1,
                                    borderColor:'red',
                                    width:'10%',
                                    height:'13%',
                                    
                                    marginLeft:'40%',
                                     marginTop:'-30%',
                                     backgroundColor:'red',
                                      borderRadius:50,}}/>
                            <Text style={{fontSize:12,marginTop:20,fontWeight:'700'}}>{getactivity}</Text>
                         </TouchableOpacity>
      </>)
}
export default Purchase