import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

class CustomTextInput extends React.Component {

    render = () => {
        const { title, placeholder } = this.props;

        return (<View style={styles.container}>
            <Text style={styles.inputText}>{title}</Text>
            <TextInput
                style={styles.input}
                // onChangeText={onChangeText}
                placeholder={placeholder}
            />
        </View>);
    }

}

const styles = StyleSheet.create({
    container: {
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

export default CustomTextInput;