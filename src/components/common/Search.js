import React from 'react';
import {Dimensions, Image, TextInput, TouchableOpacity} from 'react-native';
import {View, Item, Input} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../styles';
const {width} = Dimensions.get('window');

const Search = ({
  onChangeText,
  placeholder,
  value,
  autoFocus,
  extraStyle,
  extraInputStyle,
  onBlur,
  refer,
  onFilterPress,
  onSubmitEditing,
  isFilter = false,
}) => {
  return (
    <View style={styles.row}>
      <View
        style={[
          isFilter ? styles.searchFilterContainer : styles.searchContainer,
          extraStyle,
        ]}>
        <Icon
          name={'ios-search'}
          color={'black'}
          size={20}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoCapitalize="none"
          onChangeText={(data) => onChangeText(data)}
          value={value}
          onBlur={onBlur}
          ref={refer}
          style={[
            isFilter ? styles.searchFilterInput : styles.searchInput,
            extraInputStyle,
          ]}
          clearButtonMode={'while-editing'}
          returnKeyType={'done'}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
      {isFilter && (
        <TouchableOpacity onPress={onFilterPress}>
          <View style={styles.filterContainer}>
            <Image
              source={require('../../../assets/img/icons8-sorting_options_filled.png')}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = {
  searchContainer: {
    backgroundColor: '#f6f6f6',
    height: 40,
    width: width - 32,
    borderRadius: 27,
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  searchFilterContainer: {
    backgroundColor: '#f6f6f6',
    height: 40,
    width: width - (theme.mainHorizontal * 2 + 40 + 10),
    borderRadius: 27,
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  searchIcon: {
    marginLeft: 14,
  },
  searchInput: {
    fontSize: 16,
    color: '#707070',
    marginLeft: 14,
    width: width - 38 - 58,
  },
  searchFilterInput: {
    fontSize: 16,
    color: '#707070',
    marginLeft: 14,
    width: width - (theme.mainHorizontal * 2 + 40 + 10) - 48,
  },
  filterContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
  },
};

export default Search;
