import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { RecipeImage } from './recipeImage';

export const Recipe = ({image, steps}) => {
  return (
    <ScrollView style={ styles.wrapper }>
      <RecipeImage image={ image }/>
      <View style={ styles.items }>
        { steps.map(item => (
          <View key={ item.id } style={ styles.item }>
            <View style={ {width: '25%'} }>
              <Image source={ {uri: item.image} } style={ {width: 80, height: 80} }/>
            </View>
            <View style={ {width: '75%'} }>
              <Text style={ styles.text }>
                { item.description }
              </Text>
            </View>
          </View>
        )) }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 3,
    width: '100%'
  },
  items: {
    width: '100%',
    paddingVertical: 20,
    marginBottom: 40
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#eeeeee',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 23,

  },
});
