import React from 'react';
import {Button, Text, View} from 'native-base';
import * as alert from '../../constants/alert';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Error({onPress, error = alert.LOAD_DATA_ERROR}) {
  return (
    <View style={styles.container}>
      <Text style={styles.textError}>{error}</Text>
      <Button
        iconLeft
        danger
        small
        onPress={onPress}
        style={{marginTop: 10, alignSelf: null}}>
        <MaterialCommunityIcons name="reload" color="white" size={20} />
        <Text>Thử lại</Text>
      </Button>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: '#d9534f',
    textAlign: 'center',
  },
};

export default Error;
