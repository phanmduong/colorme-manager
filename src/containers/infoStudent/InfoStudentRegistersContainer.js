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

  render() {
    return (
      <InfoStudentRegistersComponent
        registers={this.props.registers}
        isLoadingRegisters={this.props.isLoadingRegisters}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoadingRegisters: state.infoStudent.isLoadingRegisters,
    errorRegisters: state.infoStudent.errorRegisters,
    registers: state.infoStudent.registers,
    studentId: state.infoStudent.studentId,
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
