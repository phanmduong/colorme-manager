import React from 'react';
import {connect} from 'react-redux';
import * as infoStudentTabActions from '../actions/infoStudentTabActions';
import * as infoStudentActions from '../actions/infoStudentActions';
import InfoStudentComponent from '../components/InfoStudentComponent';
import {bindActionCreators} from 'redux';

class InfoStudentContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount(): void {
    let studentId = this.props.navigation.getParam('studentId');
    this.props.infoStudentActions.loadStudent(
      studentId,
      this.props.token,
      this.props.domain,
    );
  }

  setStudentId = (studentId) => {
    this.props.infoStudentActions.setStudentId(studentId);
  };

  tabRegisters = () => {
    this.props.infoStudentTabActions.tabRegisters();
  };

  tabHistoryCalls = () => {
    this.props.infoStudentTabActions.tabHistoryCalls();
  };

  tabProgress = () => {
    this.props.infoStudentTabActions.tabProgress();
  };

  tabHistoryCollectMoney = () => {
    this.props.infoStudentTabActions.tabHistoryCollectMoney();
  };

  changeCallStatus = (
    callStatus,
    studentId,
    telecallId,
    genId,
    note,
    callerId,
    appointmentPayment,
    dateTest,
  ) => {
    this.props.infoStudentActions.changeCallStatus(
      callStatus,
      studentId,
      telecallId,
      genId,
      note,
      callerId,
      appointmentPayment,
      dateTest,
      this.props.token,
      this.props.domain,
    );
  };

  onRefresh = () => {
    this.props.infoStudentActions.loadRegisters(
      this.props.student_id,
      this.props.token,
      this.props.domain,
    );
    this.props.infoStudentActions.loadHistoryCalls(
      this.props.student_id,
      this.props.token,
      this.props.domain,
    );
    this.props.infoStudentActions.loadProgress(
      this.props.student_id,
      this.props.token,
      this.props.domain,
    );
    this.props.infoStudentActions.loadHistoryCollect(
      this.props.student_id,
      this.props.token,
      this.props.domain,
    );
  };

  changePassword = (password) => {
    this.props.infoStudentActions.changePassword(
      this.props.student_id,
      password,
      this.props.token,
      this.props.domain,
    );
  };

  render() {
    return (
      <InfoStudentComponent
        {...this.props}
        registersGradient={this.props.registers.gradient}
        registersTextColor={this.props.registers.textColor}
        historyCallsGradient={this.props.historyCalls.gradient}
        historyCallsTextColor={this.props.historyCalls.textColor}
        progressGradient={this.props.progress.gradient}
        progressTextColor={this.props.progress.textColor}
        historyCollectMoneyGradient={this.props.historyCollectMoney.gradient}
        historyCollectMoneyTextColor={this.props.historyCollectMoney.textColor}
        tabComponent={this.props.tabComponent}
        token={this.props.token}
        student_id={this.props.student_id}
        student={this.props.student}
        isLoadingStudent={this.props.isLoadingStudent}
        changeCallStatus={this.changeCallStatus}
        errorChangeCallStatus={this.props.errorChangeCallStatus}
        tabRegisters={() => {
          this.tabRegisters();
        }}
        tabHistoryCalls={() => {
          this.tabHistoryCalls();
        }}
        tabProgress={() => {
          this.tabProgress();
        }}
        tabHistoryCollectMoney={() => {
          this.tabHistoryCollectMoney();
        }}
        onRefresh={this.onRefresh}
        changePassword={this.changePassword}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    student_id: state.infoStudent.studentId,
    registers: state.infoStudentTab.registers,
    historyCalls: state.infoStudentTab.historyCalls,
    progress: state.infoStudentTab.progress,
    historyCollectMoney: state.infoStudentTab.historyCollectMoney,
    tabComponent: state.infoStudentTab.tabComponent,
    errorChangeCallStatus: state.infoStudent.errorChangeCallStatus,
    student: state.infoStudent.student,
    isLoadingStudent: state.infoStudent.isLoadingStudent,
    isLoadingRegisters: state.infoStudent.isLoadingRegisters,
    errorRegisters: state.infoStudent.errorRegisters,
    isLoadingHistoryCalls: state.infoStudent.isLoadingHistoryCalls,
    errorLoadingHistoryCalls: state.infoStudent.errorLoadingHistoryCalls,
    isLoadingHistoryCollect: state.infoStudent.isLoadingHistoryCollect,
    errorLoadingHistoryCollect: state.infoStudent.errorLoadingHistoryCollect,
    isLoadingProgress: state.infoStudent.isLoadingProgress,
    errorLoadingProgress: state.infoStudent.errorLoadingProgress,
    isChangingPassword: state.infoStudent.isChangingPassword,
    errorPassword: state.infoStudent.errorPassword,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    infoStudentTabActions: bindActionCreators(infoStudentTabActions, dispatch),
    infoStudentActions: bindActionCreators(infoStudentActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoStudentContainer);
