import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import moment from 'moment';
import {useNavigation} from "@react-navigation/native";

type TUserProps = {
    Username: string;
    next_date_payment: Date;
    id: string;
    balance: number;
    isPaid: boolean;
    refs: number;
    refProc: string;
}

export default function User(props: TUserProps) {
    const navigation = useNavigation();
    const date = moment(props.next_date_payment).format('L');

    return (
        <TouchableOpacity
            style={{ borderRadius: 10, backgroundColor: '#363636', marginVertical: 10, minHeight: 70 }}
            onPress={() => navigation.navigate('UserInfoScreen', {
                userId: props.id,
                Username: props.Username,
                isPaid: props.isPaid,
                balance: props.balance,
                refs: props.refs,
                nextDatePayment: date,
                refProc: props.refProc
            })}
        >
            <View style={{padding: 10, justifyContent: 'space-between', flexDirection: 'row'}}>
                <View>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.Username}</Text>
                    <Text style={{ color: 'white', marginTop: 20 }}>Subscription expires in: {date}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name={"eye-outline"} color={'white'} size={30} />
                </View>
            </View>
        </TouchableOpacity>
    )
}