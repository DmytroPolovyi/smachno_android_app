import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { FirstHeader } from '../../components/headerComponent/firstHeader';
import { addFavoriteItem, deleteFavoriteItem, getFavoriteRecipe } from '../../reducers/favorite';
import { FavoriteCategory } from './favoriteCategory';

class Favorite extends Component {
  state = {
    arr: [],
  }

  componentDidMount() {
    if (this.props.favorite) {
      this.getCategoryId(this.props.favorite)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.favorite !== this.props.favorite) {
      this.getCategoryId(this.props.favorite)
    }
  }

  getCategoryId = (array) => {
    let arr = [];
    array.map(item => {
      if (item.value !== false) {
        arr.push(item.value.category_id)
      }
    });
    let categoryId = Array.from(new Set(arr)).sort((a, b) => (a - b))
    this.setState({
      arr: categoryId
    })
  }

  render() {
    const favorite = this.props.favorite
    const props = this.props
    return (
      <View style={ styles.container }>
        <FirstHeader title={ 'Избранное' } navigation={ props.navigation } search={ false }/>
        <ScrollView>
          { (favorite) && this.state.arr.map(categoryId => {
            return (
              <FavoriteCategory key={ categoryId } favorite={ props.favorite } categoryId={ categoryId }
                                navigation={ props.navigation }
                                addFavoriteItem={ props.addFavoriteItem }
                                deleteFavoriteItem={ props.deleteFavoriteItem }
                                categoryName={ props.categoryName }/>
            )
          }) }
          { (favorite === null || favorite.filter(item => item.value !== false).length === 0) &&
          <View style={ styles.favBlock }>
            <Image source={ require('../../../assets/searchPovar.png') } style={ {width: 150, height: 300} }/>
            <Text style={ styles.text }>
              В избранном нет блюд, добавьте что-нибудь.
            </Text>
          </View> }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  favBlock: {
    width: '50%',
    alignItems: 'center',
    marginHorizontal: '25%',
    marginTop: 40
  },
  text: {
    fontSize: 18,
    paddingTop: 15,
    textAlign: 'center'
  }
});

const mapStateToProps = state => {
  return {
    favorite: state.favorite.favorite,
    favoriteRecipe: state.favorite.favoriteRecipe,
    categoryName: state.app.categoryName
  }
}

export default connect(mapStateToProps, {getFavoriteRecipe, addFavoriteItem, deleteFavoriteItem})(Favorite);