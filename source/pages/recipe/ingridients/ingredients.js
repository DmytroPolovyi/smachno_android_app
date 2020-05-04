import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { RecipeImage } from '../recipeImage';
import { Ingredient } from './ingredient';
import { SaveInShoppingList } from './saveInShoppingList';


export class Ingredients extends React.Component {
  state = {
    shopList: null,
    recipeId: this.props.recipe.id,
    recipeTitle: this.props.recipe.title,
  }

  componentDidMount() {
    this.synchronizeState()
  }

  synchronizeState = () => {
    if (this.props.shopList !== null) {
      this.props.shopList.map(item => {
        if (+item.recipeId === +this.props.recipe.id) {
          this.setState({
            shopList: item.shopList
          })
        }
      })
    }
  }

  setForShopList = (id, val, ingredient) => {
    this.setState(
      (prevState, nextProps) => ({
        shopList: (prevState.shopList === null) ? [ {id: id, value: val, item: ingredient} ] :
          [ ...prevState.shopList.filter(item => item.id !== id), {id: id, value: val, item: ingredient} ]
      }))
  }

  render() {
    return (
      <View style={ styles.wrapper }>
        <ScrollView>
          <RecipeImage image={ this.props.image }/>
          <View style={ styles.items }>
            { this.props.ingredients.map(item => (
              <Ingredient item={ item } key={ item.id } setForShopList={ this.setForShopList }
                          value={ (this.state.shopList !== null) ? this.state.shopList.filter(i => {
                            return +i.id === +item.id
                          }) : false }/>
            )) }
          </View>
        </ScrollView>
        <SaveInShoppingList addShoppingItem={ this.props.addShoppingItem } state={ this.state }/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 3,
    width: '100%',
  },
  items: {
    marginTop: 20,
    marginBottom: 70
  }
});
