import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import GroupItem from '../components/GroupItem';
import SearchBar from '../components/SearchBar';
import database from '@react-native-firebase/database';
import { CHAT_DB } from './database'
import FAB from '../components/FAB';
import CreateGroupBottomSheet from '../components/CreateGroupBottomSheet';

class HomeScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            searchValue: "",
            filteredData: [],
            groupName: ''
        }
        this.originalData = []
        this.bottomSheetRef = this;
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

    createNewGroup = () => {
        const { groupName } = this.state
        if (!groupName) return

        let color = 'rgb(' + (Math.floor(Math.random() * 256))
            + ',' + (Math.floor(Math.random() * 256)) + ','
            + (Math.floor(Math.random() * 256)) + ')';

        let chat = {
            title: groupName,
            color: color,
        }

        database()
            .ref(CHAT_DB)
            .push(chat)
            .then(() => {
                this.closeCreateGroupBottomSheet()
            });
    }

    openCreateGroupBottomSheet = () => {
        this.setState({ groupName: "" })
        this.RBSheet.open()
    }

    closeCreateGroupBottomSheet = () => {
        this.RBSheet.close()
    }

    renderCreateGroupButton = () => {
        return <FAB onPress={this.openCreateGroupBottomSheet} />
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

    setGroupName = (text) => {
        this.setState({ groupName: text })
    }

    renderCreateGroupBottomSheet = () => {
        return <CreateGroupBottomSheet
            reference={ref => {
                this.RBSheet = ref;
            }}
            onChangeText={this.setGroupName}
            groupTitle={this.state.groupName}
            onPress={this.createNewGroup}
        />
    }

    renderToolbar = () => {
        return <Text style={{
            fontFamily: 'poppins_semibold',
            fontSize: 24,
            paddingBottom: 16
        }}>All Groups</Text>
    }

    render = () => {
        return (
            <View style={styles.container}>
                {/* {this.renderToolbar()} */}
                {this.renderSearchBar()}
                {this.renderGroupList()}
                {this.renderCreateGroupButton()}
                {this.renderCreateGroupBottomSheet()}
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

