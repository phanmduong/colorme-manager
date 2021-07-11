import React, {useState, useRef} from 'react';
import {Text, TouchableOpacity, View, Dimensions} from 'react-native';
import {CustomPicker} from 'react-native-custom-picker';
import LinearGradient from 'react-native-linear-gradient';
import Search from './Search';
import {getData, getDefault, getSearchedResults} from '../../helper';
const {width} = Dimensions.get('window');

const InputPicker = ({
  title,
  header,
  options,
  onChangeValue,
  isApiSearch = false,
  onApiSearch,
  placeholder = 'Lựa chọn',
  refPicker,
  required = false,
  isAllOptionAvailable = false,
  allOptionId = -1,
  allOptionName = 'Tất cả',
  selectedId,
  getLabel,
}) => {
  const [search, setSearch] = useState('');

  const renderPickerField = (settings) => {
    const {selectedItem, defaultText, getLabel, clear} = settings;
    return (
      <LinearGradient
        colors={['#F6F6F6', '#F6F6F6']}
        style={styles.inputContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <View style={styles.field}>
            <Text style={styles.placeholderText}>{defaultText}</Text>
            <Text>▼</Text>
          </View>
        )}
        {selectedItem && (
          <View style={styles.field}>
            <Text style={styles.selectedText}>{getLabel(selectedItem)}</Text>
            <Text>▼</Text>
          </View>
        )}
      </LinearGradient>
    );
  };

  const renderPickerOption = (settings) => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16, color: item.color ? item.color : 'black'}}>
          {getLabel(item)}
        </Text>
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
            if (isApiSearch) {
              onApiSearch(search);
            }
          }}
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
        <Text style={{color: '#C50000', fontSize: 19}}>Hủy</Text>
      </TouchableOpacity>
    );
  };

  function finalizedOptions() {
    if (isApiSearch) {
      if (isAllOptionAvailable) {
        return getData(options, allOptionId, allOptionName, null);
      }
      return options;
    } else {
      if (isAllOptionAvailable) {
        return getSearchedResults(
          getData(options, allOptionId, allOptionName, null),
          search,
        );
      }
      return getSearchedResults(options, search);
    }
  }

  function getDefaultValue() {
    if (selectedId) {
      return getDefault(finalizedOptions(), selectedId);
    }
    return null;
  }

  return (
    <View style={{marginTop: 30}}>
      <Text style={styles.titleForm}>
        {title} {required && <Text style={{color: '#C50000'}}>*</Text>}
      </Text>
      <CustomPicker
        options={finalizedOptions()}
        defaultValue={getDefaultValue()}
        placeholder={placeholder}
        getLabel={getLabel ? getLabel : (item) => item.name}
        modalAnimationType={'fade'}
        ref={refPicker}
        optionTemplate={renderPickerOption}
        fieldTemplate={renderPickerField}
        headerTemplate={() => renderPickerHeader(header)}
        footerTemplate={renderPickerFooter}
        onBlur={() => setSearch('')}
        modalStyle={styles.modalStyle}
        onValueChange={(value) => value && onChangeValue(value.id)}
      />
    </View>
  );
};

const styles = {
  filterTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  field: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  placeholderText: {
    color: '#b7b7b7',
    fontSize: 15,
  },
  selectedText: {
    color: 'black',
    fontSize: 15,
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
  },
  inputContainer: {
    marginTop: 8,
    height: 45,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
  },
  modalStyle: {
    borderRadius: 6,
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
};

export default InputPicker;
