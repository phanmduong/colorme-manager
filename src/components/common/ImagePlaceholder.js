import React from 'react';
import {View} from 'react-native';
import theme from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

function ImagePlaceholder() {
  return (
    <View style={[theme.mainAvatar, styles.container]}>
      <Ionicons name={'md-person'} size={20} color={'black'} />
    </View>
  );
}

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
  },
};

export default ImagePlaceholder;
