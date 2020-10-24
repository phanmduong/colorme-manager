import React, {useState} from 'react';
import {View, Dimensions, Text, TouchableOpacity} from 'react-native';
import {DAILY, MONTH, QUARTER, WEEK, YEAR} from '../../constants/constant';
import theme from '../../styles';
import {dotNumber} from '../../helper';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
const {width} = Dimensions.get('window');

const AnalyticsStatusBarChart = ({dates, statuses, startDate, endDate}) => {
  const [mode, setMode] = useState(DAILY);

  const fixedHeight = 200;

  /**
   * List of date with list of entries of each status and its register on that date
   */
  const listOfDateStatusRegister = () => {
    return dates.map((date, index) => {
      const dateStatuses = statuses.map((status) => {
        return {
          name: status.name,
          registers: status.register_by_date[index],
          color: status.color ? status.color : '#DDDDDD',
        };
      });
      return {date, statuses: dateStatuses};
    });
  };

  /**
   * Get the max value of total registers of a date from all dates
   */
  const getMaxValue = (dateStatusRegisterPairs) => {
    let maxValue = 0;
    dateStatusRegisterPairs.forEach((dateStatuses) => {
      let totalRegis = 0;
      dateStatuses.statuses.forEach((status) => {
        totalRegis += status.registers;
      });
      maxValue = maxValue < totalRegis ? totalRegis : maxValue;
    });
    return maxValue;
  };

  /**
   * Get the total registers for a date
   */
  const getTotalStatusRegister = (dateStatuses) => {
    let totalRegis = 0;
    dateStatuses.statuses.forEach((status) => {
      totalRegis += status.registers;
    });
    return totalRegis;
  };

  /**
   * Return a list of statuses with its computed bar height
   */
  const getStatusesWithHeights = (totalHeight, totalRegister, statuses) => {
    return statuses.map((status) => {
      const height = (totalHeight * status.registers) / totalRegister;
      return {...status, height: height};
    });
  };

  /**
   * Get a list of specified date mode - statuses pairs
   *
   * @param dateStatusesPairs
   * @returns {[]}
   */
  const listOfModeStatusPairs = (dateStatusesPairs) => {
    // Group date - status pairs into according date mode specified like week or quarter
    const groupedByMode = dateStatusesPairs.reduce((acc, item) => {
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
    let modeStatusPairs = [];

    for (const mode in groupedByMode) {
      // Generate a list of statuses for specified date mode
      let statuses = [];

      groupedByMode[mode].forEach((dateStatus) => {
        dateStatus.statuses.forEach((status) => {
          // Check to see if compared status already appended to list. If not, add to the list. If yes,
          // accumulate the registers of the existed status
          const idxCheckStatusDoesExist = statuses.findIndex(
            (targetStatus) => targetStatus.name === status.name,
          );
          if (idxCheckStatusDoesExist === -1) {
            statuses.push(status);
          } else {
            statuses[idxCheckStatusDoesExist].registers += status.registers;
          }
        });
      });

      // Push the entry date mode - statuses to the list
      modeStatusPairs.push({date: mode, statuses: statuses});
    }

    return modeStatusPairs;
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
    const dateStatusesPairs = listOfDateStatusRegister();
    const modeStatusesPairs = listOfModeStatusPairs(dateStatusesPairs);
    const unitWidth =
      (width - theme.mainHorizontal * 6) / modeStatusesPairs.length;
    const barWidth = unitWidth / 2;
    const maxValue = getMaxValue(modeStatusesPairs);
    return barChartGraph(modeStatusesPairs, maxValue, barWidth);
  };

  /**
   * Sketch the entire bar chart
   */
  const barChartGraph = (modeStatusesPairs, maxValue, barWidth) => {
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
          {modeStatusesPairs.map(function (pair) {
            const totalRegister = getTotalStatusRegister(pair);
            const totalHeight =
              maxValue === 0
                ? fixedHeight
                : (fixedHeight * totalRegister) / maxValue;
            const statusesWithHeights = getStatusesWithHeights(
              totalHeight,
              totalRegister,
              pair.statuses,
            );
            return (
              <View style={styles.barRow}>
                <View
                  style={{
                    width: barWidth,
                    height: totalHeight,
                    backgroundColor: maxValue === 0 ? 'white' : '#FFDB5A',
                  }}>
                  {statusesWithHeights.map((status) => {
                    return (
                      <View
                        style={{
                          width: barWidth,
                          height: status.height,
                          backgroundColor:
                            status.height === 0 ? 'white' : status.color,
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
      <View style={styles.infoRow}>
        <View style={[styles.infoContainer, {marginRight: 8}]}>
          <View style={styles.infoTitleContainer}>
            <Text>Học viên mới</Text>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: '#65DA3A',
                },
              ]}>
              <MatIcon name={'add-circle'} size={18} color={'white'} />
            </View>
          </View>
          <Text style={styles.infoNum}>
            {/*{this.props.newRegis*/}
            {/*  ? dotNumber(findSum(this.props.newRegis))*/}
            {/*  : null}*/}
          </Text>
        </View>
        <View style={[styles.infoContainer, {marginLeft: 8}]}>
          <View style={styles.infoTitleContainer}>
            <Text>Học viên cũ</Text>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: '#FFDB5A',
                },
              ]}>
              <Ionicon name={'ios-refresh'} size={15} color={'white'} />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoNum}>
              {/*{this.props.oldRegis*/}
              {/*  ? dotNumber(findSum(this.props.oldRegis))*/}
              {/*  : null}*/}
            </Text>
            <View style={styles.extraNumContainer}>
              <Text style={styles.extraNum}>
                {/*{this.props.newRegis && this.props.oldRegis*/}
                {/*  ? Math.round(*/}
                {/*      (findSum(this.props.oldRegis) /*/}
                {/*        findSum(this.props.newRegis)) **/}
                {/*        100,*/}
                {/*    )*/}
                {/*  : null}*/}
                {/*%*/}
              </Text>
            </View>
          </View>
        </View>
      </View>

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
        <Text style={{fontSize: 13}}>Tỉ lệ học viên mới cũ</Text>
      </View>
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
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    padding: 10,
    width: (width - theme.mainHorizontal) / 2 - 16,
  },
  iconContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  infoNum: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default AnalyticsStatusBarChart;
