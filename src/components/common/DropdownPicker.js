import React, {useState} from 'react';
import {CustomPicker} from 'react-native-custom-picker';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Text} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {getData, getDefault, getSearchedResults} from '../../helper';
import Search from './Search';
const {width} = Dimensions.get('window');

function DropdownPicker({
  options,
  onChangeValue,
  selectedId,
  isAllOptionAvailable = false,
  allOptionId = '',
  allOptionName = 'Tất cả',
  isApiSearch = false,
  onApiSearch,
  header,
  placeholder,
  containerStyle,
}) {
  const [search, setSearch] = useState('');

  function renderPickerHeader(title) {
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
  }

  function renderPickerField(settings) {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <LinearGradient
        colors={['#f6f6f6', '#f6f6f6']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <Text style={styles.textField}>{getLabel(defaultText)} ▼</Text>
        )}
        {selectedItem && (
          <Text style={styles.textField}>{getLabel(selectedItem)} ▼</Text>
        )}
      </LinearGradient>
    );
  }

  function renderPickerOption(settings) {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{getLabel(item)}</Text>
      </View>
    );
  }

  function renderPickerFooter(action) {
    return (
      <TouchableOpacity
        style={styles.headerFooterContainer}
        onPress={action.close.bind(this)}>
        <Text style={{color: '#C50000', fontSize: 19}}>Hủy</Text>
      </TouchableOpacity>
    );
  }

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
    return finalizedOptions()[0];
  }

  return (
    <View style={containerStyle}>
      <CustomPicker
        options={finalizedOptions()}
        placeholder={placeholder}
        defaultValue={getDefaultValue()}
        getLabel={(item) => item.name}
        modalAnimationType={'fade'}
        optionTemplate={renderPickerOption}
        fieldTemplate={renderPickerField}
        headerTemplate={() => renderPickerHeader(header)}
        footerTemplate={renderPickerFooter}
        modalStyle={styles.modalStyle}
        onValueChange={(value) => onChangeValue(value.id)}
      />
    </View>
  );
}

const styles = {
  gradientSize: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
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
  modalStyle: {
    borderRadius: 6,
  },
  textField: {
    color: 'black',
    fontSize: 16,
  },
};

export default DropdownPicker;
