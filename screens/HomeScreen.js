import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import GroupItem from '../components/GroupItem';
import SearchBar from '../components/SearchBar';
import CustomButton from '../components/CustomButton';
import database from '@react-native-firebase/database';
import { CHAT_DB } from './database'

class HomeScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            searchValue: "",
            filteredData: []
        }
        this.originalData = []
    }

    componentDidMount = () => {
        this.getAllChats()
    }

    getAllChats = () => {
        database()
            .ref(CHAT_DB)
            .orderByValue()
            .on('value', snapshot => {
                var array = []
                Object.entries(snapshot.val()).map(val => array.push({
                    id: val[0],
                    chat: val[1]
                }))
                this.setState({ filteredData: array })
                this.originalData = array
            })
    }


    searchFunction = (text) => {
        const updatedData = this.originalData.filter((item) => {
            let chat = item['chat']
            const itemData = `${chat.title.toUpperCase()})`;
            const searchData = text.toUpperCase();
            return itemData.startsWith(searchData)
        });
        this.setState({ filteredData: updatedData, searchValue: text });
    };

    renderSearchBar = () => {
        return (<SearchBar text={this.state.searchValue} onChangeText={this.searchFunction} />)
    }

    createNewChat = () => {
        console.log('create')
        let color = 'rgb(' + (Math.floor(Math.random() * 256))
            + ',' + (Math.floor(Math.random() * 256)) + ','
            + (Math.floor(Math.random() * 256)) + ')';

        let chat = {
            title: "Mumbai Group",
            color: color,
        }

        database()
            .ref(CHAT_DB)
            .push(chat)
            .then(() => console.log('Data set.'));
    }

    renderCreateGroupButton = () => {
        return <CustomButton text={"Create Group"} onPress={this.createNewChat} />
    }

    renderItemSeparator = () => {
        return <View style={styles.itemSeparator} />
    }

    renderGroupList = () => {
        return <FlatList
            ItemSeparatorComponent={this.renderItemSeparator()}
            data={this.state.filteredData}
            renderItem={({ item }) => <GroupItem group={item.chat} />}
            keyExtractor={item => item.id}
        />
    }

    render = () => {
        return (
            <View style={styles.container} >
                {this.renderSearchBar()}
                {this.renderGroupList()}
                {this.renderCreateGroupButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
        padding: 16
    },
    itemSeparator: {
        height: 12
    }
})

export default HomeScreen;

