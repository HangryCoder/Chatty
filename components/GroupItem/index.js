import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text } from 'react-native'

class GroupItem extends React.Component {

    renderImage = () => {
        const { group } = this.props
        const { color } = group;
        return (<View style={styles.iconContainer}>
            <View style={[styles.icon, { backgroundColor: color }]}></View>
        </View>)
    }

    renderTitleAndMembers = () => {
        const { group } = this.props
        const { title, memberCount } = group

        return (<View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {/* <Text style={styles.memberText}>{`${memberCount} members joined`}</Text> */}
        </View>)
    }

    renderArrowIcon = () => {
        return (<Image
            source={require('../../assets/icons/arrow-right.png')}
            style={styles.arrowIcon} />)
    }

    render = () => {
        return (
            <View style={styles.container}>
                {this.renderImage()}
                {this.renderTitleAndMembers()}
                {this.renderArrowIcon()}
            </View>
        );
    }
}

GroupItem.propTypes = {
    group: PropTypes.object
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#232323',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16
    },
    textContainer: {
        flex: 0.8,
        flexDirection: 'column',
    },
    title: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'poppins_semibold'
    },
    memberText: {
        fontSize: 12,
        marginTop: 4,
        color: '#A1A1A1',
        fontFamily: 'poppins_regular'
    },
    iconContainer: {
        flex: 0.2,
    },
    icon: {
        width: 48,
        height: 48,
        borderRadius: 50,
        backgroundColor: 'yellow'
    },
    arrowIcon: {
        width: 20,
        height: 20
    },
})

export default GroupItem;