import React from 'react';
import {
    StyleSheet,
    Text,
    View,
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
    inputContainer: {
        margin: 8,
        marginTop: 12,
        //backgroundColor: "red"
    },
    inputText: {
        fontSize: 18,
        fontWeight: '500'
    },
    input: {
        height: "auto",
        marginTop: 8,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
    },
})

export default LoginScreen;