import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addItemForCategory, CleanCategory, getCategory } from '../../reducers/home';
import { addFavoriteItem, deleteFavoriteItem } from '../../reducers/favorite';
import SubCategory from '../subCategory';

class OutlineSubCategory extends React.Component {
  state = {
    offset: 0,
    loadingMore: false
  }

  componentDidMount() {
    this.props.getCategory(this.props.route.params.category, 0)
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.route.params !== prevProps.route.params) {
      this.props.CleanCategory()
      this.setState({
        offset: 0
      })
      this.props.getCategory(this.props.route.params.category, 0)
    }
  }

  handleLoadMore = () => {
    this.setState(
      (prevState) => ({
        offset: prevState.offset + 20,
        loadingMore: true
      }),
      () => {
        this.props.addItemForCategory(this.props.route.params.category, this.state.offset);
      }
    );
  };

  render() {
    const props = this.props
    return (
      <View style={ styles.container }>
        <SubCategory navigation={ this.props.navigation } color={ props.route.params.color }
                     title={ props.route.params.title } loading={ props.loading }
                     category={ props.category }
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
    category: state.app.category,
    favorite: state.favorite.favorite,
    loading: state.app.loading
  }
}


export default connect(mapStateToProps,
  {getCategory, deleteFavoriteItem, addFavoriteItem, CleanCategory, addItemForCategory})(OutlineSubCategory);