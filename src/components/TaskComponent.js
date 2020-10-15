import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import 'moment/locale/vi';
import ProgressCircle from 'react-native-progress-circle';
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import TaskItem from './task/TaskItem';
var {height, width} = Dimensions.get('window');
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {CustomPicker} from 'react-native-custom-picker';
import {convertVietText} from '../helper';
import Search from './common/Search';

class TaskComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      week: [],
      tab: 1,
      search: '',
      user_id: this.props.user.id,
    };
  }

  componentDidMount = () => {
    this.setState({week: this.createWeek(new Date())});
  };

  createWeek(dateData) {
    let date = new Date(dateData);
    let week = [];
    for (let i = 1; i <= 7; i++) {
      let first;
      if (date.getDay() == 0) {
        first = date.getDate() - 7 + i;
      } else {
        first = date.getDate() - date.getDay() + i;
      }

      let day = new Date(date.setDate(first));
      week.push(day);
    }
    return week;
  }

  nextWeek = () => {
    const lastDate = new Date(this.state.week[6]);
    this.setState({
      week: this.createWeek(lastDate.setDate(lastDate.getDate() + 2)),
    });
  };

  previousWeek = () => {
    const firstDate = new Date(this.state.week[0]);
    this.setState({
      week: this.createWeek(firstDate.setDate(firstDate.getDate() - 2)),
    });
  };

  onSelectDate = (date) => {
    this.props.onSelectDate(date);
    this.props.loadTaskView(date, this.state.user_id);
  };

  renderTaskItem = () => {
    if (this.state.tab === 1) {
      let tasks = this.tasksNotComplete();
      return tasks.map((task) => (
        <TaskItem task={task} onSelectTask={this.props.onSelectTask} />
      ));
    } else {
      let tasks = this.tasksCompleted();
      return tasks.map((task) => (
        <TaskItem task={task} onSelectTask={this.props.onSelectTask} />
      ));
    }
  };

  tasksCompleted = () => {
    return this.props.taskView.filter((task) => task.status === 1);
  };

  tasksNotComplete = () => {
    return this.props.taskView.filter((task) => task.status === 0);
  };

  getSearchedResults = (array) => {
    let list = [];
    if (this.state.search === '') {
      return array;
    } else {
      for (let item of array) {
        let normalizedName = item.name;
        if (
          convertVietText(normalizedName).includes(
            convertVietText(this.state.search),
          )
        ) {
          list.push(item);
        }
      }
      return list;
    }
  };

  renderPickerField = (settings) => {
    const {selectedItem, getLabel} = settings;
    return (
      <View>
        {!selectedItem && (
          <View>
            <Image
              source={{uri: this.props.user.avatar_url}}
              style={styles.avatar}
            />
          </View>
        )}
        {selectedItem &&
          (selectedItem.name === 'Tất cả' ? (
            <View>
              <Image
                source={require('../../assets/img/icons8-people.png')}
                style={styles.placeholder}
              />
            </View>
          ) : (
            <View>
              <Image
                source={{uri: getLabel(selectedItem)}}
                style={styles.avatar}
              />
            </View>
          ))}
      </View>
    );
  };

  renderPickerOption = (settings) => {
    const {item} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{item.name}</Text>
      </View>
    );
  };

  renderPickerHeader = (title) => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>{title}</Text>
        <Search
          placeholder="Tìm kiếm"
          onChangeText={(search) => {
            this.setState({search});
          }}
          value={this.state.search}
          extraStyle={{width: width - 70, marginLeft: 0}}
          extraInputStyle={{width: width - 38 - 80}}
        />
      </View>
    );
  };

  renderPickerFooter(action) {
    return (
      <TouchableOpacity
        style={styles.headerFooterContainer}
        onPress={action.close.bind(this)}>
        <Text style={{color: '#C50000', fontSize: 19}}>Hủy</Text>
      </TouchableOpacity>
    );
  }

  getData = (array) => {
    let defaultOption = {id: '', name: 'Tất cả'};
    let data = [defaultOption].concat(array);
    return data;
  };

  render() {
    if (!this.props.isLoadingTaskEmployees) {
      let nameSelectedDate =
        moment(this.props.selectedDate).locale('vi').format('dddd') +
        ' ' +
        moment(this.props.selectedDate).locale('vi').format('L');
      nameSelectedDate =
        nameSelectedDate.charAt(0).toUpperCase() + nameSelectedDate.slice(1);
      return (
        <ScrollView
          style={{flex: 1, marginTop: getStatusBarHeight() + 10}}
          refreshControl={
            <RefreshControl
              refreshing={
                this.props.isLoadingTaskAnalytics ||
                this.props.isLoadingTaskView
              }
              onRefresh={() =>
                this.props.onRefresh(
                  moment(this.props.selectedDate).format('YYYY-MM-DD'),
                  this.state.user_id,
                )
              }
            />
          }>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItem: 'center',
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name={'keyboard-arrow-left'} color={'#000000'} size={35} />
            </TouchableOpacity>
            <View style={{justifyContent: 'center', marginLeft: 10}}>
              <Text style={{fontWeight: '600', fontSize: 18}}>
                Việc cần làm
              </Text>
            </View>
            <CustomPicker
              options={this.getSearchedResults(
                this.getData(this.props.employees),
              )}
              getLabel={(item) => item.avatar_url}
              modalAnimationType={'fade'}
              optionTemplate={this.renderPickerOption}
              fieldTemplate={this.renderPickerField}
              headerTemplate={() => this.renderPickerHeader('Chọn nhân viên')}
              footerTemplate={this.renderPickerFooter}
              onBlur={() => this.setState({search: ''})}
              modalStyle={{
                borderRadius: 6,
              }}
              onValueChange={(value) => {
                this.setState({search: '', user_id: value.id});
                this.props.onSelectUserId(
                  moment(this.props.selectedDate).format('YYYY-MM-DD'),
                  value.id,
                );
              }}
            />
          </View>
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Text style={styles.fullDateText}>{nameSelectedDate}</Text>
          </View>
          <View style={styles.weekAlign}>
            <TouchableOpacity onPress={this.previousWeek}>
              <Icon name={'keyboard-arrow-left'} color={'#000000'} size={34} />
            </TouchableOpacity>
            {!this.props.isLoadingTaskAnalytics ? (
              this.state.week.map((date, index) => {
                let isSelectedDate =
                  moment(this.props.selectedDate).format('DD/MM/YYYY') ===
                  moment(date).format('DD/MM/YYYY');
                let analyticTask = this.props.taskAnalytics.filter(
                  (analyticTask) =>
                    moment(date).format('YYYY-MM-DD') === analyticTask.date,
                )[0];
                analyticTask = analyticTask
                  ? analyticTask
                  : {
                      total_completed: 0,
                      total: 0.1,
                    };
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.onSelectDate(moment(date).format('YYYY-MM-DD'))
                    }>
                    <View style={{alignItems: 'center'}}>
                      <View
                        style={[
                          styles.progressCircle,
                          {backgroundColor: isSelectedDate ? 'red' : 'white'},
                        ]}>
                        <Text
                          style={[
                            {
                              color: isSelectedDate ? 'white' : '#999',
                            },
                            styles.progressText,
                          ]}>
                          {index < 6 ? `T${index + 2}` : 'CN'}
                        </Text>
                      </View>
                      <ProgressCircle
                        percent={
                          analyticTask.total_completed === 0 &&
                          analyticTask.total >= 1
                            ? 100
                            : (analyticTask.total_completed * 100) /
                              analyticTask.total
                        }
                        radius={15}
                        borderWidth={2}
                        color={
                          analyticTask.total_completed === 0 &&
                          analyticTask.total >= 1
                            ? '#ff472a'
                            : '#00B700'
                        }
                        shadowColor="#DDDDDD"
                        bgColor="#fff">
                        <Text style={styles.dateNumber}>{date.getDate()}</Text>
                      </ProgressCircle>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={{flex: 1}}>
                <View style={styles.container}>
                  <Spinkit
                    isVisible
                    color={theme.mainColor}
                    type="Wave"
                    size={width / 8}
                  />
                </View>
              </View>
            )}
            <TouchableOpacity onPress={this.nextWeek}>
              <Icon name={'keyboard-arrow-right'} color={'#000000'} size={34} />
            </TouchableOpacity>
          </View>
          {this.props.isLoadingTaskView ? (
            <View style={{flex: 1}}>
              <View style={styles.container}>
                <Spinkit
                  isVisible
                  color={theme.mainColor}
                  type="Wave"
                  size={width / 8}
                />
              </View>
            </View>
          ) : (
            <View style={{flex: 1, marginHorizontal: theme.mainHorizontal}}>
              <View style={{flexDirection: 'row', marginVertical: 15}}>
                <TouchableOpacity onPress={() => this.setState({tab: 1})}>
                  <View
                    style={
                      this.state.tab === 1
                        ? styles.selectedTab
                        : styles.unselectedTab
                    }>
                    <Text
                      style={{
                        fontWeight: '600',
                        color: this.state.tab === 1 ? 'white' : '#505661',
                      }}>
                      Cần làm ({this.tasksNotComplete().length})
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({tab: 2})}>
                  <View
                    style={
                      this.state.tab === 1
                        ? styles.unselectedTab
                        : styles.selectedTab
                    }>
                    <Text
                      style={{
                        fontWeight: '600',
                        color: this.state.tab === 1 ? '#505661' : 'white',
                      }}>
                      Đã hoàn thành ({this.tasksCompleted().length})
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {this.renderTaskItem()}
            </View>
          )}
        </ScrollView>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <Spinkit
              isVisible
              color={theme.mainColor}
              type="Wave"
              size={width / 8}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullDateText: {
    fontSize: 16,
    color: '#707070',
  },
  weekAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressCircle: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginBottom: 3,
    borderRadius: 10,
  },
  progressText: {
    fontSize: 10,
    fontWeight: '600',
  },
  dateNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
  },
  selectedTab: {
    backgroundColor: '#505661',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItem: 'center',
    borderRadius: 20,
  },
  unselectedTab: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItem: 'center',
    borderRadius: 20,
  },
  avatar: {
    width: theme.mainAvatar.width,
    height: theme.mainAvatar.height,
    borderRadius: theme.mainAvatar.borderRadius,
    marginRight: 10,
  },
  placeholder: {
    width: theme.mainAvatar.width,
    height: theme.mainAvatar.height,
    marginRight: 10,
  },
  headerFooterContainer: {
    padding: 10,
    alignItems: 'center',
  },
  headerFooterText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
  },
  options: {
    marginVertical: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginHorizontal: 20,
  },
  searchContainer: {
    marginTop: 10,
    backgroundColor: '#f6f6f6',
    height: 40,
    width: width - 70,
    borderRadius: 27,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  searchInput: {
    fontSize: 16,
    color: '#707070',
    marginLeft: 10,
  },
};

export default TaskComponent;
