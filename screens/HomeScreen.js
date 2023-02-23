import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import GroupItem from '../components/GroupItem'

const data = [
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
];

class HomeScreen extends React.Component {

    renderItemSeparator = () => {
        return <View style={styles.itemSeparator} />
    }

    renderGroupList = () => {
        return <FlatList
            ItemSeparatorComponent={this.renderItemSeparator()}
            data={data}
            renderItem={({ item }) => <GroupItem group={item} />}
            keyExtractor={item => item.id}
        />
    }

    render = () => {
        return (
            <View style={styles.container} >
                {this.renderGroupList()}
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

