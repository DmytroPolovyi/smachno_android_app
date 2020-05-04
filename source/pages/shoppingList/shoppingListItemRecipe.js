import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addFavoriteItem, deleteFavoriteItem } from '../../reducers/favorite';
import { addShoppingItem, getRecipe } from '../../reducers/shoppingList';
import RecipeContainer from '../recipe';
import { PreloaderWrapper } from '../../components/preloader';

class ShoppingListItemRecipe extends React.Component {
  componentDidMount() {
    this.props.getRecipe(this.props.route.params.recipeId)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.route.params !== this.props.route.params) {
      this.props.getRecipe(this.props.route.params.recipeId)
      this.setState({
        showComponent: 1,
      })
    }
  }

  render() {
    const pr = this.props
    if (!pr.recipe) {
      return <PreloaderWrapper/>
    }
    return (
      <View style={ styles.container }>
        <RecipeContainer navigation={ this.props.navigation }
                         color={ pr.recipe.color }
                         item={ pr.recipe }
                         addFavoriteItem={ pr.addFavoriteItem }
                         deleteFavoriteItem={ pr.deleteFavoriteItem }
                         addShoppingItem={ pr.addShoppingItem }
                         shopList={ pr.shopList }
                         favorite={ pr.favorite }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: 'white',
    width: '100%'
  },
});

const mapStateToProps = state => {
  return {
    favorite: state.favorite.favorite,
    luckRecipe: state.app.luckRecipe,
    shopList: state.shopList.shopList,
    recipe: state.shopList.recipe
  }
}


export default connect(mapStateToProps, {
  addFavoriteItem,
  deleteFavoriteItem,
  addShoppingItem,
  getRecipe
})(ShoppingListItemRecipe);