import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { POST_MESSAGE_PLACEHOLDER, POST_BUTTON, JOIN_GROUP } from '../constants';
import RecipientMessageItem from '../components/RecipientMessageItem';
import SenderMessageItem from '../components/SenderMessageItem';
import database from '@react-native-firebase/database';
import { MEMBERS_DB, MESSAGES_DB } from '../database'

class ChatScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            chat: [],
            isJoined: false
        }

        const { groupId, username } = props.route.params
        this.groupId = groupId
        this.username = username
    }

    componentDidMount = () => {
        this.checkIfUserAlreadyJoined()
        this.fetchAllMessages()
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

    fetchAllMessages = () => {
        database()
            .ref(`${MESSAGES_DB}/${this.groupId}`)
            .on('value', snapshot => {
                if (!snapshot.val()) return

                var array = []
                Object.entries(snapshot.val()).map(val => array.unshift({
                    id: val[0],
                    chat: val[1]
                }))
                array.sort((a, b) => a.chat.createdAt - b.chat.createdAt)
                this.setState({ chat: array })
            })
    }

    postMessage = () => {
        const { message } = this.state;
        if (!message) return

        let color = 'rgb(' + (Math.floor(Math.random() * 256))
            + ',' + (Math.floor(Math.random() * 256)) + ','
            + (Math.floor(Math.random() * 256)) + ')';

        let chat = {
            text: message,
            author: this.username,
            color: color,
            createdAt: Date.now()
        }

        database()
            .ref(`${MESSAGES_DB}/${this.groupId}`)
            .push(chat)
            .then(() => {
                this.setState({ message: '' })
            })
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
            style={styles.chatList}
            ItemSeparatorComponent={this.renderItemSeparator()}
            data={this.state.chat}
            renderItem={({ item }) => {
                let chat = item.chat
                if (chat.author == this.username) {
                    return <SenderMessageItem chat={chat} />
                } else {
                    return <RecipientMessageItem chat={chat} />
                }
            }}
            keyExtractor={item => item.id}
        />
    }

    renderToolbar = () => {
        return <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#232323',
            padding: 16,
        }}>
            <TouchableOpacity onPress={this.logout}>
                <Image
                    source={require('../assets/icons/left-arrow.png')}
                    style={{ width: 24, height: 24, marginRight: 8 }}
                />
            </TouchableOpacity>
            <View style={{
                backgroundColor: 'red',
                borderRadius: 50,
                width: 48,
                height: 48,
                marginRight: 8
            }} />
            <Text style={{
                fontFamily: 'poppins_semibold',
                fontSize: 24,
                flex: 1,
            }}>Group name</Text>
        </View>
    }

    render = () => {
        const { isJoined } = this.state
        return (
            <View style={styles.container}>
                {this.renderToolbar()}
                {this.renderChatList()}
                {isJoined ? this.renderPostMessage() : this.renderJoinGroupButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
    },
    chatList: {
        padding: 16
    }
})

export default ChatScreen;