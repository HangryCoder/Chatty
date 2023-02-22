import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Login Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default LoginScreen;