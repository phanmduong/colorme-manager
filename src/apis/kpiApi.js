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
  const url = `${env.manageApiUrl2222(domain)}/v1/kpis?search=${search}&page=${page}&type=${type}&calculate_by=${calculate_by}&start_time=${start_time}&end_time=${end_time}&token=${token}`;
  return axios.get(url, {cancelToken: sourceCancel.token});
};
