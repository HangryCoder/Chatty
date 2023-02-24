import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { POST_MESSAGE_PLACEHOLDER, POST_BUTTON, JOIN_GROUP } from '../constants';
import RecipientMessageItem from '../components/RecipientMessageItem';
import SenderMessageItem from '../components/SenderMessageItem';

class ChatScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }

    postMessage = () => {

    }

    joinGroup = () => {

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

    renderReceiverMessage = () => {
        const text = "Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her psychic powers, stop a monstrous killing spree."
        const chat = { message: text, color: '', author: 'Stephen' }
        return <RecipientMessageItem chat={chat} />
    }

    renderSenderMessage = () => {
        const text = "Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her psychic powers, stop a monstrous killing spree."
        const chat = { message: text, color: '', author: 'Me' }

        return <SenderMessageItem chat={chat} />
    }
    render = () => {
        return (
            <View style={styles.container}>
                <View style={{
                    backgroundColor: 'red',
                    flex: 1
                }} />

                {/* {this.renderReceiverMessage()} */}
                {this.renderSenderMessage()}
                {/* {this.renderJoinGroupButton()} */}
                {this.renderPostMessage()}
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
    }
})

export default ChatScreen;