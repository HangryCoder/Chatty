import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { POST_MESSAGE_PLACEHOLDER, POST_BUTTON, JOIN_GROUP } from '../constants';
import RecipientMessageItem from '../components/RecipientMessageItem';
import SenderMessageItem from '../components/SenderMessageItem';
import database from '@react-native-firebase/database';
import { CHAT_DB, MEMBERS_DB } from '../database'

const color = 'rgb(' + (Math.floor(Math.random() * 256))
    + ',' + (Math.floor(Math.random() * 256)) + ','
    + (Math.floor(Math.random() * 256)) + ')';

const chat = [
    {
        id: 1,
        message: 'Hello',
        author: 'Stephen',
        color: color
    },
    {
        id: 2,
        message: 'How are you?',
        author: 'Krupa',
        color: color
    },
    {
        id: 3,
        message: 'Not bad. When are you coming to Goa?',
        author: 'Stephen',
        color: color
    },
    {
        id: 4,
        message: 'Hey! I am coming this month',
        author: 'Sonia',
        color: color
    },
]

class ChatScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            chat: chat,
            isJoined: false
        }

        const { groupId, username } = props.route.params
        this.groupId = groupId
        this.username = username
    }

    componentDidMount = () => {
        this.checkIfUserAlreadyJoined()
    }

    checkIfUserAlreadyJoined = () => {
        database()
            .ref(`${MEMBERS_DB}/${this.groupId}`)
            .once('value')
            .then(snapshot => {
                const isJoined = Object.keys(snapshot.val()).includes(this.username)
                this.setState({ isJoined: isJoined })
            }).catch((e) => console.log(`Error ${e}`));
    }

    postMessage = () => {
        const message = this.state.message
        let newMessage = {
            id: 5,
            message: message,
            author: this.username,
            color: color
        }

        let array = [...this.state.chat]
        array.push(newMessage)

        this.setState({ chat: array, message: '' })
    }

    joinGroup = () => {
        database()
            .ref(`${MEMBERS_DB}/${this.groupId}`)
            .update({
                [this.username]: true
            }).then(() => {
                this.setState({ isJoined: true })
            })
    }

    setMessage = (text) => {
        this.setState({ message: text })
    }

    renderJoinGroupButton = () => {
        return <CustomButton
            text={JOIN_GROUP}
            onPress={this.joinGroup}
            style={{
                marginTop: 16,
            }}
        />
    }

    renderPostMessage = () => {
        return (<View style={styles.postMessageContainer}>
            <View style={styles.postMessageInputContainer}>
                <CustomTextInput
                    style={styles.postMessageInput}
                    value={this.state.message}
                    placeholder={POST_MESSAGE_PLACEHOLDER}
                    onChangeText={this.setMessage}
                />
            </View>
            <CustomButton
                text={POST_BUTTON}
                onPress={this.postMessage}
                style={styles.postMessageButton} />
        </View>)
    }

    renderItemSeparator = () => {
        return <View style={styles.itemSeparator} />
    }

    renderChatList = () => {
        return <FlatList
            ItemSeparatorComponent={this.renderItemSeparator()}
            data={this.state.chat}
            renderItem={({ item }) => {
                if (item.author == this.username) {
                    return <SenderMessageItem chat={item} />
                } else {
                    return <RecipientMessageItem chat={item} />
                }
            }}
            keyExtractor={item => item.id}
        />
    }

    render = () => {
        const { isJoined } = this.state
        return (
            <View style={styles.container}>
                {this.renderChatList()}
                {isJoined ? this.renderPostMessage() : this.renderJoinGroupButton()}
                {/* {this.renderJoinGroupButton()} */}
                {/* {this.renderPostMessage()} */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 16,
        backgroundColor: '#2A2A2A'
    },
    postMessageContainer: {
        flexDirection: 'row',
        marginTop: 16,
    },
    postMessageInputContainer: {
        flex: 0.8,
        marginEnd: 8
    },
    postMessageInput: {
        paddingStart: 8,
        height: 53
    },
    postMessageButton: {
        flex: 0.2,
    },
    itemSeparator: {
        height: 16
    }
})

export default ChatScreen;