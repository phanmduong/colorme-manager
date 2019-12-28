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
    this.props.infoStudentActions.loadRegisters(studentId);
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
    this.props.infoStudentActions.submitMoney(
      register_id,
      money,
      code,
      note,
      payment_method,
      this.props.studentId,
      token,
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
