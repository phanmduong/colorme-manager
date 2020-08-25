import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import AnalyticsRegisterContainer from '../containers/analytics/AnalyticsRegisterContainer';
import AnalyticsKPIContainer from '../containers/analytics/AnalyticsKPIContainer';
import AnalyticsClassContainer from '../containers/analytics/AnalyticsClassContainer';
import theme from '../styles';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
const {width, height} = Dimensions.get('window');
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
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

        <View style={styles.infoRow}>
          <View style={[styles.infoContainer, {marginRight: 8}]}>
            <View style={styles.row}>
              <Text style={{marginRight: 10}}>Số lượng đăng kí</Text>
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
            <Text style={styles.infoNum}>12.131</Text>
          </View>
          <View style={[styles.infoContainer, {marginLeft: 8}]}>
            <View style={styles.row}>
              <Text style={{marginRight: 10}}>Đã đóng học phí</Text>
              <View
                style={[styles.iconContainer, {backgroundColor: '#FFDB5A'}]}>
                <FA5Icon name={'money-bill-alt'} size={12} color={'white'} />
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.infoNum}>121</Text>
              <View style={styles.extraNumContainer}>
                <Text style={styles.extraNum}>10%</Text>
              </View>
            </View>
          </View>
        </View>

        <AnalyticsCalenderPicker
          isVisible={this.state.isCalendarPickerVisible}
          onDateChange={this.onDateChange}
          toggleModal={this.toggleModal}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
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
