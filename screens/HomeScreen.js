import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import GroupItem from '../components/GroupItem';
import SearchBar from '../components/SearchBar';
import CustomButton from '../components/CustomButton';
import database from '@react-native-firebase/database';
import { CHAT_DB } from './database'

const colorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

const dummyData = [
    {
        id: 1,
        title: 'Group 1',
        memberCount: 10,
        color: colorCode,
        joined: false
    },
    {
        id: 2,
        title: 'Group 2',
        memberCount: 20,
        color: colorCode,
        joined: true
    },
    {
        id: 3,
        title: 'Group 3',
        memberCount: 30,
        color: colorCode,
        joined: true
    },
    {
        id: 4,
        title: 'Group 4',
        memberCount: 40,
        color: colorCode,
        joined: false
    },
    {
        id: 5,
        title: 'Group 5',
        memberCount: 50,
        color: colorCode,
        joined: true
    },
]

class HomeScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            searchValue: "",
            filteredData: []
        }
        // this.originalData = dummyData//[]
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
        if (text.trim() == "") {
            this.setState({ data: this.originalData, searchValue: text });
            return
        }
        const updatedData = this.originalData.filter((item) => {
            const itemData = `${item.title.toUpperCase()})`;
            const searchData = text.toUpperCase();
            return itemData.startsWith(searchData)
        });
        this.setState({ filteredData: updatedData, searchValue: text });
    };

    renderSearchBar = () => {
        return (<SearchBar text={this.state.searchValue} onChangeText={this.searchFunction} />)
    }

    //Delete
    // createGroup = () => {
    //     let newData = [...this.state.filteredData]
    //     newData.push({
    //         id: 6,
    //         title: 'Group 6',
    //         memberCount: 60,
    //         color: colorCode,
    //         joined: true
    //     })
    //     this.setState({
    //         filteredData: newData
    //     })
    // }

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

