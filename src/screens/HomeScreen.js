import React from 'react';
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import GroupItem from '../../src/components/GroupItem';
import SearchBar from '../../src/components/SearchBar';
import database from '@react-native-firebase/database';
import { CHAT_DB } from '../utils/database'
import FAB from '../../src/components/FAB';
import CreateGroupBottomSheet from '../../src/components/CreateGroupBottomSheet';
import LocalStorage from '../utils/LocalStorage'
import { USERNAME_KEY, ALL_GROUPS } from '../utils/constants';

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
            .on('value', snapshot => {
                var array = []
                Object.entries(snapshot.val()).map(val => array.unshift({
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

    getUsername = async () => {
        try {
            const value = await LocalStorage.get(USERNAME_KEY)
            if (value !== null) {
                return value
            }
        } catch (e) {
            return null
        }
    }

    goToChatScreen = (item) => {
        const { navigation } = this.props;
        this.getUsername().then((username) =>
            navigation.navigate("Chat", {
                groupId: item.id,
                username: username,
                groupName: item.chat.title,
                groupColor: item.chat.color
            })
        )
    }

    renderGroupList = () => {
        return <FlatList
            ItemSeparatorComponent={this.renderItemSeparator()}
            data={this.state.filteredData}
            renderItem={({ item }) => <GroupItem group={item.chat} onPress={() => this.goToChatScreen(item)} />}
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

    logout = () => {
        const { navigation } = this.props
        LocalStorage.clearAll()
        navigation.replace("Login")
    }

    renderToolbar = () => {
        return <View style={styles.toolbarContainer}>
            <Text style={styles.toolbarName}>{ALL_GROUPS}</Text>
            <TouchableOpacity onPress={this.logout}>
                <Image
                    source={require('../../assets/icons/log-out.png')}
                    style={styles.logout}
                />
            </TouchableOpacity>
        </View>
    }

    render = () => {
        return (
            <View style={styles.container}>
                {this.renderToolbar()}
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
    },
    toolbarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16
    },
    toolbarName: {
        fontFamily: 'poppins_semibold',
        fontSize: 24,
        flex: 1,
    },
    logout: {
        width: 24,
        height: 24
    }
})

export default HomeScreen;

