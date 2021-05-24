import React from 'react';
import {View, Text} from 'react-native';

class RouteProp<T, U> {
    item: any
}

// @ts-ignore
export default function NewAnswerScreen({route}: RouteProp<{ params: { item: any } }, 'params'>) {
    const {item} = route.params;

    return (
        <View style={{flex: 1, padding: 20}}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>{item.username}</Text>
            <Text style={{color: 'white', fontSize: 16}}>{item.userID}</Text>
            <Text style={{color: 'white', fontSize: 16}}>{item.text}</Text>
            <Text style={{color: 'white', fontSize: 16}}>{item.chatID}</Text>
        </View>
    )
}