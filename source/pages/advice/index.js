import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class Advice extends Component {
  render() {
    const {data} = this.props;
    if (data) {
      console.log(data);
    }
    return (

      <View style={ styles.container }>
        <Text>Advice</Text>
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Advice);