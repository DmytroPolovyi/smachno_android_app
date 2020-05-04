import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addFavoriteItem, deleteFavoriteItem } from '../../reducers/favorite';
import { getLuckRecipe } from '../../reducers/home';
import RecipeContainer from '../recipe';
import { addShoppingItem } from '../../reducers/shoppingList';

class LuckRecipe extends React.Component {
  componentDidMount() {
    this.props.getLuckRecipe()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.route.params !== prevProps.route.params) {
      this.props.getLuckRecipe()
      this.setState({
        showComponent: 1,
      })
    }
  }

  render() {
    const pr = this.props
    return (
      <View style={ styles.container }>
        <RecipeContainer navigation={ this.props.navigation }
                         color={ pr.luckRecipe.color }
                         item={ pr.luckRecipe }
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
  getLuckRecipe,
  addShoppingItem
})(LuckRecipe);