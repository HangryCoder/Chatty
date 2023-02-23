import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { POST_MESSAGE_PLACEHOLDER, POST_BUTTON } from '../constants';

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

        return (<View>
            <Text style={{
                backgroundColor: '#1C1C1C',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
                borderBottomLeftRadius: 0,
                padding: 16,
                fontFamily: 'poppins_regular',
                fontSize: 14,
                color: '#A1A1A1'
            }}>{text}</Text>
            <View style={{
                flexDirection: 'row',
                marginTop: 8
            }}>
                <View style={{
                    width: 24,
                    height: 24,
                    backgroundColor: 'yellow',
                    borderRadius: 24,
                    marginEnd: 8
                }}></View>
                <Text style={{
                    fontFamily: 'poppins_regular',
                    fontSize: 14,
                    color: '#E4E4E4'
                }}>Stephen</Text>
            </View>
        </View>)
    }

    renderSenderMessage = () => {
        const text = "Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her psychic powers, stop a monstrous killing spree."

        return (<View>
            <Text style={{
                backgroundColor: '#E6F5FB',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 16,
                padding: 16,
                fontFamily: 'poppins_regular',
                fontSize: 14,
                color: '#2A2A2A'
            }}>{text}</Text>
            <View style={{
                flexDirection: 'row',
                marginTop: 8,
                justifyContent: 'flex-end'
            }}>
                <Text style={{
                    fontFamily: 'poppins_regular',
                    fontSize: 14,
                    color: '#E4E4E4'
                }}>Me</Text>
                <View style={{
                    width: 24,
                    height: 24,
                    backgroundColor: 'yellow',
                    borderRadius: 24,
                    marginStart: 8
                }}></View>
            </View>
        </View>)
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