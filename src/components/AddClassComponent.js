import React, {useState, useRef} from 'react';
import {ScrollView, Platform, KeyboardAvoidingView, Alert} from 'react-native';
import theme from '../styles';
import SubmitButton from './common/SubmitButton';
import AddItemButton from './common/AddItemButton';
import Loading from './common/Loading';
import InputPicker from './common/InputPicker';
import Input from './common/Input';
import {CLASS_STATUS_FILTER_NEW} from '../constants/constant';
import DatePicker from './common/DatePicker';
import moment from 'moment';
import Expand from './common/Expand';

function AddClassComponent(props) {
  const [courseId, setCourse] = useState(null);
  const [name, setName] = useState(null);
  const [roomId, setRoom] = useState(null);
  const [target, setTarget] = useState(null);
  const [regisTarget, setRegisTarget] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [type, setType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [gen, setGen] = useState(null);
  const [enrollStart, setEnrollStart] = useState(null);
  const [enrollEnd, setEnrollEnd] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [assist, setAssist] = useState(null);

  const [expanded, setExpanded] = useState(null);

  const [description, setDescription] = useState(null);
  const [link, setLink] = useState(null);

  const nameRef = useRef(null);
  const linkRef = useRef(null);

  function toggleExpand() {
    setExpanded(!expanded);
  }

  function submit() {
    if (name && target && regisTarget) {
      let classData = {
        course_id: courseId,
        datestart: startDate,
        description: description,
        enroll_end_date: enrollEnd,
        enroll_start_date: enrollStart,
        link_drive: link,
        name: name,
        regis_target: regisTarget,
        room_id: roomId,
        schedule_id: schedule ? schedule.id : null,
        study_time: schedule ? schedule.name : null,
        target: target,
        teacher_ids: teacher ? [teacher] : [],
        teaching_assistant_ids: assist ? [assist] : [],
        type: type,
      };
      props.addClass(classData);
    } else {
      Alert.alert('Thông báo', 'Bạn cần nhập đủ thông tin');
    }
  }

  if (props.isLoadingCourses || props.isLoadingGen || props.isLoadingRooms) {
    return <Loading />;
  } else {
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        keyboardVerticalOffset={100}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <InputPicker
            title={'Môn học/Chương trình học'}
            onChangeValue={setCourse}
            selectedId={courseId}
            header={'Chọn môn học'}
            options={props.courses}
          />
          <Input
            title={'Tên lớp học'}
            value={name}
            placeholder={'Nhập tên lớp học'}
            onChangeText={setName}
            required
            refName={nameRef}
            onSubmitEditing={() => nameRef.current.blur()}
          />
          <InputPicker
            title={'Phòng học'}
            options={props.rooms}
            header={'Chọn phòng học'}
            selectedId={roomId}
            onChangeValue={setRoom}
            getLabel={(item) =>
              (item.base?.name
                ? item.base.name + ': ' + item.base.address + ' - '
                : '') + item.name
            }
          />
          <Input
            title={'Số học viên tối đa'}
            placeholder={'Nhập số học viên tối đa'}
            onChangeText={setTarget}
            value={target}
            required
            keyboardType={'number-pad'}
          />
          <Input
            title={'Số đăng kí tối đa'}
            placeholder={'Nhập số đăng kí tối đa'}
            value={regisTarget}
            onChangeText={setRegisTarget}
            keyboardType={'number-pad'}
            required
          />
          <InputPicker
            title={'Lịch học'}
            header={'Chọn lịch học'}
            onChangeValue={(id) => {
              const foundSchedule = props.schedules.find(
                (item) => item.id === id,
              );
              if (foundSchedule) {
                setSchedule(foundSchedule);
              }
            }}
            selectedId={schedule?.id}
            options={props.schedules}
            isApiSearch
            onApiSearch={props.searchSchedules}
          />
          <AddItemButton
            title={'Thêm lịch học'}
            onPress={() => props.navigation.navigate('AddClassSchedule')}
            containerStyle={styles.addButton}
          />
          <InputPicker
            title={'Thể loại lớp'}
            header={'Chọn thể loại lớp'}
            options={CLASS_STATUS_FILTER_NEW}
            selectedId={type}
            onChangeValue={setType}
          />
          <DatePicker
            title={'Ngày khai giảng'}
            mode={'unix'}
            selectedDate={startDate}
            onDateChange={setStartDate}
          />
          <InputPicker
            title={'Giai đoạn tuyển sinh'}
            options={props.genData}
            selectedId={gen}
            onChangeValue={(id) => {
              const foundGen = props.genData.find((item) => item.id === id);
              if (foundGen) {
                setGen(id);
                setEnrollStart(moment(foundGen.start_time).utc('+0700').unix());
                setEnrollEnd(moment(foundGen.end_time).utc('+0700').unix());
              }
            }}
            header={'Chọn giai đoạn tuyển sinh'}
          />
          <DatePicker
            title={'Thời gian bắt đầu tuyển sinh'}
            mode={'unix'}
            onDateChange={setEnrollStart}
            selectedDate={enrollStart}
          />
          <DatePicker
            title={'Thời gian kết thúc tuyển sinh'}
            mode={'unix'}
            onDateChange={setEnrollEnd}
            selectedDate={enrollEnd}
          />
          <InputPicker
            title={'Giảng viên'}
            onChangeValue={setTeacher}
            selectedId={teacher}
            options={props.staff}
            header={'Chọn giảng viên'}
            onApiSearch={props.searchStaff}
            isApiSearch
          />
          <InputPicker
            title={'Trợ giảng'}
            onChangeValue={setAssist}
            header={'Chọn trợ giảng'}
            options={props.staff}
            selectedId={assist}
            isApiSearch
            onApiSearch={props.searchStaff}
          />
          <Expand toggleExpand={toggleExpand} isExpanded={expanded} />
          {expanded && (
            <>
              <Input
                title={'Mô tả'}
                value={description}
                onChangeText={setDescription}
                placeholder={'Nhập mô tả'}
                onSubmitEditing={() => linkRef.current.focus()}
              />
              <Input
                title={'URL Drive'}
                value={link}
                onChangeText={setLink}
                placeholder={'Nhập URL Drive'}
                refName={linkRef}
                onSubmitEditing={() => linkRef.current.blur()}
              />
            </>
          )}
          <SubmitButton
            title={'Lưu'}
            onPress={submit}
            loading={props.isUpdatingClass}
            containerStyle={styles.btnSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  container: {
    paddingHorizontal: theme.mainHorizontal,
    marginBottom: 10,
    flex: 1,
  },
  btnSubmit: {
    marginTop: 40,
  },
  addButton: {
    marginTop: 30,
  },
};

export default AddClassComponent;
