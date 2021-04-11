import React, {useState} from 'react';
import {Text, View, TextInput} from 'react-native';

function FilterRowInput({
  title,
  onChangeValue,
  placeholder = 'Tìm kiếm',
  value,
}) {
  const [internalValue, setValue] = useState(value);

  function onChangeInternalValue(text) {
    setValue(text);
    onChangeValue(internalValue);
  }

  return (
    <View style={styles.filterTitle}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.filterContainer}
        onChangeText={onChangeInternalValue}
        placeholder={placeholder}
        value={internalValue}
      />
    </View>
  );
}

const styles = {
  filterTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 16,
  },
  filterContainer: {
    width: 150,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    fontSize: 16,
  },
};

export default FilterRowInput;
