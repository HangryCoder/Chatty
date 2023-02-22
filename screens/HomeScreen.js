import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GroupItem from '../components/GroupItem'

function HomeScreen(props) {
    return (
        <View style={styles.container}>
            <GroupItem icon="sjkdfbjsd" memberCount={10} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
    }
})

export default HomeScreen;

