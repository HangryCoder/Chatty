import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomTextInput from '../CustomTextInput';
import CustomButton from '../CustomButton';
import { CREATE_GROUP_TITLE, CREATE_NOW_GROUP_BUTTON, CREATE_GROUP_PLACEHOLDER } from '../../constants';

class CreateGroupBottomSheet extends React.Component {
    render = () => {
        const { reference, onPress, groupTitle, onChangeText } = this.props

        return (
            <RBSheet
                ref={reference}
                customStyles={{
                    container: {
                        paddingTop: 24,
                        paddingHorizontal: 16,
                        backgroundColor: '#232323'
                    }
                }}
            >
                <Text style={styles.title}>{CREATE_GROUP_TITLE}</Text>
                <CustomTextInput
                    value={groupTitle}
                    onChangeText={onChangeText}
                    placeholder={CREATE_GROUP_PLACEHOLDER}
                    icon={require('../../assets/icons/group.png')} />
                <CustomButton
                    style={styles.button}
                    text={CREATE_NOW_GROUP_BUTTON}
                    onPress={onPress} />
            </RBSheet>
        );
    }
}

CreateGroupBottomSheet.propTypes = {
    reference: PropTypes.func,
    groupTitle: PropTypes.string,
    onChangeText: PropTypes.func,
    onPress: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        paddingHorizontal: 16,
        backgroundColor: '#232323'
    },
    title: {
        fontFamily: 'poppins_semibold',
        fontSize: 24,
        marginBottom: 16
    },
    button: {
        marginTop: 32
    }
})

export default CreateGroupBottomSheet;