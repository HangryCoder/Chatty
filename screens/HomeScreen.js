import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import GroupItem from '../components/GroupItem'

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

    /* onChangeText = (text) => {
         console.log("text " + text)
         this.setState({ searchValue: text })
     }*/

    searchFunction = (text) => {
        console.log("text " + text)
        if (text.trim() == "") {
            this.setState({ data: dummyData, searchValue: text });
            return
        }
        const updatedData = this.originalData.filter((item) => {
            const itemData = `${item.title.toUpperCase()})`;
            const searchData = text.toUpperCase();
            return itemData.startsWith(searchData)//indexOf(searchData) > -1;
        });
        this.setState({ filteredData: updatedData, searchValue: text });
    };

    renderSearchBar = () => {
        return (<View style={{
            flexDirection: 'row',
            marginBottom: 16,
            backgroundColor: '#3D3D3D',
            borderRadius: 16,
            paddingVertical: 8,
            paddingHorizontal: 16,
            alignItems: 'center'
        }}>
            <Image source={require('../assets/icons/search.png')} style={{ width: 20, height: 20 }} />
            <TextInput
                editable
                numberOfLines={1}
                placeholder="Search"
                onChangeText={text => this.searchFunction(text)}
                value={this.state.searchValue}
                style={{
                    flex: 1, marginHorizontal: 8, fontSize: 14, color: '#A1A1A1', fontFamily: 'poppins_regular'
                }}
            />
        </View>)
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
        return (<TouchableOpacity onPress={this.createGroup}>
            <Text>Create Group</Text>
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

