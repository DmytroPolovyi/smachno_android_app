import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { FavoriteDish } from '../../components/favoriteComponent/favoriteDish';

export const SubCategoryItems = (props) => {
  return (
    <TouchableOpacity style={ styles.item }
                      onPress={ () => {
                        props.navigation.dispatch(DrawerActions.jumpTo('SubCategoryItemRecipe',
                          {props: {...props.item}}))
                      } }>
      <View style={ {width: '90%', flexDirection: 'row'} }>
        <Image source={ {uri: props.item.image} }
               style={ {
                 width: 70, height: 70,
               } }/>
        <View style={ styles.textBlock }>
          <Text style={ styles.text }>
            { props.item.title }
          </Text>
          <Text style={ styles.textTags }>
            { props.item.tags }
          </Text>
        </View>
      </View>
      <FavoriteDish item={ props.item } firstColor={ '#eeeeee' }
                    secondColor={ 'yellow' } addFavoriteItem={ props.addFavoriteItem }
                    deleteFavoriteItem={ props.deleteFavoriteItem } favorite={ props.favorite }
                    isFavorite={ props.favorite ? props.favorite.find(i => (
                      i.key === props.item.id && i.value !== false)) : false }/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%'
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 25,
    paddingVertical: 10
  },
  textBlock: {
    paddingLeft: 15,
    width: '80%',
  },
  text: {
    fontSize: 16,
  },
  textTags: {
    fontSize: 12,
    color: '#757575'
  }
});
