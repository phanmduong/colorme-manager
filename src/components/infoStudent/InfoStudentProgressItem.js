import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import theme from '../../styles';
import {getShortName} from '../../helper';
import * as Progress from 'react-native-progress';
import InfoStudentProgressInfoModal from './InfoStudentProgressInfoModal';

function InfoStudentProgressItem({item}) {
  const [isInfoModalVisible, setVisible] = useState(false);

  function currentAttend(attendances) {
    return attendances.reduce((accumulator, currentValue) => {
      return (accumulator += currentValue.status.status === 1 ? 1 : 0);
    }, 0);
  }

  function currentHomework(topics) {
    return topics.reduce((accumulator, currentValue) => {
      return (accumulator += currentValue.isSubmitted ? 1 : 0);
    }, 0);
  }

  function currentBook(events) {
    return events.filter(
      (event) => event.event_type === 'book' && event.status === 'done',
    );
  }

  function currentWriting(events) {
    return events.filter(
      (event) => event.event_type === 'writing' && event.status === 'done',
    );
  }

  function currentComment(events) {
    return events.filter(
      (event) => event.event_type === 'comment' && event.status === 'done',
    );
  }

  function totalComment(events) {
    return events.filter((event) => event.event_type === 'comment');
  }

  function totalBook(events) {
    return events.filter((event) => event.event_type === 'book');
  }

  function totalWriting(events) {
    return events.filter((event) => event.event_type === 'writing');
  }

  function getPercentage(current, total) {
    if (total !== 0) {
      return current / total;
    }
    return 0;
  }

  function toggleModal() {
    setVisible(!isInfoModalVisible);
  }

  return (
    <View style={styles.listItemContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={{uri: item.icon_url}} style={styles.classAva} />
        <Text numberOfLines={1} style={styles.className}>
          {item.name}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.classAva} />
        <View style={styles.infoContainer}>
          <View style={styles.containerSubTitle}>
            {item.teach && (
              <View
                style={{
                  ...styles.card,
                  ...{
                    backgroundColor:
                      !item.teach.color || item.teach.color === ''
                        ? theme.processColor1
                        : '#' + item.teach.color,
                    marginRight: 5,
                  },
                }}>
                <Text style={styles.saler}>
                  {getShortName(item.teach.name)}
                </Text>
              </View>
            )}
            {item.assist && (
              <View
                style={{
                  ...styles.card,
                  ...{
                    backgroundColor:
                      !item.assist.color || item.assist.color === ''
                        ? theme.processColor1
                        : '#' + item.assist.color,
                    marginRight: 5,
                  },
                }}>
                <Text style={styles.saler}>
                  {getShortName(item.assist.name)}
                </Text>
              </View>
            )}
          </View>
          {item.study_time ? (
            <Text style={styles.classInfoContainer}>{item.study_time}</Text>
          ) : null}
          {item.room && item.base ? (
            <Text style={styles.classInfoContainer}>
              {item.room} - {item.base}
            </Text>
          ) : null}
          {item.description ? (
            <Text style={styles.classInfoContainer}>{item.description}</Text>
          ) : null}
          <TouchableOpacity onPress={toggleModal}>
            <View style={styles.progressContainer}>
              <Progress.Bar
                width={120}
                height={6}
                progress={getPercentage(
                  currentAttend(item.attendances),
                  item.attendances.length,
                )}
                color={'#32CA41'}
                unfilledColor={'#E0E0E0'}
                borderColor={'white'}
                borderRadius={10}
              />
              <Text style={styles.progressInfo}>
                {currentAttend(item.attendances)}/{item.attendances.length} điểm
                danh
              </Text>
            </View>
            <View style={styles.progressContainer}>
              <Progress.Bar
                width={120}
                height={6}
                progress={getPercentage(
                  currentHomework(item.topics),
                  item.topics.length,
                )}
                color={'#32CA41'}
                unfilledColor={'#E0E0E0'}
                borderColor={'white'}
                borderRadius={10}
              />
              <Text style={styles.progressInfo}>
                {currentHomework(item.topics)}/{item.topics.length} bài tập
              </Text>
            </View>
            <View style={styles.progressContainer}>
              <Progress.Bar
                width={120}
                height={6}
                progress={getPercentage(
                  currentBook(item.classLessonEvents).length,
                  totalBook(item.lesson_events).length,
                )}
                color={'#32CA41'}
                unfilledColor={'#E0E0E0'}
                borderColor={'white'}
                borderRadius={10}
              />
              <Text style={styles.progressInfo}>
                {currentBook(item.classLessonEvents).length}/
                {totalBook(item.lesson_events).length} bookworm
              </Text>
            </View>
            <View style={styles.progressContainer}>
              <Progress.Bar
                width={120}
                height={6}
                progress={getPercentage(
                  currentComment(item.classLessonEvents).length,
                  totalComment(item.lesson_events).length,
                )}
                color={'#32CA41'}
                unfilledColor={'#E0E0E0'}
                borderColor={'white'}
                borderRadius={10}
              />
              <Text style={styles.progressInfo}>
                {currentComment(item.classLessonEvents).length}/
                {totalComment(item.lesson_events).length} nhận xét
              </Text>
            </View>
            <View style={styles.progressContainer}>
              <Progress.Bar
                width={120}
                height={6}
                progress={getPercentage(
                  currentWriting(item.classLessonEvents).length,
                  totalWriting(item.lesson_events).length,
                )}
                color={'#32CA41'}
                unfilledColor={'#E0E0E0'}
                borderColor={'white'}
                borderRadius={10}
              />
              <Text style={styles.progressInfo}>
                {currentWriting(item.classLessonEvents).length}/
                {totalWriting(item.lesson_events).length} nhận xét
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <InfoStudentProgressInfoModal
        isVisible={isInfoModalVisible}
        closeModal={toggleModal}
        attendances={item.attendances}
        examGroups={item.group_exams}
        exams={item.exams}
        comments={totalComment(item.classLessonEvents)}
        writing={totalWriting(item.classLessonEvents)}
        bookworm={totalBook(item.classLessonEvents)}
      />
    </View>
  );
}

const styles = {
  listItemContainer: {
    marginHorizontal: theme.mainHorizontal,
    marginVertical: 10,
  },
  classAva: theme.mainAvatar,
  className: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  classInfoContainer: {
    paddingTop: 2,
    flex: 1,
    flexWrap: 'wrap',
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
  containerSubTitle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  progressInfo: {
    marginLeft: 5,
  },
};

export default InfoStudentProgressItem;
