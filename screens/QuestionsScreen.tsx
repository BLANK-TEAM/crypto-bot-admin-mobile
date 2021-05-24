import React, {useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {View, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import axios, {AxiosResponse} from 'axios';
import Icon from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";

export default function QuestionsScreen() {
    const [questions, setQuestions] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const navigation = useNavigation();

    useEffect(() => {
        setLoading(true);
        axios.get('https://crypto-bot-node-api.herokuapp.com/api/questions/410313013').then((res: AxiosResponse) => {
            setQuestions(res.data.questions);
            setLoading(false);
        })
    }, [])

    const fetchQuestions = () => {
        setLoading(true);
        axios.get('https://crypto-bot-node-api.herokuapp.com/api/questions/410313013').then((res: AxiosResponse) => {
            setQuestions(res.data.questions);
            setLoading(false);
        })
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{padding: 10, flex: 1}}>
                <FlatList
                    data={questions}
                    renderItem={({item}) =>
                        <View style={{borderRadius: 10, backgroundColor: '#363636', marginVertical: 10, minHeight: 70}}>
                            <View style={{padding: 10}}>
                                <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{item.username}</Text>
                                <Text style={{color: 'white'}}>{item.text}</Text>
                            </View>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#454545', borderRadius: 10 }} onPress={() => navigation.navigate('AnswerScreen', { item })}>
                                <Icon name={"eye-outline"} color={'white'} size={30} />
                            </TouchableOpacity>
                        </View>}
                    keyExtractor={item => item._id}
                    refreshing={loading}
                    onRefresh={fetchQuestions}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
