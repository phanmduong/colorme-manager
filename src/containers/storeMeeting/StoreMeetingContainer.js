/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import Store from './Store';
import {observer} from 'mobx-react';
import StoreMeetingComponent from './StoreMeetingComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../../styles";

@observer
class StoreMeetingContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = new Store(props.token);
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
          <Text style={styles.name}>Tạo cuộc họp</Text>
        </View>
      </View>
    ),
  });

  render() {
    return <StoreMeetingComponent store={this.store} {...this.props} />;
  }
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
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
)(StoreMeetingContainer);
