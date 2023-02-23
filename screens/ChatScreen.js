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
        return (<View style={{
            flexDirection: 'row', marginTop: 16,
        }}>
            <View style={{ flex: 0.8, marginEnd: 8 }}>
                <CustomTextInput
                    style={{ paddingStart: 8, height: 53 }}
                    value={this.state.message}
                    placeholder={'Type something'}
                    onChangeText={this.setMessage}
                />
            </View>
            <CustomButton
                text={'Post'}
                onPress={this.postMessage}
                style={{
                    flex: 0.2,
                }} />
        </View>)
    }

    render = () => {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                padding: 16,
                backgroundColor: '#2A2A2A'
            }}>
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

})

export default ChatScreen;