/**
 * Created by phanmduong on 6/16/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import * as collectMoneyActions from '../actions/collectMoneyActions';
import StudentRegisterClassComponent from '../components/collectMoney/StudentRegisterClassComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class StudentRegisterClassContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
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
          <Text style={styles.name}>Lớp học đã đăng kí</Text>
        </View>
      </View>
    ),
  });

  render() {
    return <StudentRegisterClassComponent student={this.props.student} />;
  }
}

const styles = {
  name: {
    fontWeight: '600',
    fontSize: 23,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginLeft: 10,
  },
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    student: state.collectMoney.studentSelected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    collectMoneyActions: bindActionCreators(collectMoneyActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentRegisterClassContainer);
