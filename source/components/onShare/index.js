import React from 'react';
import { StyleSheet, Share, Button, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const OnShare = ({id}) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `Очень рекомендую этот рецепт: http://smachno.net/recipe?id=${ id }`,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <TouchableOpacity style={ {padding: 15} } onPress={ () => {
      onShare()
    } }>
      <Ionicons name={ 'md-share' } size={ 26 } color='white'/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  random: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#008c00',
    paddingHorizontal: 20,
    bottom: 0,
    position: 'absolute'
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white'
  },
});
