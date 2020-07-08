import React from 'react';
import {connect} from 'react-redux';
import * as workShiftRegisterAction from '../actions/workShiftRegisterActions.js';
import WorkShiftRegisterComponent from '../components/WorkShiftRegisterComponent';
import {bindActionCreators} from 'redux';
import * as baseActions from '../actions/baseActions';
import * as genActions from '../actions/genActions';

class WorkShiftRegisterContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      checkedDataBase: false,
      checkedDataGen: false,
      checkedDataWorkShiftRegister: false,
    };
  }

  componentWillMount = () => {
    this.loadBaseAndGenData();
    setTimeout(() => {
      this.props.workShiftRegisterAction.selectedBaseId(
        this.props.baseData[0].id,
      );
      this.props.workShiftRegisterAction.selectedGenId(
        this.props.currentGen.id,
      );
    }, 1000);
    setTimeout(
      () =>
        this.loadDataWorkShiftRegister(
          this.props.baseData[0].id,
          this.props.currentGen.id,
          this.props.token,
        ),
      1000,
    );
  };

  loadBaseAndGenData = () => {
    if (!this.props.baseData || this.props.baseData.length <= 0) {
      this.props.baseActions.loadDataBase(this.props.token);
    }
    if (!this.props.genData || this.props.genData.length <= 0) {
      this.props.genActions.loadDataGen(this.props.token);
    }
  };

  loadDataWorkShiftRegister = (baseId, genId) => {
    this.props.workShiftRegisterAction.loadWorkShift(
      baseId,
      genId,
      this.props.token,
    );
  };

  onSelectBaseId = (baseId) => {
    this.props.workShiftRegisterAction.selectedBaseId(baseId);
    this.loadDataWorkShiftRegister(baseId, this.props.selectedGenId);
  };

  onSelectGenId = (genId) => {
    this.props.workShiftRegisterAction.selectedGenId(genId);
    this.loadDataWorkShiftRegister(this.props.selectedBaseId, genId);
  };

  onRegister = (shiftId) => {
    this.props.workShiftRegisterAction.register(shiftId, this.props.token);
  };

  onUnregister = (shiftId) => {
    this.props.workShiftRegisterAction.unregister(shiftId, this.props.token);
  };

  render() {
    return (
      <WorkShiftRegisterComponent
        workShiftRegisterData={this.props.workShiftRegisterData}
        isLoadingWorkShiftRegister={this.props.isLoadingWorkShiftRegister}
        genData={this.props.genData}
        baseData={this.props.baseData}
        onSelectBaseId={this.onSelectBaseId}
        onSelectGenId={this.onSelectGenId}
        errorWorkShiftRegister={this.props.errorWorkShiftRegister}
        user={this.props.user}
        avatar_url={this.props.user.avatar_url}
        onRefresh={() =>
          this.loadDataWorkShiftRegister(
            this.props.selectedBaseId,
            this.props.selectedGenId,
          )
        }
        onRegister={this.onRegister}
        onUnregister={this.onUnregister}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    isLoadingWorkShiftRegister: state.workShiftRegister.isLoading,
    workShiftRegisterData: state.workShiftRegister.workShiftRegisterData,
    baseData: state.base.baseData,
    genData: state.gen.genData,
    currentGen: state.gen.currentGen,
    selectedBaseId: state.workShiftRegister.selectedBaseId,
    selectedGenId: state.workShiftRegister.selectedGenId,
    errorGen: state.gen.error,
    errorBase: state.base.error,
    errorWorkShiftRegister: state.workShiftRegister.error,
    user: state.login.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    baseActions: bindActionCreators(baseActions, dispatch),
    genActions: bindActionCreators(genActions, dispatch),
    workShiftRegisterAction: bindActionCreators(
      workShiftRegisterAction,
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkShiftRegisterContainer);
