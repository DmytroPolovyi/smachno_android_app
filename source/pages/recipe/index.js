import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderRecipe } from './header/headerRecipe';
import { ThirdHeader } from '../../components/headerComponent/thirdHeader';
import { RecipeInfo } from './recipeInfo';
import { Recipe } from './recipe';
import { Ingredients } from './ingridients/ingredients';

class RecipeContainer extends React.Component {

  state = {
    showComponent: 1,
  }

  showComponent = (value) => {
    this.setState({
      showComponent: value
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.item !== this.props.item) {
      this.setState({
        showComponent: 1,
      })
    }
  }

  render() {
    const props = this.props
    return (
      <View style={ styles.container }>
        <ThirdHeader navigation={ props.navigation } color={ props.color } item={ props.item }
                     deleteFavoriteItem={ props.deleteFavoriteItem }
                     favorite={ props.favorite } addFavoriteItem={ props.addFavoriteItem }/>
        <HeaderRecipe showComponentState={ this.state.showComponent }
                      showComponent={ this.showComponent } color={ props.color }/>
        { +this.state.showComponent === 1 &&
        <RecipeInfo { ...props.item }/> }
        { +this.state.showComponent === 2 &&
        <Ingredients image={ props.item.image } ingredients={ props.item.ingredients }
                     recipe={ props.item } addShoppingItem={ props.addShoppingItem }
                     shopList={ props.shopList }/> }
        { +this.state.showComponent === 3 &&
        <Recipe image={ props.item.image } steps={ props.item.steps }/> }
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

export default RecipeContainer;