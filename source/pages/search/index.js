import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { cleanQuickSearchData, quickSearchData } from '../../reducers/search';
import { addFavoriteItem, deleteFavoriteItem } from '../../reducers/favorite';
import { FirstHeader } from '../../components/headerComponent/firstHeader';
import { DrawerActions } from '@react-navigation/native';
import debounce from 'lodash.debounce'
import { QuickSearch } from './quickSearch';

const Search = (props) => {

  useEffect(() => {
    props.cleanQuickSearchData()
    setInputValue('')
  }, [ props.route.params ])

  const [ inputValue, setInputValue ] = useState('')

  const handler = useCallback(debounce((value) => {
    props.cleanQuickSearchData()
    if (value.length > 1) {
      props.quickSearchData(20, 0, value)
    }
  }, 1000), []);

  const onChange = (value) => {
    setInputValue(value)
    handler(value);
  };

  return (
    <View style={ styles.container }>
      <FirstHeader title={ 'Поиск' } navigation={ props.navigation } search={ false }
                   searchFilter={ true }/>
      <SearchInput inputValue={ inputValue } onChange={ onChange }/>
      { props.quickSearch && props.quickSearch.length > 0 &&
      <QuickSearch quickSearch={ props.quickSearch } quickSearchData={ props.quickSearchData }
                   inputValue={ inputValue } navigation={ props.navigation }/> }
      { props.search && props.search.map(item => {
        return (<View>
          <Text>
            { item.title }
          </Text>
        </View>)
      }) }
      { props.quickSearch == null &&
      <SearchImage/>
      }
      <SearchButton navigation={ props.navigation } value={ inputValue }/>
    </View>
  );
}
const SearchImage = () => {
  return (
    <View style={ styles.searchImage }>
      <Image source={ require('../../../assets/searchPovar.png') } style={ {height: 200, width: 100} }/>
    </View>
  )
}

const SearchInput = ({onChange, inputValue}) => {
  return (
    <View style={ styles.inputWrapper }>
      <TextInput
        style={ styles.input }
        onChangeText={ (text) => {
          onChange(text)
        } }
        placeholder={ 'Введите название блюда' }
        value={ inputValue }
        placeholderTextColor={ '#757575' }
      />
    </View>
  )
}

const SearchButton = ({value, navigation}) => {
  return (
    <View style={ styles.searchButtonWrapper }>
      { value.length > 1 && <TouchableOpacity onPress={ () => {
        navigation.dispatch(DrawerActions.jumpTo('ShowSearchItems',
          {value: value}))
      } } style={ [ styles.searchButton, styles.activeSearchButton ] }>
        <Text style={ styles.searchButtonText }>
          Поиск
        </Text>
      </TouchableOpacity> }
      { value.length < 2 &&
      <View style={ [ styles.searchButton, styles.deactivateSearchButton ] }>
        <Text style={ styles.searchButtonText }>
          Поиск
        </Text>
      </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
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
  searchImage: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%'
  },
  searchButtonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute'
  },
  searchButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    bottom: 0,
  },
  activeSearchButton: {
    backgroundColor: '#008c00',
  },
  deactivateSearchButton: {
    backgroundColor: '#757575',
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white'
  }
});


const mapStateToProps = state => {
  return {
    quickSearch: state.search.quickSearchData,
    favorite: state.favorite.favorite,
    search: state.search.search,
  }
}


export default connect(mapStateToProps, {
  cleanQuickSearchData,
  quickSearchData,
  addFavoriteItem,
  deleteFavoriteItem
})(Search);