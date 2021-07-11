import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

function CalendarSchedule({classes, onSelectDate, startTime, endTime}) {
  const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
  const [markedDates, setMarked] = useState({});

  useEffect(() => {
    function markDates() {
      const beginMonth = moment.unix(startTime);
      const endMonth = moment.unix(endTime);
      const markedDatesTemp = {};
      for (
        const m = beginMonth;
        m.diff(endMonth, 'days') <= 0;
        m.add(1, 'days')
      ) {
        markedDatesTemp[m.format('YYYY-MM-DD')] = {
          marked: isMarkable(m),
        };
      }
      markedDatesTemp[selected] = {
        ...markedDatesTemp[selected],
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#2ACC4C',
        selectedTextColor: 'white',
      };
      setMarked(markedDatesTemp);
    }
    markDates();
  }, [classes]);

  function isMarkable(date) {
    for (const classItem of classes) {
      if (
        moment.unix(classItem.time).format('YYYY-MM-DD') ===
        date.format('YYYY-MM-DD')
      ) {
        return true;
      }
    }
    return false;
  }

  function onDayPress(day) {
    let copy = {...markedDates};
    copy[day.dateString] = {
      ...copy[day.dateString],
      selected: true,
      disableTouchEvent: true,
      selectedColor: '#2ACC4C',
      selectedTextColor: 'white',
    };
    copy[selected] = {
      ...copy[selected],
      selected: false,
      disableTouchEvent: false,
    };
    setMarked(copy);
    setSelected(day.dateString);
    onSelectDate(day.dateString);
  }

  return (
    <SafeAreaView>
      <Calendar
        current={selected}
        renderArrow={(direction) => {
          if (direction === 'left') {
            return (
              <MaterialIcons
                name={'navigate-before'}
                size={20}
                color={'black'}
              />
            );
          }
          if (direction === 'right') {
            return (
              <MaterialIcons name={'navigate-next'} size={20} color={'black'} />
            );
          }
        }}
        markedDates={markedDates}
        onDayPress={onDayPress}
      />
    </SafeAreaView>
  );
}

export default CalendarSchedule;
