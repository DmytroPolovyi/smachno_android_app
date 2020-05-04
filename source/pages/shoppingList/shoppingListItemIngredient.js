import React from 'react';
import { View, Text, StyleSheet, CheckBox } from 'react-native';

export const ShoppingListItemIngredient = ({ingredient, setSelectedIngredient, value, recipeId}) => {
  return (
    <View style={ styles.ingredient }>
      <Text
        style={ [ styles.text, value && styles.deleteIngredient ] }>
        { `${ ingredient.item.ingredient } - ${ ingredient.item.amount }` }
      </Text>
      { !value && <CheckBox value={ value }
                            onValueChange={ () => {
                              setSelectedIngredient(recipeId, ingredient.id, true)
                            } }/> }
      { value && <CheckBox value={ value }
                           onValueChange={ () => {
                             setSelectedIngredient(recipeId, ingredient.id, false)
                           } }/> }
    </View>
  )
}

const styles = StyleSheet.create({
  ingredient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  deleteIngredient: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  text: {
    fontSize: 16
  }
});