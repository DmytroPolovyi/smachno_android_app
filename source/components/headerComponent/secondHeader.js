import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const SecondHeader = ({navigation, color, title}) => {
  return (
    <View style={{backgroundColor: color, width: '100%'}}>
      <View style={ styles.wrapper }>
        <TouchableOpacity style={ styles.navigation } onPress={ () => {
          navigation.goBack()
        } }>
            <Ionicons name={ 'ios-arrow-round-back' } size={ 32 } color='white'/>
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.text}>
            { title }
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
  },
  navigation: {
   justifyContent: 'flex-end',
    width: '20%',
    paddingLeft: 10,
    paddingBottom: 10
  },
  title: {
    marginTop: 30,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  }
});
