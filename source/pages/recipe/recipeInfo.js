import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { RecipeImage } from './recipeImage';

export const RecipeInfo = (props) => {
  return (
    <ScrollView>
      <View style={ styles.wrapper }>
        <RecipeImage image={ props.image }/>
        <View style={ styles.info }>
          <Text style={ styles.header }>
            { props.title }
          </Text>
          <Text style={ styles.text }>
            { props.description }
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%'
  },
  info: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 40
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 10
  },
  text: {
    fontSize: 16,
    lineHeight: 30,

  },
});
