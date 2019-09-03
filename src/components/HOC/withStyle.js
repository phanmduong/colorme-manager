import React, {Component} from 'react';
import {Text, View} from 'react-native';

const withStyle = () => {
  return WrappedComponent => {
    class Container extends Component {
      render() {
        return (
          <View style={style.container}>
            <WrappedComponent {...this.props} styleCommon={style} />
          </View>
        );
      }
    }

    return Container;
  };
};

const style = {
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
};

export default withStyle;
