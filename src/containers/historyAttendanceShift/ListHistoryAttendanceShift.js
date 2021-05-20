/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import ShiftRegisterDate from './ShiftRegisterDate';
import {List} from 'native-base';

@observer
class ListHistoryAttendanceShift extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {listShift} = this.props.store;

    if (listShift.length > 0) {
      return (
        <List
          dataArray={listShift}
          renderRow={(date) => <ShiftRegisterDate dateData={date} />}
        />
      );
    }
    return <View />;
  }
}

export default ListHistoryAttendanceShift;
