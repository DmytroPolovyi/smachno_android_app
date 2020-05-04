import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addFavoriteItem, deleteFavoriteItem } from '../../reducers/favorite';
import SubCategory from '../subCategory';
import { cleanData, getSearchData } from '../../reducers/search';

class ShowSearchItems extends React.Component {
  state = {
    offset: 0,
  }

  componentDidMount() {
    this.props.getSearchData(20, 0, this.props.route.params.value)
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.route.params !== prevProps.route.params) {
      this.props.CleanData()
      this.setState({
        offset: 0
      })
      this.props.getSearchData(20, 0, this.props.route.params.value)
    }
  }

  handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        offset: prevState.offset + 20
      }),
      () => {
        this.props.getSearchData(20, this.state.offset, this.props.route.params.value)
      }
    );
  };

  render() {
    const props = this.props
    return (
      <View style={ styles.container }>
        <SubCategory navigation={ this.props.navigation } color={ '#008c00' }
                     title={ `Поиск "${ props.route.params.value }"` } loading={ props.loading }
                     category={ props.data }
                     addFavoriteItem={ props.addFavoriteItem }
                     deleteFavoriteItem={ props.deleteFavoriteItem }
                     favorite={ props.favorite } handleLoadMore={ this.handleLoadMore }/>
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

const mapStateToProps = state => {
  return {
    data: state.search.data,
    favorite: state.favorite.favorite,
    loading: state.search.loading
  }
}


export default connect(mapStateToProps,
  {deleteFavoriteItem, addFavoriteItem, cleanData, getSearchData})(ShowSearchItems);