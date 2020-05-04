import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

export const Preloader = () => {
  return (
    <View style={ styles.container }>
      <Image source={ require('../../../assets/preloader.gif') }
             style={ {width: 30, height: 30} }/>
    </View>
  );
}

export const PreloaderWrapper = () => {
  return (
    <View style={ styles.preloaderWrapper }>
      <Preloader/>
    </View>
  )
}
const styles = StyleSheet.create({
  preloaderWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  container: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'absolute',
    top: '20%',
    zIndex: 100,
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  }
});
