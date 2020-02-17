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

  loadRegisters = studentId => {
    this.props.infoStudentActions.loadRegisters(studentId, this.props.token);
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
    );
  };

  submitMoney = (register_id, money, code, note, payment_method, token) => {
    let baseId =
      this.props.selectedBaseId === -1 ? '' : this.props.selectedBaseId;
    let salerId = this.props.salerId === -1 ? '' : this.props.salerId;
    let campaignId = this.props.campaignId === -1 ? '' : this.props.campaignId;
    let paidStatus = this.props.paidStatus === -1 ? '' : this.props.paidStatus;
    let callStatus = this.props.callStatus === -1 ? '' : this.props.callStatus;
    let bookmark = this.props.bookmark === -1 ? '' : this.props.bookmark;
    let statusId = this.props.status_id === -1 ? '' : this.props.status_id;
    let sourceId = this.props.source_id === -1 ? '' : this.props.source_id;
    this.props.infoStudentActions.submitMoney(
      register_id,
      money,
      code,
      note,
      payment_method,
      this.props.studentId,
      token,
      this.props.searchMy,
      salerId,
      baseId,
      campaignId,
      paidStatus,
      this.props.classStatus,
      callStatus,
      bookmark,
      this.props.search_coupon,
      this.props.start_time,
      this.props.end_time,
      this.props.appointmentPayment,
      statusId,
      sourceId,
    );
  };

  render() {
    return (
      <InfoStudentRegistersComponent
        registers={this.props.registers}
        isLoadingRegisters={this.props.isLoadingRegisters}
        changeCallStatus={this.changeCallStatus}
        token={this.props.token}
        errorChangeCallStatus={this.props.errorChangeCallStatus}
        submitMoney={this.submitMoney}
        errorSubmitMoney={this.props.errorSubmitMoney}
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
