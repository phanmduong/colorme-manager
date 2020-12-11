import React from 'react';
import {View, Dimensions} from 'react-native';
import theme from '../../styles';
import Spinkit from 'react-native-spinkit';
const {width} = Dimensions.get('window');

const Loading = ({size = width / 8}) => {
  return (
    <View style={styles.container}>
      <Spinkit isVisible color={theme.mainColor} type="Wave" size={size} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Loading;
