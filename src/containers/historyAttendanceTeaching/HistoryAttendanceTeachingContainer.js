/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Dimensions} from 'react-native';
import {observer} from 'mobx-react';
import HistoryAttendanceTeachingStore from './HistoryAttendanceTeachingStore';
import Spinkit from 'react-native-spinkit';
import theme from '../../styles';
import {Button, Container, Text, View} from 'native-base';
import ListHistoryAttendanceTeaching from './ListHistoryAttendanceTeaching';
import * as alert from '../../constants/alert';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

@observer
class HistoryAttendanceTeachingContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = new HistoryAttendanceTeachingStore();
  }

  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    const {startTime, endTime} = this.store;
    this.store.loadHistoryTeaching(
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

  errorData() {
    const {error} = this.store;
    return (
      <View style={styles.container}>
        <Text style={styles.textError}>
          {error ? alert.LOAD_DATA_ERROR : alert.NO_DATA_CLASS}
        </Text>
        <Button
          iconLeft
          danger
          small
          onPress={this.loadData}
          style={{marginTop: 10, alignSelf: null}}>
          <MaterialCommunityIcons name="reload" color="white" size={20} />
          <Text>Thử lại</Text>
        </Button>
      </View>
    );
  }

  render() {
    const {isLoading, error, attendances} = this.store;
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
        ) : error || (attendances && attendances.length <= 0) ? (
          this.errorData()
        ) : (
          <ListHistoryAttendanceTeaching
            store={this.store}
            onSelectStartTime={this.onSelectStartTime}
            onSelectEndTime={this.onSelectEndTime}
            loadData={this.loadData}
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

export default connect(mapStateToProps)(HistoryAttendanceTeachingContainer);
