/**
 * Created by phanmduong on 6/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerListActions from '../actions/registerListActions';
import * as infoStudentActions from '../actions/infoStudentActions';
import * as baseActions from '../actions/baseActions';
import * as genActions from '../actions/genActions';
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

  componentWillMount() {
    this.loadDataRegisterListMy();
    this.loadCampaigns();
    this.loadStatuses();
    this.loadSources();
    this.loadSalers();
    this.loadFilterClasses();
    this.loadCourses();
  }

  loadCampaigns = () => {
    this.props.saveRegisterActions.loadCampaigns(this.props.token);
  };

  loadSources = () => {
    this.props.saveRegisterActions.loadSources(this.props.token);
  };

  loadStatuses = () => {
    this.props.saveRegisterActions.loadStatuses('registers', this.props.token);
  };

  loadSalers = () => {
    this.props.saveRegisterActions.loadSalers(this.props.token);
  };

  loadFilterClasses = (search) => {
    this.props.saveRegisterActions.loadFilterClasses(search, this.props.token);
  };

  loadDataRegisterListMy() {
    let baseId =
      this.props.selectedBaseId === -1 ? '' : this.props.selectedBaseId;
    let salerId = this.props.salerId === -1 ? '' : this.props.salerId;
    let campaignId = this.props.campaignId === -1 ? '' : this.props.campaignId;
    let paidStatus = this.props.paidStatus === -1 ? '' : this.props.paidStatus;
    let callStatus = this.props.callStatus === -1 ? '' : this.props.callStatus;
    let bookmark = this.props.bookmark === -1 ? '' : this.props.bookmark;
    let statusId = this.props.status_id === -1 ? '' : this.props.status_id;
    let sourceId = this.props.source_id === -1 ? '' : this.props.source_id;
    let genId = this.props.selectedGenId === -1 ? '' : this.props.selectedGenId;
    let classId = this.props.classId === -1 ? '' : this.props.classId;
    let courseId = this.props.courseId === -1 ? '' : this.props.courseId;
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
        this.props.search_coupon,
        this.props.start_time,
        this.props.end_time,
        this.props.appointmentPayment,
        statusId,
        sourceId,
        genId,
        classId,
        courseId,
        this.props.note,
        this.props.dateTest,
        this.props.callBackTime,
      );
    }
  }

  refreshRegisterListMy = (search_coupon, note) => {
    let baseId =
      this.props.selectedBaseId === -1 ? '' : this.props.selectedBaseId;
    let salerId = this.props.salerId === -1 ? '' : this.props.salerId;
    let campaignId = this.props.campaignId === -1 ? '' : this.props.campaignId;
    let paidStatus = this.props.paidStatus === -1 ? '' : this.props.paidStatus;
    let callStatus = this.props.callStatus === -1 ? '' : this.props.callStatus;
    let bookmark = this.props.bookmark === -1 ? '' : this.props.bookmark;
    let statusId = this.props.status_id === -1 ? '' : this.props.status_id;
    let sourceId = this.props.source_id === -1 ? '' : this.props.source_id;
    let courseId = this.props.courseId === -1 ? '' : this.props.courseId;
    let genId = '';
    if (this.props.selectedGenId === -1) {
      genId = this.props.currentGen.id;
    } else if (
      this.props.selectedGenId !== -1 &&
      this.props.selectedGenId !== 2
    ) {
      genId = this.props.selectedGenId;
    }
    let classId = this.props.classId === -1 ? '' : this.props.classId;
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
      search_coupon,
      this.props.start_time,
      this.props.end_time,
      this.props.appointmentPayment,
      statusId,
      sourceId,
      genId,
      classId,
      courseId,
      note,
      this.props.dateTest,
      this.props.callBackTime,
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
    let statusId = this.props.status_id === -1 ? '' : this.props.status_id;
    let sourceId = this.props.source_id === -1 ? '' : this.props.source_id;
    let genId = this.props.selectedGenId === -1 ? '' : this.props.selectedGenId;
    let classId = this.props.classId === -1 ? '' : this.props.classId;
    let courseId = this.props.courseId === -1 ? '' : this.props.courseId;
    this.props.registerListActions.updateFormAndLoadDataSearchMy(
      search,
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
      genId,
      classId,
      courseId,
      this.props.note,
      this.props.dateTest,
      this.props.callBackTime,
      this.props.token,
    );
  }

  setStudentId = (studentId) => {
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
      '',
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

  loadAvailableClasses = (registerId, search) => {
    this.props.registerListActions.loadAvailableClasses(
      registerId,
      search,
      this.props.token,
    );
  };

  loadCourses = () => {
    this.props.registerListActions.loadCourses(this.props.token);
  };

  resetAvailableClasses = () => {
    this.props.registerListActions.resetAvailableClasses();
  };

  onSelectBaseId = (baseId) => {
    this.props.baseActions.selectedBaseId(baseId);
  };

  onSelectSalerId = (salerId) => {
    this.props.registerListActions.onSelectSalerId(salerId);
  };

  onSelectCampaignId = (campaignId) => {
    this.props.registerListActions.onSelectCampaignId(campaignId);
  };

  onSelectPaidStatus = (paidStatus) => {
    this.props.registerListActions.onSelectPaidStatus(paidStatus);
  };

  onSelectClassStatus = (classStatus) => {
    this.props.registerListActions.onSelectClassStatus(classStatus);
  };

  onSelectCallStatus = (callStatus) => {
    this.props.registerListActions.onSelectCallStatus(callStatus);
  };

  onSelectBookmark = (bookmark) => {
    this.props.registerListActions.onSelectBookmark(bookmark);
  };

  onSelectStartTime = (date) => {
    this.props.registerListActions.onSelectStartTime(date);
  };

  onSelectEndTime = (date) => {
    this.props.registerListActions.onSelectEndTime(date);
  };

  onSelectAppointmentPayment = (date) => {
    this.props.registerListActions.onSelectAppointmentPayment(date);
  };

  onSelectStatus = (statusId) => {
    this.props.registerListActions.onSelectStatus(statusId);
  };

  onSelectSource = (sourceId) => {
    this.props.registerListActions.onSelectSource(sourceId);
  };

  onSelectGenId = (genId) => {
    this.props.genActions.selectedGenId(genId);
  };

  onSelectClassId = (classId) => {
    this.props.registerListActions.onSelectClassId(classId);
  };

  onSelectCourseId = (courseId) => {
    this.props.registerListActions.onSelectCourseId(courseId);
  };

  onSelectDateTest = (date) => {
    this.props.registerListActions.onSelectDateTest(date);
  };

  onSelectCallBackTime = (date) => {
    this.props.registerListActions.onSelectCallBackTime(date);
  };

  reset = () => {
    this.props.registerListActions.reset();
  };

  setAutoFocusRegisterListSearch = (bool) => {
    this.props.registerListActions.setAutoFocusRegisterListSearch(bool);
  };

  changeClass = (classId, registerId) => {
    this.props.registerListActions.changeClass(
      classId,
      registerId,
      this.props.token,
    );
  };

  render() {
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
        autoFocus={this.props.autoFocusRegisterListSearch}
        token={this.props.token}
        errorChangeCallStatus={this.props.errorChangeCallStatus}
        errorSubmitMoney={this.props.errorSubmitMoney}
        changeCallStatus={this.changeCallStatus}
        submitMoney={this.submitMoney}
        user={this.props.user}
        salerId={this.props.salerId}
        onSelectSalerId={this.onSelectSalerId}
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
        onSelectStartTime={this.onSelectStartTime}
        start_time={this.props.start_time}
        onSelectEndTime={this.onSelectEndTime}
        end_time={this.props.end_time}
        onSelectAppointmentPayment={this.onSelectAppointmentPayment}
        appointmentPayment={this.props.appointmentPayment}
        onSelectStatus={this.onSelectStatus}
        statuses={this.props.statuses}
        statusId={this.props.status_id}
        onSelectSource={this.onSelectSource}
        sources={this.props.sources}
        sourceId={this.props.source_id}
        isLoadingSources={this.props.isLoadingSources}
        isLoadingStatuses={this.props.isLoadingStatuses}
        isLoadingCampaigns={this.props.isLoadingCampaigns}
        isLoadingSalers={this.props.isLoadingSalers}
        reset={this.reset}
        salers={this.props.salers}
        classId={this.props.classId}
        isLoadingFilterClasses={this.props.isLoadingFilterClasses}
        filterClasses={this.props.filterClasses}
        onSelectClassId={this.onSelectClassId}
        reloadFilterClasses={this.reloadFilterClasses}
        setAutoFocusRegisterListSearch={this.setAutoFocusRegisterListSearch}
        loadAvailableClasses={this.loadAvailableClasses}
        availableClasses={this.props.availableClasses}
        isLoadingAvailableClasses={this.props.isLoadingAvailableClasses}
        errorAvailableClasses={this.props.errorAvailableClasses}
        resetAvailableClasses={this.resetAvailableClasses}
        changingClass={this.props.changingClass}
        errorChangeClass={this.props.errorChangeClass}
        changeClassStatus={this.props.changeClassStatus}
        changeClass={this.changeClass}
        loadFilterClasses={this.loadFilterClasses}
        courses={this.props.courses}
        isLoadingCourses={this.props.isLoadingCourses}
        errorCourses={this.props.errorCourses}
        courseId={this.props.courseId}
        onSelectCourseId={this.onSelectCourseId}
        note={this.props.note}
        onSelectDateTest={this.onSelectDateTest}
        dateTest={this.props.dateTest}
        callBackTime={this.props.callBackTime}
        onSelectCallBackTime={this.onSelectCallBackTime}
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
    campaigns: state.saveRegister.campaigns,
    campaignId: state.registerList.campaignId,
    paidStatus: state.registerList.paidStatus,
    classStatus: state.registerList.classStatus,
    callStatus: state.registerList.callStatus,
    bookmark: state.registerList.bookmark,
    search_coupon: state.registerList.search_coupon,
    start_time: state.registerList.start_time,
    end_time: state.registerList.end_time,
    appointmentPayment: state.registerList.appointmentPayment,
    statuses: state.saveRegister.statuses,
    sources: state.saveRegister.sources,
    status_id: state.registerList.status_id,
    source_id: state.registerList.source_id,
    isLoadingSources: state.saveRegister.isLoadingSources,
    isLoadingStatuses: state.saveRegister.isLoadingStatuses,
    isLoadingCampaigns: state.saveRegister.isLoadingCampaigns,
    salers: state.saveRegister.salers,
    isLoadingSalers: state.saveRegister.isLoadingSalers,
    isLoadingFilterClasses: state.saveRegister.isLoadingFilterClasses,
    filterClasses: state.saveRegister.filterClasses,
    classId: state.registerList.classId,
    autoFocusRegisterListSearch: state.registerList.autoFocusRegisterListSearch,
    availableClasses: state.registerList.classes,
    isLoadingAvailableClasses: state.registerList.isLoadingClasses,
    errorAvailableClasses: state.registerList.errorClasses,
    changingClass: state.registerList.changingClass,
    errorChangeClass: state.registerList.errorChangeClass,
    changeClassStatus: state.registerList.changeClassStatus,
    courses: state.registerList.courses,
    isLoadingCourses: state.registerList.isLoadingCourses,
    errorCourses: state.registerList.errorCourses,
    courseId: state.registerList.courseId,
    note: state.registerList.note,
    dateTest: state.registerList.dateTest,
    callBackTime: state.registerList.callBackTime,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerListActions: bindActionCreators(registerListActions, dispatch),
    infoStudentActions: bindActionCreators(infoStudentActions, dispatch),
    baseActions: bindActionCreators(baseActions, dispatch),
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
    genActions: bindActionCreators(genActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterListContainer);
