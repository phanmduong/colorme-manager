import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import theme from '../styles';
import Input from './common/Input';
import InputPicker from './common/InputPicker';
import {GENDER} from '../constants/constant';
import Expand from './common/Expand';
import DatePicker from './common/DatePicker';
import SubmitButton from './common/SubmitButton';
import Loading from './common/Loading';

function SaveRegisterComponent(props) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [fatherName, setFatherName] = useState(null);
  const [motherName, setMotherName] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [baseId, setBaseId] = useState(null);
  const [classId, setClassId] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [sourceId, setSourceId] = useState(null);
  const [campaignId, setCampaignId] = useState(null);
  const [salerId, setSalerId] = useState(null);
  const [couponId, setCouponId] = useState(null);

  const [expanded, setExpanded] = useState(false);

  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(null);
  const [university, setUniversity] = useState(null);
  const [work, setWork] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [knowHow, setKnowHow] = useState(null);
  const [facebook, setFacebook] = useState(null);
  const [note, setNote] = useState(null);

  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const motherRef = useRef(null);
  const workRef = useRef(null);
  const identityRef = useRef(null);
  const nationRef = useRef(null);
  const knowRef = useRef(null);
  const facebookRef = useRef(null);
  const noteRef = useRef(null);

  useEffect(() => {
    // Add a student to a class
    const classData = props.navigation.getParam('classData');
    if (classData?.id) {
      setClassId(classData.id);
    }
    if (classData?.base) {
      setBaseId(classData.base.id);
    }
    if (classData?.course) {
      setCourseId(classData.course.id);
    }

    // Add a register for an existing student
    const name = props.navigation.getParam('name');
    const phone = props.navigation.getParam('phone');
    const email = props.navigation.getParam('email');
    if (name) {
      setName(name);
    }
    if (phone) {
      setPhone(phone);
    }
    if (email) {
      setEmail(email);
    }
  }, []);

  function onSubmit() {
    const registerValue = {
      name: name,
      phone: phone,
      email: email,
      class_id: classId,
      dob: dob,
      facebook: facebook,
      gender: gender,
      how_know: knowHow,
      university: university,
      work: work,
      campaign_id: campaignId,
      father_name: fatherName,
      saler_id: salerId,
      status_id: statusId,
      source_id: sourceId,
      coupon_ids: couponId ? [couponId] : [],
      identity_code: identity,
      mother_name: motherName,
      nationality: nationality,
    };
    if (name && email && phone && classId) {
      props.register(registerValue);
    } else {
      Alert.alert('Thông báo', 'Bạn cần nhập đủ thông tin');
    }
  }

  return props.isLoadingCourses ||
    props.isLoadingBases ||
    props.isLoadingCampaigns ||
    props.isLoadingSources ||
    props.isLoadingStatuses ||
    props.isLoadingSalers ||
    props.isLoadingCoupons ||
    props.isLoadingClasses ? (
    <Loading />
  ) : (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled
      keyboardVerticalOffset={100}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            title={'Tên học viên'}
            value={name}
            onChangeText={setName}
            placeholder={'Nhập họ và tên'}
            onSubmitEditing={() => emailRef.current.focus()}
            required
          />
          <Input
            title={'Email'}
            value={email}
            onChangeText={setEmail}
            placeholder={'Nhập email'}
            refName={emailRef}
            onSubmitEditing={() => phoneRef.current.focus()}
            required
          />
          <Input
            title={'Số điện thoại'}
            value={phone}
            onChangeText={setPhone}
            placeholder={'Nhập số điện thoại'}
            keyboardType={'number-pad'}
            refName={phoneRef}
            required
          />
          <Input
            title={'Phụ huynh 1'}
            value={fatherName}
            onChangeText={setFatherName}
            placeholder={'Nhập tên phụ huynh 1'}
            onSubmitEditing={() => motherRef.current.focus()}
          />
          <Input
            title={'Phụ huynh 2'}
            value={motherName}
            onChangeText={setMotherName}
            placeholder={'Nhập tên phụ huynh 2'}
            refName={motherRef}
          />
          <InputPicker
            title={'Môn học/Chương trình học'}
            onChangeValue={(newCourseId) => {
              setCourseId(newCourseId);
              props.loadClasses(newCourseId, baseId, '', false);
            }}
            placeholder={'Lựa chọn'}
            options={props.courses}
            selectedId={courseId}
            header={'Chọn môn học'}
            isAllOptionAvailable={false}
          />
          <InputPicker
            title={'Cơ sở'}
            onChangeValue={(newBaseId) => {
              setBaseId(newBaseId);
              props.loadClasses(courseId, newBaseId, '', false);
            }}
            options={props.baseData}
            selectedId={baseId}
            header={'Chọn cơ sở'}
            isAllOptionAvailable={false}
          />
          <InputPicker
            title={'Lớp học'}
            onChangeValue={setClassId}
            selectedId={classId}
            header={'Chọn lớp học'}
            options={props.classes}
            isAllOptionAvailable={false}
            isApiSearch={true}
            onApiSearch={(search) =>
              props.loadClasses(courseId, baseId, search, false)
            }
            required
          />
          <InputPicker
            title={'Trạng thái'}
            onChangeValue={setStatusId}
            options={props.statuses}
            isAllOptionAvailable={false}
            header={'Chọn trạng thái'}
            selectedId={statusId}
          />
          <InputPicker
            title={'Nguồn'}
            onChangeValue={setSourceId}
            selectedId={sourceId}
            options={props.sources}
            header={'Chọn nguồn'}
            isAllOptionAvailable={false}
          />
          <InputPicker
            title={'Chiến dịch'}
            onChangeValue={setCampaignId}
            header={'Chọn chiến dịch'}
            options={props.campaigns}
            selectedId={campaignId}
            isAllOptionAvailable={false}
          />
          <InputPicker
            title={'Saler'}
            selectedId={salerId}
            options={props.salers}
            header={'Chọn saler'}
            onChangeValue={setSalerId}
            isAllOptionAvailable={false}
          />
          <InputPicker
            title={'Mã ưu đãi'}
            selectedId={couponId}
            onChangeValue={setCouponId}
            isAllOptionAvailable={false}
            header={'Chọn mã ưu đãi'}
            options={props.coupons}
          />

          <Expand
            toggleExpand={() => setExpanded(!expanded)}
            isExpanded={expanded}
          />

          {expanded && (
            <>
              <InputPicker
                title={'Giới tính'}
                header={'Chọn giới tính'}
                isAllOptionAvailable={false}
                onChangeValue={setGender}
                selectedId={gender}
                options={GENDER}
              />
              <DatePicker
                title={'Ngày sinh'}
                onDateChange={setDob}
                selectedDate={dob}
                mode={'unix'}
              />
              <Input
                title={'Trường học'}
                placeholder={'Nhập trường học'}
                onChangeText={setUniversity}
                value={university}
                onSubmitEditing={() => workRef.current.focus()}
              />
              <Input
                title={'Công việc'}
                placeholder={'Nhập công việc'}
                value={work}
                onChangeText={setWork}
                refName={workRef}
                onSubmitEditing={() => identityRef.current.focus()}
              />
              <Input
                title={'CMND'}
                value={identity}
                onChangeText={setIdentity}
                placeholder={'Nhập CMND'}
                refName={identityRef}
                onSubmitEditing={() => nationRef.current.focus()}
              />
              <Input
                title={'Quốc tịch'}
                value={nationality}
                onChangeText={setNationality}
                placeholder={'Nhập quốc tịch'}
                refName={nationRef}
                onSubmitEditing={() => knowRef.current.focus()}
              />
              <Input
                title={'Lý do biết đến'}
                value={knowHow}
                onChangeText={setKnowHow}
                placeholder={'Nhập lý do biết đến'}
                refName={knowRef}
                onSubmitEditing={() => facebookRef.current.focus()}
              />
              <Input
                title={'Facebook URL'}
                value={facebook}
                onChangeText={setFacebook}
                placeholder={'Nhập Facebook URL'}
                refName={facebookRef}
                onSubmitEditing={() => noteRef.current.focus()}
              />
              <Input
                title={'Ghi chú'}
                value={note}
                onChangeText={setNote}
                placeholder={'Nhập ghi chú'}
                refName={noteRef}
                onSubmitEditing={() => noteRef.current.blur()}
              />
            </>
          )}
          <SubmitButton
            title={'Lưu đơn'}
            containerStyle={styles.btnSubmit}
            onPress={onSubmit}
            loading={props.isLoadingRegister}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
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
};

export default SaveRegisterComponent;
