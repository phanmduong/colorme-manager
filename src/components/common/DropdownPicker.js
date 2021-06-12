import React from 'react';
import {CustomPicker} from 'react-native-custom-picker';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {getDefault} from '../../helper';

function DropdownPicker({options, onChangeValue, selectedId}) {
  function renderPickerHeader() {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>Chọn cơ sở</Text>
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
          <Text style={{color: 'black', fontSize: 16}}>
            {getLabel(defaultText)} ▼
          </Text>
        )}
        {selectedItem && (
          <Text style={{color: 'black', fontSize: 16}}>
            {getLabel(selectedItem)} ▼
          </Text>
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

  function getDefaultValue() {
    if (selectedId) {
      return getDefault(options, selectedId);
    }
    return options[0];
  }

  return (
    <CustomPicker
      options={options}
      defaultValue={getDefaultValue()}
      getLabel={(item) => item.name}
      modalAnimationType={'fade'}
      optionTemplate={renderPickerOption}
      fieldTemplate={renderPickerField}
      headerTemplate={renderPickerHeader}
      footerTemplate={renderPickerFooter}
      modalStyle={{
        borderRadius: 6,
      }}
      onValueChange={(value) => {
        onChangeValue(value.id);
      }}
    />
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
};

export default DropdownPicker;
