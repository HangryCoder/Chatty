import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    TextInput
} from 'react-native';
import PropTypes from 'prop-types';

class CustomTextInput extends React.Component {

    render = () => {
        const { value, placeholder, style, onChangeText, icon } = this.props;

        return (<View style={[styles.container, style]}>
            {/* <Image style={styles.icon} source={icon} /> */}
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={'#A1A1A1'}
            />
        </View>);
    }

}

CustomTextInput.propTypes = {
    style: PropTypes.object,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    // icon: PropTypes.func,
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        backgroundColor: '#3D3D3D',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        fontSize: 14,
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 8,
        fontFamily: 'poppins_regular',
        color: '#ffffff',
    },
    icon: {
        marginStart: 16,
        width: 20,
        height: 20
    }
})

export default CustomTextInput;