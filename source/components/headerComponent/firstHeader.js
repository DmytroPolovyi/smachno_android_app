import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

export const FirstHeader = ({
                              title, navigation, search = true, searchFilter = false,
                              filterList = false, showAllIngredient,
                            }) => {
  return (
    <View style={ styles.header }>
      <View style={ styles.leftBlock }>
        <TouchableOpacity onPress={ () => {
          navigation.openDrawer()
        } }>
          <Ionicons name='md-menu' size={ 28 } color='white'/>
        </TouchableOpacity>
        <Text style={ styles.text }>
          { title }
        </Text>
      </View>
      { search && <TouchableOpacity onPress={ () => {
        navigation.dispatch(DrawerActions.jumpTo('Search', {discharge: 'discharge'}))
      } }>
        <Ionicons name='md-search' size={ 28 } color='white'/>
      </TouchableOpacity> }
      { filterList && <TouchableOpacity onPress={ () => {
        showAllIngredient()
      } }>
        <MaterialIcons name='filter-list' size={ 28 } color='white'/>
      </TouchableOpacity> }
      { searchFilter && <TouchableOpacity>
        <MaterialCommunityIcons name='filter' size={ 28 } color='white'/>
      </TouchableOpacity> }
    </View>

  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: '#008c00',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  leftBlock: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    paddingLeft: 40,
    fontWeight: '700',
    color: 'white'
  },
});


