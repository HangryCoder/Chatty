import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './src/screens/ChatScreen'

const Stack = createNativeStackNavigator();

class App extends React.Component {

    render = () => {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App