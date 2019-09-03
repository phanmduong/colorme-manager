import React from 'react';
import {Dimensions, TextInput} from 'react-native';
import {View, Item, Input} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const Search = ({onChangeText, placeholder, value}) => {
  return (
    <View style={styles.searchContainer}>
      <Icon
        name={'ios-search'}
        color={'black'}
        size={20}
        style={styles.searchIcon}
      />
      <TextInput
        placeholder={placeholder}
        autoCapitalize="none"
        onChangeText={data => onChangeText(data)}
        value={value}
        style={styles.searchInput}
        clearButtonMode={'while-editing'}
        returnKeyType={'done'}
      />
    </View>
  );
};

const styles = {
  searchContainer: {
    backgroundColor: '#f6f6f6',
    height: 40,
    width: Dimensions.get('window').width - 38,
    borderRadius: 27,
    marginLeft: 19,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: 14,
  },
  searchInput: {
    fontSize: 16,
    color: '#707070',
    marginLeft: 14,
    width: Dimensions.get('window').width - 38 - 58,
  },
};

export default Search;
