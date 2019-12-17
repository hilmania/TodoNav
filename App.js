import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as SQLite from 'expo-sqlite';

import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import ListTodo from './components/ListTodo';

const AppNavigator = createStackNavigator(
  {
  AddScreen: {
    screen: AddTodo,
  },
  EditScreen: {
    screen: EditTodo,
  },
  ListScreen: {
    screen: ListTodo,
  }
}, {
  initialRouteName: 'ListScreen',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
});

const AppContainer = createAppContainer(AppNavigator);
const db = SQLite.openDatabase("todo.db");

export default class App extends Component {

  constructor() {
    super();
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS todos (id integer primary key not null, done text,value text);"
      );
    });
  }

  render() {
    return (
      <AppContainer/>
    );
  }
}