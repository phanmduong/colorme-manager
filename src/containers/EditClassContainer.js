import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as classActions from '../actions/classActions';
import EditClassComponent from '../components/EditClassComponent';

class EditClassContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadInfoCreateClass();
  };

  static navigationOptions = ({navigation}) => ({
    title: 'Chỉnh sửa lớp học',
  });

  loadInfoCreateClass = () => {
    return this.props.classActions.infoCreateClass(this.props.token);
  };

  addClass = classData => {
    let selectedGenId = this.props.navigation.getParam('selectedGenId');
    let selectedBaseId = this.props.navigation.getParam('selectedBaseId');
    return this.props.classActions.addClass(
      classData,
      selectedBaseId,
      selectedGenId,
      this.props.token,
    );
  };

  render() {
    return <EditClassComponent {...this.props} addClass={this.addClass} />;
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    schedules: state.class.schedules,
    rooms: state.class.rooms,
    courses: state.class.courses,
    genData: state.class.genData,
    staffs: state.class.staffs,
    loadingInfoCreateClass: state.class.loadingInfoCreateClass,
    errorInfoCreateClass: state.class.errorInfoCreateClass,
    isUpdatingClass: state.class.isUpdatingClass,
    errorUpdatingClass: state.class.errorUpdatingClass,
    classInfo: state.class.classInfo,
    loadingClassInfo: state.class.loadingClassInfo,
    errorClassInfo: state.class.errorClassInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    classActions: bindActionCreators(classActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditClassContainer);
