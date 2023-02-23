import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import GroupItem from '../components/GroupItem';
import SearchBar from '../components/SearchBar';
import CustomButton from '../components/CustomButton';
import database from '@react-native-firebase/database';
import { CHAT_DB } from './database'
import RBSheet from "react-native-raw-bottom-sheet";
import CustomTextInput from '../components/CustomTextInput';
import FAB from '../components/FAB';

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

    createNewChat = () => {
        this.closeCreateGroupBottomSheet()

        // let color = 'rgb(' + (Math.floor(Math.random() * 256))
        //     + ',' + (Math.floor(Math.random() * 256)) + ','
        //     + (Math.floor(Math.random() * 256)) + ')';

        // let chat = {
        //     title: "Mumbai Group",
        //     color: color,
        // }

        // database()
        //     .ref(CHAT_DB)
        //     .push(chat)
        //     .then(() => {
        //         console.log('Data set.')
        //         this.closeCreateGroupBottomSheet()
        //     });
    }

    openCreateGroupBottomSheet = () => {
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

    renderCreateGroupBottomSheet = () => {
        return (<RBSheet
            ref={ref => {
                this.RBSheet = ref;
            }}
            customStyles={{
                container: {
                    paddingTop: 24,
                    paddingHorizontal: 16,
                    backgroundColor: '#232323'
                }
            }}
        >
            <Text style={{
                fontFamily: 'poppins_semibold',
                fontSize: 24,
                marginBottom: 16
            }}>Create New Group</Text>
            <CustomTextInput
                value={this.state.groupName}
                placeholder={"Enter group name"}
                icon={require('../assets/icons/group.png')} />
            <CustomButton
                style={{ marginTop: 32 }}
                text={"Create Now"}
                onPress={this.createNewChat} />
        </RBSheet>)
    }



    render = () => {
        return (
            <View style={styles.container} >
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

