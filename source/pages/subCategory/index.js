import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SecondHeader } from '../../components/headerComponent/secondHeader';
import { SubCategoryItems } from './subCategoryItem';
import { Preloader } from '../../components/preloader';

class SubCategory extends React.Component {
  render() {
    const props = this.props

    return (
      <View style={ styles.container }>
        <SecondHeader title={ props.title } color={ props.color } navigation={ props.navigation }/>
        { props.loading && <Preloader/> }
        { props.category && <FlatList contentContainerStyle={ {
          width: '100%'
        } }
                                      data={ props.category }
                                      keyExtractor={ item => item.id.toString() }
                                      renderItem={ ({item}) => (
                                        <SubCategoryItems navigation={ props.navigation }
                                                          key={ item.id } item={ item }
                                                          addFavoriteItem={ props.addFavoriteItem }
                                                          deleteFavoriteItem={ props.deleteFavoriteItem }
                                                          favorite={ props.favorite }/>
                                      ) }
                                      onEndReached={ props.handleLoadMore }
                                      onEndReachedThreshold={ 0.5 }
        /> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%'
  },
});

export default SubCategory