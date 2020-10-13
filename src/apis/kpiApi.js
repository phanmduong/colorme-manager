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
) => {
  const url = `${env.MANAGE_API_URL_2222}/v1/kpis?search=${search}&page=${page}&type=${type}&calculate_by=${calculate_by}&start_time=${start_time}&end_time=${end_time}&token=${token}`;
  console.log(url);
  return axios.get(url, {cancelToken: sourceCancel.token});
};
