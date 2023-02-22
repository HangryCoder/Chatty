import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'

class GroupItem extends React.Component {

    renderImage = () => {
        const { group } = this.props
        const { icon } = group;
        return (<View style={styles.iconContainer}>
            <View style={styles.icon}></View>
        </View>)
    }

    renderTitleAndMembers = () => {
        const { group } = this.props
        const { title, memberCount } = group

        return (<View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.memberText}>{`${memberCount} members joined`}</Text>
        </View>)
    }

    renderJoinButton = () => {
        const { group } = this.props
        return (group.joined ?
            (<View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.joinButtonContainer}>
                    <Text style={styles.joinText}>Join</Text>
                </TouchableOpacity></View>) : null)
    }

    render = () => {
        return (
            <View style={styles.container}>
                {this.renderImage()}
                {this.renderTitleAndMembers()}
                {this.renderJoinButton()}
            </View>
        );
    }
}

GroupItem.propTypes = {
    group: PropTypes.object
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8
    },
    textContainer: {
        flex: 0.65,
        flexDirection: 'column',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black'
    },
    memberText: {
        fontSize: 14,
        marginTop: 4,
        color: 'black'
    },
    iconContainer: {
        flex: 0.2,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'yellow'
    },
    buttonContainer: {
        flex: 0.15,
    },
    joinButtonContainer: {
        backgroundColor: 'green',
        borderRadius: 4,
        alignItems: 'center',
        paddingVertical: 8,
    },
    joinText: {
        color: 'white',
    }
})

export default GroupItem;