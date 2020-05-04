import React from 'react';
import { View, StyleSheet, Text, } from 'react-native';

export const FavotitePopUp = ({value}) => {
  return (
    <View style={ styles.wrapper }>
      { (value === 0 || value === 1) &&
      <Text style={ styles.text }>
        { value === 0 && 'Удалено из избранного' }
        { value === 1 && 'Добавлено в избранное' }
      </Text> }
    </View>

  )
}


const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    width: '100%'
  },
  text: {
    position: 'absolute',
    width: 230,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    bottom: 20,
    color: 'white',
    paddingVertical: 15,
    borderRadius: 20,
  }
});

