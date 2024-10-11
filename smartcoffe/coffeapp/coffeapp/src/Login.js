import styles from './Logincss';
import { useState } from 'react';
import axios from 'axios';



import view from '../assets/loginicons/view.png';
import twitter from '../assets/loginicons/twitter.png';
import apple from '../assets/loginicons/apple.png';
import google from '../assets/loginicons/google.png';
import { useNavigation } from '@react-navigation/native';

import { 
    SafeAreaView,
    Text, 
    Image,
    
    View,
    TextInput,
    StatusBar,
    TouchableOpacity,
    Alert,
} from 'react-native';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigation = useNavigation();

    
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        
        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }
    
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long');
            return;
        }
    
        try {
            const response = await axios.post('http://192.168.140.72:8000/api/login/', { email, password });
    
            if (response.status === 200) {
                Alert.alert("Login successful");
                navigation.navigate('Home');
            } else {
                
                setErrorMessage(response.data.error || 'Login failed. Please try again.'); 
            }
        } catch (error) {
            
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error); 
            } else {
                setErrorMessage('Login failed. Please try again later.');
            }
        }
    };
    

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={'rgb(28, 27, 27)'} />

            <View style={styles.grandview}>
                <View style={styles.blackview}>
                    <View style={styles.loginview}>
                        <Text style={{color:'white',fontWeight:'800',fontSize:20}}>Login</Text>
                    </View>
                    <View style={styles.crossview}>
                        <View style={styles.centre}>
                            <View style={styles.loginheading}>
                                <Text style={{color:'black',fontWeight:'600',marginLeft:'2%'}}>Login to your existing account</Text>
                            </View>
                            <View style={styles.twodiv1}>
                                <Text style={{color:'black',fontWeight:'800',marginLeft:'2%'}}>Email</Text>
                            </View>

                            <TextInput
                                style={styles.password}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />

                            <View style={styles.username}>
                                <Text style={{color:'black',fontWeight:'800',marginLeft:'2%'}}>Password</Text>
                            </View>  
                            <View style={styles.twodiv}>
                                <TextInput
                                    secureTextEntry={!isPasswordVisible} 
                                    style={styles.email}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity style={styles.viewlink} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                    <Image style={{width: '80%', height: '80%'}} source={view} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.rememberme}>
                                <TouchableOpacity>
                                    <Text style={{color:'blue'}}>Forget password</Text>
                                </TouchableOpacity>
                            </View> 

                            <TouchableOpacity style={styles.loginlink} onPress={handleLogin}>
                                <Text style={{fontWeight:'900'}}>LOGIN</Text>
                            </TouchableOpacity>

                            <View style={styles.newtextlink}>
                                <Text style={{marginTop:'-1%',color:'red'}}>
                                    {errorMessage}
                                </Text>
                            </View>

                            <View style={styles.signup}>
                                <Text>Don't have an account?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.lastlink}>
                                    <Text style={{color:'blue'}}>Sign up</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.textor}>
                                <View style={styles.oneview}/>
                                <Text style={{fontWeight:'900'}}>OR</Text>
                                <View style={styles.oneview}/>
                            </View>

                            <View style={styles.loginlinks}>
                                <View style={styles.newlast}>
                                    <TouchableOpacity style={styles.google}>
                                        <Image style={{width:'50%',height:'50%'}} source={google}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.google2}>
                                        <Image style={{width:'110%',height:'110%'}} source={twitter}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.google1}>
                                        <Image style={{width:'70%',height:'70%'}} source={apple}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

export default Login;
