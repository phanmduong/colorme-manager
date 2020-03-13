import React from 'react';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {View, Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';
import moment from 'moment';
import moment_timezone from 'moment-timezone';
import ProgressCircle from 'react-native-progress-circle';
import Spinkit from 'react-native-spinkit';
import CurrentClassItem from './class/CurrentClassItem';
import theme from '../styles';
import {isEmptyInput} from '../helper';
import FilterCurrentClassModal from './class/FilterCurrentClassModal';
var {height, width} = Dimensions.get('window');

class ClassComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      week: [],
      selectedCourseId: -1,
      selectedBaseId: -1,
      selectedProvinceId: -1,
      filterModalVisible: false,
    };
  }

  headerComponent = () => (
    <View style={styles.headerContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Profile')}>
          <Image
            source={{uri: this.props.avatar_url}}
            style={{width: 35, height: 35, borderRadius: 18}}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            fontSize: 23,
            fontWeight: 'bold',
            marginLeft: 10,
          }}>
          Điểm danh
        </Text>
      </View>
      <TouchableOpacity onPress={this.toggleFilterModal}>
        <View style={styles.fitlerContainer}>
          <Image
            source={require('../../assets/img/icons8-sorting_options_filled.png')}
            style={{width: 18, height: 18}}
          />
        </View>
      </TouchableOpacity>
      <FilterCurrentClassModal
        isLoadingBase={this.props.isLoadingBase}
        isLoadingCourse={this.props.isLoadingCourse}
        baseData={this.props.baseData}
        courseData={this.props.courseData}
        onSelectCourseId={this.onSelectCourseId}
        selectedCourseId={this.state.selectedCourseId}
        onSelectBaseId={this.onSelectBaseId}
        selectedBaseId={this.state.selectedBaseId}
        onSelectProvinceId={this.onSelectProvinceId}
        selectedProvinceId={this.state.selectedProvinceId}
        closeModal={this.toggleFilterModal}
        isVisible={this.state.filterModalVisible}
        provinces={this.props.provinces}
        isLoadingProvinces={this.props.isLoadingProvinces}
      />
    </View>
  );

  renderClassItem = classList => {
    return classList.map(classItem => (
      <CurrentClassItem
        name={classItem.name}
        icon={classItem.course.icon_url}
        teacher={classItem.teacher}
        teacher_assistant={classItem.teacher_assistant}
        base={classItem.base}
        room={classItem.room}
        schedule={classItem.schedule}
        classItem={classItem}
        openQrCode={this.props.openQrCode}
        selectedDate={this.props.selectedDate}
        class_lesson={classItem.class_lesson}
        onSelectedItem={this.props.onSelectedItem}
      />
    ));
  };

  componentDidMount = () => {
    this.setState({week: this.createWeek(new Date())});
  };

  onSelectBaseId = baseId => {
    this.setState({selectedBaseId: baseId});
  };

  onSelectProvinceId = provinceId => {
    this.setState({selectedProvinceId: provinceId});
  };

  onSelectCourseId = courseId => {
    this.setState({selectedCourseId: courseId});
  };

  createWeek = dateData => {
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
  };

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

  onSelectDate = date => {
    this.props.onSelectDate(date);
    this.props.loadDataCurrentClassStudy(date);
  };

  getCurrentLesson = (selectedDate, class_lesson) => {
    for (let lesson of class_lesson) {
      if (lesson.time === selectedDate) {
        return lesson;
      }
    }
    return null;
  };

  filterFutureClass = () => {
    let filterClasses = this.props.classData;
    let futureClasses = [];
    if (this.state.selectedCourseId !== -1) {
      filterClasses = filterClasses.filter(
        classItem => classItem.course.id === this.state.selectedCourseId,
      );
    }
    if (this.state.selectedBaseId !== -1) {
      filterClasses = filterClasses.filter(
        classItem => classItem.base.id === this.state.selectedBaseId,
      );
    }
    if (this.state.selectedProvinceId !== -1) {
      filterClasses = filterClasses.filter(
        classItem =>
          classItem.base.district.province.id === this.state.selectedProvinceId,
      );
    }
    for (let classItem of filterClasses) {
      let classLesson = this.getCurrentLesson(
        this.props.selectedDate,
        classItem.class_lesson,
      );
      if (!isEmptyInput(classLesson)) {
        let currentDate = moment.tz(new Date(), 'Asia/Ho_Chi_Minh');
        let classDate = moment(
          classLesson.time + ' ' + classLesson.start_time + '+07:00',
        );
        if (currentDate.isBefore(classDate)) {
          futureClasses.push(classItem);
        }
      }
    }
    return futureClasses;
  };

  filterPastClass = () => {
    let filterClasses = this.props.classData;
    let pastClasses = [];
    if (this.state.selectedCourseId !== -1) {
      filterClasses = filterClasses.filter(
        classItem => classItem.course.id === this.state.selectedCourseId,
      );
    }
    if (this.state.selectedBaseId !== -1) {
      filterClasses = filterClasses.filter(
        classItem => classItem.base.id === this.state.selectedBaseId,
      );
    }
    for (let classItem of filterClasses) {
      let classLesson = this.getCurrentLesson(
        this.props.selectedDate,
        classItem.class_lesson,
      );
      if (!isEmptyInput(classLesson)) {
        let currentDate = moment.tz(new Date(), 'Asia/Ho_Chi_Minh');
        let classDate = moment(
          classLesson.time + ' ' + classLesson.end_time + '+07:00',
        );
        if (currentDate.isAfter(classDate)) {
          pastClasses.push(classItem);
        }
      }
    }
    return pastClasses;
  };

  filterCurrentClass = () => {
    let filterClasses = this.props.classData;
    let pastClasses = [];
    if (this.state.selectedCourseId !== -1) {
      filterClasses = filterClasses.filter(
        classItem => classItem.course.id === this.state.selectedCourseId,
      );
    }
    if (this.state.selectedBaseId !== -1) {
      filterClasses = filterClasses.filter(
        classItem => classItem.base.id === this.state.selectedBaseId,
      );
    }
    for (let classItem of filterClasses) {
      let classLesson = this.getCurrentLesson(
        this.props.selectedDate,
        classItem.class_lesson,
      );
      if (!isEmptyInput(classLesson)) {
        let currentDate = moment.tz(new Date(), 'Asia/Ho_Chi_Minh');
        let classEnd = moment(
          classLesson.time + ' ' + classLesson.end_time + '+07:00',
        );
        let classStart = moment(
          classLesson.time + ' ' + classLesson.start_time + '+07:00',
        );
        if (currentDate.isAfter(classStart) && currentDate.isBefore(classEnd)) {
          pastClasses.push(classItem);
        }
      }
    }
    return pastClasses;
  };

  toggleFilterModal = () => {
    this.setState({filterModalVisible: !this.state.filterModalVisible});
  };

  render() {
    if (
      !this.props.isLoadingProvinces &&
      !this.props.isLoadingBase &&
      !this.props.isLoadingCourse
    ) {
      let nameSelectedDate =
        moment(this.props.selectedDate)
          .locale('vi')
          .format('dddd') +
        ' ' +
        moment(this.props.selectedDate)
          .locale('vi')
          .format('L');
      nameSelectedDate =
        nameSelectedDate.charAt(0).toUpperCase() + nameSelectedDate.slice(1);
      return (
        <ScrollView
          style={
            isIphoneX()
              ? {flex: 1, marginTop: getStatusBarHeight() + 10}
              : {flex: 1, marginTop: 20}
          }
          refreshControl={
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={() => this.props.onRefresh()}
            />
          }>
          {this.headerComponent()}
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Text style={styles.fullDateText}>{nameSelectedDate}</Text>
          </View>
          <View style={styles.weekAlign}>
            <TouchableOpacity onPress={this.previousWeek}>
              <Icon name={'keyboard-arrow-left'} color={'#000000'} size={34} />
            </TouchableOpacity>
            {this.state.week.map((date, index) => {
              let isSelectedDate =
                moment(this.props.selectedDate).format('DD/MM/YYYY') ===
                moment(date).format('DD/MM/YYYY');
              let currentClasses = isSelectedDate
                ? this.filterCurrentClass()
                : [];
              let pastClasses = isSelectedDate ? this.filterPastClass() : [];
              let totalCompletedClasses =
                currentClasses.length + pastClasses.length;
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.onSelectDate(moment(date).format('YYYY-MM-DD'))
                  }>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={[
                        {
                          color: isSelectedDate ? 'white' : '#999',
                          backgroundColor: isSelectedDate ? 'red' : 'white',
                        },
                        styles.progressCircle,
                      ]}>
                      {index < 6 ? `T${index + 2}` : 'CN'}
                    </Text>
                    <ProgressCircle
                      percent={
                        this.props.classData.length > 0
                          ? (totalCompletedClasses /
                              this.props.classData.length) *
                            100
                          : 0
                      }
                      radius={15}
                      borderWidth={2}
                      color={'#00B700'}
                      shadowColor="#DDDDDD"
                      bgColor="#fff">
                      <Text style={styles.dateNumber}>{date.getDate()}</Text>
                    </ProgressCircle>
                  </View>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity onPress={this.nextWeek}>
              <Icon name={'keyboard-arrow-right'} color={'#000000'} size={34} />
            </TouchableOpacity>
          </View>
          {this.props.isLoading ? (
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
            <View style={{flex: 1}}>
              {this.filterCurrentClass().length > 0 ? (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Đang diễn ra</Text>
                  {this.renderClassItem(this.filterCurrentClass())}
                </View>
              ) : null}
              {this.filterFutureClass().length > 0 ? (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Chưa diễn ra</Text>
                  {this.renderClassItem(this.filterFutureClass())}
                </View>
              ) : null}
              {this.filterPastClass().length > 0 ? (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Đã diễn ra</Text>
                  {this.renderClassItem(this.filterPastClass())}
                </View>
              ) : null}
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
  list: {},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: '#d9534f',
    textAlign: 'center',
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
    borderRadius: 10,
    fontSize: 10,
    marginBottom: 3,
    fontWeight: '600',
    paddingVertical: 3,
    paddingHorizontal: 7,
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
    width: 35,
    height: 35,
    borderRadius: 18,
    marginRight: 10,
  },
  placeholder: {
    width: 35,
    height: 35,
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
  headerContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: theme.mainTextColor,
    fontSize: theme.header.fontSize,
    fontWeight: theme.header.fontWeight,
    marginLeft: 10,
  },
  headerAva: theme.mainAvatar,
  fitlerContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
  sectionContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontWeight: theme.title.fontWeight,
    fontSize: theme.title.fontSize,
  },
};

export default ClassComponent;
