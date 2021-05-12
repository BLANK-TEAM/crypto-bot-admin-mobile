/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {BottomTabParamList, UsersParamList} from '../types';
import UsersScreen from "../screens/UsersScreen";
import UserInfoAndUpdateScreen from "../screens/UserInfoAndUpdateScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Users"
            tabBarOptions={{
                activeTintColor: Colors[colorScheme].tint,
                showLabel: false,
                keyboardHidesTabBar: true
            }}>
            <BottomTab.Screen
                name="Users"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({color}) => <Ionicons name="people-outline" color={color} size={30}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const UsersStack = createStackNavigator<UsersParamList>();

function UserNavigator() {
    return (
        <UsersStack.Navigator>
            <UsersStack.Screen
                name="UsersScreen"
                component={UsersScreen}
                options={{headerTitle: 'Пользователи'}}
            />
            <UsersStack.Screen
                name="UserInfoScreen"
                component={UserInfoAndUpdateScreen}
                options={{
                    headerShown: false
                }}
            />
        </UsersStack.Navigator>
    );
}
