import React from 'react';
import {connect} from 'react-redux';
import ListStudentAttendanceRegisterComponent from '../components/ListStudentAttendanceRegisterComponent';
import {bindActionCreators} from 'redux';
import * as listStudentAttendanceActions from '../actions/listStudentAttendanceActions';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShortName, isEmptyInput} from '../helper';
import theme from '../styles';

class ListStudentAttendanceRegisterContainer extends React.Component {
  constructor(props) {
    super(props);
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
          {!isEmptyInput(navigation.state.params) &&
          !isEmptyInput(navigation.state.params.classItem) ? (
            <Image
              source={{uri: navigation.state.params.classItem.course.icon_url}}
              style={styles.ava}
            />
          ) : (
            <Image
              source={require('../../assets/img/icons8-male-user-96.png')}
              style={styles.ava}
            />
          )}
          <Text style={[styles.name, {marginLeft: 10}]}>
            {navigation.state.params && navigation.state.params.classItem
              ? getShortName(navigation.state.params.classItem.name)
              : null}
          </Text>
        </View>
      </View>
    ),
  });

  componentDidMount() {
    this.loadAttendances(this.props.classSelected.lesson.id);
  }

  loadAttendances = (lessonId) => {
    const classID = this.props.classSelected.id;
    this.props.listStudentAttendanceActions.loadDataListStudentAttendance(
      classID,
      lessonId,
      this.props.token,
      this.props.domain,
    );
  };

  render() {
    return (
      <ListStudentAttendanceRegisterComponent
        {...this.props}
        loadAttendances={this.loadAttendances}
      />
    );
  }
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
  ava: theme.mainAvatar,
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    classSelected: state.currentClassStudy.selectedCurrentClassStudy,
    isLoading: state.listStudentAttendance.isLoading,
    listStudentAttendanceData:
      state.listStudentAttendance.listStudentAttendanceData,
    error: state.listStudentAttendance.error,
    domain: state.login.domain,
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
)(ListStudentAttendanceRegisterContainer);
