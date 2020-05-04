import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SubCategoryItems } from '../subCategory/subCategoryItem';
import { Ionicons } from '@expo/vector-icons';

export const FavoriteCategory = (props) => {
  const [ visibility, setVisibility ] = useState(false)
  const changeVisibility = () => {
    if (!visibility) {
      setVisibility(true)
    } else {
      setVisibility(false)
    }
  }
  return (
    <View key={ props.key } style={ styles.container }>
      <TouchableOpacity onPress={ () => {
        changeVisibility()
      } }
                        style={ [ styles.title, !visibility && styles.titleOn ] }>
        <TitleCategory categoryId={ props.categoryId } categoryName={ props.categoryName }/>
        { !visibility && <Ionicons name="ios-arrow-down" size={ 22 } color="black"/> }
        { visibility && <Ionicons name="ios-arrow-up" size={ 22 } color="black"/> }
      </TouchableOpacity>
      { visibility && props.favorite.filter(item => item.value !== false && item.value.category_id === props.categoryId)
        .map(item => {
          return (
            <View>
              <SubCategoryItems navigation={ props.navigation }
                                key={ item.key } item={ item.value }
                                addFavoriteItem={ props.addFavoriteItem }
                                deleteFavoriteItem={ props.deleteFavoriteItem }
                                favorite={ props.favorite }/>
            </View>)
        }) }
    </View>
  )
}

const TitleCategory = ({categoryId, categoryName}) => {
  return (
    <View>
      {
        Object.entries(categoryName).map(([ key, value ]) => {
          if (categoryId === +key) {
            return <Text style={ styles.text }>{ value }</Text>
          }
        })
      }
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  title: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '7%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 15,
  },
  titleOn: {
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  text: {
    fontSize: 16,
    fontWeight: '700'
  }
});
