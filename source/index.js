import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './pages/home';
import { Provider } from 'react-redux';
import Store from './reduxStore'
import { Ionicons } from '@expo/vector-icons';
import Recommended from './pages/recommended';
import Login from './pages/login';
import Favorite from './pages/favorite';
import Advice from './pages/advice';
import Search from './pages/search';
import ShoppingList from './pages/shoppingList';
import Settings from './pages/settings';
import SubCategory from './pages/subCategory';
import RecipeContainer from './pages/recipe';
import LuckRecipe from './pages/luckRecipe';
import SubCategoryItemRecipe from './pages/subCategory/subCategoryItemRecipe';
import ShoppingListItemRecipe from './pages/shoppingList/shoppingListItemRecipe';
import OutlineSubCategory from './pages/home/outlineSubCategory';
import ShowSearchItems from './pages/search/showSearchItems';
import ShowSearchRecipe from './pages/search/showSearchRecipe';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation}) => {
  return (
    <View style={ styles.drawerWrapper }>
      <DrawerItem navigation={ navigation } title={ 'Войти' }
                  componentName={ 'Login' } icon={ 'md-people' }/>
      <DrawerItem navigation={ navigation } title={ 'Главная' }
                  componentName={ 'Home' } icon={ 'md-restaurant' }/>
      <DrawerItem navigation={ navigation } title={ 'Рекомендованное' }
                  componentName={ 'Recommended' } icon={ 'md-heart' }/>
      <DrawerItem navigation={ navigation } title={ 'Избранное' }
                  componentName={ 'Favorite' } icon={ 'ios-star' }/>
      <DrawerItem navigation={ navigation } title={ 'Советы' }
                  componentName={ 'Advice' } icon={ 'ios-information-circle' }/>
      <DrawerItem navigation={ navigation } title={ 'Поиск' }
                  componentName={ 'Search' } icon={ 'md-search' }
                  obj={ {discharge: 'discharge'} }/>
      <DrawerItem navigation={ navigation } title={ 'Список покупок' }
                  componentName={ 'ShoppingList' } icon={ 'md-basket' }/>
      <DrawerItem navigation={ navigation } title={ 'Настройки' }
                  componentName={ 'Settings' } icon={ 'ios-settings' }/>
    </View>
  )
}
const DrawerItem = ({navigation, icon, componentName, title, obj = {}}) => {
  return (
    <View>
      <TouchableOpacity style={ styles.item } onPress={ () => {
        navigation.navigate(`${ componentName }`, obj)
      } }>
        <Ionicons name={ icon } size={ 28 } color='#757575'/>
        <Text style={ styles.text }>{ title }</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerWrapper: {
    marginTop: 50,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    paddingLeft: 30,
  }
})

export default (props) => {
  return (
    <NavigationContainer>
      <Provider store={ Store }>
        <Drawer.Navigator drawerContent={ props => <DrawerNavigator { ...props } /> }
                          initialRouteName="Home"
                          drawerStyle={ {
                            width: '80%',
                          } }>
          <Drawer.Screen name='DrawerNavigator' component={ DrawerNavigator }/>
          <Drawer.Screen name='Login' component={ Login } screenProps={ props }/>
          <Drawer.Screen name='Home' component={ Home } screenProps={ props }/>
          <Drawer.Screen name='Recommended' component={ Recommended } screenProps={ props }/>
          <Drawer.Screen name='Favorite' component={ Favorite } screenProps={ props }/>
          <Drawer.Screen name='Advice' component={ Advice } screenProps={ props }/>
          <Drawer.Screen name='Search' component={ Search } screenProps={ props }/>
          <Drawer.Screen name='ShoppingList' component={ ShoppingList } screenProps={ props }/>
          <Drawer.Screen name='Settings' component={ Settings } screenProps={ props }/>
          <Drawer.Screen name="SubCategory" component={ SubCategory } screenProps={ props }/>
          <Drawer.Screen name="RecipeContainer" component={ RecipeContainer } screenProps={ props }/>
          <Drawer.Screen name="LuckRecipe" component={ LuckRecipe } screenProps={ props }/>
          <Drawer.Screen name="SubCategoryItemRecipe" component={ SubCategoryItemRecipe } screenProps={ props }/>
          <Drawer.Screen name="ShoppingListItemRecipe" component={ ShoppingListItemRecipe } screenProps={ props }/>
          <Drawer.Screen name="OutlineSubCategory" component={ OutlineSubCategory } screenProps={ props }/>
          <Drawer.Screen name="ShowSearchItems" component={ ShowSearchItems } screenProps={ props }/>
          <Drawer.Screen name="ShowSearchRecipe" component={ ShowSearchRecipe } screenProps={ props }/>
        </Drawer.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
