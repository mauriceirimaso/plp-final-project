 import styles from './Tradecss';
 import { useState } from 'react';
 import axios from 'axios';
 import { handleCancelOrder } from './handlefunctions/Cancelorder';


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

function Package(props)
{

    const {name,title,time,color,id,cost,image,date,coffeid,status}=props
    let getname=name;
    let gettitle=title;
    let getid=id;
    let getstatus=status;
    let getimage=image;
    let getcost=cost;
    let getdate=date;
    let getcolor=color;
    let getcoffeid=coffeid;
    let gettime=time;
    const [orderData, setOrderData] = useState(null);

   
    
    
   return(<>
          <View style={styles.package}>
                                    <View style={styles.type}>
                                          <Text style={{color:'rgb(123, 121, 119)',fontWeight:'700'}}>{getname}</Text>
                                          <Text style={{color:`${getcolor}`,marginLeft:'4%',fontWeight:'800'}}>{getstatus}</Text>
                                    </View>
                                    
                                    <View style={styles.content}>
                                        <View style={styles.contentphoto}>
                                             <Image source={{uri:getimage}} style={{width:'70%',height:'70%',borderRadius:9}}/>
                                        </View>
                                        <View style={styles.restcontent}>
                                             <View style={styles.restheading}>
                                                 <Text style={{fontWeight:'800',fontSize:12}}>{gettitle}</Text>
                                                 <Text style={{fontWeight:'800',color:'rgb(123, 121, 119)'}}>{getid}</Text>
                                             </View>
                                             <View style={styles.restheading}>
                                                  <Text style={{fontWeight:'800',fontSize:12}}>{getcost}</Text>
                                                   <Text style={{fontSize:12}}>{getdate} .{gettime}</Text>
                                             </View>
                                        </View>
                                    </View>


                                    <View style={styles.contentlinks}>
                                        <TouchableOpacity style={styles.trackorder2}> 
                                           <Text style={{fontWeight:'750'}}>Track order</Text>
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity onPress={() => handleCancelOrder(getcoffeid)}  style={styles.trackorder}>
                                            <Text style={{fontWeight:'750'}}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                            </View>
        </>)
}
export default Package