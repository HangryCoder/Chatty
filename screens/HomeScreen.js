import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import GroupItem from '../components/GroupItem'

class HomeScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            searchValue: "",
            data: [
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
        }
    }

    onChangeText = (text) => {
        console.log("text " + text)
    }

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
            <View style={{ width: 20, height: 20, backgroundColor: 'red' }}></View>
            <TextInput
                editable
                numberOfLines={1}
                placeholder="Search"
                onChangeText={text => onChangeText(text)}
                value={this.state.searchValue}
                style={{ flex: 1, marginHorizontal: 8, fontSize: 14, color: '#A1A1A1' }}
            />
        </View>)
    }

    createGroup = () => {
        let newData = [...this.state.data]
        newData.push({
            id: 6,
            title: 'Group 6',
            memberCount: 60,
            icon: '',
            joined: true
        })
        this.setState({
            data: newData
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
            data={this.state.data}
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

