import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';

class LoginScreen extends React.Component {

    inputText = (title, placeholder) => {
        return <CustomTextInput title={title} placeholder={placeholder} />
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

    render = () => {
        return (
            <KeyboardAvoidingView style={styles.container}
                behavior="padding">
                {this.inputText("Enter username", "soniaW")}
                {this.inputText("Enter password", "password")}
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
        width: 200,
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
    }
})

export default LoginScreen;