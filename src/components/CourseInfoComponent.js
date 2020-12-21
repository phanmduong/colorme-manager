import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text, FlatList} from 'react-native';
import Search from './common/Search';
import theme from '../styles';
import {convertVietText} from '../helper';
import ListCourseLessonItem from './course/ListCourseLessonItem';
import AddItemButton from './common/AddItemButton';
import Loading from './common/Loading';
import ListCourseExamGroupItem from './course/ListCourseExamGroupItem';
import ListCourseLinkItem from './course/ListCourseLinkItem';

function CourseInfoComponent(props) {
  const [tabIdx, setIdx] = useState(0);
  const [search, setSearch] = useState('');

  function filterLessons() {
    if (search === '') {
      if (tabIdx === 0) {
        return props.courseDetails.lessons;
      }
    } else {
      if (tabIdx === 0) {
        return props.courseDetails.lessons.filter((lesson) =>
          convertVietText(lesson.name).includes(convertVietText(search)),
        );
      }
    }
  }

  function filterExams() {
    if (search === '') {
      if (tabIdx === 1) {
        return [
          ...props.courseDetails.group_exams,
          ...[{id: null, name: 'Không có nhóm'}],
        ];
      }
    } else {
      if (tabIdx === 1) {
        const group_exams = props.courseDetails.group_exams.filter(
          (group_exam) =>
            convertVietText(group_exam.name).includes(convertVietText(search)),
        );
        return [...group_exams, ...[{id: null, name: 'Không có nhóm'}]];
      }
    }
  }

  function headerComponent() {
    return (
      <View>
        <Search placeholder={'Tìm kiếm'} onChangeText={setSearch} />
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
      </View>
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
          events={item.events}
          changeLessonEvent={props.changeLessonEvent}
          id={item.id}
          deleteLesson={props.deleteLesson}
          duplicateLesson={props.duplicateLesson}
          navigation={props.navigation}
          course_id={item.course_id}
          lesson={item}
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
      return props.courseDetails && filterLessons();
    } else if (tabIdx === 1) {
      return props.courseDetails && filterExams();
    } else if (tabIdx === 2) {
      return props.courseDetails && props.courseDetails.links;
    }
  }

  return (
    <FlatList
      data={getData()}
      renderItem={renderLessons}
      ListHeaderComponent={headerComponent()}
      contentContainerStyle={{flexGrow: 1}}
      onRefresh={props.onRefresh}
      refreshing={props.refreshingCourseDetails}
      ListEmptyComponent={
        props.loadingCourseDetails &&
        !props.refreshingCourseDetails && <Loading />
      }
    />
  );
}

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
  children: {
    paddingHorizontal: theme.mainHorizontal,
  },
  btnContainer: {
    marginTop: 10,
    paddingHorizontal: theme.mainHorizontal,
  },
};

export default CourseInfoComponent;
