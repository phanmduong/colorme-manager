import React, {useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity, Alert} from 'react-native';
import theme from '../../styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation';

function ListCourseLessonItem(props) {
  const [isBook, setBook] = useState(false);
  const [isComment, setComment] = useState(false);
  const [isWriting, setWriting] = useState(false);
  const [bookId, setBookId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [writingId, setWritingId] = useState(null);

  const {avatar_url, name, events, id, lesson, course_id, store} = props;

  useEffect(() => {
    activateEvents();
  }, [events]);

  function activateEvents() {
    const bookIdx = events.findIndex((event) => event.event_type === 'book');
    const commentIdx = events.findIndex(
      (event) => event.event_type === 'comment',
    );
    const writingIdx = events.findIndex(
      (event) => event.event_type === 'writing',
    );
    setBook(bookIdx > -1);
    setBookId(bookIdx > -1 && events[bookIdx].id);
    setComment(commentIdx > -1);
    setCommentId(commentIdx > -1 && events[commentIdx].id);
    setWriting(writingIdx > -1);
    setWritingId(writingIdx > -1 && events[writingIdx].id);
  }

  function onDuplicate() {
    Alert.alert('Thông báo', 'Bạn có muốn nhân bản không?', [
      {
        text: 'Hủy bỏ',
        style: 'cancel',
      },
      {
        text: 'Nhân bản',
        onPress: () => props.duplicateLesson(id),
      },
    ]);
  }

  function onDelete() {
    Alert.alert('Thông báo', 'Bạn có muốn xóa không?', [
      {
        text: 'Hủy bỏ',
        style: 'cancel',
      },
      {
        text: 'Xóa bỏ',
        onPress: () => props.deleteLesson(id),
        style: 'destructive',
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={[styles.title, {flexWrap: 'wrap'}]}>{name.trim()}</Text>
        <View style={styles.switchContainer}>
          <TouchableOpacity
            onPress={() => {
              if (!isBook) {
                props.addLessonEvent(id, 'book');
              } else {
                props.deleteLessonEvent(id, bookId);
              }
            }}>
            <View
              style={[
                styles.switch,
                {backgroundColor: isBook ? '#61a1f0' : '#F6F6F6'},
              ]}>
              <FontAwesome5
                name={'book'}
                size={20}
                color={isBook ? 'white' : '#cacaca'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!isComment) {
                props.addLessonEvent(id, 'comment');
              } else {
                props.deleteLessonEvent(id, commentId);
              }
            }}>
            <View
              style={[
                styles.switch,
                {backgroundColor: isComment ? '#32ca41' : '#F6F6F6'},
              ]}>
              <FontAwesome
                name={'comment'}
                size={20}
                color={isComment ? 'white' : '#cacaca'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!isWriting) {
                props.addLessonEvent(id, 'writing');
              } else {
                props.deleteLessonEvent(id, writingId);
              }
            }}>
            <View
              style={[
                styles.switch,
                {backgroundColor: isWriting ? '#fdc403' : '#F6F6F6'},
              ]}>
              <Entypo
                name={'edit'}
                size={20}
                color={isWriting ? 'white' : '#cacaca'}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('AddCourseLesson', {
                lesson: lesson,
                editMode: true,
                courseId: course_id,
                store: store,
              })
            }>
            <View style={[styles.button, {marginRight: 10}]}>
              <Text style={{fontSize: 16}}>Sửa</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDuplicate}>
            <View style={[{marginRight: 10}, styles.button]}>
              <Text style={{fontSize: 16}}>Nhân bản</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <View style={[{marginRight: 10}, styles.button]}>
              <Text style={{fontSize: 16}}>Xóa</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = {
  container: {
    paddingVertical: theme.mainHorizontal,
    paddingHorizontal: theme.mainHorizontal,
  },
  ava: theme.mainAvatar,
  title: theme.title,
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  card: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saler: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  switch: {
    backgroundColor: '#F6F6F6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  info: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 18,
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
  },
  hyperLink: {
    paddingTop: 5,
    color: '#2980b9',
  },
};

export default withNavigation(ListCourseLessonItem);
