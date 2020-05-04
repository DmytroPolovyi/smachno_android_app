import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TitleBlock from './titleBlock';
import { DrawerActions } from '@react-navigation/native';

const CategoriesItems = ({title, color, picture, subcategories, navigation}) => {

  const [ dropMode, setDropMode ] = useState(false)

  const changeDropMode = () => {
    if (!dropMode) {
      setDropMode(true)
    } else {
      setDropMode(false)
    }
  };

  return (
    <View style={ styles.wrapper }>
      <TitleBlock title={ title } color={ `#${ color }` } picture={ picture } dropMode={ changeDropMode }/>
      { dropMode && <View style={ {backgroundColor: `#${ color }`, width: '96%',} }>
        { subcategories.map(item => {
          return (
            <TouchableOpacity key={ item.id } style={ styles.item }
                              onPress={ () => {
                                navigation.dispatch(DrawerActions.jumpTo('OutlineSubCategory',
                                  {category: item.id, color: `#${ color }`, title: item.title}))
                              } }>
              <Text style={ styles.itemText }>{ item.title }</Text>
              <Text style={ styles.itemCount }>{ item.recipes_count }</Text>
            </TouchableOpacity>
          )
        }) }
      </View> }
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'white',

  },
  itemText: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: '80%'
  },
  itemCount: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center'
  }
});

export default CategoriesItems;