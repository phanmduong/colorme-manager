import React, {useState, useRef} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
import DatePicker from '../common/DatePicker';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import SubmitButton from '../common/SubmitButton';
import moment from 'moment';
import Input from '../common/Input';
import Loading from '../common/Loading';

function ChangeBeginModal(props) {
  const [selectedDate, setDate] = useState(null);
  const [note, setNote] = useState(null);

  const noteRef = useRef(null);

  const {
    isVisible,
    closeModal,
    changeBegin,
    classIndex,
    currentLessons,
    classId,
    previewClassLessons,
    previews,
    resetPreview,
  } = props;

  function submit() {
    const lessonIds = previews.map((preview) => preview.class_lesson_id);
    const payload = {
      class_id: classId,
      class_lesson_ids: lessonIds,
      note: note,
      start_time: selectedDate,
    };
    changeBegin(payload, () => closeModal());
  }

  function renderUpdatedDates() {
    const lessons = currentLessons.slice(classIndex);
    return previews.map((preview, index) => {
      return (
        <View style={styles.row}>
          <Text>
            <Text style={styles.bold}>{lessons[index]?.lesson.name}: </Text>
            {moment
              .unix(preview.old_time)
              .utcOffset('+0700')
              .format('DD/MM/YYYY')}{' '}
            →{' '}
            {moment.unix(preview.time).utcOffset('+0700').format('DD/MM/YYYY')}
          </Text>
        </View>
      );
    });
  }

  function getPreviews(time) {
    const lessons = currentLessons.slice(classIndex);
    const class_lesson_ids = lessons.map((lesson) => lesson.id);
    const payload = {
      class_id: classId,
      class_lesson_ids,
      start_time: time,
    };
    previewClassLessons(payload);
  }

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      avoidKeyboard={true}
      onBackButtonPress={() => {
        closeModal();
        resetPreview();
      }}
      onBackdropPress={() => {
        closeModal();
        resetPreview();
      }}>
      <View style={styles.modal}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Dời lịch học</Text>
          </View>
          <DatePicker
            title={'Ngày học mới'}
            onDateChange={(time) => {
              setDate(time);
              getPreviews(time);
            }}
            selectedDate={selectedDate}
            mode={'unix'}
          />
          <Input
            title={'Ghi chú'}
            placeholder={'Ghi chú'}
            value={note}
            onChangeText={setNote}
            onSubmitEditing={() => noteRef.current.blur()}
            refName={noteRef}
          />
          <View style={styles.row}>
            <Text style={styles.bold}>Danh sách các buổi thay đổi</Text>
          </View>
          {props.previewingClassLessons ? <Loading /> : renderUpdatedDates()}
          <SubmitButton
            title={'Xác nhận'}
            loading={props.changingClassLessons}
            containerStyle={styles.submit}
            onPress={submit}
          />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = {
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'white',
    height: 420,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: theme.mainHorizontal,
    paddingBottom: getBottomSpace(),
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  submit: {
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
};

export default ChangeBeginModal;
