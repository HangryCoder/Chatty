import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class RecipientMessageItem extends React.Component {

    render = () => {
        const text = "Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her psychic powers, stop a monstrous killing spree."

        return (
            <View>
                <Text style={styles.messageContainer}>{text}</Text>
                <View style={styles.messageAuthorContainer}>
                    <View style={styles.messageAuthorIcon}></View>
                    <Text style={styles.messageAuthorName}>Stephen</Text>
                </View>
            </View>
        );
    }
}

RecipientMessageItem.propTypes = {
    message: PropTypes.object
}

const styles = StyleSheet.create({
    messageContainer: {
        backgroundColor: '#1C1C1C',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 0,
        padding: 16,
        fontFamily: 'poppins_regular',
        fontSize: 14,
        color: '#A1A1A1'
    },
    messageAuthorContainer: {
        flexDirection: 'row',
        marginTop: 8
    },
    messageAuthorIcon: {
        width: 24,
        height: 24,
        backgroundColor: 'yellow',
        borderRadius: 24,
        marginEnd: 8
    },
    messageAuthorName: {
        fontFamily: 'poppins_regular',
        fontSize: 14,
        color: '#E4E4E4'
    }
})

export default RecipientMessageItem;