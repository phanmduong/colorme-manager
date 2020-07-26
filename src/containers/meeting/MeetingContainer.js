/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import MeetingStore from './MeetingStore';
import {observer} from 'mobx-react';
import MeetingComponent from './MeetingComponent';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../styles';

@observer
class MeetingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.store = new MeetingStore(props.token, props.domain);
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
          <Text style={styles.name}>Họp</Text>
        </View>
      </View>
    ),
    headerRight: (
      <View style={{flexDirection: 'row', marginRight: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('HistoryMeeting')}>
          <Image
            source={require('../../../assets/img/icons8-sand-clock-90.png')}
            style={{width: 20, height: 20, marginRight: 20}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('StoreMeeting')}>
          <Image
            source={require('../../../assets/img/icons8-plus-96.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      </View>
    ),
  });

  componentDidMount() {
    this.store.loadList();
  }

  render() {
    return (
      <MeetingComponent store={this.store} {...this.props} mainScreen={false} />
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
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingContainer);
