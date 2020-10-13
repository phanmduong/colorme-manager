import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import theme from '../../styles';
import {dotNumber} from '../../helper';
import {
  FILTER_KPI_CALCULATE_BY,
  FILTER_KPI_TYPE,
} from '../../constants/constant';
import Collapsible from 'react-native-collapsible';
import KPICollapsibleItem from './KPICollapsibleItem';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const KPIItem = ({name, calculate_by, detail_kpis, type}) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const pairQuantityKPI = () => {
    const quantity = detail_kpis.reduce(function (accum, currentItem) {
      return (accum += currentItem.quantity);
    }, 0);
    const totalDoneKPI = detail_kpis.reduce(function (accum, currentItem) {
      return (accum += currentItem.total_done_kpi);
    }, 0);
    return {quantity, totalDoneKPI};
  };

  const getPercentage = () => {
    const quantityKPI = pairQuantityKPI();
    if (quantityKPI.quantity !== 0) {
      const percentage = Math.round(
        (quantityKPI.totalDoneKPI / quantityKPI.quantity) * 100,
      );
      if (percentage <= 100) {
        return percentage;
      }
      return 100;
    }
    return 0;
  };

  const getTypeName = () => {
    return FILTER_KPI_TYPE.find((typeItem) => typeItem.id === type).name;
  };

  const getCalByName = () => {
    return FILTER_KPI_CALCULATE_BY.find(
      (calItem) => calItem.id === calculate_by,
    ).name;
  };

  const renderKPIDetails = () => {
    return detail_kpis.map((kpi) => (
      <KPICollapsibleItem
        quantity={kpi.quantity}
        total_done_kpi={kpi.total_done_kpi}
        saler={kpi.data}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapsed}>
        <View style={styles.row}>
          <Text style={styles.sectionName}>{name}</Text>
          {collapsed ? (
            <MaterialIcon name={'arrow-drop-down'} color={'black'} size={30} />
          ) : (
            <MaterialIcon name={'arrow-drop-up'} color={'black'} size={30} />
          )}
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>
            {dotNumber(pairQuantityKPI().totalDoneKPI)} đ /{' '}
            {dotNumber(pairQuantityKPI().quantity)} đ
          </Text>
          <Text style={styles.stats}>{getPercentage()}%</Text>
        </View>
        <Progress.Bar
          width={null}
          height={4}
          progress={getPercentage() / 100}
          color={'#32CA41'}
          unfilledColor={'#E0E0E0'}
          borderColor={'white'}
          borderRadius={10}
          style={{marginTop: 10}}
        />
        <Text style={styles.dateText}>01/08/2020-31/08/2020</Text>
        <View style={styles.tagContainer}>
          <View style={styles.typeTag}>
            <Text style={styles.tagText}>{getTypeName()}</Text>
          </View>
          <View style={styles.calTag}>
            <Text style={styles.tagText}>{getCalByName()}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>{renderKPIDetails()}</Collapsible>
    </View>
  );
};

const styles = {
  container: {
    marginHorizontal: theme.mainHorizontal,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionName: theme.header,
  statsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stats: {
    color: 'black',
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  typeTag: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#4C4DC3',
    borderRadius: 6,
  },
  calTag: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#4B90F5',
    borderRadius: 6,
    marginLeft: 5,
  },
  tagText: {
    color: 'white',
  },
  dateText: {
    color: '#BCBCBC',
    marginTop: 10,
  },
};

export default KPIItem;
