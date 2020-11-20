import React from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';

const SubmitButton = ({
  containerStyle,
  titleStyle,
  title,
  onPress,
  loading,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.submit, containerStyle]}>
        {loading ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <Text style={[styles.submitTitle, titleStyle]}>
            {title ? title : 'Áp dụng'}
          </Text>
        )}
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
