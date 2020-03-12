/**
 * Created by phanmduong on 5/30/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listStudentPaidActions from '../actions/listStudentPaidActions';
import ListStudenPaidComponent from '../components/ListStudenPaidComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../styles";

class ListStudentPaidContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onReload = this.onReload.bind(this);
  }

  componentWillMount() {
    this.onReload();
  }

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
          <Text style={styles.name}>Học viên đã nộp tiền</Text>
        </View>
      </View>
    ),
  });

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

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
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
