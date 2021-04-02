/**
 * Created by phanmduong on 6/1/17.
 */
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerListActions from '../actions/registerListActions';
import * as infoStudentActions from '../actions/infoStudentActions';
import * as baseActions from '../actions/baseActions';
import * as saveRegisterActions from '../actions/saveRegisterActions';
import RegisterListComponent from '../components/RegisterListComponent';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import theme from '../styles';

function RegisterListContainer(props) {
  useEffect(() => {
    loadDataRegisterListMy();
    loadCampaigns();
    loadStatuses();
    loadSources();
    loadSalers();
    loadFilterClasses('');
    loadCourses();
    loadBases();
    loadProvinces();
    loadCoupons();
  }, []);

  useEffect(() => {
    if (props.createdRegister) {
      refreshRegisterListMy();
      props.saveRegisterActions.resetCreatedRegister();
    }
  }, [props.createdRegister]);

  function loadBases() {
    props.baseActions.loadDataBase(props.token, props.domain);
  }

  function loadCoupons() {
    props.saveRegisterActions.loadCoupons(props.token, props.domain);
  }

  function loadProvinces() {
    props.saveRegisterActions.loadProvinces(props.token, props.domain);
  }

  function loadCampaigns() {
    props.saveRegisterActions.loadCampaigns(props.token, props.domain);
  }

  function loadSources() {
    props.saveRegisterActions.loadSources(props.token, props.domain);
  }

  function loadStatuses() {
    props.saveRegisterActions.loadStatuses(
      'registers',
      props.token,
      props.domain,
    );
  }

  function loadSalers() {
    props.saveRegisterActions.loadSalers(props.token, props.domain);
  }

  function loadFilterClasses(search) {
    props.saveRegisterActions.loadFilterClasses(
      search,
      props.token,
      props.domain,
    );
  }

  function loadDataRegisterListMy() {
    if (props.currentPageMy < props.totalPageMy) {
      props.registerListActions.loadDataRegisterListMy(
        props.currentPageMy + 1,
        props.searchMy,
        '',
        props.salerId,
        props.courseId,
        props.baseId,
        props.provinceId,
        props.statusId,
        props.classId,
        props.sourceId,
        props.campaignId,
        props.couponId,
        props.classStatus,
        props.callStatus,
        props.paidStatus,
        props.bookmark,
        props.callBackStartTime,
        props.callBackEndTime,
        props.appointmentPaymentStartTime,
        props.appointmentPaymentEndTime,
        props.start_time,
        props.end_time,
        'registers.created_at',
        'desc',
        props.token,
        props.domain,
      );
    }
  }

  function refreshRegisterListMy() {
    props.registerListActions.refreshRegisterListMy(
      props.searchMy,
      '',
      props.salerId,
      props.courseId,
      props.baseId,
      props.provinceId,
      props.statusId,
      props.classId,
      props.sourceId,
      props.campaignId,
      props.couponId,
      props.classStatus,
      props.callStatus,
      props.paidStatus,
      props.bookmark,
      props.callBackStartTime,
      props.callBackEndTime,
      props.appointmentPaymentStartTime,
      props.appointmentPaymentEndTime,
      props.start_time,
      props.end_time,
      'registers.created_at',
      'desc',
      props.token,
      props.domain,
    );
  }

  function updateFormAndLoadDataSearchMy(search) {
    props.registerListActions.updateFormAndLoadDataSearchMy(
      search,
      '',
      props.salerId,
      props.courseId,
      props.baseId,
      props.provinceId,
      props.statusId,
      props.classId,
      props.sourceId,
      props.campaignId,
      props.couponId,
      props.classStatus,
      props.callStatus,
      props.paidStatus,
      props.bookmark,
      props.callBackStartTime,
      props.callBackEndTime,
      props.appointmentPaymentStartTime,
      props.appointmentPaymentEndTime,
      props.start_time,
      props.end_time,
      'registers.created_at',
      'desc',
      props.token,
      props.domain,
    );
  }

  function setStudentId(studentId) {
    props.infoStudentActions.setStudentId(studentId);
  }

  function changeCallStatus(
    appointmentPayment,
    callBackTime,
    callStatus,
    note,
    statusId,
    studentId,
    teleId,
  ) {
    props.infoStudentActions.changeCallStatus(
      appointmentPayment,
      callBackTime,
      callStatus,
      note,
      statusId,
      studentId,
      teleId,
      props.token,
      props.domain,
    );
  }

  function submitMoney(
    register_id,
    actual_input_at,
    code,
    money,
    note,
    payment_method,
    received_book_at,
  ) {
    props.infoStudentActions.submitMoney(
      register_id,
      actual_input_at,
      code,
      money,
      note,
      payment_method,
      received_book_at,
      props.token,
      props.domain,
    );
  }

  function loadAvailableClasses(registerId, search) {
    props.registerListActions.loadAvailableClasses(
      registerId,
      search,
      props.token,
      props.domain,
    );
  }

  function loadCourses() {
    props.registerListActions.loadCourses(props.token, props.domain);
  }

  function resetAvailableClasses() {
    props.registerListActions.resetAvailableClasses();
  }

  function onSelectBaseId(baseId) {
    props.registerListActions.onSelectBaseId(baseId);
  }

  function onSelectSalerId(salerId) {
    props.registerListActions.onSelectSalerId(salerId);
  }

  function onSelectCampaignId(campaignId) {
    props.registerListActions.onSelectCampaignId(campaignId);
  }

  function onSelectPaidStatus(paidStatus) {
    props.registerListActions.onSelectPaidStatus(paidStatus);
  }

  function onSelectClassStatus(classStatus) {
    props.registerListActions.onSelectClassStatus(classStatus);
  }

  function onSelectCallStatus(callStatus) {
    props.registerListActions.onSelectCallStatus(callStatus);
  }

  function onSelectBookmark(bookmark) {
    props.registerListActions.onSelectBookmark(bookmark);
  }

  function onSelectStartTime(date) {
    props.registerListActions.onSelectStartTime(date);
  }

  function onSelectEndTime(date) {
    props.registerListActions.onSelectEndTime(date);
  }

  function onSelectAppointmentPaymentStartTime(date) {
    props.registerListActions.onSelectAppointmentPaymentStartTime(date);
  }

  function onSelectAppointmentPaymentEndTime(date) {
    props.registerListActions.onSelectAppointmentPaymentEndTime(date);
  }

  function onSelectStatus(statusId) {
    props.registerListActions.onSelectStatus(statusId);
  }

  function onSelectSource(sourceId) {
    props.registerListActions.onSelectSource(sourceId);
  }

  function onSelectClassId(classId) {
    props.registerListActions.onSelectClassId(classId);
  }

  function onSelectCourseId(courseId) {
    props.registerListActions.onSelectCourseId(courseId);
  }

  function onSelectDateTest(date) {
    props.registerListActions.onSelectDateTest(date);
  }

  function onSelectCallBackStartTime(date) {
    props.registerListActions.onSelectCallBackStartTime(date);
  }

  function onSelectCallBackEndTime(date) {
    props.registerListActions.onSelectCallBackEndTime(date);
  }

  function onSelectProvinceId(provinceId) {
    props.registerListActions.onSelectProvinceId(provinceId);
  }

  function onSelectCouponId(couponId) {
    props.registerListActions.onSelectCouponId(couponId);
  }

  function onChangeNote(note) {
    props.registerListActions.onChangeNote(note);
  }

  function setAutoFocusRegisterListSearch(bool) {
    props.registerListActions.setAutoFocusRegisterListSearch(bool);
  }

  function changeClass(classId, registerId) {
    props.registerListActions.changeClass(
      classId,
      registerId,
      props.token,
      props.domain,
    );
  }

  return (
    <RegisterListComponent
      {...props}
      onRefresh={refreshRegisterListMy}
      loadDataRegisterList={loadDataRegisterListMy}
      updateFormAndLoadDataSearch={updateFormAndLoadDataSearchMy}
      setStudentId={setStudentId}
      changeCallStatus={changeCallStatus}
      submitMoney={submitMoney}
      onSelectSalerId={onSelectSalerId}
      onSelectCampaignId={onSelectCampaignId}
      onSelectPaidStatus={onSelectPaidStatus}
      onSelectClassStatus={onSelectClassStatus}
      onSelectCallStatus={onSelectCallStatus}
      onSelectBookmark={onSelectBookmark}
      onSelectStartTime={onSelectStartTime}
      onSelectEndTime={onSelectEndTime}
      onSelectAppointmentPaymentEndTime={onSelectAppointmentPaymentEndTime}
      onSelectAppointmentPaymentStartTime={onSelectAppointmentPaymentStartTime}
      onSelectStatus={onSelectStatus}
      onSelectSource={onSelectSource}
      onSelectClassId={onSelectClassId}
      setAutoFocusRegisterListSearch={setAutoFocusRegisterListSearch}
      loadAvailableClasses={loadAvailableClasses}
      resetAvailableClasses={resetAvailableClasses}
      changeClass={changeClass}
      loadFilterClasses={loadFilterClasses}
      onSelectCourseId={onSelectCourseId}
      onSelectDateTest={onSelectDateTest}
      onSelectCallBackStartTime={onSelectCallBackStartTime}
      onSelectCallBackEndTime={onSelectCallBackEndTime}
      onSelectProvinceId={onSelectProvinceId}
      onSelectBaseId={onSelectBaseId}
      onSelectCouponId={onSelectCouponId}
      onChangeNote={onChangeNote}
    />
  );
}

RegisterListContainer.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <View style={styles.headerLeftContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name={'chevron-left'}
          size={33}
          color={'black'}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.name}>Học viên</Text>
      </View>
    </View>
  ),
  headerRight: () => (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => navigation.navigate('SaveRegister')}>
        <View style={styles.headerIconContainer}>
          <MatIcon name={'add-circle'} size={20} color={'black'} />
        </View>
      </TouchableOpacity>
    </View>
  ),
});

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
  headerIconContainer: theme.headerIconContainer,
};

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
    appointmentPaymentStartTime: state.registerList.appointmentPaymentStartTime,
    appointmentPaymentEndTime: state.registerList.appointmentPaymentEndTime,
    statuses: state.saveRegister.statuses,
    sources: state.saveRegister.sources,
    statusId: state.registerList.status_id,
    sourceId: state.registerList.source_id,
    isLoadingSources: state.saveRegister.isLoadingSources,
    isLoadingStatuses: state.saveRegister.isLoadingStatuses,
    isLoadingCampaigns: state.saveRegister.isLoadingCampaigns,
    salers: state.saveRegister.salers,
    isLoadingSalers: state.saveRegister.isLoadingSalers,
    isLoadingFilterClasses: state.saveRegister.isLoadingFilterClasses,
    filterClasses: state.saveRegister.filterClasses,
    classId: state.registerList.classId,
    autoFocus: state.registerList.autoFocusRegisterListSearch,
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
    callBackStartTime: state.registerList.callBackStartTime,
    callBackEndTime: state.registerList.callBackEndTime,
    domain: state.login.domain,
    baseId: state.registerList.baseId,
    provinceId: state.registerList.provinceId,
    baseData: state.base.baseData,
    isLoadingBases: state.base.isLoading,
    errorBases: state.base.error,
    provinces: state.saveRegister.provinces,
    isLoadingProvinces: state.saveRegister.isLoadingProvinces,
    errorProvinces: state.saveRegister.errorLoadingProvinces,
    coupons: state.saveRegister.coupons,
    isLoadingCoupons: state.saveRegister.isLoadingCoupons,
    errorCoupons: state.saveRegister.errorCoupons,
    couponId: state.registerList.couponId,
    createdRegister: state.saveRegister.createdRegister,
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
