import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { ShoppingListItemIngredient } from './shoppingListItemIngredient';
import { ShoppingListBlockChange } from './shoppingListBlockChange';

export class ShoppingListItem extends React.Component {
  state = {
    visibility: false,
    selectedIngredient: null,
  }

  changeVisibility = () => {
    if (this.state.visibility) {
      this.setState({
        visibility: false
      })
    } else {
      this.setState({
        visibility: true
      })
    }
  }
  setSelectedIngredient = (recipeId, id, val) => {
    if (this.state.selectedIngredient === null) {
      this.setState({
        selectedIngredient:
          [ {
            recipeId: recipeId,
            item: [ {id: id, value: val} ]
          } ]
      })
    } else {
      this.setState(
        (prevState) => ({
          selectedIngredient:
            [ ...prevState.selectedIngredient.filter(item => {
              return +item.recipeId === +recipeId
            }).map(item => {
              const array = item.item.filter(item => {
                return item.id !== id
              })
              array.push({id: id, value: val})
              return {recipeId: recipeId, item: array}
            }) ]
        }))
    }
  }

  deleteItem = (value) => {
    this.props.deleteItem(value)
    this.changeVisibility()
  }
  selectedShopList = (value) => {
    this.props.selectedShopList(value)
    this.changeVisibility()
  }

  render() {
    const props = this.props
    return (
      <View style={ styles.wrapper }>
        <ShoppingListItemHeader navigation={ props.navigation } item={ props.item }
                                changeVisibility={ this.changeVisibility }/>
        { this.state.visibility &&
        <ShoppingListBlockChange deleteItem={ this.deleteItem } recipeId={ props.recipeId }
                                 selectedShopList={ this.selectedShopList } state={ this.state.selectedIngredient }/> }
        { props.item.shopList.filter(ingr => {
          return ingr.value !== false
        }).map(ingredient => {

          const value = (this.state.selectedIngredient !== null)
            ? this.state.selectedIngredient.filter(obj => (obj.recipeId === props.recipeId))
              .some(e => (e.item.find(i => {
                  if (i.id === ingredient.id) {
                    return i.value
                  }
                })
              ))
            : false

          return (
            <ShoppingListItemIngredient key={ ingredient.id } ingredient={ ingredient }
                                        setSelectedIngredient={ this.setSelectedIngredient }
                                        value={ value }
                                        recipeId={ props.recipeId }/>
          )
        }) }
      </View>
    )

  }
}

const ShoppingListItemHeader = ({navigation, item, changeVisibility}) => {
  return (
    <View style={ styles.titleWrapper }>
      <TouchableOpacity style={ styles.title } onPress={ () => {
        navigation.dispatch(DrawerActions.jumpTo('ShoppingListItemRecipe',
          {recipeId: item.recipeId}))
      } }>
        <Text style={ styles.text }>{ item.recipeTitle }</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => {
        changeVisibility()
      } }>
        <Entypo name='dots-three-vertical' size={ 20 } color='black'/>
      </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: '3%',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingTop: 10,
    paddingBottom: 20
  },
  titleWrapper: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
  },
  title: {
    width: '90%'
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  }
});

