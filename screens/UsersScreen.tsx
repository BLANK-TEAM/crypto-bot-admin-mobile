import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {View, FlatList, SafeAreaView} from 'react-native';

import {SearchBar} from "react-native-elements";

import axios, { AxiosResponse } from 'axios';
import User from "../components/Users/User";

export default function UsersScreen() {
    const [username, setUsername] = useState<string>('');
    const [users, setUsers] = useState<Array<any>>([]);
    const [filteredUsers, setFilteredUsers] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        axios.get('https://crypto-bot-node-api.herokuapp.com/api/users').
        then((res: AxiosResponse) => {
            setUsers(res.data.users);
            setFilteredUsers(res.data.users);
        })
    }, [])

    const fetchUsers = () => {
        setLoading(true);
        axios.get('https://crypto-bot-node-api.herokuapp.com/api/users').
        then((res: AxiosResponse) => {
            setUsers(res.data.users);
            setFilteredUsers(res.data.users);
            setLoading(false);
        })
    }

    const searchUser = (text: string) => {
        setUsername(text);
        setFilteredUsers(users.filter(i => i.Username.toLowerCase().includes(text.toLowerCase())));
    };

    return (
        <View style={styles.container}>
            <SearchBar
                searchIcon={{size: 24}}
                onChangeText={(text) => searchUser(text)}
                onClear={() => setUsername('')}
                value={username}
                platform={"default"}
                containerStyle={{backgroundColor: 'black'}}
                placeholder={"Search"}
            />
            {/*<Users/>*/}
            <SafeAreaView style={{padding: 10, flex: 1}}>
                <FlatList
                    data={filteredUsers}
                    renderItem={({ item }) =>
                        <User
                            Username={item.Username}
                            next_date_payment={item.next_date_payment}
                            id={item._id}
                            isPaid={item.is_paid}
                            balance={item.Balance}
                            refs={item.Refs}
                            refProc={item.RefProc}
                        />}
                    keyExtractor={item => item.UserID}
                    refreshing={loading}
                    onRefresh={fetchUsers}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
