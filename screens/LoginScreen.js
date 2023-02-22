import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';

class LoginScreen extends React.Component {

    inputText = (title, placeholder) => {
        return <CustomTextInput title={title} placeholder={placeholder} />
    }

    render = () => {
        return (
            <View style={styles.container}>
                {this.inputText("Enter username", "soniaW")}
                {this.inputText("Enter password", "password")}
                <Button title="Login" color={"black"} />
            </View>
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