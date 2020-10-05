/**
 * Created by phanmduong on 5/27/17.
 */

import _ from 'lodash';
import {MEETING_STATUS} from '../constants/constant';

export function dotNumber(number) {
  if (number) {
    return number
      .toString()
      .replace(/\./g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return number;
}

export function maxArray(arr) {
  var max = -10000000;
  arr.forEach(function (item) {
    var data = parseInt(item);
    if (data > max) {
      max = data;
    }
  });
  return max;
}

export function formatPhone(phone) {
  if (phone == undefined || phone == null) {
    return phone;
  }
  if (phone.length === 10) {
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
  } else {
    return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1.$2.$3');
  }
}

export function typeConnect(type) {
  if (type.toLowerCase() == 'wifi') {
    return 'Wifi';
  }
  if (type.toLowerCase() == 'cellular') {
    return 'Điện thoại';
  }
  return '';
}

export function groupBy(collection, iteratee, props) {
  return _.chain(collection)
    .groupBy(iteratee)
    .toPairs()
    .map(function (currentItem) {
      return _.zipObject(props, currentItem);
    })
    .value();
}

export function getFirstDayOfWeek(date) {
  var day = date.getDay(),
    diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
}

export function getLastDayOfWeek(date) {
  var day = date.getDay(),
    diff = date.getDate() - day + (day == 0 ? -6 : 7); // adjust when day is sunday
  return new Date(date.setDate(diff));
}

export function isEmptyInput(input) {
  return (
    input === null || input === undefined || input.toString().trim().length <= 0
  );
}

export function convertTimeToSecond(time) {
  let a = time.split(':'); // split it at the colons

  if (isEmptyInput(a[2])) {
    return +a[0] * 60 * 60 + +a[1] * 60;
  }

  if (isEmptyInput(a[1])) {
    return +a[0] * 60 * 60;
  }

  if (isEmptyInput(a[0])) {
    return 0;
  }

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  return +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
}

export function calculatorAttendance(
  check_in_time,
  check_out_time,
  start_teaching_time,
  end_teaching_time,
) {
  check_in_time = convertTimeToSecond(check_in_time);
  check_out_time = convertTimeToSecond(check_out_time);
  start_teaching_time = convertTimeToSecond(start_teaching_time);
  end_teaching_time = convertTimeToSecond(end_teaching_time);

  let before_teaching_span = convertTimeToSecond('00:05:00');
  let after_teaching_span = convertTimeToSecond('00:05:00');
  let start_time = start_teaching_time - before_teaching_span;
  let end_time = end_teaching_time + after_teaching_span;
  let required_attend_span = end_time - start_time;
  let require_teaching_span = end_teaching_time - start_teaching_time;

  let empty_arrive_span;
  let early_arrive_span;
  let teaching_span;
  let late_arrive_span;
  let early_leave_span;
  let late_leave_span;

  if (check_in_time <= start_time) {
    empty_arrive_span = 0;

    early_arrive_span = (before_teaching_span / required_attend_span) * 100;

    late_arrive_span = 0;

    if (check_out_time >= end_time) {
      teaching_span = (require_teaching_span / required_attend_span) * 100;

      early_leave_span = 0;

      late_leave_span = (after_teaching_span / required_attend_span) * 100;
    } else if (check_out_time >= end_teaching_time) {
      teaching_span = (require_teaching_span / required_attend_span) * 100;

      early_leave_span = 0;

      late_leave_span =
        ((check_out_time - end_teaching_time) / required_attend_span) * 100;
    } else {
      teaching_span =
        ((check_out_time - start_teaching_time) / required_attend_span) * 100;

      early_leave_span =
        ((end_teaching_time - check_out_time) / required_attend_span) * 100;

      late_leave_span = 0;
    }
  } else if (check_in_time <= start_teaching_time) {
    empty_arrive_span =
      ((check_in_time - start_time) / required_attend_span) * 100;

    early_arrive_span =
      ((start_teaching_time - check_in_time) / required_attend_span) * 100;

    late_arrive_span = 0;

    if (check_out_time >= end_time) {
      teaching_span = (require_teaching_span / required_attend_span) * 100;

      early_leave_span = 0;

      late_leave_span = (after_teaching_span / required_attend_span) * 100;
    } else if (check_out_time >= end_teaching_time) {
      teaching_span = (require_teaching_span / required_attend_span) * 100;

      early_leave_span = 0;

      late_leave_span =
        ((check_out_time - end_teaching_time) / required_attend_span) * 100;
    } else {
      teaching_span =
        ((check_out_time - start_teaching_time) / required_attend_span) * 100;

      early_leave_span =
        ((end_teaching_time - check_out_time) / required_attend_span) * 100;

      late_leave_span = 0;
    }
  } else {
    empty_arrive_span = (before_teaching_span / required_attend_span) * 100;

    early_arrive_span = 0;

    late_arrive_span =
      ((check_in_time - start_teaching_time) / required_attend_span) * 100;

    if (check_out_time >= end_time) {
      teaching_span =
        ((end_teaching_time - check_in_time) / required_attend_span) * 100;

      early_leave_span = 0;

      late_leave_span = (after_teaching_span / required_attend_span) * 100;
    } else if (check_out_time >= end_teaching_time) {
      teaching_span =
        ((end_teaching_time - check_in_time) / required_attend_span) * 100;

      early_leave_span = 0;

      late_leave_span =
        ((check_out_time - end_teaching_time) / required_attend_span) * 100;
    } else {
      teaching_span =
        ((check_out_time - check_in_time) / required_attend_span) * 100;

      early_leave_span =
        ((end_teaching_time - check_out_time) / required_attend_span) * 100;

      late_leave_span = 0;
    }
  }

  let data = {
    empty_arrive_span,
    early_arrive_span,
    teaching_span,
    late_arrive_span,
    early_leave_span,
    late_leave_span,
  };
  return data;
}

export function getMeetingStatus(status) {
  return MEETING_STATUS[status] ? MEETING_STATUS[status] : {};
}

export function getShortName(name) {
  if (isEmptyInput(name)) {
    return null;
  }
  let n = name.trim().split(' ');
  if (n.length > 1) {
    return n[n.length - 2] + ' ' + n[n.length - 1];
  }
  return name;
}

export function convertVietText(alias) {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' ',
  );
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  return str;
}

export function itemExist(item, array) {
  for (let compared of array) {
    if (compared.id === item.id) {
      return true;
    }
  }
  return false;
}

export function findSum(numLst) {
  return numLst.reduce((a, b) => a + b, 0);
}

export function filteredData(state, data) {
  let filterData = [];
  for (let item of data) {
    if (!itemExist(item, state)) {
      filterData.push(item);
    }
  }
  return filterData;
}

export function shortVND(number) {
  let roundedNum = Math.round(number);
  let strNum = String(roundedNum);
  return strNum.slice(0, strNum.length - 3);
}

export const getSearchedResults = (array, search) => {
  let list = [];
  if (search === '') {
    return array;
  } else {
    for (let item of array) {
      let normalizedName = item.name;
      if (convertVietText(normalizedName).includes(convertVietText(search))) {
        list.push(item);
      }
    }
    return list;
  }
};

export const getData = (array, id, placeholder, color) => {
  let defaultOption = {id: id, name: placeholder, color: color};
  const data = [defaultOption].concat(array);
  return data;
};

export const getDefault = (array, comparedItem) => {
  if (comparedItem) {
    for (let item of array) {
      if (item.id === comparedItem.id) {
        return item;
      }
    }
  }
  return array[0];
};
