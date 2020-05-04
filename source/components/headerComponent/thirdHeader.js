import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FavoriteDish } from '../favoriteComponent/favoriteDish';
import { OnShare } from '../onShare';

export const ThirdHeader = ({
                              navigation, color = '333333', title = 'Smachno', item, favoritePopUp, deleteFavoriteItem,
                              favorite, addFavoriteItem
                            }) => {
  console.log()
  return (
    <View style={ {backgroundColor: `#${ color }`, width: '100%'} }>
      <View style={ styles.wrapper }>
        <View style={ styles.leftBlock }>
          <TouchableOpacity style={ styles.navigation } onPress={ () => {
            navigation.goBack()
          } }>
            <Ionicons name={ 'ios-arrow-round-back' } size={ 32 } color='white'/>
          </TouchableOpacity>
          <View style={ styles.title }>
            <Text style={ styles.text }>
              { title }
            </Text>
          </View>
        </View>
        <View style={ styles.rightBlock }>
          <OnShare id={ item.id }/>
          <FavoriteDish item={ item } favoritePopUp={ favoritePopUp }
                        firstColor={ '#eeeeee' } secondColor={ 'yellow' } addFavoriteItem={ addFavoriteItem }
                        deleteFavoriteItem={ deleteFavoriteItem } favorite={ favorite }
                        isFavorite={ favorite ? favorite.find(i => (
                          +i.key === +item.id && i.value !== false)) : false }/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  leftBlock: {
    flexDirection: 'row',
  },
  rightBlock: {
    flexDirection: 'row'
  },
  navigation: {
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 25,

  },
  title: {
    width: '55%',
    marginTop: 30,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'flex-end'
  }

});