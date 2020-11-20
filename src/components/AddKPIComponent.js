import React, {useState, useRef} from 'react';
import {ScrollView, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import Input from './common/Input';
import theme from '../styles';
import InputPicker from './common/InputPicker';
import {FILTER_KPI_CALCULATE_BY, FILTER_KPI_TYPE} from '../constants/constant';
import DateRangePicker from './common/DateRangePicker';
import KPIAddItem from './kpi/KPIAddItem';
import SubmitButton from './common/SubmitButton';

function AddKPIComponent(props) {
  const [kpiName, setName] = useState(null);
  const [kpiType, setKpiType] = useState(null);
  const [calculateBy, setCalculateBy] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [detailKpis, setDetailKpis] = useState([]);

  const kpiNameRef = useRef(null);
  const typeRef = useRef(null);
  const calculateByRef = useRef(null);

  function setUNIXEndTime(endTime) {
    setEndTime(endTime);
  }

  function setUNIXStartTime(startTime) {
    setStartTime(startTime);
  }

  function addItem(item) {
    let copyDetailKpis = [...detailKpis];
    copyDetailKpis.push(item);
    setDetailKpis(copyDetailKpis);
  }

  function removeItem(id) {
    let copyDetailKpis = [...detailKpis];
    const index = copyDetailKpis.findIndex((item) => item.id === id);
    if (index !== -1) {
      copyDetailKpis.splice(index, 1);
      setDetailKpis(copyDetailKpis);
    }
  }

  function getTypeUnit() {
    const type = FILTER_KPI_TYPE.find((item) => item.id === kpiType);
    if (type) {
      return type.unit;
    }
    return '';
  }

  function getCalculateByUnit() {
    const calculateByItem = FILTER_KPI_CALCULATE_BY.find(
      (item) => item.id === calculateBy,
    );
    if (calculateByItem) {
      return calculateByItem.unit;
    }
    return '';
  }

  function getItemQuantity(id) {
    return detailKpis.find((item) => item.id === id).quantity;
  }

  function addKpis() {
    if (kpiName && kpiType && calculateBy && endTime && startTime) {
      const kpiData = {
        name: kpiName,
        type: kpiType,
        calculate_by: calculateBy,
        end_time: endTime,
        start_time: startTime,
        detail_kpis: detailKpis,
      };
      props.addKpis(kpiData);
      setTimeout(() => {
        if (props.errorAddKpis) {
          Alert.alert('Thông báo', 'Có lỗi xảy ra');
        } else {
          Alert.alert('Thông báo', 'Thêm KPI thành công');
        }
      }, 500);
    } else {
      Alert.alert('Thông báo', 'Bạn cần nhập đủ thông tin');
    }
  }

  function getOptions() {
    switch (calculateBy) {
      case 'employee':
        return props.employees;
      case 'campaign':
        return props.campaigns;
      case 'source':
        return props.sources;
      case 'course':
        return props.courses;
      case 'program':
        return [];
      default:
        return [];
    }
  }

  function changeKpiType(type) {
    setKpiType(type);
    setCalculateBy(null);
    setDetailKpis([]);
    calculateByRef.current.clear();
  }

  function changeKpiCalculateBy(calculate) {
    setCalculateBy(calculate);
    setDetailKpis([]);
  }

  function filterKpiCalculateBy() {
    return FILTER_KPI_CALCULATE_BY.filter((item) => {
      return item.type.includes(kpiType);
    });
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled
      keyboardVerticalOffset={100}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Input
          placeholder={'Tên KPI'}
          title={'Tên KPI'}
          onChangeText={setName}
          refName={kpiNameRef}
          onSubmitEditing={() => kpiNameRef.current.blur()}
        />
        <InputPicker
          placeholder={'Loại KPI'}
          title={'Loại KPI'}
          options={FILTER_KPI_TYPE}
          header={'Chọn loại KPI'}
          onChangeValue={changeKpiType}
          refPicker={typeRef}
        />
        <InputPicker
          placeholder={'Cách tính KPI'}
          title={'Cách tính KPI'}
          options={filterKpiCalculateBy()}
          header={'Chọn cách tính KPI'}
          onChangeValue={changeKpiCalculateBy}
          refPicker={calculateByRef}
        />
        <DateRangePicker
          startDate={startTime}
          endDate={endTime}
          onSelectEndDate={setUNIXEndTime}
          onSelectStartDate={setUNIXStartTime}
          title={'Thời gian'}
        />
        {detailKpis.map((item) => (
          <KPIAddItem
            isAdded={true}
            addedItemId={item.id}
            options={getOptions()}
            addedItemKpi={getItemQuantity(item.id)}
            removeItem={removeItem}
            typeUnit={getTypeUnit()}
            calculateByUnit={getCalculateByUnit()}
          />
        ))}
        <KPIAddItem
          options={getOptions()}
          addItem={addItem}
          typeUnit={getTypeUnit()}
          calculateByUnit={getCalculateByUnit()}
        />
        <SubmitButton
          title={'Lưu'}
          onPress={addKpis}
          containerStyle={styles.button}
          loading={props.addingKpis}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = {
  container: {
    marginHorizontal: theme.mainHorizontal,
  },
  button: {
    marginTop: 30,
  },
};

export default AddKPIComponent;
