import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    TouchableOpacity,
    Text,
    TextInput,
} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    inputText = (placeholder, isSecure, onChangeText, value) => {
        return <TextInput
            style={styles.input}
            placeholderTextColor={"black"}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={isSecure}
        />
    }

    loginButton = () => {
        return (
            <View>
                <TouchableOpacity style={styles.buttonContainer} onPress={this.goToHomeScreen}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
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
                {this.loginButton()}
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
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