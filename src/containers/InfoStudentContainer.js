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

  setStudentId = studentId => {
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

  render() {
    return (
      <InfoStudentComponent
        registersGradient={this.props.registers.gradient}
        registersTextColor={this.props.registers.textColor}
        historyCallsGradient={this.props.historyCalls.gradient}
        historyCallsTextColor={this.props.historyCalls.textColor}
        progressGradient={this.props.progress.gradient}
        progressTextColor={this.props.progress.textColor}
        historyCollectMoneyGradient={this.props.historyCollectMoney.gradient}
        historyCollectMoneyTextColor={this.props.historyCollectMoney.textColor}
        tabComponent={this.props.tabComponent}
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
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    registers: state.infoStudentTab.registers,
    historyCalls: state.infoStudentTab.historyCalls,
    progress: state.infoStudentTab.progress,
    historyCollectMoney: state.infoStudentTab.historyCollectMoney,
    tabComponent: state.infoStudentTab.tabComponent,
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
