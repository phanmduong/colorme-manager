import * as env from '../constants/env';
import axios from 'axios';

export const loadKPIs = (
  sourceCancel,
  search,
  page,
  type,
  calculate_by,
  start_time,
  end_time,
  token,
  domain
) => {
  const url = `${env.manageApiUrlAuth(domain)}/v1/kpis?search=${search}&page=${page}&type=${type}&calculate_by=${calculate_by}&start_time=${start_time}&end_time=${end_time}&token=${token}`;
  return axios.get(url, {cancelToken: sourceCancel.token});
};

export const loadKPISettings = (token, domain) => {
  const url =
    env.manageApiUrlAuth(domain) + '/v1/settings/by-group/kpi?token=' + token;
  return axios.get(url);
};

export const loadKPIEmployees = (token, domain) => {
  const url = env.manageApiUrlAuth(domain) + '/v1/employees?token=' + token;
  return axios.get(url);
};

export const addKpis = (kpiData, token, domain) => {
  const url = env.manageApiUrlAuth(domain) + '/v1/kpis?token=' + token;
  return axios.post(url, {
    calculate_by: kpiData.calculate_by,
    detail_kpis: kpiData.detail_kpis,
    end_time: kpiData.end_time,
    name: kpiData.name,
    start_time: kpiData.start_time,
    type: kpiData.type,
  });
};

export const loadCampaigns = (token, domain) => {
  const url =
    env.manageApiUrlAuth(domain) + '/v1/marketing-campaigns?token=' + token;
  return axios.get(url);
};

export const loadSources = (token, domain) => {
  const url = env.manageApiUrlAuth(domain) + '/v1/sources?token=' + token;
  return axios.get(url);
};

export const loadCourses = (token, domain) => {
  const url = env.manageApiUrlAuth(domain) + '/v1/courses?status=1&token=' + token;
  return axios.get(url);
};
