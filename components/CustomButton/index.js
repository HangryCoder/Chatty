import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';

class CustomButton extends React.Component {
    render = () => {
        const { text, onPress } = this.props;
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

CustomButton.propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string
}

const styles = StyleSheet.create({
    container: {
        height: 53,
        borderRadius: 16,
        backgroundColor: '#874FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'poppins_semibold',
        fontSize: 14
    }
})

export default CustomButton;