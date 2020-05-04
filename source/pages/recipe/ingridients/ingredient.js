import React from 'react';
import { StyleSheet, Text, CheckBox, TouchableOpacity } from 'react-native';

export const Ingredient = ({item, setForShopList, value, key}) => {
  const val = value[0] ? value[0].value : false
  return (
    <TouchableOpacity style={ styles.item } key={ key }>
      <Text>
        { `${ item.ingredient } - ${ item.amount }` }
      </Text>
      { !val && <CheckBox value={ val } onValueChange={ () => {
        setForShopList(item.id, true, item)
      } }/> }
      { val && <CheckBox value={ val } onChange={ () => {
        setForShopList(item.id, false, item)
      } }/> }
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'space-between',
  }
});
