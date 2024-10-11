import React from 'react';
import styles from './Homecss';
import { useState,useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import searchicon from '../assets/icons/search.png';
import searchsubmit from '../assets/icons/searchsubmit.png';
import promo from '../assets/coffephotoes/promobackground.png';
import Production from '../src/Product';
import Scroll from  '../src/Scroll';
import Footer from './Footer';
import Order from './Order';
import Profile from './Profile';
import axios from 'axios';








import coffephoto1 from '../assets/productimages/coffe1.png';
import coffephoto2 from '../assets/productimages/coffe2.png';
import coffephoto3 from '../assets/productimages/coffe3.png';
import coffephoto4 from '../assets/productimages/coffe4.png';




import { 
    SafeAreaView,
    Text, 
    View ,
    
    StatusBar,
    StyleSheet,
    ImageBackground,
    Dimensions,
    TextInput,
    ScrollView,
    FlatList,
    Button,
    Image,
    TouchableOpacity,
  
     } from 'react-native';



 function Home()
{
    

  

     const [activeLink, setActiveLink] = useState('allcoffee'); 
     const [coffeData, setCoffeData] = useState([]);
     const baseURL = 'http://127.0.0.1:8000';
 

     const fetchCoffeData = async (coffeType = 'All-Coffe') => {
      try {
        const response = await axios.get(`${baseURL}/AllCoffe/?coffetype=${coffeType}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setCoffeData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
  
    
    useEffect(() => {
      fetchCoffeData(); 
    }, []);


    const renderCoffeRows = () => {
      const rows = [];
  
      for (let i = 0; i < coffeData.length; i += 2) {


        const id1 = coffeData[i]?.id;
        const id2 = coffeData[i + 1]?.id;

        console.log(`ID for coffeData[${i}]: `, id1); 
        if (id2) {
        console.log(`ID for coffeData[${i + 1}]: `, id2); 
        }
        
             const image1Url = `${baseURL}${coffeData[i]?.coffephoto}.png`.trim();
             const image2Url = coffeData[i + 1] ? `${baseURL}${coffeData[i + 1]?.coffephoto}.png`.trim() : null;
  
        
        console.log(`Image URL for coffeData[${i}]: `, image1Url);
        if (image2Url) {
          console.log(`Image URL for coffeData[${i + 1}]: `, image2Url);
        }
  
        rows.push(
          <View style={styles.twocont} key={i}>
            <Production
              rating={coffeData[i]?.rating}
              coffename={coffeData[i]?.coffename}
              status={coffeData[i]?.coffekind} 
              price={coffeData[i]?.price}
              photo={image1Url} 
              id={id1}
              
            />
            {coffeData[i + 1] && (
              <Production
                id={id2}
                rating={coffeData[i + 1]?.rating}
                coffename={coffeData[i + 1]?.coffename}
                status={coffeData[i + 1]?.coffekind} 
                price={coffeData[i + 1]?.price}
                photo={image2Url} 
              />
            )}
          </View>
        );
      }
      return rows;
    };

    

  return (
       <>
        <StatusBar barStyle="light-content" backgroundColor={'rgb(28, 27, 27)'}  />

       <View style={styles.homeview}>
           <View style={styles.upperhome}>
               <View style={styles.location}>
                   <Text style={styles.locationpara}>location</Text>

                    <View style={styles.pickercontainer}>
                         <RNPickerSelect onValueChange={(value)=>(NaN)}
                            items={[
                            {label:'kigali,rwanda',value:'Kigali,rwanda'},
                            {label:'Kampala,uganda',value:'Kampala,uganda'},
                            {label:'bujumbura,Burundi',value:'bujumbura,Burundi'},
                            {label:'Nairobi,kenya',value:'Nairobi,kenya'},
                            {label:'Accra,Ghana',value:'Accra,Ghana'},
                            {label:'Gitega,Bujumbura',value:'Gitega,Bujumbura'},
                             ]}
                             value='Kigali,rwanda'
                           style={{
                            inputAndroid:styles.picker,
                            iconContainer:{
                              color:'white',
                              display:'none',
                            },
                            
                            
                           }}
                           
                       />
                    </View>
                    
               </View>  
               <View style={styles.searchbox}>
                  <View style={styles.searchicon}>
                    <Image source={searchicon} style={styles.searchiconphoto}/>
                  </View>
                  <View style={styles.searchinput}>
                     <TextInput placeholder='search coffe' placeholderTextColor='rgb(172, 168, 168)' style={styles.searchpara}/>
                  </View>
                  <View style={styles.lastview}>
                    <TouchableOpacity>
                      <Image source={searchsubmit} style={{width:'100%',height:'100%',borderRadius:9}}/>
                    </TouchableOpacity>
                  </View>
                    
                </View> 
                <View style={styles.crossview}>
                     
                  <Image source={promo} style={{width:'100%',height:'100%',borderRadius:20}}></Image>
                     
                 </View> 

                 <View style={styles.navbar}>
      <TouchableOpacity
        style={[
          { width: '25%' },
          activeLink === 'allcoffee' && { backgroundColor: 'rgb(225, 171, 70)' },
        ]}
        onPress={() => { setActiveLink('allcoffee'); fetchCoffeData('All-Coffe'); }}
      >
        <View style={styles.coffelinks}>
          <Text
            style={[
              { textAlign: 'center', fontWeight: 'bold' },
              activeLink === 'allcoffee' && { color: 'white' },
            ]}
          >
            all coffee
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          { width: '25%' },
          activeLink === 'machiato' && { backgroundColor: 'rgb(225, 171, 70)' },
        ]}
          onPress={() => { setActiveLink('machiato'); fetchCoffeData('Machiato'); }}
      >
        <View style={styles.coffelinks}>
          <Text
            style={[
              { textAlign: 'center', fontWeight: 'bold' },
              activeLink === 'machiato' && { color: 'white' },
            ]}
          >
            machiato
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          { width: '25%' },
          activeLink === 'latte' && { backgroundColor: 'rgb(225, 171, 70)' },
        ]}
        onPress={() => { setActiveLink('latte'); fetchCoffeData('Latte'); }}
      >
        <View style={styles.coffelinks}>
          <Text
            style={[
              { textAlign: 'center', fontWeight: 'bold' },
              activeLink === 'latte' && { color: 'white' },
            ]}
          >
            latte
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          { width: '25%' },
          activeLink === 'american' && { backgroundColor: 'rgb(225, 171, 70)' },
        ]}
           onPress={() => { setActiveLink('american'); fetchCoffeData('American'); }}
      >
        <View style={styles.coffelinks}>
          <Text
            style={[
              { textAlign: 'center', fontWeight: 'bold' },
              activeLink === 'american' && { color: 'white' },
            ]}
          >
            american
          </Text>
        </View>
      </TouchableOpacity>
    </View>
                
             
                
                 
                 
                    
                
              
                
    <View style={styles.bodyview}>

    
     
          {renderCoffeRows()}
      
      
        
    
    </View>
                  
                


                 <View style={styles.footer}>
                   <Footer/>      
                 </View>
                
           </View>
           
           
       </View>
         
       </>
  )
}

export default Home