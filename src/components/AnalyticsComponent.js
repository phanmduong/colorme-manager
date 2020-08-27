import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import AnalyticsRegisterContainer from '../containers/analytics/AnalyticsRegisterContainer';
import AnalyticsKPIContainer from '../containers/analytics/AnalyticsKPIContainer';
import AnalyticsClassContainer from '../containers/analytics/AnalyticsClassContainer';
import theme from '../styles';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AnalyticsCalenderPicker from './analytics/AnalyticsCalenderPicker';

class AnalyticsComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tabIdx: 0,
      isCalendarPickerVisible: false,
    };
  }

  onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      this.props.onSelectEndDate(date);
    } else {
      this.props.onSelectStartDate(date);
      this.props.onSelectEndDate(null);
    }
  };

  toggleModal = () => {
    if (this.props.startDate && this.props.endDate) {
      this.setState({
        isCalendarPickerVisible: !this.state.isCalendarPickerVisible,
      });
    } else {
      alert('hello');
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.containerTag}>
          <TouchableOpacity onPress={() => this.setState({tabIdx: 0})}>
            <View
              style={[
                styles.tag,
                {
                  backgroundColor:
                    this.state.tabIdx === 0 ? '#F6F6F6' : 'white',
                },
              ]}>
              <Text style={{color: 'black'}}>Doanh thu và đăng kí</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({tabIdx: 1})}>
            <View
              style={[
                styles.tag,
                {
                  backgroundColor:
                    this.state.tabIdx === 1 ? '#F6F6F6' : 'white',
                },
              ]}>
              <Text style={{color: 'black'}}>KPI doanh thu</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({tabIdx: 2})}>
            <View
              style={[
                styles.tag,
                {
                  backgroundColor:
                    this.state.tabIdx === 2 ? '#F6F6F6' : 'white',
                },
              ]}>
              <Text style={{color: 'black'}}>Lớp học</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.dateFilterRow}>
          <TouchableOpacity
            style={styles.dateContainer}
            onPress={this.toggleModal}>
            <EntypoIcon name={'calendar'} size={17} color={'black'} />
            <Text style={{marginLeft: 10}}>
              {this.props.startDate
                ? this.props.startDate.format('DD/MM/YYYY')
                : null}{' '}
              -{' '}
              {this.props.endDate
                ? this.props.endDate.format('DD/MM/YYYY')
                : null}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.filterContainer}>
              <Image
                source={require('../../assets/img/icons8-sorting_options_filled.png')}
                style={{width: 18, height: 18}}
              />
            </View>
          </TouchableOpacity>
        </View>

        <AnalyticsCalenderPicker
          isVisible={this.state.isCalendarPickerVisible}
          onDateChange={this.onDateChange}
          toggleModal={this.toggleModal}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          loadAnalytics={this.props.loadAnalytics}
        />

        {this.state.tabIdx === 0 ? <AnalyticsRegisterContainer /> : null}
        {this.state.tabIdx === 1 ? <AnalyticsKPIContainer /> : null}
        {this.state.tabIdx === 2 ? <AnalyticsClassContainer /> : null}
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  tag: {
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTag: {
    flexDirection: 'row',
    paddingHorizontal: theme.mainHorizontal,
  },
  dateContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#f6f6f6',
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  filterContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
  dateFilterRow: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: theme.mainHorizontal,
  },
  icon: {
    width: 18,
    height: 18,
  },
  row: {
    flexDirection: 'row',
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
};

export default AnalyticsComponent;
