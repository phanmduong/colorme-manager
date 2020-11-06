import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import InfoStudentProgressAttendance from './InfoStudentProgressAttendance';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import InfoStudentProgressExam from './InfoStudentProgressExam';
import InfoStudentProgressEvent from './InfoStudentProgressEvent';

const InfoStudentProgressInfoModal = ({
  isVisible,
  closeModal,
  attendances,
  examGroups,
  exams,
  comments,
  writing,
  bookworm,
}) => {
  const [tabIdx, setIdx] = useState(0);

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <View style={styles.containerTag}>
              <TouchableOpacity onPress={() => setIdx(0)}>
                <View
                  style={[
                    styles.tag,
                    {
                      backgroundColor: tabIdx === 0 ? '#F6F6F6' : 'white',
                    },
                  ]}>
                  <Text style={{color: 'black'}}>Điểm danh</Text>
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
                  <Text style={{color: 'black'}}>Nhận xét</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIdx(3)}>
                <View
                  style={[
                    styles.tag,
                    {
                      backgroundColor: tabIdx === 3 ? '#F6F6F6' : 'white',
                    },
                  ]}>
                  <Text style={{color: 'black'}}>Bài viết</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIdx(4)}>
                <View
                  style={[
                    styles.tag,
                    {
                      backgroundColor: tabIdx === 4 ? '#F6F6F6' : 'white',
                    },
                  ]}>
                  <Text style={{color: 'black'}}>Bookworm</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {tabIdx === 0 && (
            <InfoStudentProgressAttendance attendances={attendances} />
          )}

          {tabIdx === 1 && (
            <InfoStudentProgressExam examGroups={examGroups} exams={exams} />
          )}

          {tabIdx === 2 && <InfoStudentProgressEvent events={comments} />}

          {tabIdx === 3 && <InfoStudentProgressEvent events={writing} />}

          {tabIdx === 4 && <InfoStudentProgressEvent events={bookworm} />}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = {
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    height: 600,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingBottom: getBottomSpace(),
  },
  containerTag: {
    marginTop: 15,
    flexDirection: 'row',
    paddingHorizontal: theme.mainHorizontal,
  },
  tag: {
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default InfoStudentProgressInfoModal;
