import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as infoStudentActions from '../../actions/infoStudentActions';
import InfoStudentRegistersComponent from '../../components/infoStudent/InfoStudentRegistersComponent';

class InfoStudentRegistersContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadRegisters(this.props.studentId);
  };

  loadRegisters = (studentId) => {
    this.props.infoStudentActions.loadRegisters(
      false,
      studentId,
      this.props.token,
      this.props.domain,
    );
  };

  changeCallStatus = (
    appointmentPayment,
    callBackTime,
    callStatus,
    note,
    statusId,
    studentId,
    teleId,
  ) => {
    this.props.infoStudentActions.changeCallStatus(
      appointmentPayment,
      callBackTime,
      callStatus,
      note,
      statusId,
      studentId,
      teleId,
      this.props.token,
      this.props.domain,
    );
  };

  submitMoney = (
    register_id,
    actual_input_at,
    code,
    money,
    note,
    payment_method,
    received_book_at,
  ) => {
    this.props.infoStudentActions.submitMoney(
      register_id,
      actual_input_at,
      code,
      money,
      note,
      payment_method,
      received_book_at,
      this.props.token,
      this.props.domain,
      () => this.loadRegisters(this.props.studentId),
    );
  };

  render() {
    return (
      <InfoStudentRegistersComponent
        {...this.props}
        changeCallStatus={this.changeCallStatus}
        submitMoney={this.submitMoney}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    isLoadingRegisters: state.infoStudent.isLoadingRegisters,
    errorRegisters: state.infoStudent.errorRegisters,
    registers: state.infoStudent.registers,
    studentId: state.infoStudent.studentId,
    isLoadingChangeCallStatus: state.infoStudent.isLoadingChangeCallStatus,
    errorChangeCallStatus: state.infoStudent.errorChangeCallStatus,
    isLoadingSubmitMoney: state.infoStudent.isLoadingSubmitMoney,
    errorSubmitMoney: state.infoStudent.errorSubmitMoney,
    selectedBaseId: state.base.selectedBaseId,
    salerId: state.infoStudent.salerId,
    campaignId: state.infoStudent.campaignId,
    paidStatus: state.infoStudent.paidStatus,
    callStatus: state.infoStudent.callStatus,
    bookmark: state.infoStudent.bookmark,
    status_id: state.infoStudent.status_id,
    source_id: state.infoStudent.source_id,
    search_coupon: state.infoStudent.search_coupon,
    classStatus: state.registerList.classStatus,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    infoStudentActions: bindActionCreators(infoStudentActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoStudentRegistersContainer);
