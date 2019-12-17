import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("todo.db");

export default class AddTodo extends Component {
    static navigationOptions = {
        title: 'Add Todo',
    };

    state = {
        val: '',
        done: 'OnProgress',
        todo: []
    }

    tambahTodo = () => {
        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO todos (done, value) VALUES (?,?)", [this.state.done,this.state.val]);
            },
            error => {
                alert(error);
            },
            () => {
                this.setState({val:'', done: 'OnProgress'})
                this.props.navigation.push('ListScreen')
            }
        );
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.innerStyle}>
                    <TextInput
                        value={this.state.val}
                        onChangeText={(val) => this.setState({ val })}
                        style={styles.inputStyle}/>
                    <Picker
                        style={styles.inputStyle}
                        selectedValue={this.state.done}
                        onValuechange={(itemValue, itemIndex) =>
                            this.setState({done:itemValue})}>
                        <Picker.Item label="OnProgress" value="OnProgress"/>
                        <Picker.Item label="Done" value="Done"/>
                    </Picker>
                    <Button 
                        onPress={this.tambahTodo}
                        title="Simpan Todo" />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'stretch'
    },
    innerStyle: {
        margin: 40
    },
    textStyle: {
        fontSize: 20
    },
    inputStyle: {
        height: 40,
        borderColor: 'blue',
        borderWidth:1, 
        marginBottom:20
    }
});