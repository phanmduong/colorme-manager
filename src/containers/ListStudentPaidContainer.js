/**
 * Created by phanmduong on 5/30/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listStudentPaidActions from '../actions/listStudentPaidActions';
import ListStudenPaidComponent from '../components/ListStudenPaidComponent';

class ListStudentPaidContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onReload = this.onReload.bind(this);
  }

  componentWillMount() {
    this.onReload();
  }

  onReload() {
    this.props.listStudentPaidActions.loadDataListStudentPaid(
      this.props.selectedGenId,
      this.props.selectedBaseId,
    );
  }

  render() {
    return (
      <ListStudenPaidComponent
        listStudentPaid={this.props.listStudentPaidData}
        error={this.props.error}
        isLoading={this.props.isLoading}
        onReload={this.onReload}
      />
    );
  }
}

ListStudentPaidContainer.navigationOptions = {
  title: 'Học viên đã nộp tiền',
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    selectedGenId: state.analytics.selectedGenId,
    selectedBaseId: state.analytics.selectedBaseId,
    listStudentPaidData: state.listStudentPaid.listStudentPaidData,
    isLoading: state.listStudentPaid.isLoading,
    error: state.listStudentPaid.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    listStudentPaidActions: bindActionCreators(
      listStudentPaidActions,
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListStudentPaidContainer);
