import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../styles';
const {width, height} = Dimensions.get('window');
import ListStudentAttendanceRegisterItem from './listStudentAttendanceRegister/ListStudentAttendanceRegisterItem';
import Loading from './common/Loading';
import FA5Icon from 'react-native-vector-icons/Ionicons';

class ListStudentAttendanceRegisterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonId: this.props.classSelected.lesson.id,
    };
  }

  selectTab = (lesson) => {
    this.setState({lessonId: lesson.id});
    this.props.loadAttendances(lesson.id);
  };

  renderTabs = () => {
    return this.props.classSelected.class_lesson.map((class_lesson) => (
      <TouchableOpacity onPress={() => this.selectTab(class_lesson)}>
        <LinearGradient
          colors={
            this.state.lessonId === class_lesson.id
              ? ['#F6F6F6', '#F6F6F6']
              : ['white', 'white']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.tag}>
          <Text style={{color: 'black'}}>Buổi {class_lesson.lesson.order}</Text>
        </LinearGradient>
      </TouchableOpacity>
    ));
  };

  renderAttendanceItems = () => {
    return this.props.listStudentAttendanceData.map((attendance) => (
      <ListStudentAttendanceRegisterItem
        name={attendance.name}
        attendance_lesson_status={attendance.attendance_lesson_status}
        attendance_homework_status={attendance.attendance_homework_status}
      />
    ));
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.tabContainer}>{this.renderTabs()}</View>
          </ScrollView>
          {this.props.isLoading ? (
            <Loading size={width / 8} />
          ) : (
            <View>
              <View style={styles.listContainer}>
                <View style={styles.checkBoxContainer}>
                  <Text style={styles.title}>Có mặt</Text>
                </View>
                <View style={styles.checkBoxContainer}>
                  <Text style={styles.title}>Bài tập</Text>
                </View>
                <View style={styles.nameContainer}>
                  <Text style={styles.title}>Học viên</Text>
                </View>
              </View>
              {this.renderAttendanceItems()}
            </View>
          )}
        </ScrollView>
        {this.props.isLoading ? null : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <View style={styles.submitButton}>
                <FA5Icon
                  color={'white'}
                  name={'ios-checkmark-circle'}
                  size={18}
                />
                <Text style={styles.submitTitle}>Hoàn tất và quay lại</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingBottom: 60,
  },
  tag: {
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    paddingHorizontal: theme.mainHorizontal,
    flexDirection: 'row',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: theme.mainHorizontal,
    marginTop: 15,
  },
  checkBoxContainer: {
    width: width / 5,
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    color: 'black',
  },
  nameContainer: {
    width: (width / 3) * 5,
    flex: 1,
  },
  buttonContainer: {
    left: 0,
    right: 0,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  submitButton: {
    width: width - theme.mainHorizontal * 2,
    height: 50,
    backgroundColor: '#33CA40',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  submitTitle: {
    color: 'white',
    marginLeft: 10,
  },
};

export default ListStudentAttendanceRegisterComponent;
