import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import GroupItem from '../components/GroupItem';
import SearchBar from '../components/SearchBar';

const dummyData = [
    {
        id: 1,
        title: 'Group 1',
        memberCount: 10,
        icon: '',
        joined: false
    },
    {
        id: 2,
        title: 'Group 2',
        memberCount: 20,
        icon: '',
        joined: true
    },
    {
        id: 3,
        title: 'Group 3',
        memberCount: 30,
        icon: '',
        joined: true
    },
    {
        id: 4,
        title: 'Group 4',
        memberCount: 40,
        icon: '',
        joined: false
    },
    {
        id: 5,
        title: 'Group 5',
        memberCount: 50,
        icon: '',
        joined: true
    },
]

class HomeScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            searchValue: "",
            filteredData: dummyData
        }
        this.originalData = dummyData
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

    createGroup = () => {
        let newData = [...this.state.filteredData]
        newData.push({
            id: 6,
            title: 'Group 6',
            memberCount: 60,
            icon: '',
            joined: true
        })
        this.setState({
            filteredData: newData
        })
    }

    renderCreateGroupButton = () => {
        return (<TouchableOpacity
            style={{
                height: 53, borderRadius: 16, backgroundColor: '#874FFF',
                alignItems: 'center', justifyContent: 'center'
            }}
            onPress={this.createGroup}>
            <Text style={{ fontFamily: 'poppins_semibold', fontSize: 14 }}>Create Group</Text>
        </TouchableOpacity>)
    }

    renderItemSeparator = () => {
        return <View style={styles.itemSeparator} />
    }

    renderGroupList = () => {
        return <FlatList
            ItemSeparatorComponent={this.renderItemSeparator()}
            data={this.state.filteredData}
            renderItem={({ item }) => <GroupItem group={item} />}
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

