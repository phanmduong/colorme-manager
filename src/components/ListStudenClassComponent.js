import React from 'react';
import {
  Dimensions,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Container, View, List, Text} from 'native-base';
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import ListItemStudent from './listItem/ListItemStudent';
import Search from './common/Search';
import {convertVietText} from '../helper';
import ListItemClassLesson from './listItem/ListItemClassLesson';

var {height, width} = Dimensions.get('window');
const heightSwiper = Platform.OS === 'ios' ? height - 170 : height - 125;
class ListStudenClassComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
      tabIdx: 0,
    };
  }

  headerComponent = () => {
    return (
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.containerTag}>
            <TouchableOpacity onPress={() => this.setState({tabIdx: 0})}>
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor:
                      this.state.tabIdx === 0 ? '#F6F6F6' : 'white',
                  },
                ]}>
                <Text style={styles.tabText}>
                  Học viên ({this.props.listStudentClass.length})
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({tabIdx: 1})}>
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor:
                      this.state.tabIdx === 1 ? '#F6F6F6' : 'white',
                  },
                ]}>
                <Text style={styles.tabText}>
                  Chương trình học ({this.props.lessons.length} buổi)
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {this.state.tabIdx === 0 && (
          <Search
            placeholder="Tìm kiếm (Email, tên, số điện thoại)"
            onChangeText={(search) => this.setState({search})}
            value={this.state.search}
            autoFocus={false}
          />
        )}
      </View>
    );
  };

  searchStudent = (stdLst) => {
    if (this.state.search === '') {
      return stdLst;
    } else {
      let searchStdLst = [];
      for (let student of stdLst) {
        if (
          convertVietText(student.name).includes(
            convertVietText(this.state.search),
          ) ||
          student.phone.includes(this.state.search) ||
          student.email.includes(this.state.search)
        ) {
          searchStdLst.push(student);
        }
      }
      return searchStdLst;
    }
  };

  data = () => {
    switch (this.state.tabIdx) {
      case 0:
        return this.searchStudent(this.props.listStudentClass);
      case 1:
        return this.props.lessons;
      default:
        return [];
    }
  };

  renderRow = (item, sectionID, rowID) => {
    switch (this.state.tabIdx) {
      case 0:
        return (
          <ListItemStudent
            {...this.props}
            name={item.name}
            avatar={item.avatar_url}
            phone={item.phone}
            email={item.email}
            status={item.status}
            money={item.money}
            saler={item.saler}
            campaign={item.campaign}
            classInfo={this.props.classInfo}
            studentId={item.id}
            next_code={this.props.classInfo.next_code}
            next_waiting_code={this.props.classInfo.next_waiting_code}
            registerId={item.register_id}
            changeCallStatus={this.props.changeCallStatus}
            token={this.props.token}
            errorChangeCallStatus={this.props.errorChangeCallStatus}
            errorSubmitMoney={this.props.errorSubmitMoney}
            submitMoney={this.props.submitMoney}
            setStudentId={this.props.setStudentId}
            register_status={item.register_status}
            source={item.source}
            attendances={item.attendances}
          />
        );
      case 1:
        return (
          <ListItemClassLesson
            avatar_url={this.props.classInfo.icon_url}
            name={item.name}
            teacher={item.teacher}
            teacher_assistant={item.teacher_assistant}
            start_time={item.start_time}
            end_time={item.end_time}
            time={item.time}
            lesson={item.lesson}
            registers={this.props.listStudentClass}
            total_attendance={item.total_attendance}
            class_id={item.class_id}
            openQrCode={this.props.openQrCode}
            address={
              this.props.classInfo.room.name +
              ' - ' +
              this.props.classInfo.base.address
            }
            study_time={this.props.classInfo.study_time}
            class_lesson_time={item.class_lesson_time}
            lessons={this.props.lessons}
            classIndex={rowID}
            changeBegin={this.props.changeBegin}
            changeDate={this.props.changeDate}
            errorChangeClassLessons={this.props.errorChangeClassLessons}
            errorChangeClassLesson={this.props.errorChangeClassLesson}
            class_lesson_id={item.class_lesson_id}
          />
        );
      default:
        return null;
    }
  };

  render() {
    if (this.props.isLoading || this.props.isLoadingLessons) {
      return (
        <Container>
          <View style={styles.container}>
            <Spinkit
              isVisible
              color={theme.mainColor}
              type="Wave"
              size={width / 8}
            />
          </View>
        </Container>
      );
    } else {
      return (
        <List
          style={styles.list}
          dataArray={this.data()}
          ListHeaderComponent={this.headerComponent}
          refreshControl={
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={() => this.props.onRefresh()}
            />
          }
          renderRow={this.renderRow}
        />
      );
    }
  }
}

const styles = {
  list: {
    marginTop: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: '#d9534f',
    textAlign: 'center',
  },
  wrapper: {},
  dotStyle: {
    opacity: 0.4,
    width: 5,
    height: 5,
  },
  titleList: {
    paddingTop: 10,
    width: width,
    textAlign: 'center',
    color: theme.colorTitle,
    fontWeight: '900',
  },
  slide: {
    height: heightSwiper,
  },
  tag: {
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: 'black',
  },
  containerTag: {
    flexDirection: 'row',
    paddingHorizontal: theme.mainHorizontal,
  },
};

export default ListStudenClassComponent;
