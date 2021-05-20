/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import TeachingClass from './TeachingClass';
import {List} from 'native-base';

@observer
class ListHistoryAttendanceTeaching extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {listAttendance} = this.props.store;

    if (listAttendance.length > 0) {
      return (
        <List
          dataArray={listAttendance}
          renderRow={(classData, index) => (
            <TeachingClass classData={classData} key={index} />
          )}
        />
      );
    }
    return <View />;
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: '#d9534f',
    textAlign: 'center',
  },
};

export default ListHistoryAttendanceTeaching;
