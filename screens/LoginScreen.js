import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    inputText = (title, placeholder) => {
        return <View style={styles.inputContainer}>
            <Text style={styles.inputText}>{title}</Text>
            <TextInput
                style={styles.input}
                // onChangeText={onChangeText}
                placeholder={placeholder}
            />
        </View>
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