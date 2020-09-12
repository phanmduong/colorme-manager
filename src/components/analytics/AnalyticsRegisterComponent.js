import React from 'react';
import AnalyticsRegisterBarChart from './AnalyticsRegisterBarChart';
import {Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import Loading from '../common/Loading';
import AnalyticsRevenueBarChart from './AnalyticsRevenueBarChart';
import AnalyticsStudentBarChart from './AnalyticsStudentBarChart';
const {width, height} = Dimensions.get('window');

class AnalyticsRegisterComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.isLoadingAnalyticsRegister ||
      this.props.isLoadingAnalyticsRevenue ? (
      <Loading size={width / 8} />
    ) : (
      <Swiper
        style={styles.wrapper}
        showsPagination={true}
        height={480}
        activeDotColor={'black'}
        loop={false}>
        <AnalyticsRevenueBarChart
          revenue={this.props.analyticsRevenue.revenue}
          revenueToday={this.props.analyticsRevenue.revenue_today}
          dates={this.props.analyticsRegister.dates}
          revenueNums={this.props.analyticsRegister.money_by_date}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
        />
        <AnalyticsRegisterBarChart
          dates={this.props.analyticsRegister.dates}
          regisNums={this.props.analyticsRegister.registers_by_date}
          paidNums={this.props.analyticsRegister.paid_by_date}
          totalRegister={this.props.analyticsRevenue.total_register}
          totalPaid={this.props.analyticsRevenue.total_paid_register}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
        />
        <AnalyticsStudentBarChart
          dates={this.props.analyticsRegister.dates}
          newRegis={this.props.analyticsRegister.new_register_by_date}
          oldRegis={this.props.analyticsRegister.old_register_by_date}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
        />
      </Swiper>
    );
  }
}

const styles = {
  wrapper: {},
};

export default AnalyticsRegisterComponent;
