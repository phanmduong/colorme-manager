import React from 'react';
import ListDetailShiftsRegisteredComponent from '../components/ListDetailShiftsRegisteredComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ListDetailShiftsRegisteredContainer extends React.Component {
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
          <Text style={styles.name}>Chi tiết</Text>
        </View>
      </View>
    ),
  });

  render() {
    const {navigation} = this.props;
    let week = navigation.getParam('week', 0);
    let dates = navigation.getParam('dates', []);
    return (
      <ListDetailShiftsRegisteredComponent
        weekIndex={week}
        dates={dates}
        {...this.props}
      />
    );
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

export default ListDetailShiftsRegisteredContainer;
