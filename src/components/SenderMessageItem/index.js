import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class SenderMessageItem extends React.Component {

    render = () => {
        const { chat } = this.props
        const { text, color, author } = chat
        return (
            <View>
                <Text style={styles.messageContainer}>{text}</Text>
                <View style={styles.messageAuthorContainer}>
                    <Text style={styles.messageAuthorName}>Me</Text>
                    <View style={[styles.messageAuthorIcon, { backgroundColor: color }]} />
                </View>
            </View>
        );
    }
}

SenderMessageItem.propTypes = {
    chat: PropTypes.object
}

const styles = StyleSheet.create({
    messageContainer: {
        backgroundColor: '#E6F5FB',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 16,
        padding: 16,
        fontFamily: 'poppins_regular',
        fontSize: 14,
        color: '#2A2A2A'
    },
    messageAuthorContainer: {
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'flex-end'
    },
    messageAuthorIcon: {
        width: 24,
        height: 24,
        backgroundColor: 'yellow',
        borderRadius: 24,
        marginStart: 8
    },
    messageAuthorName: {
        fontFamily: 'poppins_regular',
        fontSize: 14,
        color: '#E4E4E4'
    }
})

export default SenderMessageItem;