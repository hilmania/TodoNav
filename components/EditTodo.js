import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';
import { supportsOrientationLockAsync} from 'expo/build/ScreenOrientation/ScreenOrientation';

const db = SQLite.openDatabase('todo.db');

export default class EditTodo extends Component {
    static navigationOptions = {
        title: 'Edit Todo',
    };
    state = {
        id: '',
        text: '',
        done: 'OnProgress'
    }

    constructor(){
        super();
    }

    componentDidMount(){
        this.setState({id: this.props.navigation.getParam('id', ''),
            text: this.props.navigation.getParam('text', ''),
            done: this.props.navigation.getParam('done', '')
        });
    }

    editTodo = () => {
        db.transaction(
            tx => {
                tx.executeSql("UPDATE todos SET done=?, value=? WHERE id=?", [this.state.done, this.state.text, this.state.id]);
            },
            error => {
                alert(error);
            },
            () => {
                this.setState({text:'', done: 'OnProgress'})
                this.props.navigation.push('ListScreen')
            }
        );
    }

    hapusTodo = () => {
        Alert.alert(
            'Konfirmasi',
            'Menghapus data?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',

                },
                {
                    text: 'OK', 
                    onPress: () => {
                        db.transaction(
                            tx => {
                                tx.executeSql("DELETE FROM todos WHERE id=?", [this.state.id]);
                            },
                            error => {
                                alert(error);
                            },
                            () => {
                                this.props.navigation.push('ListScreen')
                            }
                        );
                    }
                },
            ],
            {cancelable: true},
        );
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.innerStyle}>
                    <TextInput
                        value={this.state.text}
                        onChangeText={(text) => this.setState({ text })}
                        style={styles.inputStyle}/>
                    <Picker 
                        style={styles.inputStyle}
                        selectedValue={this.state.done}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({done: itemValue})}>
                        <Picker.Item label="OnProgress" value="OnProgress"/>
                        <Picker.Item label="Done" value="Done"/>
                    </Picker>
                    <View style={{marginBottom:10}}>
                    <Button
                        onPress={this.editTodo}
                        title="Ubah Todo"/>
                    </View>
                    <View>
                        <Button
                        onPress={this.hapusTodo}
                        title="Hapus Todo"/>
                    </View>
                </View>
            </View>
        )
    }
 }

 const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderWidth: 1,
        marginBottom: 20
    }
 });