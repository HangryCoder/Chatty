import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
} from 'react-native';
//import auth from '@react-native-firebase/auth';
import CustomButton from '../../src/components/CustomButton';
import CustomTextInput from '../../src/components/CustomTextInput';
import database from '@react-native-firebase/database';
import { USERNAME, LOGIN, WELCOME_SUB_TITLE, WELCOME, USERNAME_KEY } from '../utils/constants';
import LocalStorage from '../utils/LocalStorage'//'../src/utils/LocalStorage'

class LoginScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
        }
    }

    componentDidMount = () => {
        this.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                this.goToHomeScreen()
            }
        })
    }

    goToHomeScreen = () => {
        const { navigation } = this.props;
        navigation.replace("Home")
    }

    isUserLoggedIn = async () => {
        try {
            const value = await LocalStorage.get(USERNAME_KEY)
            if (value !== null) {
                return true
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    }

    signUp = () => {
        const { username } = this.state;

        database()
            .ref(`/User/${username}`)
            .set({
                username: username,
            })
            .then(() => {
                this.setUserAsLoggedIn()
                this.goToHomeScreen()
            });
    }

    handleLogin = () => {
        const { username } = this.state;
        if (!username) return

        database()
            .ref(`/User/${username}`)
            .once('value')
            .then(snapshot => {
                const user = snapshot.val()
                if (user) {
                    this.setUserAsLoggedIn()
                    this.goToHomeScreen()
                } else {
                    this.signUp()
                }
            });
    }

    setUserAsLoggedIn = () => {
        const { username } = this.state;
        LocalStorage.set(USERNAME_KEY, username)
    }

    inputText = (placeholder, onChangeText, value) => {
        return (<CustomTextInput
            style={styles.inputContainer}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            icon={require('../../assets/icons/search.png')} />)
    }

    renderButton = (text, onPress) => {
        return (
            <CustomButton style={styles.buttonContainer} onPress={onPress} text={text} />
        )
    }

    setUsername = (username) => {
        this.setState({ username: username });
    }

    render = () => {
        const { username } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container}
                behavior="padding">
                <Text style={styles.title}>{WELCOME}</Text>
                <Text style={styles.subTitle}>{WELCOME_SUB_TITLE}</Text>
                {this.inputText(USERNAME, (text) => this.setUsername(text), username)}
                {this.renderButton(LOGIN, this.handleLogin)}
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