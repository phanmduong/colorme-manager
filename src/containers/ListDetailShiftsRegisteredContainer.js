import React from 'react';
import ListDetailShiftsRegisteredComponent from '../components/ListDetailShiftsRegisteredComponent';

class ListDetailShiftsRegisteredContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Chi tiết',
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

export default ListDetailShiftsRegisteredContainer;
