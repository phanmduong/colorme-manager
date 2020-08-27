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
      console.log(this.props.analyticsRegister);
    return this.props.isLoadingAnalyticsRegister ||
      this.props.isLoadingAnalyticsRevenue ? (
      <Loading size={width / 8} />
    ) : (
      <Swiper
        style={styles.wrapper}
        showsPagination={true}
        height={450}
        activeDotColor={'black'}>
        <AnalyticsRegisterBarChart
          dates={this.props.analyticsRegister.dates}
          regisNums={this.props.analyticsRegister.registers_by_date}
          paidNums={this.props.analyticsRegister.paid_by_date}
          totalRegister={this.props.analyticsRevenue.total_register}
          totalPaid={this.props.analyticsRevenue.total_paid_register}
        />
        <AnalyticsRevenueBarChart
          revenue={this.props.analyticsRevenue.revenue}
          revenueToday={this.props.analyticsRevenue.revenue_today}
          dates={this.props.analyticsRegister.dates}
          revenueNums={this.props.analyticsRegister.money_by_date}
        />
        <AnalyticsStudentBarChart
          newRegis={this.props.analyticsRegister.new_register_by_date}
          oldRegis={this.props.analyticsRegister.old_register_by_date}
        />
      </Swiper>
    );
  }
}

const styles = {
  wrapper: {},
};

export default AnalyticsRegisterComponent;
