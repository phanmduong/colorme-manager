import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text, FlatList} from 'react-native';
import theme from '../styles';
import ListCourseLessonItem from './course/ListCourseLessonItem';
import AddItemButton from './common/AddItemButton';
import Loading from './common/Loading';
import ListCourseExamGroupItem from './course/ListCourseExamGroupItem';
import ListCourseLinkItem from './course/ListCourseLinkItem';
import {observer} from 'mobx-react';
import EmptyMessage from './common/EmptyMessage';

const CourseInfoComponent = observer((props) => {
  const [tabIdx, setIdx] = useState(0);

  const {lessons, isLoadingLessons, refreshingLessons} = props.store;

  function headerComponent() {
    return (
      <>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.containerTag}>
            <TouchableOpacity onPress={() => setIdx(0)}>
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: tabIdx === 0 ? '#F6F6F6' : 'white',
                  },
                ]}>
                <Text style={{color: 'black'}}>Chương trình học</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIdx(1)}>
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: tabIdx === 1 ? '#F6F6F6' : 'white',
                  },
                ]}>
                <Text style={{color: 'black'}}>Bài kiểm tra</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIdx(2)}>
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: tabIdx === 2 ? '#F6F6F6' : 'white',
                  },
                ]}>
                <Text style={{color: 'black'}}>Tài liệu</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.btnContainer}>
          {tabIdx === 0 && (
            <AddItemButton
              title={'Thêm buổi học'}
              containerStyle={styles.btn}
              onPress={() =>
                props.navigation.navigate('AddCourseLesson', {
                  courseId: props.courseId,
                })
              }
            />
          )}
          {tabIdx === 1 && (
            <AddItemButton
              title={'Thêm bài kiểm tra'}
              containerStyle={styles.btn}
              onPress={() =>
                props.navigation.navigate('AddCourseExam', {
                  courseId: props.courseId,
                })
              }
            />
          )}
          {tabIdx === 2 && (
            <AddItemButton
              title={'Thêm tài liệu'}
              containerStyle={styles.btn}
              onPress={() =>
                props.navigation.navigate('AddCourseLink', {
                  courseId: props.courseId,
                })
              }
            />
          )}
        </View>
      </>
    );
  }

  function renderLessons({item}) {
    if (tabIdx === 0) {
      return (
        <ListCourseLessonItem
          key={item.id}
          avatar_url={item.image_url}
          name={item.name}
          term_id={item.term_id}
          terms={props.courseDetails && props.courseDetails.terms}
          description={item.description}
          events={item.lesson_events}
          changeLessonEvent={props.changeLessonEvent}
          id={item.id}
          deleteLesson={props.deleteLesson}
          duplicateLesson={props.duplicateLesson}
          navigation={props.navigation}
          course_id={item.course_id}
          lesson={item}
          detail_teacher={item.detail_teacher}
        />
      );
    } else if (tabIdx === 1) {
      return (
        <ListCourseExamGroupItem
          key={item.id}
          name={item.name}
          exam_templates={
            props.courseDetails && props.courseDetails.exam_templates
          }
          lessons={props.courseDetails && props.courseDetails.lessons}
          avatar_url={props.courseDetails && props.courseDetails.icon_url}
          id={item.id}
        />
      );
    } else if (tabIdx === 2) {
      return (
        <ListCourseLinkItem
          key={item.id}
          name={item.link_name}
          avatar_url={props.courseDetails && props.courseDetails.icon_url}
          description={item.link_description}
          link={item.link_url}
          id={item.id}
          deleteLink={props.deleteLink}
        />
      );
    }
  }

  function getData() {
    if (tabIdx === 0) {
      return lessons;
    } else if (tabIdx === 1) {
      return [];
    } else if (tabIdx === 2) {
      return [];
    }
  }

  function loadMore() {
    if (tabIdx === 0) {
      props.loadLessons();
    }
  }

  function onRefresh() {
    switch (tabIdx) {
      case 0:
        props.refreshLessons();
        break;
      default:
        break;
    }
  }

  return (
    <FlatList
      data={getData()}
      renderItem={renderLessons}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={headerComponent()}
      contentContainerStyle={{flexGrow: 1}}
      onRefresh={onRefresh}
      refreshing={refreshingLessons}
      ListEmptyComponent={
        isLoadingLessons
          ? !refreshingLessons && <Loading />
          : !refreshingLessons && <EmptyMessage />
      }
      onEndReached={loadMore}
    />
  );
});

const styles = {
  tag: {
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTag: {
    flexDirection: 'row',
    paddingHorizontal: theme.mainHorizontal,
  },
  btnContainer: {
    marginTop: 10,
    paddingHorizontal: theme.mainHorizontal,
  },
};

export default CourseInfoComponent;
