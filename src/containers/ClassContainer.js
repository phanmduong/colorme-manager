/**
 * Created by phanmduong on 4/6/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ClassComponent from '../components/ClassComponent';
import * as classActions from '../actions/classActions';
import * as saveRegisterActions from '../actions/saveRegisterActions';
import * as genActions from '../actions/genActions';
import * as analyticsActions from '../actions/analyticsActions';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

class ClassContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectedItem = this.onSelectedItem.bind(this);
    this.state = {
      checkedDataGen: false,
      checkedClasses: false,
    };
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
          <Text style={styles.name}>Lớp học</Text>
        </View>
      </View>
    ),
    headerRight: () => (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate('AddClass')}>
          <View style={styles.headerIconContainer}>
            <MatIcon name={'add-circle'} size={20} color={'black'} />
          </View>
        </TouchableOpacity>
      </View>
    ),
  });

  componentDidMount() {
    this.props.genActions.loadDataGen(this.props.token, this.props.domain);
    this.props.classActions.loadDataCourse(this.props.token, this.props.domain);
    this.props.classActions.loadBaseData(this.props.token, this.props.domain);
    this.props.saveRegisterActions.loadProvinces(
      this.props.token,
      this.props.domain,
    );
    this.loadDataClass();
  }

  componentWillUnmount() {
    this.props.classActions.reset();
  }

  loadDataClass = () => {
    const selectedBaseId =
      this.props.selectedBaseId === -1 ? '' : this.props.selectedBaseId;
    const selectedGenId =
      this.props.selectedGenId === -1 ? '' : this.props.selectedGenId;
    const courseId =
      this.props.selectedCourseId === -1 ? '' : this.props.selectedCourseId;
    this.props.classActions.loadDataClass(
      false,
      this.props.search,
      courseId,
      this.props.currentPage + 1,
      selectedGenId,
      selectedBaseId,
      this.props.token,
      this.props.domain,
    );
  };

  onRefresh = () => {
    const selectedBaseId =
      this.props.selectedBaseId === -1 ? '' : this.props.selectedBaseId;
    const selectedGenId =
      this.props.selectedGenId === -1 ? '' : this.props.selectedGenId;
    const courseId =
      this.props.selectedCourseId === -1 ? '' : this.props.selectedCourseId;
    this.props.classActions.refreshDataClass(
      this.props.search,
      courseId,
      selectedGenId,
      selectedBaseId,
      this.props.token,
      this.props.domain,
    );
  };

  onSelectedItem(classData) {
    this.props.classActions.selectedClassId(classData.id);
    this.props.navigation.navigate('ListStudentClass', {
      name: classData.name,
      avatar_url: classData.course && classData.course.icon_url,
    });
  }

  changeClassStatus = (classId) => {
    this.props.classActions.changeClassStatus(
      classId,
      this.props.token,
      this.props.domain,
    );
  };

  searchClass = (search) => {
    const selectedBaseId =
      this.props.selectedBaseId === -1 ? '' : this.props.selectedBaseId;
    const selectedGenId =
      this.props.selectedGenId === -1 ? '' : this.props.selectedGenId;
    const courseId =
      this.props.selectedCourseId === -1 ? '' : this.props.selectedCourseId;
    this.props.classActions.searchClass(
      search,
      courseId,
      selectedGenId,
      selectedBaseId,
      this.props.token,
      this.props.domain,
    );
  };

  onSelectGenId = (id) => {
    this.props.classActions.selectedGenId(id);
  };

  onSelectBaseId = (id) => {
    this.props.classActions.selectedBaseId(id);
  };

  onSelectCourseId = (id) => {
    this.props.classActions.selectedCourseId(id);
  };

  applyFilter = () => {
    this.searchClass(this.props.search);
  };

  render() {
    return (
      <ClassComponent
        {...this.props}
        classData={this.props.classData}
        isLoadingClass={this.props.isLoadingClass}
        courseData={this.props.courseData}
        isLoadingCourse={this.props.isLoadingCourse}
        onSelectedItem={this.onSelectedItem}
        genData={this.props.genData}
        baseData={this.props.baseData}
        isLoadingGen={this.props.isLoadingGen}
        isLoadingBase={this.props.isLoadingBase}
        currentGen={this.props.currentGen}
        onRefresh={this.onRefresh}
        filter={this.applyFilter}
        refreshing={this.props.isRefreshing}
        analyticGenId={this.props.analyticGenId}
        analyticBaseId={this.props.analyticBaseId}
        provinces={this.props.provinces}
        isLoadingProvinces={this.props.isLoadingProvinces}
        changeClassStatus={this.changeClassStatus}
        user={this.props.user}
        loadDataClass={this.loadDataClass}
        searchClass={this.searchClass}
        onSelectBaseId={this.onSelectBaseId}
        onSelectCourseId={this.onSelectCourseId}
        onSelectGenId={this.onSelectGenId}
      />
    );
  }
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
  headerIconContainer: theme.headerIconContainer,
};

function mapStateToProps(state) {
  return {
    classData: state.class.classData,
    isLoadingClass: state.class.isLoading,
    errorLoadingClass: state.class.error,
    token: state.login.token,
    user: state.login.user,
    selectedClassId: state.class.selectedClassId,
    courseData: state.class.courseData,
    isLoadingCourse: state.class.isLoadingCourse,
    genData: state.gen.genData,
    isLoadingGen: state.gen.isLoading,
    errorLoadingGen: state.gen.error,
    baseData: state.class.baseData,
    isLoadingBase: state.class.isLoadingBase,
    errorLoadingBase: state.class.errorLoadingBase,
    currentGen: state.gen.currentGen,
    isRefreshing: state.class.isRefreshing,
    isLoadingProvinces: state.saveRegister.isLoadingProvinces,
    errorLoadingProvinces: state.saveRegister.errorLoadingProvinces,
    provinces: state.saveRegister.provinces,
    domain: state.login.domain,
    search: state.class.search,
    currentPage: state.class.currentPage,
    totalPage: state.class.totalPage,
    selectedBaseId: state.class.selectedBaseId,
    selectedCourseId: state.class.selectedCourseId,
    selectedGenId: state.class.selectedGenId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    classActions: bindActionCreators(classActions, dispatch),
    genActions: bindActionCreators(genActions, dispatch),
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
    analyticsActions: bindActionCreators(analyticsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassContainer);
