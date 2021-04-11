import axios from 'axios';
import * as env from '../constants/env';
import {isEmptyInput} from '../helper';

export function loadInfoStudent(studentId, token, domain) {
  let url =
    env.manageApiUrl(domain) + '/student/' + studentId + '?token=' + token;
  return axios.get(url);
}

export function loadRegisters(studentId, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/registers?limit=0&orderBy=registers.created_at&sortedBy=desc' +
    (!isEmptyInput(studentId) ? '&user_ids[]=' + studentId : '') +
    '&token=' +
    token;
  return axios.get(url);
}

export function loadHistoryCalls(studentId, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/tele-calls?student_id=' +
    studentId +
    '&orderBy=created_at&sortedBy=desc&limit=0&token=' +
    token;
  return axios.get(url);
}

export function loadProgress(studentId, token, domain) {
  let url =
    env.manageApiUrl(domain) +
    '/student/' +
    studentId +
    '/progress?token=' +
    token;
  return axios.get(url);
}

export function loadHistoryCollect(studentId, token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/register-payments?limit=0&orderBy=created_at&sortedBy=desc' +
    (!isEmptyInput(studentId) ? '&user_ids[]=' + studentId : '') +
    '&token=' +
    token;
  console.log(url);
  return axios.get(url);
}

export function changeCallStatusStudent(
  appointmentPayment,
  callBackTime,
  callStatus,
  note,
  statusId,
  studentId,
  teleId,
  token,
  domain,
) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/tele-calls/' +
    teleId +
    '?token=' +
    token;
  return axios.put(url, {
    appointment_payment: appointmentPayment,
    call_back_time: callBackTime,
    call_status: callStatus,
    date_test: null,
    note: note,
    status_id: statusId,
    student_id: studentId,
  });
}

export function getTeleCall(studentId, token, domain) {
  let url = env.manageApiUrlAuth(domain) + '/v1/tele-calls?token=' + token;
  return axios.post(url, {
    student_id: studentId,
  });
}

export function submitMoney(
  register_id,
  actual_input_at,
  code,
  money,
  note,
  payment_method,
  received_book_at,
  token,
  domain,
) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/register-payments/' +
    register_id +
    '?token=' +
    token;
  return axios.post(url, {
    actual_input_at,
    code,
    money,
    note,
    payment_method,
    received_book_at,
  });
}

export function loadNextCode(token, domain) {
  let url =
    env.manageApiUrlAuth(domain) +
    '/v1/registers/next-code?token=' +
    token +
    '&c=' +
    Math.random() * 10000000000;
  return axios.get(url);
}

export function uploadImage(fileUri, studentId, imageField, token, domain) {
  let url = env.manageApiUrl(domain) + '/upload-image-user?token=' + token;
  let formData = new FormData();
  formData.append(imageField, {
    uri: fileUri,
    type: 'image/jpeg',
    name: imageField,
  });
  formData.append('id', studentId);
  formData.append('image', imageField);
  return axios({
    method: 'post',
    url: url,
    data: formData,
  });
}

export function updateProfile(register, token, domain) {
  let url =
    env.manageApiUrl(domain) +
    '/student/' +
    register.id +
    '/edit?token=' +
    token;
  return axios.post(url, {
    id: register.id,
    name: register.name,
    email: register.email,
    phone: register.phone,
    gender: register.gender,
    dob: register.dob,
    address: register.address,
    university: register.university,
    work: register.work,
    how_know: register.how_know,
    facebook: register.facebook,
    description: register.description,
  });
}

export function changePassword(studentId, newPassword, token, domain) {
  let url =
    env.manageApiUrl(domain) + '/change-password-student?token=' + token;
  return axios.post(url, {
    id: studentId,
    new_password: newPassword,
  });
}
