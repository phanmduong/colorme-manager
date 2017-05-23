/**
 * Created by phanmduong on 5/1/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadDashboard(baseId, genId, token) {
    let url = env.API_URL + "/v2/gens/" + genId + "/dashboard?token=" + token;
    console.log(url);
    return axios.get(url);
}
