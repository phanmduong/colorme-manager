import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import InputPicker from '../common/InputPicker';
import Input from '../common/Input';
import Ionicons from 'react-native-vector-icons/Ionicons';

function KPIAddItem({
  options,
  addItem,
  addedItemId,
  addedItemKpi,
  removeItem,
  isAdded = false,
  typeUnit,
  calculateByUnit,
}) {
  const kpiRef = useRef(null);
  const [kpi, setKpi] = useState(null);
  const [id, setId] = useState(null);
  const refPicker = useRef(null);

  function submit() {
    if (!isAdded) {
      if (id && kpi > 0) {
        const item = {id: id, quantity: kpi};
        addItem(item);
        setId(null);
        setKpi(null);
        refPicker.current.clear();
      } else {
        Alert.alert('Thông báo', `Bạn cần chọn ${calculateByUnit} và kpi lớn hơn 0`);
      }
    } else {
      removeItem(addedItemId);
    }
  }

  function getItem() {
    return options.find((item) => item.id === addedItemId);
  }

  return (
    <>
      {!isAdded ? (
        <InputPicker
          title={`Thêm ${calculateByUnit}`}
          header={`Chọn ${calculateByUnit}`}
          options={options}
          placeholder={`Thêm ${calculateByUnit}`}
          onChangeValue={setId}
          refPicker={refPicker}
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.titleForm}>${calculateByUnit}</Text>
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: getItem().color ? getItem().color : 'red',
              },
            ]}>
            <Text style={styles.tagText}>{getItem().name}</Text>
          </View>
        </View>
      )}
      <Input
        title={`KPI (${typeUnit})`}
        placeholder={'0'}
        editable={!isAdded}
        value={!isAdded ? kpi : addedItemKpi}
        onSubmitEditing={() => kpiRef.current.blur()}
        refName={kpiRef}
        onChangeText={setKpi}
        keyboardType={'number-pad'}
        containerStyle={styles.input}
      />
      {!isAdded ? (
        <TouchableOpacity onPress={submit}>
          <View style={styles.button}>
            <Ionicons name={'md-add-circle'} size={20} color={'black'} />
            <Text style={styles.buttonText}>Thêm</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={submit}>
          <View style={styles.button}>
            <Ionicons name={'md-trash'} size={20} color={'black'} />
            <Text style={styles.buttonText}>Xóa</Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = {
  button: {
    backgroundColor: '#f6f6f6',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    marginTop: 15,
  },
  buttonText: {
    marginLeft: 10,
  },
  tagText: {
    color: 'white',
  },
  container: {
    marginTop: 30,
  },
  inputContainer: {
    marginTop: 8,
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
};

export default KPIAddItem;
