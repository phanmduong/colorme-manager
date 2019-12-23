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
import {auto} from 'async';

class RegisterListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.loadDataRegisterListAll = this.loadDataRegisterListAll.bind(this);
    this.updateFormAndLoadDataSearchAll = this.updateFormAndLoadDataSearchAll.bind(
      this,
    );
    this.loadDataRegisterListMy = this.loadDataRegisterListMy.bind(this);
    this.updateFormAndLoadDataSearchMy = this.updateFormAndLoadDataSearchMy.bind(
      this,
    );
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Đăng ký',
  });

  componentWillMount() {
    this.loadDataRegisterListAll();
    this.loadDataRegisterListMy();
  }

  changeSegmentRegisterList = segment => {
    this.props.registerListActions.changeSegmentRegisterList(segment);
  };

  loadDataRegisterListAll() {
    if (this.props.currentPageAll < this.props.totalPageAll) {
      this.props.registerListActions.loadDataRegisterListAll(
        this.props.token,
        this.props.currentPageAll + 1,
        this.props.searchAll,
      );
    }
  }

  refreshRegisterListAll = () => {
    this.props.registerListActions.refreshRegisterListAll(
      this.props.searchAll,
      this.props.token,
    );
  };

  refreshRegisterListMy = () => {
    this.props.registerListActions.refreshRegisterListMy(
      this.props.searchMy,
      this.props.token,
      this.props.user.id,
    );
  };

  updateFormAndLoadDataSearchAll(search) {
    this.props.registerListActions.updateFormAndLoadDataSearchAll(
      search,
      this.props.token,
    );
  }

  loadDataRegisterListMy() {
    if (this.props.currentPageMy < this.props.totalPageMy) {
      this.props.registerListActions.loadDataRegisterListMy(
        this.props.token,
        this.props.currentPageMy + 1,
        this.props.searchMy,
        this.props.user.id,
      );
    }
  }

  updateFormAndLoadDataSearchMy(search) {
    this.props.registerListActions.updateFormAndLoadDataSearchMy(
      search,
      this.props.user.id,
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
    if (this.props.segment === 1) {
      return (
        <RegisterListComponent
          {...this.props}
          registerList={this.props.registerListDataAll}
          error={this.props.errorAll}
          isLoading={this.props.isLoadingAll}
          search={this.props.searchAll}
          refreshing={this.props.refreshingAll}
          onRefresh={this.refreshRegisterListAll}
          loadDataRegisterList={this.loadDataRegisterListAll}
          updateFormAndLoadDataSearch={this.updateFormAndLoadDataSearchAll}
          changeSegmentRegisterList={this.changeSegmentRegisterList}
          segmentActive={1}
          setStudentId={this.setStudentId}
          autoFocus={autoFocus}
          token={this.props.token}
          errorChangeCallStatus={this.props.errorChangeCallStatus}
          errorSubmitMoney={this.props.errorSubmitMoney}
          changeCallStatus={this.changeCallStatus}
          submitMoney={this.submitMoney}
          user={this.props.user}
        />
      );
    } else {
      console.log(this.props.registerListDataMy);
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
          changeSegmentRegisterList={this.changeSegmentRegisterList}
          segmentActive={2}
          setStudentId={this.setStudentId}
          autoFocus={autoFocus}
          token={this.props.token}
          errorChangeCallStatus={this.props.errorChangeCallStatus}
          errorSubmitMoney={this.props.errorSubmitMoney}
          changeCallStatus={this.changeCallStatus}
          submitMoney={this.submitMoney}
          user={this.props.user}
        />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user,
    token: state.login.token,
    registerListDataAll: state.registerList.registerListDataAll,
    isLoadingAll: state.registerList.isLoadingAll,
    errorAll: state.registerList.errorAll,
    currentPageAll: state.registerList.currentPageAll,
    totalPageAll: state.registerList.totalPageAll,
    searchAll: state.registerList.searchAll,
    registerListDataMy: state.registerList.registerListDataMy,
    isLoadingMy: state.registerList.isLoadingMy,
    errorMy: state.registerList.errorMy,
    currentPageMy: state.registerList.currentPageMy,
    totalPageMy: state.registerList.totalPageMy,
    searchMy: state.registerList.searchMy,
    segment: state.registerList.segment,
    refreshingAll: state.registerList.refreshingAll,
    refreshingMy: state.registerList.refreshingMy,
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
