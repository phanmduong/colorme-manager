import React from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import theme from '../../styles';
import {dotNumber, shortVND} from '../../helper';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import {DAILY, MONTH, QUARTER, WEEK, YEAR} from '../../constants/constant';
import _ from 'lodash';
import moment from 'moment';
const {width, height} = Dimensions.get('window');

const fixedHeight = 200;

class AnalyticsRevenueBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: DAILY,
    };
  }

  pairsDateRevenue = () => {
    const {dates, revenueNums} = this.props;
    return _.zipWith(dates, revenueNums, function (a, b) {
      return [a, b];
    });
  };

  getMaxValue = (revenueLst) => {
    let maxValue = 0;
    revenueLst.forEach(function (item) {
      if (maxValue < parseInt(item)) {
        maxValue = parseInt(item);
      }
    });
    return maxValue;
  };

  revenueLst = (grouped) => {
    let revenueLst = [];
    for (const key in grouped) {
      let accum = 0;
      for (const item of grouped[key]) {
        accum += parseInt(item[1]);
      }
      revenueLst.push(accum);
    }
    return revenueLst;
  };

  renderDailyBarChart = () => {
    const pairsDateRevenue = this.pairsDateRevenue();
    const groupedByDate = _.groupBy(pairsDateRevenue, function (item) {
      return item[0];
    });
    const unitWidth =
      (width - theme.mainHorizontal * 7) / Object.keys(groupedByDate).length;
    const barWidth = unitWidth / 2;
    const revenueLst = this.revenueLst(groupedByDate);
    const maxValue = this.getMaxValue(revenueLst);
    return this.barChartGraph(revenueLst, maxValue, barWidth);
  };

  renderWeeklyBarChart = () => {
    const pairsDateRevenue = this.pairsDateRevenue();
    const groupedByWeek = pairsDateRevenue.reduce((acc, item) => {
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
      (width - theme.mainHorizontal * 7) / Object.keys(groupedByWeek).length;
    const barWidth = unitWidth / 2;
    const revenueLst = this.revenueLst(groupedByWeek);
    const maxValue = this.getMaxValue(revenueLst);
    return this.barChartGraph(revenueLst, maxValue, barWidth);
  };

  renderMonthlyBarChart = () => {
    const pairsDateRevenue = this.pairsDateRevenue();
    const groupedByMonth = _.groupBy(pairsDateRevenue, function (item) {
      return item[0].substring(0, 7);
    });
    const unitWidth =
      (width - theme.mainHorizontal * 7) / Object.keys(groupedByMonth).length;
    const barWidth = unitWidth / 2;
    const revenueLst = this.revenueLst(groupedByMonth);
    const maxValue = this.getMaxValue(revenueLst);
    return this.barChartGraph(revenueLst, maxValue, barWidth);
  };

  renderQuarterlyBarChart = () => {
    const pairsDateRevenue = this.pairsDateRevenue();
    const groupedByQuarter = pairsDateRevenue.reduce((acc, item) => {
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
      (width - theme.mainHorizontal * 7) / Object.keys(groupedByQuarter).length;
    const barWidth = unitWidth / 2;
    const revenueLst = this.revenueLst(groupedByQuarter);
    const maxValue = this.getMaxValue(revenueLst);
    return this.barChartGraph(revenueLst, maxValue, barWidth);
  };

  renderYearlyBarChart = () => {
    const pairsDateRevenue = this.pairsDateRevenue();
    const groupedByYear = _.groupBy(pairsDateRevenue, function (item) {
      return item[0].substring(0, 4);
    });
    const unitWidth =
      (width - theme.mainHorizontal * 7) / Object.keys(groupedByYear).length;
    const barWidth = unitWidth / 2;
    const revenueLst = this.revenueLst(groupedByYear);
    const maxValue = this.getMaxValue(revenueLst);
    return this.barChartGraph(revenueLst, maxValue, barWidth);
  };

  barChartGraph = (revenueLst, maxValue, barWidth) => {
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
                {dotNumber(shortVND(maxValue / 4))}K
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
                {dotNumber(shortVND(maxValue / 2))}K
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
                {dotNumber(shortVND((maxValue * 3) / 4))}K
              </Text>
              <View style={styles.lineEstimate} />
            </View>
          </View>
          <View
            style={[styles.lineEstimateContainer, {bottom: fixedHeight - 6}]}>
            <View style={styles.row}>
              <Text style={styles.lineValue}>
                {dotNumber(shortVND(maxValue))}K
              </Text>
              <View style={styles.lineEstimate} />
            </View>
          </View>
          {revenueLst.map(function (revenue) {
            const revenueHeight =
              maxValue === 0 ? fixedHeight : fixedHeight * (revenue / maxValue);
            return (
              <View style={styles.barRow}>
                <View
                  style={{
                    width: barWidth,
                    height: revenueHeight,
                    backgroundColor: maxValue === 0 ? 'white' : '#69C553',
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.xAxisContainer}>
          <Text style={styles.xAxisDate}>
            {this.props.startDate ? this.props.startDate.format('YYYY-MM-DD') : null}
          </Text>
          <Text style={styles.xAxisDate}>
            {this.props.endDate ? this.props.endDate.format('YYYY-MM-DD') : null}
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
              <Text>Tổng doanh thu</Text>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: '#65DA3A',
                  },
                ]}>
                <FA5Icon name={'money-bill-alt'} size={12} color={'white'} />
              </View>
            </View>
            <Text style={styles.infoNum}>{dotNumber(this.props.revenue)}đ</Text>
          </View>
          <View style={[styles.infoContainer, {marginLeft: 8}]}>
            <View style={styles.infoTitleContainer}>
              <Text>D.thu hôm nay</Text>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: '#65DA3A',
                  },
                ]}>
                <FA5Icon name={'money-bill-alt'} size={12} color={'white'} />
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.infoNum}>
                {dotNumber(this.props.revenueToday)}đ
              </Text>
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
          <Text style={{fontSize: 13}}>Doanh thu</Text>
        </View>
      </View>
    );
  }
}

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
    height: 77,
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
  infoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: theme.mainHorizontal,
    paddingLeft: theme.mainHorizontal * 4,
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
  barRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  lineEstimate: {
    width: width - theme.mainHorizontal * 3 - 35,
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

export default AnalyticsRevenueBarChart;
