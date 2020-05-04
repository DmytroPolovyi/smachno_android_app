import React from 'react';
import { View } from 'react-native';
import { ShoppingListItemIngredient } from './shoppingListItemIngredient';

export class ShoppingListRecipeAllItem extends React.Component {
  render() {
    const props = this.props
    return (
      <View>
        { props.item.shopList.filter(ingr => {
          return ingr.value !== false
        }).map(ingredient => {

          const value = (props.selectedIngredient !== null)
            ? props.selectedIngredient.filter(obj => (obj.recipeId === props.recipeId))
              .some(e => (e.item.find(i => {
                  if (i.id === ingredient.id) {
                    return i.value
                  }
                })
              ))
            : false
          return (
            <ShoppingListItemIngredient key={ props.item.id } ingredient={ ingredient }
                                        setSelectedIngredient={ props.setSelectedIngredientFN }
                                        value={ value }
                                        recipeId={ props.recipeId }/>
          )
        }) }
      </View>
    )
  }
}
