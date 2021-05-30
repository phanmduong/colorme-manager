import React from 'react';
import {RefreshControl, ScrollView, TouchableOpacity} from 'react-native';
import {View, List, Text} from 'native-base';
import theme from '../styles';
import ListItemStudent from './listItem/ListItemStudent';
import Search from './common/Search';
import {convertVietText} from '../helper';
import ListItemClassLesson from './listItem/ListItemClassLesson';
import Loading from './common/Loading';
import EmptyMessage from './common/EmptyMessage';

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
            {...this.props}
            teachers={item.teachers}
            teaching_assistants={item.teaching_assistants}
            start_time={item.start_time}
            end_time={item.end_time}
            time={item.time}
            lesson={item.lesson}
            class_id={this.props.selectedClassId}
            openQrCode={this.props.openQrCode}
            class_lesson_time={item.class_lesson_time}
            classIndex={rowID}
            changeBegin={this.props.changeBegin}
            changeDate={this.props.changeDate}
            class_lesson_id={item.id}
            searchStaff={this.props.searchStaff}
            changeStaff={this.props.changeStaff}
            analytic_attendances={item.analytic_attendances}
            previewClassLessons={this.props.previewClassLessons}
            resetPreview={this.props.resetPreview}
          />
        );
      default:
        return null;
    }
  };

  emptyComponent = () => {
    if (this.props.isLoadingLessons || this.props.isLoading) {
      if (!(this.props.refreshingLessons || this.props.refreshing)) {
        return <Loading />;
      }
    } else {
      if (!(this.props.refreshingLessons || this.props.refreshing)) {
        return <EmptyMessage />;
      }
      return <View />;
    }
  };

  render() {
    return (
      <List
        style={styles.list}
        dataArray={this.data()}
        ListHeaderComponent={this.headerComponent}
        onEndReached={this.props.loadLessons}
        contentContainerStyle={{flexGrow: 1}}
        onEndReachedThreshold={0}
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={() => this.props.onRefresh()}
          />
        }
        renderRow={this.renderRow}
        ListEmptyComponent={this.emptyComponent}
      />
    );
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
