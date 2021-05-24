import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
    Alert
} from 'react-native';
import {Button, CheckBox, LinearProgress} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import axios, {AxiosResponse} from 'axios';

// @ts-ignore
export default function UserInfo({route}: RouteProp<{
    params: {
        userId: any,
        Username: string,
        isPaid: boolean,
        balance: number,
        refs: number,
        nextDatePayment: Date,
        refProc: string
    }
}, 'params'>) {
    const {Username, userId, isPaid, balance, refs, nextDatePayment, refProc} = route.params;
    const [username, setUsername] = useState<string>('');
    const [refPercentage, setRefPercentage] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    let subsRefProc = refProc.substring(0, refProc.length - 1);

    const navigation = useNavigation();

    useEffect(() => {
        setUsername(Username);
        setRefPercentage(subsRefProc);
        setChecked(isPaid);
    }, [])

    const save = () => {
        setLoading(true);
        axios.patch(`https://crypto-bot-node-api.herokuapp.com/api/users/${userId}`, {
            refProc: `${refPercentage}%`,
            isPaid: checked
        }).then((res: AxiosResponse) => {
            setLoading(false);
            navigation.goBack();
        })
    };

    const deleteAccount = () => {
        setLoading(true);
        axios.delete(`https://crypto-bot-node-api.herokuapp.com/api/users/${userId}`)
            .then((res: AxiosResponse) => {
                setLoading(false);
                navigation.goBack();
            })
    }

    const firstPressDelete = () => {
        Alert.alert(
            "Verify delete",
            "Are you sure to delete this account?",
            [
                {
                    text: "Cancel",
                    onPress: () => Alert.alert("Cancel"),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => deleteAccount(),
                    style: "default"
                }
            ]
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name={"close-outline"} size={30} color={'white'}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={save}>
                    <Text style={styles.textBtn}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }}>
                    <Image
                        source={{uri: 'https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'}}
                        style={{
                            width: 90,
                            height: 90,
                            borderRadius: 90,
                        }}
                    />
                </View>
                <View style={{marginTop: 70}}>
                    {loading ? <LinearProgress color="secondary"/> : null}
                    <View style={{marginVertical: 10}}>
                        <Text style={{color: '#dbdbdb', fontSize: 16, fontWeight: 'bold'}}>Username</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={username}
                            placeholderTextColor={'gray'}
                            value={username}
                            onChangeText={(value) => setUsername(value)}
                            editable={false}
                        />
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Text style={{color: '#dbdbdb', fontSize: 16, fontWeight: 'bold'}}>Referral percentage %</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={refPercentage}
                            placeholderTextColor={'gray'}
                            value={refPercentage}
                            onChangeText={(value) => setRefPercentage(value)}
                        />
                    </View>
                </View>
            </View>
            <View style={{flexDirection: 'row', padding: 5}}>
                <CheckBox
                    title={"Is paid"}
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    size={30}
                    textStyle={{color: 'black', fontWeight: 'bold', fontSize: 16}}
                />
            </View>
            <View style={{padding: 15}}>
                <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Balance: {balance}</Text>
                <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Referrals: {refs}</Text>
                <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', marginTop: 15}}>Next
                    payment: {nextDatePayment}</Text>
            </View>
            <View style={{padding: 15, width: '100%'}}>
                <Button
                    title={"Delete Account"}
                    titleStyle={{ color: 'red' }}
                    buttonStyle={{ borderColor: 'red' }}
                    type={"outline"}
                    onPress={() => firstPressDelete()}
                    TouchableComponent={TouchableOpacity}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 15,
        marginTop: 40,
    },
    textBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black'
    },
    btn: {
        backgroundColor: 'white',
        borderRadius: 30,
    },
    mainContainer: {
        padding: 15,
        width: '100%',
        marginTop: 10
    },
    textInput: {
        color: 'white',
        fontSize: 18,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        minHeight: 50
    }
})