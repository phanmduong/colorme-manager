/**
 * Created by phanmduong on 5/30/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listStudentZeroActions from '../actions/listStudentZeroActions';
import ListStudenZeroComponent from '../components/ListStudenZeroComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../styles";

class ListStudentZeroContainer extends React.Component {
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
          <Text style={styles.name}>Học viên nộp 0 đồng</Text>
        </View>
      </View>
    ),
  });

  onReload() {
    this.props.listStudentZeroActions.loadDataListStudentZero(
      this.props.selectedGenId,
      this.props.selectedBaseId,
    );
  }

  render() {
    return (
      <ListStudenZeroComponent
        listStudentZero={this.props.listStudentZeroData}
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
    listStudentZeroData: state.listStudentZero.listStudentZeroData,
    isLoading: state.listStudentZero.isLoading,
    error: state.listStudentZero.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    listStudentZeroActions: bindActionCreators(
      listStudentZeroActions,
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListStudentZeroContainer);
