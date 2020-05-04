import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addFavoriteItem, deleteFavoriteItem } from '../../reducers/favorite';
import RecipeContainer from '../recipe';
import { cleanRecipe, getSearchRecipe } from '../../reducers/search';
import { PreloaderWrapper } from '../../components/preloader';

class ShowSearchRecipe extends React.Component {
  componentDidMount() {
    this.props.getSearchRecipe(this.props.route.params.recipeId)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.route.params !== this.props.route.params) {
      this.props.cleanRecipe()
      this.props.getSearchRecipe(this.props.route.params.recipeId)
    }
  }

  render() {
    const props = this.props
    if (!props.searchRecipe) {
      return <PreloaderWrapper/>
    }
    return (
      <View style={ styles.container }>
        <RecipeContainer navigation={ props.navigation }
                         color={ props.searchRecipe.color }
                         item={ props.searchRecipe }
                         addFavoriteItem={ props.addFavoriteItem }
                         deleteFavoriteItem={ props.deleteFavoriteItem }
                         addShoppingItem={ props.addShoppingItem }
                         shopList={ props.shopList }
                         favorite={ props.favorite }/>
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
    searchRecipe: state.search.searchRecipe
  }
}

export default connect(mapStateToProps, {
  addFavoriteItem,
  deleteFavoriteItem,
  getSearchRecipe,
  cleanRecipe
})(ShowSearchRecipe);