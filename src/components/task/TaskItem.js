import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../styles';
import {getShortName, isEmptyInput} from '../../helper';

class TaskItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  getTaskIcon = () => {
    if (this.props.task.task_list.icon.includes('phone_missed')) {
      return (
        <View style={[styles.icon, {backgroundColor: '#FF9800'}]}>
          <Icon name={'phone-missed'} size={20} color={'white'} />
        </View>
      );
    } else if (this.props.task.task_list.icon.includes('local_phone')) {
      return (
        <View style={[styles.icon, {backgroundColor: '#19CA52'}]}>
          <Icon name={'local-phone'} size={20} color={'white'} />
        </View>
      );
    } else {
      return (
        <View style={[styles.icon, {backgroundColor: '#FF3725'}]}>
          <Icon name={'attach-money'} size={20} color={'white'} />
        </View>
      );
    }
  };

  getStudentId = () => {
    return parseInt(
      this.props.task.open_url.replace('/sales/info-student/', ''),
    );
  };

  render() {
    let studentId = this.getStudentId();
    return (
      <TouchableOpacity onPress={() => this.props.onSelectTask(studentId)}>
        <View style={styles.itemContainer}>
          <View>{this.getTaskIcon()}</View>
          <View style={{marginLeft: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>
                {this.props.task.title}
              </Text>
              {!isEmptyInput(this.props.task.register) &&
              !isEmptyInput(this.props.task.register.saler) ? (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !this.props.task.register.saler.color ||
                        this.props.task.register.saler.color === ''
                          ? theme.processColor1
                          : '#' + this.props.task.register.saler.color,
                    },
                  }}>
                  <Text style={styles.saler}>
                    {getShortName(this.props.task.register.saler.name)}
                  </Text>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View style={{marginTop: 5}}>
              <Text>
                {this.props.task.task_list.title} -{' '}
                {this.props.task.remain_time}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  card: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  saler: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
};

export default TaskItem;
