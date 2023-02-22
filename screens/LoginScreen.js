import React from 'react';
import {
    StyleSheet,
    Button,
    KeyboardAvoidingView,
} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';

class LoginScreen extends React.Component {

    inputText = (title, placeholder) => {
        return <CustomTextInput title={title} placeholder={placeholder} />
    }

    goToHomeScreen = () => {
        const { navigation } = this.props;
        navigation.navigate("Home")
    }

    render = () => {
        return (
            <KeyboardAvoidingView style={styles.container}
                behavior="padding"
            >
                {this.inputText("Enter username", "soniaW")}
                {this.inputText("Enter password", "password")}
                <Button title="Login" color={"black"} onPress={this.goToHomeScreen} />
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
})

export default LoginScreen;