
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import styles from './src/style';
import backgroundimage from './assets/coffephotoes/background.png';
import Home from './src/Home';
import Order from './src/Order';
import Profile from './src/Profile';
import Settings from './src/Settings';
import Trade from './src/Trade';
import Login from './src/Login';
import Signup from './src/Signup';
import Done from  './src/Done';

import { 
  SafeAreaView,
  Text, 
  View ,
  ImageBackground,
  Dimensions,
  Button,
  TouchableOpacity,

   } from 'react-native';

   const Stack = createStackNavigator();

   export default function app()
   {
    const {height,width}=Dimensions.get('window');
     return(<>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Main">
                  <Stack.Screen name="Main" component={Mainscreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}  />
                  <Stack.Screen name="Order" component={Order} options={{ headerShown: false }}  />
                  <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}  />
                  <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}  />
                  <Stack.Screen name="Trade" component={Trade} options={{ headerShown: false }}  />
                  <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}  />
                  <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}  />
                  <Stack.Screen name="Done" component={Done} options={{ headerShown: false }}  />

              </Stack.Navigator>
            </NavigationContainer>
           </>)
   }



function Mainscreen({navigation})
 {

  

  return (
        <>
          <View style={styles.fullview}>
           <View style={styles.imagecontainer}>
             <ImageBackground source={backgroundimage}  resizeMode='cover' style={styles.imgcontainer}>
               <View style={styles.textcontainer}>
                  <Text style={styles.bodytext}>
                     Fall In Love With 
                  </Text>
                  <Text  style={{color:'white',fontSize:35,fontWeight:'bold',marginLeft:'12%',top:'0'}}>
                     Coffe in Blissfull 
                  </Text>
                  <Text style={{color:'white',fontSize:35,marginLeft:'30%',fontWeight:'bold'}}>
                      Delight !
                   </Text>
               </View>

             </ImageBackground>
           </View>
           <View style={styles.lowerdiv}>
                <View style={styles.descript}>
                    <Text style={styles.lowertext}>welcome  to our cozzy coffee corner where </Text>
                    <Text style={{color:'rgb(164, 155, 155)',marginLeft:'20%'}}>everycup  is delightfull for you</Text>
                </View>
                <View style={styles.lowerlink}>

                      <TouchableOpacity style={styles.lowerbutton}   onPress={()=>navigation.navigate('Home')}>
                             <Text style={{color:'white',textAlign:'center',fontWeight:'bold',fontSize:17}}>Get started</Text>
                      </TouchableOpacity>
                      
                </View>
           </View>
          </View>
           
        </>
  );
}


