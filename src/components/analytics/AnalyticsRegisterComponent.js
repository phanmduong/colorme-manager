import React from 'react';
import AnalyticsRegisterBarChart from './AnalyticsRegisterBarChart';
import {View, Text, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import Loading from '../common/Loading';
const {width, height} = Dimensions.get('window');

class AnalyticsRegisterComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.isLoadingAnalyticsRegister || this.props.isLoadingAnalyticsRevenue? (
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
      </Swiper>
    );
  }
}

const styles = {
  wrapper: {},
};

export default AnalyticsRegisterComponent;
