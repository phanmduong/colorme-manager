import axios from 'axios';
import * as env from '../constants/env';

export function loadInfoStudent(studentId, token, domain) {
  let url =
    env.manageApiUrl(domain) + '/student/' + studentId + '?token=' + token;
  return axios.get(url);
}

export function loadRegisters(studentId, token, domain) {
  let url =
    env.manageApiUrl(domain) +
    '/student/' +
    studentId +
    '/registers?token=' +
    token;
  return axios.get(url);
}

export function loadHistoryCalls(studentId, token, domain) {
  let url =
    env.manageApiUrl(domain) +
    '/student/' +
    studentId +
    '/history-calls?token=' +
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
    env.manageApiUrl(domain) +
    '/student/' +
    studentId +
    '/history-collect-money?token=' +
    token;
  return axios.get(url);
}

export function changeCallStatusStudent(
  callStatus,
  studentId,
  telecallId,
  genId,
  note,
  callerId,
  appointmentPayment,
  dateTest,
  token,
  domain,
) {
  let url =
    env.manageApiUrl(domain) + '/change-call-status-student?token=' + token;
  return axios.post(url, {
    student_id: studentId,
    telecall_id: telecallId,
    gen_id: genId,
    caller_id: callerId,
    note: note,
    status: callStatus,
    appointment_payment: appointmentPayment,
    date_test: dateTest,
  });
}

export function submitMoney(
  register_id,
  money,
  code,
  note,
  payment_method,
  token,
  domain,
) {
  let url =
    env.manageApiUrl(domain) + '/collect-money/pay-money?token=' + token;
  return axios.post(url, {
    register_id: register_id,
    money: '' + money,
    code: code,
    note: note,
    payment_method: payment_method,
  });
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
    env.manageApiUrl(domain) + '/student/' + register.id + '/edit?token=' + token;
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
