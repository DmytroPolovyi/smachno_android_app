import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addFavoriteItem, deleteFavoriteItem } from '../../reducers/favorite';
import { addShoppingItem } from '../../reducers/shoppingList';
import RecipeContainer from '../recipe';


class SubCategoryItemRecipe extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.route.params !== this.props.route.params) {
      this.setState({
        showComponent: 1,
      })
    }
  }

  render() {
    const params = this.props.route.params
    const pr = this.props
    return (
      <View style={ styles.container }>
        <RecipeContainer navigation={ this.props.navigation }
                         color={ params.props.color }
                         item={ params.props }
                         addFavoriteItem={ pr.addFavoriteItem }
                         deleteFavoriteItem={ pr.deleteFavoriteItem }
                         addShoppingItem={ pr.addShoppingItem }
                         shopList={ pr.shopList }
                         favorite={ pr.favorite }
        />
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
  }
}


export default connect(mapStateToProps, {
  addFavoriteItem,
  deleteFavoriteItem,
  addShoppingItem
})(SubCategoryItemRecipe);