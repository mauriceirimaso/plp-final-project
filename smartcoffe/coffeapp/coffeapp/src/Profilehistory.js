import styles from './Profilecss';
import pen from '../assets/profileicons/pen.png';
import coffephoto1 from '../assets/productimages/coffe1.png';
import coffephoto2 from '../assets/productimages/coffe2.png';
import date1 from '../assets/profileicons/blackdate.png';

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

function Profilehistory(props)
{

    const {image,title,ordertype,orderid,ordertext,orderstatus,date,hour}=props
    let gettitle=title;
    let getordertext=ordertext;
    let getdate=`${date}  ${hour}`;
    let getimage=`http://192.168.140.72:8000${image}.png`;
    return(<>
              <TouchableOpacity style={styles.recent}>
                        <View style={styles.recentphoto}>
                             <Image source={{uri:getimage}} style={{width:'60%',height:'60%',borderRadius:12}}/>  
                        </View>
                        <View style={styles.recenthistory}>
                           <Text style={{fontWeight:'900',marginLeft:'2%'}}>{gettitle}</Text>
                           <Text style={{color:'hsl(60, 1%, 24%)',fontWeight:'800',marginLeft:'2%',fontSize:12}}>{getordertext}</Text>
                           <View style={styles.innerview}>
                              <Image source={date1}/>
                              <Text style={{fontWeight:'800',color:'hsl(60, 2%, 12%)'}}>{getdate}</Text>
                           </View>
                        </View>
                        
                </TouchableOpacity>
         </>)
}
export default Profilehistory