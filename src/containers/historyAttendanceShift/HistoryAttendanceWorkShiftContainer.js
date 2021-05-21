/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Dimensions} from 'react-native';
import {observer} from 'mobx-react';
import HistoryAttendanceShiftStore from './HistoryAttendanceShiftStore';
import Spinkit from 'react-native-spinkit';
import theme from '../../styles';
import {Button, Container, Text, View} from 'native-base';
import ListHistoryAttendanceShift from './ListHistoryAttendanceShift';
import * as alert from '../../constants/alert';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListHistoryAttendanceTeaching from '../historyAttendanceTeaching/ListHistoryAttendanceTeaching';
import moment from 'moment';
import {onSelectStartTime} from '../../actions/registerListActions';

const {width} = Dimensions.get('window');

@observer
class HistoryAttendanceShiftContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = new HistoryAttendanceShiftStore();
  }

  componentWillMount = () => {
    this.loadData();
  };

  loadData = () => {
    const {startTime, endTime} = this.store;
    this.store.loadHistoryShift(
      'work_shift',
      this.props.user.id,
      startTime,
      endTime,
      this.props.token,
      this.props.domain,
    );
  };

  onSelectStartTime = (startTime) => {
    this.store.onSelectStartTime(startTime);
  };

  onSelectEndTime = (endTime) => {
    this.store.onSelectEndTime(endTime);
  };

  reload = () => {
    const startTime = moment().startOf('week').unix();
    const endTime = moment().endOf('week').unix();
    this.onSelectStartTime(startTime);
    this.onSelectEndTime(endTime);
    this.loadData();
  };

  errorData() {
    const {error} = this.store;
    return (
      <View style={styles.container}>
        <Text style={styles.textError}>
          {error ? alert.LOAD_DATA_ERROR : alert.NO_DATA_WORK_SHIFT_REGISTER}
        </Text>
        <Button
          iconLeft
          danger
          small
          onPress={this.reload}
          style={{marginTop: 10, alignSelf: null}}>
          <MaterialCommunityIcons name="reload" color="white" size={20} />
          <Text>Thử lại</Text>
        </Button>
      </View>
    );
  }

  render() {
    const {isLoading, error, shifts} = this.store;
    return (
      <Container>
        {isLoading ? (
          <View style={styles.container}>
            <Spinkit
              isVisible
              color={theme.mainColor}
              type="Wave"
              size={width / 8}
            />
          </View>
        ) : error || (shifts && shifts.length <= 0) ? (
          this.errorData()
        ) : (
          <ListHistoryAttendanceShift
            store={this.store}
            onSelectStartTime={this.onSelectStartTime}
            onSelectEndTime={this.onSelectEndTime}
            loadData={this.loadData}
            shiftType={'work_shift'}
          />
        )}
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: '#d9534f',
    textAlign: 'center',
  },
  containerPicker: {
    flexDirection: 'row',
  },
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    user: state.login.user,
    domain: state.login.domain,
  };
}

export default connect(mapStateToProps)(HistoryAttendanceShiftContainer);
