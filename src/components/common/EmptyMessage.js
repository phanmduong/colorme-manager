import React from 'react';
import {Text} from 'native-base';
import theme from '../../styles';
import {View} from 'react-native';

function EmptyMessage() {
  return (
    <View style={styles.container}>
      <Text style={{color: theme.dangerColor, fontSize: 16}}>
        Không có kết quả
      </Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default EmptyMessage;
