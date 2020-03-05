import React from 'react';
import MakeupClassComponent from '../components/MakeupClassComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as makeupClassActions from '../actions/makeupClassActions';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class MakeupClassContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  static navigationOptions = ({navigation}) => ({
    headerLeft: () => (
      <View style={styles.headerLeftContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name={'chevron-left'}
            size={33}
            color={'black'}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.name}>Lịch học bù</Text>
        </View>
      </View>
    ),
  });

  componentDidMount = () => {
    this.loadAllCourses();
  };

  componentWillUnmount = () => {
    this.props.makeupClassActions.resetData();
  };

  loadAllCourses = () => {
    this.props.makeupClassActions.loadAllCourses(this.props.token);
  };

  loadSchedule = id => {
    this.props.makeupClassActions.loadScheduleClasses(this.props.token, id);
  };

  render() {
    return (
      <MakeupClassComponent
        courses={this.props.courses}
        isLoadingAllCourses={this.props.isLoadingAllCourses}
        loadSchedule={this.loadSchedule}
        schedule={this.props.schedule}
        isLoadingScheduleClasses={this.props.isLoadingScheduleClasses}
      />
    );
  }
}

const styles = {
  name: {
    fontWeight: '600',
    fontSize: 23,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginLeft: 10,
  },
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    isLoadingScheduleClasses: state.makeupClasses.isLoadingScheduleClasses,
    errorScheduleClasses: state.makeupClasses.errorScheduleClasses,
    schedule: state.makeupClasses.schedule,
    isLoadingAllCourses: state.makeupClasses.isLoadingAllCourses,
    errorLoadingAllCourses: state.makeupClasses.errorLoadingAllCourses,
    courses: state.makeupClasses.courses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    makeupClassActions: bindActionCreators(makeupClassActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MakeupClassContainer);
