import React from 'react';
import {connect} from 'react-redux';
import * as staffActions from '../actions/staffActions';
import StaffComponent from '../components/StaffComponent';
import {bindActionCreators} from 'redux';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';

class StaffContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadStaff();
  };

  loadStaff = () => {
    if (this.props.currentPage < this.props.totalPage) {
      this.props.staffActions.getStaff(
        false,
        this.props.currentPage + 1,
        this.props.search,
        this.props.token,
      );
    }
  };

  searchStaff = search => {
    this.props.staffActions.searchStaff(search, this.props.token);
  };

  refreshStaff = () => {
    this.props.staffActions.refreshStaff(this.props.search, this.props.token);
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
          <Text style={styles.name}>Danh bạ nhân viên</Text>
        </View>
      </View>
    ),
  });

  render() {
    console.log(this.props.staff);
    return (
      <StaffComponent
        {...this.props}
        loadStaff={this.loadStaff}
        searchStaff={this.searchStaff}
        onRefresh={this.refreshStaff}
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
    token: state.login.token,
    staff: state.staff.staff,
    isLoadingStaff: state.staff.isLoadingStaff,
    errorStaff: state.staff.errorStaff,
    totalPage: state.staff.totalPage,
    currentPage: state.staff.currentPage,
    search: state.staff.search,
    refreshingStaff: state.staff.refreshingStaff,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    staffActions: bindActionCreators(staffActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StaffContainer);
