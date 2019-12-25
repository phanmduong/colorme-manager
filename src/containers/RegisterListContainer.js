/**
 * Created by phanmduong on 6/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerListActions from '../actions/registerListActions';
import * as infoStudentActions from '../actions/infoStudentActions';
import RegisterListComponent from '../components/RegisterListComponent';
import {isEmptyInput} from '../helper';

class RegisterListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.loadDataRegisterListMy = this.loadDataRegisterListMy.bind(this);
    this.updateFormAndLoadDataSearchMy = this.updateFormAndLoadDataSearchMy.bind(
      this,
    );
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Đăng ký',
  });

  componentWillMount() {
    this.loadDataRegisterListMy();
  }

  refreshRegisterListMy = (salerId = '') => {
    this.props.registerListActions.refreshRegisterListMy(
      this.props.searchMy,
      this.props.token,
      salerId,
    );
  };

  loadDataRegisterListMy(salerId = '') {
    if (this.props.currentPageMy < this.props.totalPageMy) {
      this.props.registerListActions.loadDataRegisterListMy(
        this.props.token,
        this.props.currentPageMy + 1,
        this.props.searchMy,
        salerId,
      );
    }
  }

  updateFormAndLoadDataSearchMy(search, salerId = '') {
    this.props.registerListActions.updateFormAndLoadDataSearchMy(
      search,
      salerId,
      this.props.token,
    );
  }

  setStudentId = studentId => {
    this.props.infoStudentActions.setStudentId(studentId);
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
      token,
    );
  };

  render() {
    let autoFocus = this.props.navigation.getParam('autoFocus');
    if (isEmptyInput(autoFocus)) {
      autoFocus = false;
    }
    return (
      <RegisterListComponent
        {...this.props}
        registerList={this.props.registerListDataMy}
        error={this.props.errorMy}
        isLoading={this.props.isLoadingMy}
        search={this.props.searchMy}
        refreshing={this.props.refreshingMy}
        onRefresh={this.refreshRegisterListMy}
        loadDataRegisterList={this.loadDataRegisterListMy}
        updateFormAndLoadDataSearch={this.updateFormAndLoadDataSearchMy}
        setStudentId={this.setStudentId}
        autoFocus={autoFocus}
        token={this.props.token}
        errorChangeCallStatus={this.props.errorChangeCallStatus}
        errorSubmitMoney={this.props.errorSubmitMoney}
        changeCallStatus={this.changeCallStatus}
        submitMoney={this.submitMoney}
        user={this.props.user}
        salerId={this.props.salerId}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user,
    token: state.login.token,
    registerListDataMy: state.registerList.registerListDataMy,
    isLoadingMy: state.registerList.isLoadingMy,
    errorMy: state.registerList.errorMy,
    currentPageMy: state.registerList.currentPageMy,
    totalPageMy: state.registerList.totalPageMy,
    searchMy: state.registerList.searchMy,
    refreshingMy: state.registerList.refreshingMy,
    salerId: state.registerList.salerId,
    errorChangeCallStatus: state.registerList.errorChangeCallStatus,
    errorSubmitMoney: state.registerList.errorSubmitMoney,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerListActions: bindActionCreators(registerListActions, dispatch),
    infoStudentActions: bindActionCreators(infoStudentActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterListContainer);
