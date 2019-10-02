import React from 'react';
import DetailShiftsComponent from '../components/DetailShiftsComponent';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as detailShiftsActions from '../actions/detailShiftsActions';

class DetailShiftsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    const {navigation} = this.props;
    const week = navigation.getParam('week', 0);
    const id = navigation.getParam('id', 0);
    this.loadDetailShifts(week, id);
  };

  static navigationOptions = ({navigation}) => ({
    title: 'Chi tiết nhân viên',
  });

  loadDetailShifts = (week, id) => {
    this.props.detailShiftsActions.loadDetailShifts(
      this.props.selectedBaseId,
      this.props.selectedGenId,
      id,
      week,
      this.props.token,
    );
  };

  render() {
    const {navigation} = this.props;
    const totalHours = navigation.getParam('totalHours', 0);
    const name = navigation.getParam('name', '');
    const avatar_url = navigation.getParam('avatar_url', '');
    const week = navigation.getParam('week', 0);
    return (
      <DetailShiftsComponent
        detailShifts={this.props.detailShifts}
        totalHours={totalHours}
        name={name}
        avatar_url={avatar_url}
        weekIndex={week}
        isLoadingDetailShifts={this.props.isLoadingDetailShifts}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedBaseId: state.workShiftRegister.selectedBaseId,
    selectedGenId: state.workShiftRegister.selectedGenId,
    isLoadingDetailShifts: state.detailShifts.isLoading,
    detailShifts: state.detailShifts.detailShifts,
    user: state.login.user,
    token: state.login.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    detailShiftsActions: bindActionCreators(detailShiftsActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailShiftsContainer);
