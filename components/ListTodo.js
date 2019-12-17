import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import ActionButton from 'react-native-action-button';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todo.db');

export default class ListTodo extends Component {
    static navigationOptions = {
        title: 'List Todo',
        headerLeft: null
    };

    state = {
        todo : []
    }

    constructor() {
        super();
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM todos', null, (_, { rows: { _array } }) => this.setState({ todo: _array })
            );
        });
    }
    render(){
        const {navigation} = this.props;

        return (
            <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={this.state.todo}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity key={item.id} 
                                style={{height:40}}>
                                    <Text
                                    onPress={()=> this.props.navigation.navigate('EditScreen', {
                                        id:item.id,
                                        text: item.value,
                                        done: item.done
                                    })}
                                    style={{fontSize:20, marginLeft:20}}>
                                        {'\u2022'} {item.value} - {item.done} 
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={item => item.id}/>
                </SafeAreaView>
                <ActionButton buttonColor="rgba(231,76,60,1)"
                onPress={()=> this.props.navigation.navigate('AddScreen')}/>
            </View>
        )
    }
 }

 const styles = StyleSheet.create({
     container: {
         flex: 1,
         marginTop: Constants.statusBarHeight,
     },
     item: {
         backgroundColor: '#f9c2ff',
         padding: 20,
         marginVertical: 8,
         marginHorizontal: 16,
     },
     title: {
         fontSize: 32,
     },
 });