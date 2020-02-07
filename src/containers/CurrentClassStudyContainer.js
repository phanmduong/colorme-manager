/**
 * Created by phanmduong on 4/25/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CurrentClassStudyComponent from '../components/CurrentClassStudyComponent';
import * as currentClassStudyActions from '../actions/currentClassStudyActions';
import {NavigationActions} from 'react-navigation';

class CurrentClassStudyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectedItem = this.onSelectedItem.bind(this);
    this.reloadCurrentClassStudy = this.reloadCurrentClassStudy.bind(this);
  }

  componentWillMount() {
    this.props.currentClassStudyActions.loadDataCurrentClassStudy(
      this.props.token,
    );
  }

  onSelectedItem(classItem) {
    this.props.currentClassStudyActions.selectedCurrentClassStudy(classItem);
    // this.props.listStudentAttendanceScreen();
    this.props.navigation.navigate('ListStudentAttendance');
  }

  openQrCode = classItem => {
    this.props.currentClassStudyActions.selectedCurrentClassStudy(classItem);
    // this.props.qrCodeScreen();
    this.props.navigation.navigate('QRCode');
  };

  reloadCurrentClassStudy() {
    this.props.currentClassStudyActions.loadDataCurrentClassStudy(
      this.props.token,
    );
  }

  render() {
    console.log(this.props.classData);
    return (
      <CurrentClassStudyComponent
        error={this.props.error}
        classData={this.props.classData}
        isLoading={this.props.isLoading}
        onSelectedItem={this.onSelectedItem}
        openQrCode={this.openQrCode}
        onReload={this.reloadCurrentClassStudy}
        avatar_url={this.props.avatar_url}
        {...this.props}
      />
    );
  }
}

CurrentClassStudyContainer.navigationOptions = {
  title: 'Danh sách lớp học',
};

function mapStateToProps(state) {
  return {
    isLoading: state.currentClassStudy.isLoading,
    classData: state.currentClassStudy.classData,
    error: state.currentClassStudy.error,
    token: state.login.token,
    avatar_url: state.login.user.avatar_url,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    currentClassStudyActions: bindActionCreators(
      currentClassStudyActions,
      dispatch,
    ),
    listStudentAttendanceScreen: () =>
      dispatch(
        NavigationActions.navigate({routeName: 'ListStudentAttendance'}),
      ),
    qrCodeScreen: () =>
      dispatch(NavigationActions.navigate({routeName: 'QRCode'})),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentClassStudyContainer);
