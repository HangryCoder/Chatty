import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
} from 'react-native';
//import CustomTextInput from '../components/CustomTextInput';
import auth from '@react-native-firebase/auth';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';

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

    inputText = (placeholder, onChangeText, value) => {
        return (<CustomTextInput
            style={styles.inputContainer}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            icon={require('../assets/icons/search.png')} />)
    }

    renderButton = (text, onPress) => {
        return (
            <CustomButton style={styles.buttonContainer} onPress={onPress} text={text} />
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
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.subTitle}>Enter your account details</Text>
                {this.inputText("Username", (text) => this.setEmail(text), email)}
                {this.inputText("Password", (text) => this.setPassword(text), password)}
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
        paddingHorizontal: 16,
    },
    title: {
        fontFamily: 'poppins_semibold',
        fontSize: 32,
        marginTop: 48,
    },
    subTitle: {
        fontFamily: 'poppins_regular',
        fontSize: 14,
        marginBottom: 48,
    },
    buttonContainer: {
        marginTop: 32
    },
    inputContainer: {
        marginTop: 8
    },
})

export default LoginScreen;