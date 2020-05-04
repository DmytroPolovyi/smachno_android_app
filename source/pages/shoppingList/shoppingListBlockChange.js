import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const ShoppingListBlockChange = ({deleteItem, selectedShopList, recipeId, state}) => {
  return (
    <View style={ styles.wrapper }>
      <ShoppingListBlockItemChange title={ 'Удалить список' } value={ recipeId }
                                   method={ deleteItem }/>
      <ShoppingListBlockItemChange title={ 'Удалить выбранное' } value={ state }
                                   method={ selectedShopList }/>
    </View>
  )
}

const ShoppingListBlockItemChange = ({title, method, value}) => {
  return (
    <TouchableOpacity style={ styles.item }
                      onPress={ () => {
                        method(value)
                      } }>
      <Text>{ title }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '50%',
    backgroundColor: '#eeeeee',
    position: 'absolute',
    right: 0,
    top: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20
  }
});

