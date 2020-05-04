import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AppRouter from './source';
import { Provider as PaperProvider } from 'react-native-paper';

class App extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <PaperProvider>
          <AppRouter/>
        </PaperProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;