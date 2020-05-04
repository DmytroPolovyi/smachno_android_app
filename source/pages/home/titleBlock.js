import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const TitleBlock = ({title, color, picture, dropMode}) => {
  return (
    <TouchableOpacity style={ {
      flexDirection: 'row',
      backgroundColor: color,
      width: '96%',
      height: 200,
      marginTop: 35
    } }
                      onPress={ dropMode }
                      activeOpacity={ 1 }>
      <View style={ styles.wrapperText }>
        <Text style={ styles.text }>
          { title }
        </Text>
      </View>
      <View style={ styles.imageWrapper }>
        <Image source={ {uri: picture} }
               style={ styles.image }/>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    top: -20,
    width: '55%',
    height: '100%',
    marginRight: '2%',
    bottom: '4%',
  },
  image: {
    minWidth: '15%',
    maxWidth: 300,
    minHeight: '100%',
  },
  wrapperText: {
    backgroundColor: 'white',
    height: '80%',
    width: '40%',
    marginLeft: '2%',
    top: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    padding: 10,
  },
});

export default TitleBlock;