import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export const FavoriteDish = ({item, firstColor, secondColor, addFavoriteItem, deleteFavoriteItem, isFavorite}) => {
  return (
    <View>
      { !isFavorite &&
      <TouchableOpacity style={ {padding: 15} } onPress={ () => {
        addFavoriteItem(item)
      } }>
        <Ionicons name={ 'md-star' } size={ 28 } color={ firstColor }/>
      </TouchableOpacity> }
      { isFavorite &&
      <TouchableOpacity style={ {padding: 15} } onPress={ () => {
        deleteFavoriteItem(item.id)
      } }>
        <Ionicons name={ 'md-star' } size={ 28 } color={ secondColor }/>
      </TouchableOpacity> }
    </View>
  )
}

