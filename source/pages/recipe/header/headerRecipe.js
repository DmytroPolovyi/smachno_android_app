import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, } from 'react-native';

export const HeaderRecipe = ({showComponentState, showComponent, color}) => {
  return (
    <View style={ {backgroundColor: `#${ color }`} }>
      <View style={ styles.wrapper }>
        <ActivateItem active={ +showComponentState === 1 } title={ 'Инфо' }
                      activateItem={ showComponent } value={ '1' }/>
        <ActivateItem active={ +showComponentState === 2 } title={ 'Ингридиенты' }
                      activateItem={ showComponent } value={ '2' }/>
        <ActivateItem active={ +showComponentState === 3 } title={ 'Рецепт' }
                      activateItem={ showComponent } value={ '3' }/>
      </View>
    </View>
  )
}


const ActivateItem = ({activateItem, value, title, active}) => {
  return (
    <TouchableOpacity activeOpacity={ 1 }
                      style={ [ styles.item, active && styles.itemActive ] }
                      onPress={ () => {
                        activateItem(value)
                      } }>
      <Text style={ styles.text }>
        { title }
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  item: {
    width: '33%',
    paddingVertical: 15
  },
  itemActive: {
    borderBottomWidth: 2,
    borderBottomColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  }
});
