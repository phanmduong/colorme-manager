import React, {useState} from 'react';
import {View, Dimensions, Text, TouchableOpacity} from 'react-native';
import {DAILY, MONTH, QUARTER, WEEK, YEAR} from '../../constants/constant';
import theme from '../../styles';
import {dotNumber} from '../../helper';
import moment from 'moment';
import LegendsModal from './LegendsModal';
const {width} = Dimensions.get('window');

const AnalyticsMultipleLayerBarChart = ({
  dates,
  data,
  startDate,
  endDate,
  hasHexColor = true,
  barName,
}) => {
  const [mode, setMode] = useState(DAILY);
  const [isLegendsModalVisible, setLegendsModalVisible] = useState(false);

  const fixedHeight = 200;

  const toggleLegendsModal = () => {
    setLegendsModalVisible(!isLegendsModalVisible);
  };

  /**
   * List of date with list of entries of each status and its register on that date
   */
  const listOfDateDataRegister = () => {
    return dates.map((date, index) => {
      const dateData = data.map((dataItem) => {
        return {
          name: dataItem.name,
          registers: dataItem.register_by_date[index],
          color: dataItem.color
            ? hasHexColor
              ? dataItem.color
              : `#${dataItem.color}`
            : '#DDDDDD',
        };
      });
      return {date, data: dateData};
    });
  };

  /**
   * Get the max value of total registers of a date from all dates
   */
  const getMaxValue = (dateDataRegisterPairs) => {
    let maxValue = 0;
    dateDataRegisterPairs.forEach((dateData) => {
      let totalRegis = 0;
      dateData.data.forEach((dataItem) => {
        totalRegis += dataItem.registers;
      });
      maxValue = maxValue < totalRegis ? totalRegis : maxValue;
    });
    return maxValue;
  };

  /**
   * Get the total registers for a date
   */
  const getTotalDataRegister = (dateData) => {
    let totalRegis = 0;
    dateData.data.forEach((dataItem) => {
      totalRegis += dataItem.registers;
    });
    return totalRegis;
  };

  /**
   * Return a list of statuses with its computed bar height
   */
  const getDataWithHeights = (totalHeight, totalRegister, data) => {
    return data.map((dataItem) => {
      const height =
        totalRegister !== 0
          ? (totalHeight * dataItem.registers) / totalRegister
          : 0;
      return {...dataItem, height: height};
    });
  };

  /**
   * Get a list of specified date mode - statuses pairs
   */
  const listOfModeDataPairs = (dateDataPairs) => {
    // Group date - status pairs into according date mode specified like week or quarter
    const groupedByMode = dateDataPairs.reduce((acc, item) => {
      // create a composed key: 'year-dateMode'
      const yearMode = keyGeneratedByMode(item);

      // add this key as a property to the result object
      if (!acc[yearMode]) {
        acc[yearMode] = [];
      }

      // push the current date that belongs to the year-week calculated before
      acc[yearMode].push(item);

      return acc;
    }, {});

    // Create a list of specified date mode - statuses pairs
    let modeDataPairs = [];

    for (const mode in groupedByMode) {
      // Generate a list of statuses for specified date mode
      let data = [];

      groupedByMode[mode].forEach((dateData) => {
        dateData.data.forEach((dataItem) => {
          // Check to see if compared status already appended to list. If not, add to the list. If yes,
          // accumulate the registers of the existed status
          const idxCheckDataItemDoesExist = data.findIndex(
            (targetDataItem) => targetDataItem.name === dataItem.name,
          );
          if (idxCheckDataItemDoesExist === -1) {
            data.push(dataItem);
          } else {
            data[idxCheckDataItemDoesExist].registers += dataItem.registers;
          }
        });
      });

      // Push the entry date mode - statuses to the list
      modeDataPairs.push({date: mode, data: data});
    }

    return modeDataPairs;
  };

  /**
   * Generate date mode key
   *
   * @param item
   * @returns {string|null}
   */
  const keyGeneratedByMode = (item) => {
    switch (mode) {
      case DAILY:
        return `${moment(item.date).year()}-${moment(
          item.date,
        ).month()}-${moment(item.date).date()}`;
      case WEEK:
        return `${moment(item.date).year()}-${moment(item.date).week()}`;
      case MONTH:
        return `${moment(item.date).year()}-${moment(item.date).month()}`;
      case QUARTER:
        return `${moment(item.date).year()}-${moment(item.date).quarter()}`;
      case YEAR:
        return `${moment(item.date).year()}`;
      default:
        return null;
    }
  };

  /**
   * Render bar chart
   *
   * @returns {*}
   */
  const renderBarChart = () => {
    const dateDataPairs = listOfDateDataRegister();
    const modeDataPairs = listOfModeDataPairs(dateDataPairs);
    const unitWidth = (width - theme.mainHorizontal * 6) / modeDataPairs.length;
    const barWidth = unitWidth / 2;
    const maxValue = getMaxValue(modeDataPairs);
    return barChartGraph(modeDataPairs, maxValue, barWidth);
  };

  /**
   * Sketch the entire bar chart
   */
  const barChartGraph = (modeDataPairs, maxValue, barWidth) => {
    return (
      <View>
        <View style={styles.barContainer}>
          <View style={[styles.lineEstimateContainer, {bottom: -6}]}>
            <View style={styles.row}>
              <Text style={styles.lineValue}>0</Text>
              <View style={styles.lineEstimate} />
            </View>
          </View>
          <View
            style={[
              styles.lineEstimateContainer,
              {bottom: fixedHeight / 4 - 6},
            ]}>
            <View style={styles.row}>
              <Text style={styles.lineValue}>
                {dotNumber(Math.round(maxValue / 4))}
              </Text>
              <View style={styles.lineEstimate} />
            </View>
          </View>
          <View
            style={[
              styles.lineEstimateContainer,
              {bottom: fixedHeight / 2 - 6},
            ]}>
            <View style={styles.row}>
              <Text style={styles.lineValue}>
                {dotNumber(Math.round(maxValue / 2))}
              </Text>
              <View style={styles.lineEstimate} />
            </View>
          </View>
          <View
            style={[
              styles.lineEstimateContainer,
              {bottom: (fixedHeight * 3) / 4 - 6},
            ]}>
            <View style={styles.row}>
              <Text style={styles.lineValue}>
                {dotNumber(Math.round((maxValue * 3) / 4))}
              </Text>
              <View style={styles.lineEstimate} />
            </View>
          </View>
          <View
            style={[styles.lineEstimateContainer, {bottom: fixedHeight - 6}]}>
            <View style={styles.row}>
              <Text style={styles.lineValue}>
                {dotNumber(Math.round(maxValue))}
              </Text>
              <View style={styles.lineEstimate} />
            </View>
          </View>
          {modeDataPairs.map(function (pair) {
            const totalRegister = getTotalDataRegister(pair);
            const totalHeight =
              maxValue === 0
                ? fixedHeight
                : (fixedHeight * totalRegister) / maxValue;
            const dataWithHeights = getDataWithHeights(
              totalHeight,
              totalRegister,
              pair.data,
            );
            return (
              <View style={styles.barRow}>
                <View
                  style={{
                    width: barWidth,
                    height: totalHeight,
                    backgroundColor: maxValue === 0 ? 'white' : '#FFDB5A',
                  }}>
                  {dataWithHeights.map((dataItem) => {
                    return (
                      <View
                        style={{
                          width: barWidth,
                          height: dataItem.height,
                          backgroundColor:
                            dataItem.height === 0 ? 'white' : dataItem.color,
                        }}
                      />
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.xAxisContainer}>
          <Text style={styles.xAxisDate}>
            {startDate ? startDate.format('YYYY-MM-DD') : null}
          </Text>
          <Text style={styles.xAxisDate}>
            {endDate ? endDate.format('YYYY-MM-DD') : null}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={() => toggleLegendsModal()}>
        <View style={styles.infoRow}>
          <View style={styles.infoContainer}>
            {data.slice(0, 8).map((dataItem) => (
              <View style={[styles.row, {marginRight: 10}]}>
                <View
                  style={[
                    styles.legendDot,
                    {
                      backgroundColor: dataItem.color
                        ? hasHexColor
                          ? dataItem.color
                          : `#${dataItem.color}`
                        : '#DDDDDD',
                    },
                  ]}
                />
                <Text>{dataItem.name}</Text>
              </View>
            ))}
            {data.length > 8 && (
              <View style={styles.row}>
                <View
                  style={[
                    styles.legendDot,
                    {
                      backgroundColor: 'black',
                    },
                  ]}
                />
                <Text>+{data.length - 8} chú thích khác</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <View>{renderBarChart()}</View>

      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setMode(DAILY)}>
          <View
            style={[
              styles.tag,
              {
                backgroundColor: mode === DAILY ? '#F6F6F6' : 'white',
              },
            ]}>
            <Text style={{color: 'black'}}>Ngày</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode(WEEK)}>
          <View
            style={[
              styles.tag,
              {
                backgroundColor: mode === WEEK ? '#F6F6F6' : 'white',
              },
            ]}>
            <Text style={{color: 'black'}}>Tuần</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode(MONTH)}>
          <View
            style={[
              styles.tag,
              {
                backgroundColor: mode === MONTH ? '#F6F6F6' : 'white',
              },
            ]}>
            <Text style={{color: 'black'}}>Tháng</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode(QUARTER)}>
          <View
            style={[
              styles.tag,
              {
                backgroundColor: mode === QUARTER ? '#F6F6F6' : 'white',
              },
            ]}>
            <Text style={{color: 'black'}}>Quý</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode(YEAR)}>
          <View
            style={[
              styles.tag,
              {
                backgroundColor: mode === YEAR ? '#F6F6F6' : 'white',
              },
            ]}>
            <Text style={{color: 'black'}}>Năm</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center', marginTop: 15}}>
        <Text style={{fontSize: 13}}>{barName}</Text>
      </View>

      <LegendsModal
        isVisible={isLegendsModalVisible}
        closeModal={toggleLegendsModal}
        legends={data}
        hasHexColor={hasHexColor}
      />
    </View>
  );
};

const styles = {
  infoRow: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: theme.mainHorizontal,
  },
  infoContainer: {
    borderRadius: 10,
    padding: 10,
    height: 77,
    flex: 1,
    alignSelf: 'stretch',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  iconContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: theme.mainHorizontal,
    paddingLeft: theme.mainHorizontal * 3,
    paddingRight: theme.mainHorizontal,
    marginTop: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  tag: {
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraNumContainer: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#65DA3A',
    marginTop: 10,
    marginLeft: 5,
  },
  extraNum: {
    color: 'white',
    fontSize: 12,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  lineEstimate: {
    width: width - theme.mainHorizontal * 3 - 15,
    height: 0.4,
    backgroundColor: 'black',
    opacity: 0.1,
  },
  lineEstimateContainer: {
    position: 'absolute',
    right: 0,
  },
  lineValue: {
    color: 'black',
    fontSize: 10,
    marginRight: 5,
  },
  xAxisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: theme.mainHorizontal,
    paddingLeft: theme.mainHorizontal * 3,
    paddingRight: theme.mainHorizontal,
  },
  xAxisDate: {
    color: 'black',
    fontSize: 10,
  },
};

export default AnalyticsMultipleLayerBarChart;
