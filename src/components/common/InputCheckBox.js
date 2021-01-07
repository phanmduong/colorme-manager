import React from 'react';
import {View, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

function InputCheckBox({
  disabled = false,
  value,
  onValueChange,
  name,
  containerStyle,
}) {
  return (
    <View style={[styles.row, containerStyle]}>
      <CheckBox
        disabled={disabled}
        value={value}
        onValueChange={onValueChange}
        boxType={'square'}
        tintColor={'#C8E6C9'}
        onCheckColor={'#4CAF50'}
        onFillColor={'#C8E6C9'}
        onTintColor={'#C8E6C9'}
        tintColors={{true: '#4CAF50', false: '#C8E6C9'}}
        onAnimationType={'bounce'}
        offAnimationType={'bounce'}
      />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = {
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: 10,
  },
};

export default InputCheckBox;
