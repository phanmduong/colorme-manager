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

class ClassContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectedItem = this.onSelectedItem.bind(this);
    this.state = {
      checkedDataGen: false,
      checkedClasses: false,
    };
  }

  componentDidMount() {
    this.props.genActions.loadDataGen(this.props.token);
    this.props.classActions.loadDataCourse(this.props.token);
    this.props.classActions.loadBaseData(this.props.token);
    this.props.saveRegisterActions.loadProvinces(this.props.token);
  }

  componentWillReceiveProps(props) {
    const analyticsScreen = props.navigation.getParam('analyticsScreen');
    let genId;
    if (props.genData.length > 0 && !this.state.checkedDataGen) {
      this.setState({checkedDataGen: true});
      genId = analyticsScreen
        ? props.analyticGenId === -1
          ? props.currentGen.id
          : props.analyticGenId
        : props.currentGen.id;
    }

    if (props.genData.length > 0 && !this.state.checkedClasses) {
      this.setState({checkedClasses: true});
      this.loadDataClass(props.analyticBaseId, genId, this.props.token);
    }
  }

  loadDataClass = (baseId, genId) => {
    this.props.classActions.loadDataClass(baseId, genId, this.props.token);
  };

  onRefresh = (baseId, genId) => {
    this.props.classActions.refreshDataClass(baseId, genId, this.props.token);
  };

  onSelectedItem(classId) {
    this.props.classActions.selectedClassId(classId);
    this.props.navigation.navigate('ListStudentClass');
  }

  changeClassStatus = classId => {
    this.props.classActions.changeClassStatus(classId, this.props.token);
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
        filter={this.loadDataClass}
        refreshing={this.props.isRefreshing}
        analyticGenId={this.props.analyticGenId}
        analyticBaseId={this.props.analyticBaseId}
        provinces={this.props.provinces}
        isLoadingProvinces={this.props.isLoadingProvinces}
        changeClassStatus={this.changeClassStatus}
        user={this.props.user}
      />
    );
  }
}

ClassContainer.navigationOptions = {
  title: 'Danh sách lớp học',
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
    analyticBaseId: state.analytics.selectedBaseId,
    analyticGenId: state.analytics.selectedGenId,
    isRefreshing: state.class.isRefreshing,
    isLoadingProvinces: state.saveRegister.isLoadingProvinces,
    errorLoadingProvinces: state.saveRegister.errorLoadingProvinces,
    provinces: state.saveRegister.provinces,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClassContainer);
