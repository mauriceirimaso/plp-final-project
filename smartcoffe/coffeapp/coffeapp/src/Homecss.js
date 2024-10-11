import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({

    homeview:{
       backgroundColor:'transparent',
       width:'100%',
       height:'100%',
       
       
       
    },
    upperhome:
    {
        width:'100',
        height:'30%',
        backgroundColor:'rgb(28, 27, 27)'
    },
    location:
    {
        width:'50%',
        height:'25%',
        
        marginTop:'6%',
        marginLeft:'0%'
    },
    locationpara:
    {
        color:'rgb(165, 161, 161)',
        marginLeft:'9%',
    },
    searchbox:
    {
      
      width:'90%',
      height:50,
      top:'6%',
      marginLeft:'5%',
      display:'flex',
      flexDirection:'row',
      
    },

    picker:
    {

        width:'100%',
        maxHeight:'20%',
        color:'rgb(172, 168, 168)',
        
        marginRight:'2%',
        backgroundColor:'transparent',
        paddingStart:'1000'
    },

    pickercontainer:
    {
      
      flex:1,
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      overflow:'hidden',
     
    },
    searchicon:
    {
      width:'13%',
      height:'100%',
       
       
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:'rgb(38, 37, 37)',
       borderTopLeftRadius:9,
       borderBottomLeftRadius:9,
    },
    searchpara:
    {
      color:'white',
      backgroundColor:'transparent',
      textAlign:'left',
      width:'90%',
      fontSize:16,
    },
      
    searchinput:
    {
        width:'65%',
        height:'100%',
        
        
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(38, 37, 37)',
        borderTopRightRadius:9,
        borderBottomRightRadius:9,
    },
    lastview:
    {
        
        marginLeft:15,
        flex:1,

    },
    searchiconphoto:
    {
        color:'white',
        width:'50%',
        height:'50%',
        
    },
    crossview:
    {
      
      top:'10%',
      width:'90%',
      marginLeft:'5%',
      height:115,
      borderRadius:20,
      backgroundColor:'grey',
      flexDirection:'row-reverse',
      
    },
    coffephoto:
    {
      
      width:'40%',
      height:'100%',
    },
    promodiv:
    {
       
       width:'30%',
       marginLeft:'7%',
       height:'20%',
       
       top:4,
       borderRadius:6,
       backgroundColor:'hsl(0, 76%, 64%)',
       justifyContent:'center',
       alignItems:'center',
    },
    promotext:
    {
       color:'white',
       
       verticalAlign:'center',
       top:-1.5,
       
    },
    restview:
    {
       flexDirection:'column',
       
       flex:1,
    },
    belowview:
    {
        
        height:'77%',
        top:7,
        
    },
    navbar:
    { 
       
       width:'90%',
       marginLeft:'5%',
       marginTop:50,
       height:28,
       flexDirection:'row',
    },
    linkview:
    {
      
       width:'25%'
    },
    href:
    {
       color:'black',
    },
    bodyview:
    {
       
       width:'90%',
       height:360,
       marginLeft:'5%',
      overflow:'hidden',
       
       
      
       
       
    },
    footer:
    {
      
      width:'100%',
      height:'100%',
      top:7,
      width:'90%',
      marginLeft:'5%',
      flexDirection:'row',
     
      
    },
    lowerlink:
    {
      width:'25%',
      height:37,
      
      justifyContent:'center',
      alignItems:'center',
      
      borderColor:'red',
      justifyContent:'center',
      

    },
    twocont:
    {
        width:'100%',
        height:'75%',
        
        
        flexDirection:'row',
        flexGrow:1,
        marginTop:8,
        justifyContent:'space-between',
        
        

    },
    coffeproduct:
    {
        width:'46.5%',
        height:'100%',
       
        
        
        flexDirection:'column'
    },
    imageview:
    {
        width:'100%',
        height:'60%',
        
        borderRadius:20,
        flexDirection:'row-reverse'
    },
    rateus:
    {
        position:'absolute',
        zIndex:1,
        width:50,
        marginRight:6,
        height:20,
        
        flexDirection:'row'
    },
    imagedescr:
    {
       width:'100%',
       height:'20%',
       
       
    },
    price:
    {
       width:'100%',
       height:'20%',
       
       
       flexDirection:'row',
    },
    productionimage:
    {
        width:'100%',
        height:'100%',
        borderRadius:20,
        marginTop:-20
    },
    coffeproductword:
    { 
        color:'rgb(35, 33, 33)',
        fontSize:20,
        fontWeight:'900',
        
    },
    lowtext:
    {
       
        marginBottom:2,
        color:'rgb(89, 88, 88)',
        fontWeight:'800'
    },
    dollars:
    {
        
        width:'70%',
        height:'100%',
        justifyContent:'center',
        
        textAlign:'left',
    },
    addicon:
    {
        width:'25%',
        height:'100%',
        
        backgroundColor:'rgb(215, 164, 83)',
    },
    addicon:
    {
        color:'white',
        
    },
    addsign:
    {
     
     
     width:'30%',
     backgroundColor:'rgb(225, 171, 70)',
     justifyContent:'center',
     alignItems:'center',
     borderRadius:6
    },
    addsigntext:
    {
      color:'white',
      fontSize:22,
      fontWeight:'800',
    },
    dollarstext:
    {
       fontWeight:'900',
       color:'black',
       fontSize:20
    },
    ratediv:
    {
        
        width:50,
        backgroundColor:'transparent',
        height:20,
        
        position:'relative'
        
    },
    rateusicon:
    {
      
      
      width:'50%',
    },
    activeNavText:
    {
        color:'white'
    },
    coffelinks:
    {
        width: '100%',
        height:'100%',
        borderWidth:2,
        borderColor:'transparent', 
    }

});
export default styles