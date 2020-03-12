/**
 * Created by phanmduong on 5/30/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listStudentAttendanceActions from '../actions/listStudentAttendanceActions';
import ListStudentAttendanceComponent from '../components/ListStudentAttendanceComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../styles";

class ListStudentAttendanceContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onLoad = this.onLoad.bind(this);
  }

  componentWillMount() {
    this.onLoad();
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
          <Text style={styles.name}>Danh sách học viên</Text>
        </View>
      </View>
    ),
  });

  onLoad() {
    const classID = this.props.classSelected.id;
    const lessonID = this.props.classSelected.lesson.id;
    this.props.listStudentAttendanceActions.loadDataListStudentAttendance(
      classID,
      lessonID,
      this.props.token,
    );
  }

  render() {
    return (
      <ListStudentAttendanceComponent
        isLoading={this.props.isLoading}
        error={this.props.error}
        listStudentClass={this.props.listStudentAttendanceData}
        onLoad={this.onLoad}
      />
    );
  }
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    classSelected: state.currentClassStudy.selectedCurrentClassStudy,
    isLoading: state.listStudentAttendance.isLoading,
    listStudentAttendanceData:
      state.listStudentAttendance.listStudentAttendanceData,
    error: state.listStudentAttendance.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    listStudentAttendanceActions: bindActionCreators(
      listStudentAttendanceActions,
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListStudentAttendanceContainer);
