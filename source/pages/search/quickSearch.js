import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

export class QuickSearch extends Component {
  state = {
    offset: 0,
  }
  handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        offset: prevState.offset + 20
      }),
      () => {
        this.props.quickSearchData(20, this.state.offset, this.props.inputValue)
      }
    );
  };

  render() {
    const props = this.props
    return (
      <View style={ styles.searchBlock }>
        <View style={ {paddingBottom: 5} }>
          <FlatList contentContainerStyle={ styles.searchFlatList }
                    onEndReached={ this.handleLoadMore }
                    onEndReachedThreshold={ 0.5 }
                    data={ props.quickSearch }
                    keyExtractor={ item => `key:${ item.id }` }
                    renderItem={ ({item}) => {
                      return (
                        <QuickSearchItem item={ item }/>
                      )
                    }
                    }
          />
        </View>
      </View>
    )
  }
}

const QuickSearchItem = ({item}) => {
  return (
    <View>
      <TouchableOpacity onPress={ () => {
        props.navigation.dispatch(DrawerActions.jumpTo('ShowSearchRecipe',
          {recipeId: item.id}))
      } }
                        style={ styles.itemWrapper }>
        <Text style={ styles.itemText }>{ item.title }</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  searchBlock: {
    width: '90%',
    marginHorizontal: '5%',
    height: '47%',
    maxHeight: '70%',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 11,
  },
  searchFlatList: {
    width: '100%',
    paddingHorizontal: 15,
  },
  inputWrapper: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    width: '100%',
    fontSize: 16,
    marginBottom: 10
  },
  itemWrapper: {
    paddingVertical: 5
  },
  itemText: {
    fontSize: 14,
    width: '90%'
  }
});
