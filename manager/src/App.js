
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyCLEe5OoMzGbNT0APpR24XD47Myr8YHRAE",
      authDomain: "manager-80ef8.firebaseapp.com",
      databaseURL: "https://manager-80ef8.firebaseio.com",
      projectId: "manager-80ef8",
      storageBucket: "",
      messagingSenderId: "920117572039"
    };

    firebase.initializeApp(config);
  }

  render() {
    // second argument is initial state
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
