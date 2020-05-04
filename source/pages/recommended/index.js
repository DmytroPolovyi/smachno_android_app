import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class Recommended extends Component {

  componentDidMount() {
  }

  render() {
    const {data} = this.props;
    if (data) {
      console.log(data);
    }
    return (

      <View style={ styles.container }>
        <Text>Recommended</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3a4a'
  }
});

const mapStateToProps = state => {
  return {
    data: state.app.data,
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);