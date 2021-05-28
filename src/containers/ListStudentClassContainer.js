/**
 * Created by phanmduong on 5/30/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listStudentClassActions from '../actions/listStudentClassActions';
import * as currentClassStudyActions from '../actions/currentClassStudyActions';
import ListStudentClassComponent from '../components/ListStudentClassComponent';
import * as infoStudentActions from '../actions/infoStudentActions';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import {isEmptyInput} from '../helper';
import * as leadsActions from '../actions/leadsActions';

class ListStudentClassContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onReload = this.onReload.bind(this);
  }

  componentWillMount() {
    this.onReload();
    this.loadStaff('');
  }

  static navigationOptions = ({navigation}) => ({
    headerLeft: () => (
      <View style={[styles.headerLeftContainer, {width: 180}]}>
        <View style={styles.row}>
          <Icon
            name={'chevron-left'}
            size={33}
            color={'black'}
            onPress={() => navigation.goBack()}
          />
          {!isEmptyInput(navigation.state.params) &&
          !isEmptyInput(navigation.state.params.avatar_url) ? (
            <Image
              source={{uri: navigation.state.params.avatar_url}}
              style={styles.ava}
            />
          ) : (
            <Image
              source={require('../../assets/img/icons8-male-user-96.png')}
              style={styles.ava}
            />
          )}
          <Text numberOfLines={1} style={[styles.name, {marginLeft: 10}]}>
            {navigation.state.params && navigation.state.params.name
              ? navigation.state.params.name
              : null}
          </Text>
        </View>
      </View>
    ),
    headerRight: () => (
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate('ClassInfo')}>
          <Image
            source={require('../../assets/img/icons8-info_filled.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    ),
  });

  onReload() {
    this.props.listStudentClassActions.loadDataListStudentClass(
      this.props.selectedClassId,
      this.props.token,
      this.props.domain,
    );
    this.props.listStudentClassActions.loadListStudentClassLessons(
      false,
      this.props.selectedClassId,
      this.props.token,
      this.props.domain,
    );
  }

  onRefresh = () => {
    this.props.listStudentClassActions.refreshDataListStudentClass(
      this.props.selectedClassId,
      this.props.token,
      this.props.domain,
    );
    this.props.listStudentClassActions.loadListStudentClassLessons(
      true,
      this.props.selectedClassId,
      this.props.token,
      this.props.domain,
    );
  };

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

  openQrCode = (classItem) => {
    this.props.currentClassStudyActions.selectedCurrentClassStudy(classItem);
    this.props.navigation.navigate('QRCode');
  };

  changeBegin = (lessonsArray) => {
    this.props.listStudentClassActions.changeClassLessons(
      lessonsArray,
      this.props.token,
      this.props.domain,
    );
  };

  changeDate = (lesson) => {
    this.props.listStudentClassActions.changeClassLesson(
      lesson,
      this.props.token,
      this.props.domain,
    );
  };

  loadStaff = (search) => {
    this.props.leadsActions.getStaff(
      search,
      this.props.token,
      this.props.domain,
    );
  };

  changeStaff = (changedData, type) => {
    if (type === 'teacher') {
      this.props.listStudentClassActions.changeClassTeach(
        changedData,
        this.props.token,
        this.props.domain,
      );
    } else {
      this.props.listStudentClassActions.changeClassAssist(
        changedData,
        this.props.token,
        this.props.domain,
      );
    }
  };

  render() {
    return (
      <ListStudentClassComponent
        {...this.props}
        listStudentClass={this.props.listStudentClassData}
        onReload={this.onReload}
        changeCallStatus={this.changeCallStatus}
        submitMoney={this.submitMoney}
        setStudentId={this.setStudentId}
        onRefresh={this.onRefresh}
        openQrCode={this.openQrCode}
        changeBegin={this.changeBegin}
        changeDate={this.changeDate}
        searchStaff={this.loadStaff}
        changeStaff={this.changeStaff}
      />
    );
  }
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
  ava: theme.mainAvatar,
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  btnContainer: {
    padding: 8,
    backgroundColor: '#F6F6F6',
    marginLeft: 10,
    borderRadius: 18,
  },
  icon: {
    width: 18,
    height: 18,
  },
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    selectedClassId: state.class.selectedClassId,
    listStudentClassData: state.listStudentClass.listStudentClassData,
    isLoading: state.listStudentClass.isLoading,
    refreshing: state.listStudentClass.refreshing,
    classInfo: state.listStudentClass.classInfo,
    error: state.listStudentClass.error,
    isLoadingChangeCallStatus: state.infoStudent.isLoadingChangeCallStatus,
    errorChangeCallStatus: state.infoStudent.errorChangeCallStatus,
    isLoadingSubmitMoney: state.infoStudent.isLoadingSubmitMoney,
    errorSubmitMoney: state.infoStudent.errorSubmitMoney,
    selectedBaseId: state.base.selectedBaseId,
    salerId: state.infoStudent.salerId,
    campaignId: state.infoStudent.campaignId,
    paidStatus: state.infoStudent.paidStatus,
    callStatus: state.infoStudent.callStatus,
    bookmark: state.infoStudent.bookmark,
    status_id: state.infoStudent.status_id,
    source_id: state.infoStudent.source_id,
    searchMy: state.registerList.searchMy,
    classStatus: state.registerList.classStatus,
    search_coupon: state.registerList.search_coupon,
    start_time: state.registerList.start_time,
    end_time: state.registerList.end_time,
    appointmentPayment: state.registerList.appointmentPayment,
    lessons: state.listStudentClass.lessons,
    isLoadingLessons: state.listStudentClass.isLoadingLessons,
    errorLessons: state.listStudentClass.errorLessons,
    refreshingLessons: state.listStudentClass.refreshingLessons,
    changingClassLessons: state.listStudentClass.changingClassLessons,
    errorChangeClassLessons: state.listStudentClass.errorChangeClassLessons,
    changingClassLesson: state.listStudentClass.changingClassLesson,
    errorChangeClassLesson: state.listStudentClass.errorChangeClassLesson,
    staff: state.leads.staff,
    isLoadingStaff: state.leads.isLoadingStaff,
    errorStaff: state.leads.errorStaff,
    changingClassTeach: state.leads.changingClassTeach,
    errorChangeClassTeach: state.leads.errorChangeClassTeach,
    changingClassAssist: state.leads.changingClassAssist,
    errorChangeClassAssist: state.leads.errorChangeClassAssist,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    listStudentClassActions: bindActionCreators(
      listStudentClassActions,
      dispatch,
    ),
    infoStudentActions: bindActionCreators(infoStudentActions, dispatch),
    currentClassStudyActions: bindActionCreators(
      currentClassStudyActions,
      dispatch,
    ),
    leadsActions: bindActionCreators(leadsActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListStudentClassContainer);
