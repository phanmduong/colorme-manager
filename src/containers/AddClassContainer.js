import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as classActions from '../actions/classActions';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import AddClassComponent from '../components/AddClassComponent';
import * as genActions from '../actions/genActions';
import * as leadsActions from '../actions/leadsActions';

class AddEditClassContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadCourses();
    this.loadRooms();
    this.loadGens();
    this.loadSchedules('');
    this.loadStaff('');
  };

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
          <Text style={styles.name}>Tạo sửa lớp học</Text>
        </View>
      </View>
    ),
  });

  loadSchedules = (search) => {
    this.props.classActions.loadSchedules(
      search,
      this.props.token,
      this.props.domain,
    );
  };

  loadCourses = () => {
    this.props.classActions.loadDataCourse(this.props.token, this.props.domain);
  };

  loadRooms = () => {
    this.props.classActions.loadRooms(this.props.token, this.props.domain);
  };

  loadGens = () => {
    this.props.genActions.loadDataGen(this.props.token, this.props.domain);
  };

  loadStaff = (search) => {
    this.props.leadsActions.getStaff(
      search,
      this.props.token,
      this.props.domain,
    );
  };

  addClass = (classData) => {
    this.props.classActions.addClass(
      classData,
      this.props.token,
      this.props.domain,
      () => this.props.navigation.goBack(),
    );
  };

  render() {
    return (
      <AddClassComponent
        {...this.props}
        addClass={this.addClass}
        searchSchedules={this.loadSchedules}
        searchStaff={this.loadStaff}
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
    schedules: state.class.schedules,
    isLoadingSchedules: state.class.isLoadingSchedules,
    rooms: state.class.rooms,
    isLoadingRooms: state.class.isLoadingRooms,
    courses: state.class.courseData,
    isLoadingCourses: state.class.isLoadingCourse,
    genData: state.gen.genData,
    isLoadingGen: state.gen.isLoading,
    staff: state.leads.staff,
    isLoadingStaff: state.leads.isLoadingStaff,
    isUpdatingClass: state.class.isUpdatingClass,
    errorUpdatingClass: state.class.errorUpdatingClass,
    classInfo: state.class.classInfo,
    loadingClassInfo: state.class.loadingClassInfo,
    errorClassInfo: state.class.errorClassInfo,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    classActions: bindActionCreators(classActions, dispatch),
    genActions: bindActionCreators(genActions, dispatch),
    leadsActions: bindActionCreators(leadsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditClassContainer);
