import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, Platform, KeyboardAvoidingView, Alert} from 'react-native';
import {isEmptyInput} from '../helper';
import theme from '../styles';
import TagItem from './common/TagItem';
import SubmitButton from './common/SubmitButton';
import Loading from './common/Loading';
import Input from './common/Input';
import InputPicker from './common/InputPicker';
import {ADDRESS, GENDER} from '../constants/constant';
import Expand from './common/Expand';
import DatePicker from './common/DatePicker';

function AddEditLeadsComponent(props) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [city, setCity] = useState(null);
  const [note, setNote] = useState(null);
  const [baseId, setBase] = useState(null);
  const [statusId, setStatus] = useState(null);
  const [sourceId, setSource] = useState(null);
  const [campaignId, setCampaign] = useState(null);
  const [staffId, setStaff] = useState(null);
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(null);
  const [address, setAddress] = useState(null);
  const [fatherName, setFather] = useState(null);
  const [motherName, setMother] = useState(null);
  const [university, setUniversity] = useState(null);
  const [identityCode, setIdentity] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [work, setWork] = useState(null);
  const [howKnow, setKnow] = useState(null);
  const [facebook, setFacebook] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const fatherRef = useRef(null);
  const motherRef = useRef(null);
  const universityRef = useRef(null);
  const identityRef = useRef(null);
  const nationalityRef = useRef(null);
  const workRef = useRef(null);
  const knowRef = useRef(null);
  const facebookRef = useRef(null);

  useEffect(() => {
    if (props.mode === 'edit') {
      setName(props.lead.name);
      setEmail(props.lead.email);
      setPhone(props.lead.phone);
      setCity(props.lead.city);
      setNote(props.lead.note);
      setBase(props.lead.base_id);
      setStatus(props.lead.status_id);
      setSource(props.lead.source_id);
      setCampaign(props.lead.campaign_id);
      setStaff(props.lead.staff_id);
      setGender(props.lead.gender);
      setDob(props.lead.dob);
      setAddress(props.lead.address);
      setFather(props.lead.father_name);
      setMother(props.lead.mother_name);
      setUniversity(props.lead.university);
      setIdentity(props.lead.identity_code);
      setNationality(props.lead.nationality);
      setWork(props.lead.work);
      setKnow(props.lead.how_know);
      setFacebook(props.lead.facebook);
    }
  }, []);

  function saveLead() {
    if (isEmptyInput(name)) {
      Alert.alert('Thông báo', 'Bạn phải điền tên học viên');
    } else if (isEmptyInput(phone)) {
      Alert.alert('Thông báo', 'Bạn phải điền số điện thoại');
    } else if (isEmptyInput(email)) {
      Alert.alert('Thông báo', 'Bạn phải điền email');
    } else {
      let lead = {
        id: props.lead.id,
        address: address,
        base_id: baseId,
        campaign_id: campaignId,
        city: city,
        dob: dob,
        email: email,
        facebook: facebook,
        father_name: fatherName,
        gender: gender,
        how_know: howKnow,
        identity_code: identityCode,
        mother_name: motherName,
        name: name,
        nationality: nationality,
        note: note,
        phone: phone,
        source_id: sourceId,
        status_id: statusId,
        staff_id: staffId,
        university: university,
        work: work,
      };
      if (props.mode === 'edit') {
        props.saveLead('edit', lead);
      } else {
        props.saveLead('add', lead);
      }
    }
  }

  function toggleExpand() {
    setExpanded(!expanded);
  }

  if (props.isLoadingProvinces || props.isLoadingStatuses) {
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
          <Input
            title={'Tên học viên'}
            value={name}
            onChangeText={setName}
            placeholder={'Nhập họ và tên'}
            required
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <Input
            title={'Email'}
            value={email}
            onChangeText={setEmail}
            placeholder={'Nhập email'}
            required
            refName={emailRef}
            onSubmitEditing={() => phoneRef.current.focus()}
          />
          <Input
            title={'Số điện thoại'}
            value={phone}
            onChangeText={setPhone}
            placeholder={'Nhập số điện thoại'}
            required
            keyboardType={'number-pad'}
            refName={phoneRef}
          />
          <InputPicker
            title={'Thành phố'}
            selectedId={city}
            onChangeValue={setCity}
            options={ADDRESS}
            header={'Chọn thành phố'}
          />
          <Input
            title={'Ghi chú'}
            value={note}
            onChangeText={setNote}
            placeholder={'Nhập ghi chú'}
          />
          <InputPicker
            title={'Cơ sở'}
            header={'Chọn cơ sở'}
            options={props.baseData}
            onChangeValue={setBase}
            selectedId={baseId}
          />

          <Expand isExpanded={expanded} toggleExpand={toggleExpand} />

          {expanded ? (
            <>
              <TagItem
                title={'Trạng thái'}
                placeholder={'No status'}
                defaultValue={statusId}
                options={props.statuses}
                hasHashInHexColor={true}
                onValueChange={(value) => setStatus(value.id)}
              />
              <TagItem
                title={'Nguồn'}
                placeholder={'No Source'}
                defaultValue={sourceId}
                options={props.sources}
                hasHashInHexColor={true}
                onValueChange={(value) => setSource(value.id)}
              />
              <TagItem
                title={'Chiến dịch'}
                placeholder={'No Campaign'}
                defaultValue={campaignId}
                options={props.campaigns}
                hasHashInHexColor={true}
                onValueChange={(value) => setCampaign(value.id)}
              />
              <TagItem
                title={'P.I.C'}
                placeholder={'No P.I.C'}
                defaultValue={staffId}
                options={props.staff}
                hasHashInHexColor={false}
                onValueChange={(value) => setStaff(value.id)}
                externalSearch={(search) => props.loadStaff(search)}
              />
              <InputPicker
                title={'Giới tính'}
                selectedId={gender}
                onChangeValue={setGender}
                options={GENDER}
                header={'Chọn giới tính'}
              />
              <DatePicker
                title={'Ngày sinh'}
                selectedDate={dob}
                onDateChange={setDob}
                mode={'unix'}
              />
              <Input
                title={'Địa chỉ'}
                value={address}
                onChangeText={setAddress}
                placeholder={'Địa chỉ'}
                onSubmitEditing={() => fatherRef.current.focus()}
              />
              <Input
                title={'Phụ huynh 1'}
                value={fatherName}
                placeholder={'Nhập tên phụ huynh 1'}
                onChangeText={setFather}
                refName={fatherRef}
                onSubmitEditing={() => motherRef.current.focus()}
              />
              <Input
                title={'Phụ huynh 2'}
                value={motherName}
                placeholder={'Nhập tên phụ huynh 2'}
                onChangeText={setMother}
                refName={motherRef}
                onSubmitEditing={() => universityRef.current.focus()}
              />
              <Input
                title={'Trường học'}
                value={university}
                placeholder={'Nhập trường học'}
                onChangeText={setUniversity}
                refName={universityRef}
                onSubmitEditing={() => identityRef.current.focus()}
              />
              <Input
                title={'CMND'}
                value={identityCode}
                onChangeText={setIdentity}
                placeholder={'Nhập CMND'}
                refName={identityRef}
                onSubmitEditing={() => nationalityRef.current.focus()}
              />
              <Input
                title={'Quốc tịch'}
                value={nationality}
                onChangeText={setNationality}
                placeholder={'Nhập quốc tịch'}
                refName={nationalityRef}
                onSubmitEditing={() => workRef.current.focus()}
              />
              <Input
                title={'Công việc'}
                value={work}
                onChangeText={setWork}
                placeholder={'Nhập công việc'}
                refName={workRef}
                onSubmitEditing={() => knowRef.current.focus()}
              />
              <Input
                title={'Lý do biết đến'}
                value={howKnow}
                onChangeText={setKnow}
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
                returnKeyType={'done'}
                onSubmitEditing={() => facebookRef.current.blur()}
              />
            </>
          ) : null}
          <SubmitButton
            title={'Hoàn tất'}
            onPress={saveLead}
            loading={props.isSavingLead}
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
};

export default AddEditLeadsComponent;
