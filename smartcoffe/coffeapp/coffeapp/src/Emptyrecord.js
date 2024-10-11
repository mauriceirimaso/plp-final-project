import styles from './Emptyrecordcss';
import history from '../assets/emptyphotoes/history.png';
import order from '../assets/emptyphotoes/orders.png'


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



function Emptyrecord(props)
{
    const imagename=props.photo;
    
  return(<>
           <View style={styles.grandview}>
               <Image style={styles.coverphoto} source={imagename}/>
           </View>
     </>)
}
export default Emptyrecord