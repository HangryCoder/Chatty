import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

class ChatScreen extends React.Component {

    joinGroup = () => {

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
                }}></View>
                <CustomButton
                    text={'Join Group'}
                    onPress={this.joinGroup}
                    style={{
                        marginTop: 16,
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

})

export default ChatScreen;