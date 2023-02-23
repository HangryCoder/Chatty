import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';

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
            text={'Join Group'}
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
                    placeholder={'Type something'}
                    onChangeText={this.setMessage}
                />
            </View>
            <CustomButton
                text={'Post'}
                onPress={this.postMessage}
                style={styles.postMessageButton} />
        </View>)
    }

    render = () => {
        return (
            <View style={styles.container}>
                <View style={{
                    backgroundColor: 'red',
                    flex: 1
                }} />
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