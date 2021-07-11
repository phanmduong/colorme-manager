import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Dimensions} from 'react-native';
import {CustomPicker} from 'react-native-custom-picker';
import LinearGradient from 'react-native-linear-gradient';
import Search from './Search';
import {getData, getDefault, getSearchedResults} from '../../helper';
const {width} = Dimensions.get('window');
import theme from '../../styles';

const FilterRow = ({
  title,
  header,
  options,
  selectedId = -1,
  defaultId = -1,
  defaultPlaceholder = 'Tất cả',
  defaultColor = theme.processColor1,
  onChangeValue,
  isApiSearch = false,
  onApiSearch,
  getLabel,
  shouldReturnObject = false,
}) => {
  const [search, setSearch] = useState('');

  const renderPickerField = (settings) => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <LinearGradient
        colors={['#F6F6F6', '#F6F6F6']}
        style={styles.filterContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <View style={styles.field}>
            <Text style={styles.fieldText}>{getLabel(defaultText)}</Text>
            <Text>▼</Text>
          </View>
        )}
        {selectedItem && (
          <View style={styles.field}>
            <Text style={styles.fieldText}>{getLabel(selectedItem)}</Text>
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

  const searchedData = getSearchedResults(
    getData(options, defaultId, defaultPlaceholder, defaultColor),
    search,
  );

  const originalData = getData(
    options,
    defaultId,
    defaultPlaceholder,
    defaultColor,
  );

  const defaultValue = getDefault(
    isApiSearch ? originalData : searchedData,
    selectedId,
  );

  return (
    <View style={styles.filterTitle}>
      <Text style={styles.title}>{title}</Text>
      <CustomPicker
        options={isApiSearch ? originalData : searchedData}
        defaultValue={defaultValue}
        getLabel={getLabel ? getLabel : (item) => item.name}
        modalAnimationType={'fade'}
        optionTemplate={renderPickerOption}
        fieldTemplate={renderPickerField}
        headerTemplate={() => renderPickerHeader(header)}
        footerTemplate={renderPickerFooter}
        onBlur={() => setSearch('')}
        modalStyle={styles.modalStyle}
        onValueChange={(value) => {
          if (!shouldReturnObject) {
            onChangeValue(value.id);
          } else {
            onChangeValue(value);
          }
        }}
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
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  fieldText: {
    color: 'black',
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

export default FilterRow;
