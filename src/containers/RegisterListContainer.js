/**
 * Created by phanmduong on 6/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerListActions from '../actions/registerListActions';
import * as infoStudentActions from '../actions/infoStudentActions';
import * as baseActions from '../actions/baseActions';
import * as saveRegisterActions from '../actions/saveRegisterActions';
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
    this.loadBases();
    this.loadCampaigns();
  }

  loadBases = () => {
    this.props.baseActions.loadDataBase(this.props.token);
  };

  loadCampaigns = () => {
    this.props.saveRegisterActions.loadCampaigns(this.props.token);
  };

  loadDataRegisterListMy() {
    let baseId =
      this.props.selectedBaseId === -1 ? '' : this.props.selectedBaseId;
    let salerId = this.props.salerId === -1 ? '' : this.props.salerId;
    let campaignId = this.props.campaignId === -1 ? '' : this.props.campaignId;
    let paidStatus = this.props.paidStatus === -1 ? '' : this.props.paidStatus;
    let callStatus = this.props.callStatus === -1 ? '' : this.props.callStatus;
    let bookmark = this.props.bookmark === -1 ? '' : this.props.bookmark;
    if (this.props.currentPageMy < this.props.totalPageMy) {
      this.props.registerListActions.loadDataRegisterListMy(
        this.props.token,
        this.props.currentPageMy + 1,
        this.props.searchMy,
        salerId,
        baseId,
        campaignId,
        paidStatus,
        this.props.classStatus,
        callStatus,
        bookmark,
      );
    }
  }

  refreshRegisterListMy = () => {
    let baseId =
      this.props.selectedBaseId === -1 ? '' : this.props.selectedBaseId;
    let salerId = this.props.salerId === -1 ? '' : this.props.salerId;
    let campaignId = this.props.campaignId === -1 ? '' : this.props.campaignId;
    let paidStatus = this.props.paidStatus === -1 ? '' : this.props.paidStatus;
    let callStatus = this.props.callStatus === -1 ? '' : this.props.callStatus;
    let bookmark = this.props.bookmark === -1 ? '' : this.props.bookmark;
    this.props.registerListActions.refreshRegisterListMy(
      this.props.searchMy,
      this.props.token,
      salerId,
      baseId,
      campaignId,
      paidStatus,
      this.props.classStatus,
      callStatus,
      bookmark,
    );
  };

  updateFormAndLoadDataSearchMy(search) {
    let salerId = this.props.salerId === -1 ? '' : this.props.salerId;
    let baseId =
      this.props.selectedBaseId === -1 ? '' : this.props.selectedBaseId;
    let campaignId = this.props.campaignId === -1 ? '' : this.props.campaignId;
    let paidStatus = this.props.paidStatus === -1 ? '' : this.props.paidStatus;
    let callStatus = this.props.callStatus === -1 ? '' : this.props.callStatus;
    let bookmark = this.props.bookmark === -1 ? '' : this.props.bookmark;
    this.props.registerListActions.updateFormAndLoadDataSearchMy(
      search,
      salerId,
      baseId,
      campaignId,
      paidStatus,
      this.props.classStatus,
      callStatus,
      bookmark,
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

  onSelectBaseId = baseId => {
    this.props.baseActions.selectedBaseId(baseId);
  };

  onSelectSalerId = salerId => {
    this.props.registerListActions.onSelectSalerId(salerId);
  };

  onSelectCampaignId = campaignId => {
    this.props.registerListActions.onSelectCampaignId(campaignId);
  };

  onSelectPaidStatus = paidStatus => {
    this.props.registerListActions.onSelectPaidStatus(paidStatus);
  };

  onSelectClassStatus = classStatus => {
    this.props.registerListActions.onSelectClassStatus(classStatus);
  };

  onSelectCallStatus = callStatus => {
    this.props.registerListActions.onSelectCallStatus(callStatus);
  };

  onSelectBookmark = bookmark => {
    this.props.registerListActions.onSelectBookmark(bookmark);
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
        baseData={this.props.baseData}
        onSelectBaseId={this.onSelectBaseId}
        onSelectSalerId={this.onSelectSalerId}
        selectedBaseId={this.props.selectedBaseId}
        campaigns={this.props.campaigns}
        onSelectCampaignId={this.onSelectCampaignId}
        campaignId={this.props.campaignId}
        onSelectPaidStatus={this.onSelectPaidStatus}
        paidStatus={this.props.paidStatus}
        onSelectClassStatus={this.onSelectClassStatus}
        classStatus={this.props.classStatus}
        onSelectCallStatus={this.onSelectCallStatus}
        callStatus={this.props.callStatus}
        onSelectBookmark={this.onSelectBookmark}
        bookmark={this.props.bookmark}
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
    baseData: state.base.baseData,
    selectedBaseId: state.base.selectedBaseId,
    campaigns: state.saveRegister.campaigns,
    campaignId: state.registerList.campaignId,
    paidStatus: state.registerList.paidStatus,
    classStatus: state.registerList.classStatus,
    callStatus: state.registerList.callStatus,
    bookmark: state.registerList.bookmark,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerListActions: bindActionCreators(registerListActions, dispatch),
    infoStudentActions: bindActionCreators(infoStudentActions, dispatch),
    baseActions: bindActionCreators(baseActions, dispatch),
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterListContainer);
