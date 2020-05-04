import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const SaveInShoppingList = ({addShoppingItem, state}) => {
  const recipeShopList = {
    recipeId: state.recipeId, recipeTitle: state.recipeTitle,
    shopList: (state.shopList) ?
      state.shopList.filter(item => {
        return item.value !== false
      }) : null
  }
  return (
    <TouchableOpacity style={ styles.wrapper } onPress={ () => {
      addShoppingItem(recipeShopList)
    } }>
      <Text style={ styles.text }>
        Сохранить в список покупок
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#008c00',
    width: 300,
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    left: '50%',
    marginLeft: -150
  },
  text: {
    paddingVertical: 15,
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  },
});
