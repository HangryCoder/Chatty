import React from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ALL_GROUPS } from './constants';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

class App extends React.Component {

    render = () => {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={HomeScreen}
                        options={{
                            headerShown: false,
                            // title: ALL_GROUPS,
                            // headerStyle: {
                            //     backgroundColor: '#2A2A2A',
                            //     fontFamily: 'poppins_semibold',
                            //     padding: 8
                            // },
                            // headerTintColor: '#ffffff',
                            // headerTitleStyle: {
                            //     fontFamily: 'poppins_semibold',
                            //     fontSize: 24,
                            // },
                        }}
                    />
                    <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App