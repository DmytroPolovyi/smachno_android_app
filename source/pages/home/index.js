import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import CategoriesItems from './categoriesItems';
import { FirstHeader } from '../../components/headerComponent/firstHeader';
import { getData } from '../../reducers/home';
import { getFavorite } from '../../reducers/favorite';
import { DrawerActions } from '@react-navigation/native';
import { getShopList } from '../../reducers/shoppingList';
import { PreloaderWrapper } from '../../components/preloader';

class Home extends React.Component {
  componentDidMount() {
    this.props.getData()
    this.props.getFavorite('favorite')
    this.props.getShopList('shoppingList')
  };


  render() {
    if (!this.props.data) {
      return <PreloaderWrapper/>
    }
    return (
      <View style={ styles.container }>
        <FirstHeader title={ 'Smachno' } navigation={ this.props.navigation }/>
        <ScrollView style={ {marginBottom: 60} }>
          { this.props.data.map(item => <CategoriesItems navigation={ this.props.navigation }
                                                         key={ item.id } { ...item }/>) }
        </ScrollView>
        <LuckRecipeButton navigation={ this.props.navigation }/>
      </View>
    );
  }
}

const LuckRecipeButton = ({navigation}) => {
  return (
    <TouchableOpacity style={ styles.random } onPress={ () => {
      navigation.dispatch(DrawerActions.jumpTo('LuckRecipe',
        {luckRecipe: true}))
    } }
    >
      <Text style={ styles.text }>
        Рецепт на удачу
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3a4a'
  },
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

const mapStateToProps = state => {
  return {
    data: state.app.data,
  }
}


export default connect(mapStateToProps, {getData, getFavorite, getShopList})(Home);