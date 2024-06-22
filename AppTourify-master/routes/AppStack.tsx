import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../pages/MainScreen';
import useAuth from '../hooks/useAuth';
import LogoutButton from "../components/LogoutButton";


const Stack = createNativeStackNavigator();

function AppStack() {
    const { logout } = useAuth();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
            name="MainMenu" 
            component={MainScreen} 
            />
        </Stack.Navigator>
    );
}

export default AppStack;
