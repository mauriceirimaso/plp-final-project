import styles from './Tradecss';
import { handleReorder } from './handlefunctions/Reorder';


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

function History(props)
{

    const {name,title,color,id,cost,image,date,coffeid,status}=props
    let getname=name;
    let gettitle=title;
    let getid=id;
    let getstatus=status;
    let getimage=image;
    let getcost=cost;
    let getdate=date;
    let getcolor=color;
    let getcoffeid=coffeid
    
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
                                                   <Text style={{fontSize:12}}>{getdate}</Text>
                                             </View>
                                        </View>
                                    </View>


                                    <View style={styles.contentlinks}>
                                        <TouchableOpacity style={styles.trackorder}> 
                                           <Text style={{fontWeight:'750'}}>rate</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity   onPress={() => handleReorder(getcoffeid)}  style={styles.trackorder2}>
                                            <Text style={{fontWeight:'750'}}>re-order</Text>
                                        </TouchableOpacity>
                                    </View>
                            </View>
        </>)
}
export default History