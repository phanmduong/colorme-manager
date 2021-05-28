import React from 'react';
import {RefreshControl, ScrollView, TouchableOpacity} from 'react-native';
import {View, List, Text} from 'native-base';
import theme from '../styles';
import ListItemStudent from './listItem/ListItemStudent';
import Search from './common/Search';
import {convertVietText} from '../helper';
import ListItemClassLesson from './listItem/ListItemClassLesson';
import Loading from './common/Loading';

class ListStudentClassComponent extends React.Component {
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

  searchStudent = (registers) => {
    if (this.state.search === '') {
      return registers;
    } else {
      let searchStdLst = [];
      for (let register of registers) {
        if (
          convertVietText(register.user.name).includes(
            convertVietText(this.state.search),
          ) ||
          register.user.phone.includes(this.state.search) ||
          register.user.email.includes(this.state.search)
        ) {
          searchStdLst.push(register);
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
            money={item.money}
            user={item.user}
            classInfo={item.class}
            registerId={item.id}
            changeCallStatus={this.props.changeCallStatus}
            errorChangeCallStatus={this.props.errorChangeCallStatus}
            errorSubmitMoney={this.props.errorSubmitMoney}
            submitMoney={this.props.submitMoney}
            setStudentId={this.props.setStudentId}
            attendances={item.attendances}
            code={item.code}
            receivedBook={item.received_book_at}
            paidTime={item.paid_time}
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
              this.props.classInfo?.room?.name &&
              this.props.classInfo?.base?.address &&
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
            searchStaff={this.props.searchStaff}
            staff={this.props.staff}
            changeStaff={this.props.changeStaff}
            errorChangeClassTeach={this.props.errorChangeClassTeach}
            errorChangeClassAssist={this.props.errorChangeClassAssist}
          />
        );
      default:
        return null;
    }
  };

  render() {
    if (this.props.isLoading || this.props.isLoadingLessons) {
      return <Loading />;
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

export default ListStudentClassComponent;
