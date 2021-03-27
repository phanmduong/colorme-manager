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
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import theme from '../styles';

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
    this.loadFilterClasses('');
    this.loadCourses();
    this.loadBases();
    this.loadProvinces();
    this.loadCoupons();
  }

  loadBases = () => {
    this.props.baseActions.loadDataBase(this.props.token, this.props.domain);
  };

  loadCoupons = () => {
    this.props.saveRegisterActions.loadCoupons(
      this.props.token,
      this.props.domain,
    );
  };

  loadProvinces = () => {
    this.props.saveRegisterActions.loadProvinces(
      this.props.token,
      this.props.domain,
    );
  };

  loadCampaigns = () => {
    this.props.saveRegisterActions.loadCampaigns(
      this.props.token,
      this.props.domain,
    );
  };

  loadSources = () => {
    this.props.saveRegisterActions.loadSources(
      this.props.token,
      this.props.domain,
    );
  };

  loadStatuses = () => {
    this.props.saveRegisterActions.loadStatuses(
      'registers',
      this.props.token,
      this.props.domain,
    );
  };

  loadSalers = () => {
    this.props.saveRegisterActions.loadSalers(
      this.props.token,
      this.props.domain,
    );
  };

  loadFilterClasses = (search) => {
    this.props.saveRegisterActions.loadFilterClasses(
      search,
      this.props.token,
      this.props.domain,
    );
  };

  loadDataRegisterListMy() {
    if (this.props.currentPageMy < this.props.totalPageMy) {
      this.props.registerListActions.loadDataRegisterListMy(
        this.props.currentPageMy + 1,
        this.props.searchMy,
        '',
        this.props.salerId,
        this.props.courseId,
        this.props.baseId,
        this.props.provinceId,
        this.props.statusId,
        this.props.classId,
        this.props.sourceId,
        this.props.campaignId,
        this.props.couponId,
        this.props.classStatus,
        this.props.callStatus,
        this.props.paidStatus,
        this.props.bookmark,
        this.props.callBackStartTime,
        this.props.callBackEndTime,
        this.props.appointmentPaymentStartTime,
        this.props.appointmentPaymentEndTime,
        this.props.start_time,
        this.props.end_time,
        'registers.created_at',
        'desc',
        this.props.token,
        this.props.domain,
      );
    }
  }

  refreshRegisterListMy = () => {
    this.props.registerListActions.refreshRegisterListMy(
      this.props.searchMy,
      '',
      this.props.salerId,
      this.props.courseId,
      this.props.baseId,
      this.props.provinceId,
      this.props.statusId,
      this.props.classId,
      this.props.sourceId,
      this.props.campaignId,
      this.props.couponId,
      this.props.classStatus,
      this.props.callStatus,
      this.props.paidStatus,
      this.props.bookmark,
      this.props.callBackStartTime,
      this.props.callBackEndTime,
      this.props.appointmentPaymentStartTime,
      this.props.appointmentPaymentEndTime,
      this.props.start_time,
      this.props.end_time,
      'registers.created_at',
      'desc',
      this.props.token,
      this.props.domain,
    );
  };

  updateFormAndLoadDataSearchMy(search) {
    this.props.registerListActions.updateFormAndLoadDataSearchMy(
      search,
      '',
      this.props.salerId,
      this.props.courseId,
      this.props.baseId,
      this.props.provinceId,
      this.props.statusId,
      this.props.classId,
      this.props.sourceId,
      this.props.campaignId,
      this.props.couponId,
      this.props.classStatus,
      this.props.callStatus,
      this.props.paidStatus,
      this.props.bookmark,
      this.props.callBackStartTime,
      this.props.callBackEndTime,
      this.props.appointmentPaymentStartTime,
      this.props.appointmentPaymentEndTime,
      this.props.start_time,
      this.props.end_time,
      'registers.created_at',
      'desc',
      this.props.token,
      this.props.domain,
    );
  }

  setStudentId = (studentId) => {
    this.props.infoStudentActions.setStudentId(studentId);
  };

  changeCallStatus = (
    appointmentPayment,
    callBackTime,
    callStatus,
    note,
    statusId,
    studentId,
    teleId,
  ) => {
    this.props.infoStudentActions.changeCallStatus(
      appointmentPayment,
      callBackTime,
      callStatus,
      note,
      statusId,
      studentId,
      teleId,
      this.props.token,
      this.props.domain,
    );
  };

  submitMoney = (
    register_id,
    actual_input_at,
    code,
    money,
    note,
    payment_method,
    received_book_at,
  ) => {
    this.props.infoStudentActions.submitMoney(
      register_id,
      actual_input_at,
      code,
      money,
      note,
      payment_method,
      received_book_at,
      this.props.token,
      this.props.domain,
    );
  };

  loadAvailableClasses = (registerId, search) => {
    this.props.registerListActions.loadAvailableClasses(
      registerId,
      search,
      this.props.token,
      this.props.domain,
    );
  };

  loadCourses = () => {
    this.props.registerListActions.loadCourses(
      this.props.token,
      this.props.domain,
    );
  };

  resetAvailableClasses = () => {
    this.props.registerListActions.resetAvailableClasses();
  };

  onSelectBaseId = (baseId) => {
    this.props.registerListActions.onSelectBaseId(baseId);
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

  onSelectAppointmentPaymentStartTime = (date) => {
    this.props.registerListActions.onSelectAppointmentPaymentStartTime(date);
  };

  onSelectAppointmentPaymentEndTime = (date) => {
    this.props.registerListActions.onSelectAppointmentPaymentEndTime(date);
  };

  onSelectStatus = (statusId) => {
    this.props.registerListActions.onSelectStatus(statusId);
  };

  onSelectSource = (sourceId) => {
    this.props.registerListActions.onSelectSource(sourceId);
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

  onSelectCallBackStartTime = (date) => {
    this.props.registerListActions.onSelectCallBackStartTime(date);
  };

  onSelectCallBackEndTime = (date) => {
    this.props.registerListActions.onSelectCallBackEndTime(date);
  };

  onSelectProvinceId = (provinceId) => {
    this.props.registerListActions.onSelectProvinceId(provinceId);
  };

  onSelectCouponId = (couponId) => {
    this.props.registerListActions.onSelectCouponId(couponId);
  };

  onChangeNote = (note) => {
    this.props.registerListActions.onChangeNote(note);
  };

  setAutoFocusRegisterListSearch = (bool) => {
    this.props.registerListActions.setAutoFocusRegisterListSearch(bool);
  };

  changeClass = (classId, registerId) => {
    this.props.registerListActions.changeClass(
      classId,
      registerId,
      this.props.token,
      this.props.domain,
    );
  };

  static navigationOptions = ({navigation}) => ({
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

  render() {
    return (
      <RegisterListComponent
        {...this.props}
        onRefresh={this.refreshRegisterListMy}
        loadDataRegisterList={this.loadDataRegisterListMy}
        updateFormAndLoadDataSearch={this.updateFormAndLoadDataSearchMy}
        setStudentId={this.setStudentId}
        changeCallStatus={this.changeCallStatus}
        submitMoney={this.submitMoney}
        onSelectSalerId={this.onSelectSalerId}
        onSelectCampaignId={this.onSelectCampaignId}
        onSelectPaidStatus={this.onSelectPaidStatus}
        onSelectClassStatus={this.onSelectClassStatus}
        onSelectCallStatus={this.onSelectCallStatus}
        onSelectBookmark={this.onSelectBookmark}
        onSelectStartTime={this.onSelectStartTime}
        onSelectEndTime={this.onSelectEndTime}
        onSelectAppointmentPaymentEndTime={
          this.onSelectAppointmentPaymentEndTime
        }
        onSelectAppointmentPaymentStartTime={
          this.onSelectAppointmentPaymentStartTime
        }
        onSelectStatus={this.onSelectStatus}
        onSelectSource={this.onSelectSource}
        onSelectClassId={this.onSelectClassId}
        setAutoFocusRegisterListSearch={this.setAutoFocusRegisterListSearch}
        loadAvailableClasses={this.loadAvailableClasses}
        resetAvailableClasses={this.resetAvailableClasses}
        changeClass={this.changeClass}
        loadFilterClasses={this.loadFilterClasses}
        onSelectCourseId={this.onSelectCourseId}
        onSelectDateTest={this.onSelectDateTest}
        onSelectCallBackStartTime={this.onSelectCallBackStartTime}
        onSelectCallBackEndTime={this.onSelectCallBackEndTime}
        onSelectProvinceId={this.onSelectProvinceId}
        onSelectBaseId={this.onSelectBaseId}
        onSelectCouponId={this.onSelectCouponId}
        onChangeNote={this.onChangeNote}
      />
    );
  }
}

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
