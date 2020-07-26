/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function updateMoneyApi(
  token,
  registerId,
  money,
  code,
  note = '',
  isReceivedCard = false,
  domain,
) {
  let url = env.apiUrl(domain) + '/getmoney?token=' + token;
  return axios.post(url, {
    register_id: registerId,
    money: money,
    code: code,
    note: note,
    received_id_card: `${isReceivedCard}`,
  });
}
