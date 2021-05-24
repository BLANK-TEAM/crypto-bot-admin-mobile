/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import Icon from "react-native-vector-icons/Ionicons";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {BottomTabParamList, UsersParamList, QuestionsParamList} from '../types';
import UsersScreen from "../screens/UsersScreen";
import UserInfoAndUpdateScreen from "../screens/UserInfoAndUpdateScreen";
import QuestionsScreen from "../screens/QuestionsScreen";
import NewAnswerScreen from "../screens/NewAnswerScreen";

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
                    tabBarIcon: ({color}) => <Icon name="people-outline" color={color} size={30}/>,
                }}
            />
            <BottomTab.Screen
                name="Questions"
                component={QuestionsNavigator}
                options={{
                    tabBarIcon: ({color}) => <Icon name="help-circle-outline" color={color} size={30}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Icon>['name']; color: string }) {
    return <Icon size={30} style={{marginBottom: -3}} {...props} />;
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

const QuestionsStack = createStackNavigator<QuestionsParamList>();

function QuestionsNavigator() {
    return (
        <QuestionsStack.Navigator>
            <QuestionsStack.Screen
                name="QuestionsScreen"
                component={QuestionsScreen}
                options={{headerTitle: 'Поддержка'}}
            />
            <QuestionsStack.Screen
                name="AnswerScreen"
                component={NewAnswerScreen}
                options={{headerTitle: 'Ответить на обращение'}}
            />
        </QuestionsStack.Navigator>
    );
}
