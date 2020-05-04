import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export const RecipeImage = ({image}) => {
  return (
    <View style={ styles.wrapper }>
      <Image source={ {uri: image} }
             style={ {
               width: '100%', height: 250,
             } }/>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%'
  },
});
