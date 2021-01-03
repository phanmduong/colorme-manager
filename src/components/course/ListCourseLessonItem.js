import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import theme from '../../styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {isEmptyInput} from '../../helper';

function ListCourseLessonItem({
  avatar_url,
  name,
  term_id,
  terms,
  description,
  events,
  changeLessonEvent,
  id,
  deleteLesson,
  duplicateLesson,
  navigation,
  lesson,
  course_id,
  detail_teacher,
}) {
  const [isBook, setBook] = useState(false);
  const [isComment, setComment] = useState(false);
  const [isWriting, setWriting] = useState(false);

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
    if (bookIdx > -1) {
      setBook(true);
    } else {
      setBook(false);
    }
    if (commentIdx > -1) {
      setComment(true);
    } else {
      setComment(false);
    }
    if (writingIdx > -1) {
      setWriting(true);
    } else {
      setWriting(false);
    }
  }

  function getTerm() {
    if (term_id) {
      for (const term of terms) {
        if (term_id === term.id) {
          return term.name;
        }
      }
    }
    return null;
  }

  function onDuplicate() {
    Alert.alert('Thông báo', 'Bạn có muốn nhân bản không?', [
      {
        text: 'Hủy bỏ',
        style: 'cancel',
      },
      {
        text: 'Nhân bản',
        onPress: () => duplicateLesson(id),
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
        onPress: () => deleteLesson(id),
        style: 'destructive',
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{uri: avatar_url}} style={styles.ava} />
        <View style={styles.infoContainer}>
          <Text style={[styles.title, {flexWrap: 'wrap'}]}>{name.trim()}</Text>
          <View style={styles.row}>
            {term_id && (
              <View
                style={{
                  ...styles.card,
                  ...{
                    backgroundColor: '#32CA41',
                  },
                }}>
                <Text style={styles.saler}>{getTerm()}</Text>
              </View>
            )}
          </View>
          <View style={styles.switchContainer}>
            <TouchableOpacity
              onPress={() => {
                changeLessonEvent(id, 'book');
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
                changeLessonEvent(id, 'comment');
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
                changeLessonEvent(id, 'writing');
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
          {!isEmptyInput(description) && (
            <Text style={styles.info}>{description}</Text>
          )}
          {!isEmptyInput(detail_teacher) && (
            <Text
              style={styles.hyperLink}
              onPress={() => Linking.openURL(detail_teacher)}>
              {detail_teacher}
            </Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddCourseLesson', {
                  lesson: lesson,
                  editMode: true,
                  courseId: course_id,
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
    </View>
  );
}

const styles = {
  container: {
    paddingVertical: theme.mainHorizontal,
    paddingHorizontal: theme.mainHorizontal,
  },
  ava: theme.mainAvatar,
  row: {
    flexDirection: 'row',
  },
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

export default ListCourseLessonItem;
