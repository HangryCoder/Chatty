import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types';

class FAB extends React.Component {
    render = () => {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.props.onPress} >
                <Image
                    style={styles.icon}
                    source={require('../../assets/icons/plus.png')} />
            </TouchableOpacity>
        );
    }
}

FAB.propTypes = {
    onPress: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#874FFF',
        width: 50,
        height: 50,
        borderRadius: 50,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    }, icon: {
        width: 24,
        height: 24
    }
})

export default FAB;