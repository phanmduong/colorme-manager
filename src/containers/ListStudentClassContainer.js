/**
 * Created by phanmduong on 5/30/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listStudentClassActions from '../actions/listStudentClassActions';
import ListStudenClassComponent from '../components/ListStudenClassComponent';
import * as infoStudentActions from '../actions/infoStudentActions';

class ListStudentClassContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onReload = this.onReload.bind(this);
  }

  componentWillMount() {
    this.onReload();
  }

  onReload() {
    this.props.listStudentClassActions.loadDataListStudentClass(
      this.props.selectedClassId,
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

  render() {
    return (
      <ListStudenClassComponent
        {...this.props}
        listStudentClass={this.props.listStudentClassData}
        classInfo={this.props.classInfo}
        error={this.props.error}
        isLoading={this.props.isLoading}
        onReload={this.onReload}
        changeCallStatus={this.changeCallStatus}
        token={this.props.token}
        errorChangeCallStatus={this.props.errorChangeCallStatus}
        errorSubmitMoney={this.props.errorSubmitMoney}
        submitMoney={this.submitMoney}
        setStudentId={this.setStudentId}
      />
    );
  }
}

ListStudentClassContainer.navigationOptions = {
  title: 'Danh sách học viên',
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    selectedClassId: state.class.selectedClassId,
    listStudentClassData: state.listStudentClass.listStudentClassData,
    isLoading: state.listStudentClass.isLoading,
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    listStudentClassActions: bindActionCreators(
      listStudentClassActions,
      dispatch,
    ),
    infoStudentActions: bindActionCreators(infoStudentActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListStudentClassContainer);
