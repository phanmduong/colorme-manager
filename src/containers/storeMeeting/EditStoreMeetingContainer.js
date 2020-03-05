/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import EditStore from './EditStore';
import {observer} from 'mobx-react';
import EditStoreMeetingComponent from './EditStoreMeetingComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

@observer
class EditStoreMeetingContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    const {navigation} = this.props;
    const meetingId = navigation.getParam('meetingId', 0);
    this.store = new EditStore(props.token, meetingId);
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
          <Text style={styles.name}>Chỉnh sửa cuộc họp</Text>
        </View>
      </View>
    ),
  });

  render() {
    return <EditStoreMeetingComponent store={this.store} {...this.props} />;
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
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditStoreMeetingContainer);
