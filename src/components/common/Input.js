import React from 'react';
import {Text, TextInput, View} from 'react-native';

function Input({
  value,
  refName,
  onChangeText,
  onSubmitEditing,
  placeholder,
  returnKeyType = 'next',
  title,
  keyboardType = 'default',
  containerStyle,
  editable,
  required = false,
  onBlur,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.titleForm}>
        {title} {required && <Text style={{color: '#C50000'}}>*</Text>}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType={keyboardType}
          value={value}
          ref={refName}
          onChangeText={onChangeText}
          returnKeyType={returnKeyType}
          placeholder={placeholder}
          blurOnSubmit={false}
          onSubmitEditing={onSubmitEditing}
          style={styles.text}
          editable={editable}
          onBlur={onBlur}
        />
      </View>
    </View>
  );
}

const styles = {
  container: {
    marginTop: 30,
  },
  text: {
    fontSize: 15,
  },
  inputContainer: {
    marginTop: 8,
    height: 45,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  titleForm: {
    color: 'black',
    fontSize: 14,
  },
};

export default Input;
