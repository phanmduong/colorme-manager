import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text, FlatList} from 'react-native';
import Search from './common/Search';
import theme from '../styles';
import {convertVietText} from '../helper';
import ListCourseLessonItem from './course/ListCourseLessonItem';
import AddItemButton from './common/AddItemButton';
import Loading from './common/Loading';

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
        return (filterLessons = props.courseDetails.lessons.filter((lesson) =>
          convertVietText(lesson.name).includes(convertVietText(search)),
        ));
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
        </View>
      </View>
    );
  }

  function renderLessons({item}) {
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
  }

  function getData() {
    if (tabIdx === 0) {
      return props.courseDetails && filterLessons();
    } else {
      return [];
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
