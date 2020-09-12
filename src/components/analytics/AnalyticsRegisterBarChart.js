import React from 'react';
import {View, Dimensions, Text, TouchableOpacity} from 'react-native';
import theme from '../../styles';
const {width, height} = Dimensions.get('window');
import _ from 'lodash';
import moment from 'moment';
import {DAILY, MONTH, QUARTER, WEEK, YEAR} from '../../constants/constant';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import {dotNumber} from '../../helper';

const fixedHeight = 200;

class AnalyticsRegisterBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: DAILY,
      maxValue: 0,
    };
  }

  pairsDateRegisPaid = () => {
    const {dates, regisNums, paidNums} = this.props;
    return _.zipWith(dates, regisNums, paidNums, function (a, b, c) {
      return [a, b, c];
    });
  };

  getMaxValue = (regisPaidPairs) => {
    let maxValue = 0;
    for (const item of regisPaidPairs) {
      if (maxValue < item[0]) {
        maxValue = item[0];
      }
      if (maxValue < item[1]) {
        maxValue = item[1];
      }
    }
    return maxValue;
  };

  groupedPairRegisPaid = (grouped) => {
    let pairRegisPaid = [];
    for (const key in grouped) {
      let accum = [0, 0];
      for (const item of grouped[key]) {
        accum[0] += item[1];
        accum[1] += item[2];
      }
      pairRegisPaid.push(accum);
    }
    return pairRegisPaid;
  };

  renderDailyBarChart = () => {
    const pairsDateRegisPaid = this.pairsDateRegisPaid();
    const groupedByDate = _.groupBy(pairsDateRegisPaid, function (item) {
      return item[0];
    });
    const unitWidth =
      (width - theme.mainHorizontal * 6) / Object.keys(groupedByDate).length;
    const barWidth = unitWidth / 3;
    const pairRegisPaid = this.groupedPairRegisPaid(groupedByDate);
    const maxValue = this.getMaxValue(pairRegisPaid);
    return this.barChartGraph(pairRegisPaid, maxValue, barWidth);
  };

  renderWeeklyBarChart = () => {
    const pairsDateRegisPaid = this.pairsDateRegisPaid();
    const groupedByWeek = pairsDateRegisPaid.reduce((acc, item) => {
      // create a composed key: 'year-week'
      const yearWeek = `${moment(item[0]).year()}-${moment(item[0]).week()}`;

      // add this key as a property to the result object
      if (!acc[yearWeek]) {
        acc[yearWeek] = [];
      }

      // push the current date that belongs to the year-week calculated before
      acc[yearWeek].push(item);

      return acc;
    }, {});
    const unitWidth =
      (width - theme.mainHorizontal * 6) / Object.keys(groupedByWeek).length;
    const barWidth = unitWidth / 3;
    const pairRegisPaid = this.groupedPairRegisPaid(groupedByWeek);
    const maxValue = this.getMaxValue(pairRegisPaid);
    return this.barChartGraph(pairRegisPaid, maxValue, barWidth);
  };

  renderMonthlyBarChart = () => {
    const pairsDateRegisPaid = this.pairsDateRegisPaid();
    const groupedByMonth = _.groupBy(pairsDateRegisPaid, function (item) {
      return item[0].substring(0, 7);
    });
    const unitWidth =
      (width - theme.mainHorizontal * 6) / Object.keys(groupedByMonth).length;
    const barWidth = unitWidth / 3;
    const pairRegisPaid = this.groupedPairRegisPaid(groupedByMonth);
    const maxValue = this.getMaxValue(pairRegisPaid);
    return this.barChartGraph(pairRegisPaid, maxValue, barWidth);
  };

  renderQuarterlyBarChart = () => {
    const pairsDateRegisPaid = this.pairsDateRegisPaid();
    const groupedByQuarter = pairsDateRegisPaid.reduce((acc, item) => {
      // create a composed key: 'year-week'
      const yearWeek = `${moment(item[0]).year()}-${moment(item[0]).quarter()}`;

      // add this key as a property to the result object
      if (!acc[yearWeek]) {
        acc[yearWeek] = [];
      }

      // push the current date that belongs to the year-week calculated before
      acc[yearWeek].push(item);

      return acc;
    }, {});
    const unitWidth =
      (width - theme.mainHorizontal * 6) / Object.keys(groupedByQuarter).length;
    const barWidth = unitWidth / 3;
    const pairRegisPaid = this.groupedPairRegisPaid(groupedByQuarter);
    const maxValue = this.getMaxValue(pairRegisPaid);
    return this.barChartGraph(pairRegisPaid, maxValue, barWidth);
  };

  renderYearlyBarChart = () => {
    const pairsDateRegisPaid = this.pairsDateRegisPaid();
    const groupedByYear = _.groupBy(pairsDateRegisPaid, function (item) {
      return item[0].substring(0, 4);
    });
    const unitWidth =
      (width - theme.mainHorizontal * 6) / Object.keys(groupedByYear).length;
    const barWidth = unitWidth / 3;
    const pairRegisPaid = this.groupedPairRegisPaid(groupedByYear);
    const maxValue = this.getMaxValue(pairRegisPaid);
    return this.barChartGraph(pairRegisPaid, maxValue, barWidth);
  };

  barChartGraph = (pairsOfRegisPaid, maxValue, barWidth) => {
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
          {pairsOfRegisPaid.map(function (pair) {
            const regisHeight =
              maxValue === 0 ? fixedHeight : fixedHeight * (pair[0] / maxValue);
            const paidHeight =
              maxValue === 0 ? fixedHeight : fixedHeight * (pair[1] / maxValue);
            return (
              <View style={styles.barRow}>
                <View
                  style={{
                    width: barWidth,
                    height: regisHeight,
                    backgroundColor: maxValue === 0 ? 'white' : '#FFDB5A',
                  }}
                />
                <View style={{width: barWidth / 10}} />
                <View
                  style={{
                    width: barWidth,
                    height: paidHeight,
                    backgroundColor: maxValue === 0 ? 'white' : '#65DA3A',
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.xAxisContainer}>
          <Text style={styles.xAxisDate}>
            {this.props.startDate.format('YYYY-MM-DD')}
          </Text>
          <Text style={styles.xAxisDate}>
            {this.props.endDate.format('YYYY-MM-DD')}
          </Text>
        </View>
      </View>
    );
  };

  renderBarChart = () => {
    switch (this.state.mode) {
      case DAILY:
        return this.renderDailyBarChart();
      case WEEK:
        return this.renderWeeklyBarChart();
      case MONTH:
        return this.renderMonthlyBarChart();
      case QUARTER:
        return this.renderQuarterlyBarChart();
      case YEAR:
        return this.renderYearlyBarChart();
      default:
        return null;
    }
  };

  render() {
    return (
      <View>
        <View style={styles.infoRow}>
          <View style={[styles.infoContainer, {marginRight: 8}]}>
            <View style={styles.infoTitleContainer}>
              <Text>Số lượng đăng kí</Text>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: '#FFDB5A',
                  },
                ]}>
                <MatIcon name={'add-circle'} size={18} color={'white'} />
              </View>
            </View>
            <Text style={styles.infoNum}>
              {dotNumber(this.props.totalRegister)}
            </Text>
          </View>
          <View style={[styles.infoContainer, {marginLeft: 8}]}>
            <View style={styles.infoTitleContainer}>
              <Text>Đã đóng học phí</Text>
              <View
                style={[styles.iconContainer, {backgroundColor: '#65DA3A'}]}>
                <FA5Icon name={'money-bill-alt'} size={12} color={'white'} />
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.infoNum}>
                {dotNumber(this.props.totalPaid)}
              </Text>
              <View style={styles.extraNumContainer}>
                <Text style={styles.extraNum}>
                  {Math.round(
                    (this.props.totalPaid / this.props.totalRegister) * 100,
                  )}
                  %
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>{this.renderBarChart()}</View>

        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => this.setState({mode: DAILY})}>
            <View
              style={[
                styles.tag,
                {
                  backgroundColor:
                    this.state.mode === DAILY ? '#F6F6F6' : 'white',
                },
              ]}>
              <Text style={{color: 'black'}}>Ngày</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({mode: WEEK})}>
            <View
              style={[
                styles.tag,
                {
                  backgroundColor:
                    this.state.mode === WEEK ? '#F6F6F6' : 'white',
                },
              ]}>
              <Text style={{color: 'black'}}>Tuần</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({mode: MONTH})}>
            <View
              style={[
                styles.tag,
                {
                  backgroundColor:
                    this.state.mode === MONTH ? '#F6F6F6' : 'white',
                },
              ]}>
              <Text style={{color: 'black'}}>Tháng</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({mode: QUARTER})}>
            <View
              style={[
                styles.tag,
                {
                  backgroundColor:
                    this.state.mode === QUARTER ? '#F6F6F6' : 'white',
                },
              ]}>
              <Text style={{color: 'black'}}>Quý</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({mode: YEAR})}>
            <View
              style={[
                styles.tag,
                {
                  backgroundColor:
                    this.state.mode === YEAR ? '#F6F6F6' : 'white',
                },
              ]}>
              <Text style={{color: 'black'}}>Năm</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', marginTop: 15}}>
          <Text style={{fontSize: 13}}>
            Số lượt đăng kí và hoàn thành học phí
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
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
  infoNum: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
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

export default AnalyticsRegisterBarChart;
