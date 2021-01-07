import React from 'react';
import DetailShiftsComponent from '../components/DetailShiftsComponent';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as detailShiftsActions from '../actions/detailShiftsActions';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';

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
    headerLeft: () => (
      <View style={styles.headerLeftContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name={'chevron-left'}
            size={33}
            color={'black'}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.name}>Chi tiết nhân viên</Text>
        </View>
      </View>
    ),
  });

  loadDetailShifts = (week, id) => {
    this.props.detailShiftsActions.loadDetailShifts(
      this.props.selectedBaseId,
      id,
      week,
      this.props.token,
      this.props.domain,
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

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
};

function mapStateToProps(state) {
  return {
    selectedBaseId: state.workShiftRegister.selectedBaseId,
    isLoadingDetailShifts: state.detailShifts.isLoading,
    detailShifts: state.detailShifts.detailShifts,
    user: state.login.user,
    token: state.login.token,
    domain: state.login.domain,
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
