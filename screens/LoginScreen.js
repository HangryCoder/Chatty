import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Alert,
    Image,
} from 'react-native';
//import CustomTextInput from '../components/CustomTextInput';
import auth from '@react-native-firebase/auth';
import CustomButton from '../components/CustomButton';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSignUp = () => {
        const { email, password } = this.state;

        auth().createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Registered email successfully " + user.email);
            }).catch(error => alert(error.message))
    }

    handleLogin = () => {
        const { email, password } = this.state;
        auth().signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Logged in successfully " + user.email);
                this.goToHomeScreen()
            }).catch(error => alert(error.message))
    }

    inputText = (placeholder, isSecure, onChangeText, value) => {
        return (<View style={{
            borderRadius: 16,
            backgroundColor: '#3D3D3D',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <Image style={{ marginStart: 16, width: 20, height: 20 }}
                source={require('../assets/icons/search.png')} />
            <TextInput
                style={{
                    fontSize: 14,
                    paddingVertical: 16,
                    paddingHorizontal: 8,
                    fontFamily: 'poppins_regular',
                    color: '#ffffff',
                    placeholderTextColor: '#A1A1A1',

                }}
                placeholderTextColor={"black"}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={isSecure}
            />
        </View>)
    }

    renderButton = (text, onPress) => {
        return (
            <CustomButton onPress={onPress} text={text} />
        )
    }

    goToHomeScreen = () => {
        const { navigation } = this.props;
        navigation.navigate("Home")
    }

    setEmail = (email) => {
        this.setState({ email: email });
    }

    setPassword = (password) => {
        this.setState({ password: password });
    }

    render = () => {
        const { email, password } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container}
                behavior="padding">
                {this.inputText("Enter email", false, (text) => this.setEmail(text), email)}
                {this.inputText("Enter password", true, (text) => this.setPassword(text), password)}
                {this.renderButton("Login", this.handleLogin)}
                {/* {this.renderButton("Register", this.handleSignUp)} */}
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2A2A2A",
        flex: 1,
        padding: 32,
    },
    buttonContainer: {
        backgroundColor: 'black',
        width: '60%',
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginTop: 8,
        borderRadius: 4
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
    },
    input: {
        height: "auto",
        marginTop: 8,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        fontSize: 16,
        color: "black",
    },
})

export default LoginScreen;