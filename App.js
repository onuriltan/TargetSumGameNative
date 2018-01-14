import React from 'react';
import { Provider } from 'react-redux/src';
import { StyleSheet, Text, View } from 'react-native';

import store from "./store"

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
