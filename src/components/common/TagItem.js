import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Search from './Search';
import {CustomPicker} from 'react-native-custom-picker';
import {getData, getDefault, getSearchedResults} from '../../helper';
const {width} = Dimensions.get('window');

const TagItem = ({
  title,
  options,
  defaultValue,
  hasHashInHexColor,
  placeholder,
}) => {
  const [search, setSearch] = useState('');

  const renderPickerField = (settings) => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <View>
        {!selectedItem && (
          <View style={[styles.tagContainer, {backgroundColor: '#999'}]}>
            <Text style={styles.tagName}>{getLabel(defaultText)}</Text>
            <EntypoIcon name={'triangle-down'} size={20} color={'white'} />
          </View>
        )}
        {selectedItem && (
          <View
            style={[
              styles.tagContainer,
              {
                backgroundColor: hasHashInHexColor
                  ? selectedItem.color
                  : `#${selectedItem.color}`,
              },
            ]}>
            <Text style={styles.tagName}>{getLabel(selectedItem)}</Text>
            <EntypoIcon name={'triangle-down'} size={20} color={'white'} />
          </View>
        )}
      </View>
    );
  };

  const renderPickerOption = (settings) => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{getLabel(item)}</Text>
      </View>
    );
  };

  const renderPickerHeader = (title) => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>{title}</Text>
        <Search
          placeholder="Tìm kiếm"
          onChangeText={(search) => {
            setSearch(search);
          }}
          value={search}
          extraStyle={{width: width - 70, marginLeft: 0}}
          extraInputStyle={{width: width - 38 - 80}}
        />
      </View>
    );
  };

  const renderPickerFooter = (action) => {
    return (
      <TouchableOpacity
        style={styles.headerFooterContainer}
        onPress={action.close.bind(this)}>
        <Text style={styles.cancelTitle}>Hủy</Text>
      </TouchableOpacity>
    );
  };

  const getOptions = () => {
    return getSearchedResults(
      getData(options, placeholder, hasHashInHexColor ? '#999' : '999'),
      search,
    );
  };

  const getDefaultValue = () => {
    return getDefault(
      getData(options, placeholder, hasHashInHexColor ? '#999' : '999'),
      defaultValue,
    );
  };

  return (
    <View style={styles.sectionContainer}>
      <Text>{title}</Text>
      <CustomPicker
        options={getOptions()}
        defaultValue={getDefaultValue()}
        getLabel={(item) => item.name}
        modalAnimationType={'fade'}
        optionTemplate={renderPickerOption}
        fieldTemplate={renderPickerField}
        headerTemplate={() => renderPickerHeader('Chọn chiến dịch')}
        footerTemplate={renderPickerFooter}
        modalStyle={styles.modalStyle}
      />
    </View>
  );
};

const styles = {
  tagContainer: {
    marginTop: 5,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'stretch',
    backgroundColor: '#FF9800',
    justifyContent: 'space-between',
  },
  tagName: {
    color: 'white',
  },
  sectionContainer: {
    marginTop: 10,
  },
  headerFooterContainer: {
    padding: 10,
    alignItems: 'center',
  },
  headerFooterText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
  },
  options: {
    marginVertical: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginHorizontal: 20,
  },
  cancelTitle: {
    color: '#C50000',
    fontSize: 19,
  },
  modelStyle: {
    borderRadius: 6,
  },
};

export default TagItem;
