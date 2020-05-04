import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { FirstHeader } from '../../components/headerComponent/firstHeader';
import { deleteAllItem, deleteItem, selectedShopList } from '../../reducers/shoppingList';
import { ShoppingListItem } from './shoppingListItem';
import { ShoppingListAllItemWrapper } from './shoppingListAllItemWrapper';

class ShoppingList extends React.Component {

  state = {
    showAllIngredient: false,
    filterList: (this.props.shopList.length > 1)
  }

  showAllIngredient = () => {
    if (this.state.showAllIngredient === false) {
      this.setState({
        showAllIngredient: true
      })
    } else {
      this.setState({
        showAllIngredient: false
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.shopList !== prevProps.shopList) {
      this.setState({
        filterList: (this.props.shopList && this.props.shopList.length > 1),
        showAllIngredient: false
      })
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <FirstHeader search={ false } filterList={ this.state.filterList } title={ 'Список покупок' }
                     navigation={ this.props.navigation } showAllIngredient={ this.showAllIngredient }/>
        <ScrollView>
          <View style={ styles.wrapper }>
            {
              !this.state.showAllIngredient && (this.props.shopList && this.props.shopList.filter(item => {
                return item.shopList !== null && item.shopList.length > 0
              }).map(item => {
                return (
                  <ShoppingListItem key={ item.recipeId } item={ item } navigation={ this.props.navigation }
                                    deleteItem={ this.props.deleteItem }
                                    recipeId={ item.recipeId }
                                    selectedShopList={ this.props.selectedShopList }/>
                )
              }))
            }
            {
              (this.state.showAllIngredient && this.props.shopList) &&
              <ShoppingListAllItemWrapper navigation={ this.props.navigation }
                                          deleteItem={ this.props.deleteItem }
                                          selectedShopList={ this.props.selectedShopList }
                                          shopList={ this.props.shopList }
                                          deleteAllItem={ this.props.deleteAllItem }/>
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  wrapper: {
    paddingBottom: 60
  }
});

const mapStateToProps = state => {
  return {
    shopList: state.shopList.shopList,
  }
}

export default connect(mapStateToProps, {deleteItem, selectedShopList, deleteAllItem})(ShoppingList);