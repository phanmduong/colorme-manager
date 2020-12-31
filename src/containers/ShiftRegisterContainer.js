/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ShiftRegisterComponent from '../components/ShiftRegisterComponent';
import * as baseActions from '../actions/baseActions';
import * as genActions from '../actions/genActions';
import * as shiftRegisterActions from '../actions/shiftRegisterActions';
import _ from 'lodash';
import io from 'socket.io-client';

class ShiftRegisterContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.socket = io.connect('http://colorme.vn:3000/', {
      transports: ['websocket'],
    });

    this.socket.on('edu-channel:regis-shift', (data) => {
      this.props.shiftRegisterActions.updateDataRegister(data);
    });
    this.socket.on('edu-channel:remove-shift', (data) => {
      this.props.shiftRegisterActions.updateDataRegister(data);
    });

    this.state = {
      isLoading: false,
      checkedDataBase: false,
      checkedDataGen: false,
      checkedDataShiftRegister: false,
      genData: [],
    };

    this.onSelectBaseId = this.onSelectBaseId.bind(this);
    this.onSelectGenId = this.onSelectGenId.bind(this);
    this.loadDataShiftRegister = this.loadDataShiftRegister.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.onUnRegister = this.onUnRegister.bind(this);
  }

  componentWillMount() {
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoadingBase && !nextProps.isLoadingGen) {
      this.setState({
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: true,
      });
    }

    if (
      nextProps.errorBase ||
      nextProps.errorGen ||
      nextProps.errorShiftRegister
    ) {
      this.setState({
        error: true,
      });
    } else {
      this.setState({
        error: false,
      });
    }

    if (!nextProps.isLoadingGen) {
      var genData = _.sortBy(nextProps.genData, [
        function (o) {
          return parseInt(o.name);
        },
      ]);
      genData = _.reverse(genData);
      this.setState({
        genData: genData,
      });
    }

    this.checkData(nextProps);
  }

  checkData(props) {
    if (props.baseData.length > 0 && !this.state.checkedDataBase) {
      this.setState({checkedDataBase: true});
      this.props.shiftRegisterActions.selectedBaseId(props.baseData[0].id);
    }

    if (props.genData.length > 0 && !this.state.checkedDataGen) {
      this.setState({checkedDataGen: true});
      var genData = _.sortBy(props.genData, [
        function (o) {
          return parseInt(o.name);
        },
      ]);
      genData = _.reverse(genData);
      this.setState({
        genData: genData,
      });
      this.props.shiftRegisterActions.selectedGenId(props.currentGen.id);
    }

    if (
      props.genData.length > 0 &&
      props.baseData.length > 0 &&
      !this.state.checkedDataShiftRegister
    ) {
      this.setState({checkedDataShiftRegister: true});
      this.props.shiftRegisterActions.loadDataShiftRegister(
        props.baseData[0].id,
        props.currentGen.id,
        this.props.token,
        this.props.domain,
      );
    }
  }

  loadData() {
    if (!this.props.baseData || this.props.baseData.length <= 0) {
      this.props.baseActions.loadDataBase(this.props.token, this.props.domain);
    }
    if (!this.props.genData || this.props.genData.length <= 0) {
      this.props.genActions.loadDataGen(this.props.token, this.props.domain);
    }
    this.checkData(this.props);
  }

  loadDataShiftRegister(baseId, genId) {
    this.props.shiftRegisterActions.loadDataShiftRegister(
      baseId,
      genId,
      this.props.token,
      this.props.domain,
    );
  }

  onSelectBaseId(baseId) {
    this.props.shiftRegisterActions.selectedBaseId(baseId);
    this.loadDataShiftRegister(baseId, this.props.selectedGenId);
  }

  onSelectGenId(genId) {
    this.props.shiftRegisterActions.selectedGenId(genId);
    this.loadDataShiftRegister(this.props.selectedBaseId, genId);
  }

  onRegister(registerId) {
    this.props.shiftRegisterActions.register(
      registerId,
      this.props.token,
      this.props.domain,
    );
  }

  onUnRegister(registerId) {
    this.props.shiftRegisterActions.unRegister(
      registerId,
      this.props.token,
      this.props.domain,
    );
  }

  render() {
    return (
      <ShiftRegisterComponent
        isLoading={this.state.isLoading}
        isLoadingShiftRegister={this.props.isLoadingShiftRegister}
        error={this.state.error}
        genData={this.state.genData}
        baseData={this.props.baseData}
        shiftRegisterData={this.props.shiftRegisterData}
        selectedBaseId={this.props.selectedBaseId}
        selectedGenId={this.props.selectedGenId}
        onSelectBaseId={this.onSelectBaseId}
        onSelectGenId={this.onSelectGenId}
        loadDataShiftRegister={this.loadDataShiftRegister}
        user={this.props.user}
        onRegister={this.onRegister}
        onUnRegister={this.onUnRegister}
        errorShiftRegister={this.props.errorShiftRegister}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoadingBase: state.base.isLoading,
    baseData: state.base.baseData,
    errorBase: state.base.error,
    token: state.login.token,
    isLoadingGen: state.gen.isLoading,
    currentGen: state.gen.currentGen,
    genData: state.gen.genData,
    errorGen: state.gen.error,
    isLoadingShiftRegister: state.shiftRegister.isLoading,
    shiftRegisterData: state.shiftRegister.shiftRegisterData,
    errorShiftRegister: state.shiftRegister.error,
    selectedBaseId: state.shiftRegister.selectedBaseId,
    selectedGenId: state.shiftRegister.selectedGenId,
    user: state.login.user,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    baseActions: bindActionCreators(baseActions, dispatch),
    genActions: bindActionCreators(genActions, dispatch),
    shiftRegisterActions: bindActionCreators(shiftRegisterActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShiftRegisterContainer);
