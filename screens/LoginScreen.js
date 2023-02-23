import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
} from 'react-native';
//import auth from '@react-native-firebase/auth';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import database from '@react-native-firebase/database';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
        }
    }

    signUp = () => {
        const { username } = this.state;

        database()
            .ref(`/User/${username}`)
            .set({
                username: username,
            })
            .then(() => this.goToHomeScreen());
    }

    handleLogin = () => {
        const { username } = this.state;

        database()
            .ref(`/User/${username}`)
            .once('value')
            .then(snapshot => {
                console.log('User data: ', snapshot.val());
                const user = snapshot.val()
                if (user) {
                    this.goToHomeScreen()
                } else {
                    this.signUp()
                }
            });
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

    setUsername = (username) => {
        this.setState({ username: username });
    }

    render = () => {
        const { email, password, username } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container}
                behavior="padding">
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.subTitle}>Enter your account details</Text>
                {this.inputText("Username", (text) => this.setUsername(text), username)}
                {this.renderButton("Login", this.handleLogin)}
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