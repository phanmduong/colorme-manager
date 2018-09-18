/**
 * Created by phanmduong on 5/1/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function loadDashboard(baseId, genId, token) {
    let url = env.API_URL + "/v2/gens/" + genId + "/Dashboard/";
    if (baseId === -1) {
        url += "?token=" + token;
    } else {
        url += baseId + "?token=" + token;
    }
    return axios.get(url);
}
