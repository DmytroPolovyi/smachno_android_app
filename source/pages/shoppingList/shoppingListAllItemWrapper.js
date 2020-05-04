import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { ShoppingListRecipeAllItem } from './shoppingListAllItem';
import { ShoppingListBlockChange } from './shoppingListBlockChange';

export class ShoppingListAllItemWrapper extends React.Component {
  state = {
    visibility: false,
    selectedIngredient: null,
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
      const recipeInArr = this.state.selectedIngredient.some(item => (
        item.recipeId === recipeId
      ))
      if (recipeInArr) {
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
              }), ...prevState.selectedIngredient.filter(item => {
                return +item.recipeId !== +recipeId
              }) ]
          }))
      } else {
        this.setState(
          (prevState) => ({
            selectedIngredient:
              [ ...prevState.selectedIngredient, {
                recipeId: recipeId,
                item: [ {id: id, value: val} ]
              } ]
          }))
      }
    }
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

  deleteAllItem = () => {
    this.props.deleteAllItem()
    this.changeVisibility()
  }

  selectedShopList = (value) => {
    this.props.selectedShopList(value)
    this.changeVisibility()
  }

  render() {
    const itemShopListLength = this.props.shopList.some(item => item.shopList.length > 0)
    return (
      <View style={ {position: 'relative'} }>
        <View style={ styles.wrapper }>
          { (this.props.shopList && this.props.shopList.length >= 1 && itemShopListLength) &&
          <ShoppingListItemHeader changeVisibility={ this.changeVisibility } title={ 'Все' }/>
          }

          { this.state.visibility &&
          <ShoppingListBlockChange deleteItem={ this.deleteAllItem } recipeId={ '' }
                                   selectedShopList={ this.selectedShopList }
                                   state={ this.state.selectedIngredient }/>

          }
          { this.props.shopList.filter(item => {
            return item.shopList !== null && item.shopList.length > 0
          }).map(item => {
            return (
              <ShoppingListRecipeAllItem key={ item.recipeId } item={ item } navigation={ this.props.navigation }
                                         deleteItem={ this.props.deleteItem }
                                         recipeId={ item.recipeId }
                                         selectedShopList={ this.props.selectedShopList }
                                         selectedIngredient={ this.state.selectedIngredient }
                                         setSelectedIngredientFN={ this.setSelectedIngredient }
              />
            )
          }) }
        </View>
      </View>
    )
  }
}

const ShoppingListItemHeader = ({changeVisibility, title}) => {
  return (
    <View style={ styles.titleWrapper }>
      <Text style={ styles.title }>
        { title }
      </Text>
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
    paddingBottom: 20,

  },
  titleWrapper: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  title: {
    fontSize: 18,
    fontWeight: '700'
  }
});
