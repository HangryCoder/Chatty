import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const searchIcon = '../../assets/icons/search.png'//'../assets/icons/search.png'

class SearchBar extends React.Component {

    render = () => {
        const { text, onChangeText } = this.props;

        return (
            <View style={styles.container}>
                <Image source={require(searchIcon)} style={styles.searchIcon} />
                <TextInput
                    editable
                    numberOfLines={1}
                    placeholder="Search"
                    onChangeText={onChangeText}
                    value={text}
                    style={styles.input}
                />
            </View>
        );
    }
}

SearchBar.propTypes = {
    text: PropTypes.string,
    onChangeText: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#3D3D3D',
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    searchIcon: {
        width: 20,
        height: 20
    },
    input: {
        flex: 1,
        marginHorizontal: 8,
        fontSize: 14,
        color: '#A1A1A1',
        fontFamily: 'poppins_regular'
    }
})

export default SearchBar;