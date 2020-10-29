import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const SubmitButton = ({containerStyle, titleStyle, title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.submit, containerStyle]}>
        <Text style={[styles.submitTitle, titleStyle]}>
          {title ? title : 'Áp dụng'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  submit: {
    alignItems: 'center',
    borderRadius: 24,
    alignSelf: 'stretch',
    backgroundColor: '#2ACC4C',
    paddingVertical: 15,
  },
  submitTitle: {
    color: 'white',
    fontSize: 16,
  },
};

export default SubmitButton;
