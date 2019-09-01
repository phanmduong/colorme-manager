import {
  HISTORY_SHIFT_TAB,
  HISTORY_TEACHING_TAB,
  HISTORY_WORK_SHIFT_TAB,
} from '../constants/actionTypes';
import HistoryAttendanceTeachingContainer from '../containers/historyAttendanceTeaching/HistoryAttendanceTeachingContainer';
import React from 'react';
import HistoryAttendanceWorkShiftContainer from '../containers/historyAttendanceShift/HistoryAttendanceWorkShiftContainer';
import HistoryAttendanceShiftContainer from '../containers/historyAttendanceShift/HistoryAttendanceShiftContainer';

export function tabTeaching() {
  return {
    type: HISTORY_TEACHING_TAB,
    historyTab: {
      teachingShift: {
        gradient: ['#E26800', '#E00000'],
        textColor: {
          color: 'white',
        },
      },
      workShift: {
        gradient: ['#FFFFFF', '#FFFFFF'],
        textColor: {
          color: 'black',
        },
      },
      dutyShift: {
        gradient: ['#FFFFFF', '#FFFFFF'],
        textColor: {
          color: 'black',
        },
      },
      tabComponent: <HistoryAttendanceTeachingContainer />,
    },
  };
}

export function tabWork() {
  return {
    type: HISTORY_WORK_SHIFT_TAB,
    historyTab: {
      workShift: {
        gradient: ['#E26800', '#E00000'],
        textColor: {
          color: 'white',
        },
      },
      teachingShift: {
        gradient: ['#FFFFFF', '#FFFFFF'],
        textColor: {
          color: 'black',
        },
      },
      dutyShift: {
        gradient: ['#FFFFFF', '#FFFFFF'],
        textColor: {
          color: 'black',
        },
      },
      tabComponent: <HistoryAttendanceWorkShiftContainer />,
    },
  };
}

export function tabDuty() {
  return {
    type: HISTORY_SHIFT_TAB,
    historyTab: {
      dutyShift: {
        gradient: ['#E26800', '#E00000'],
        textColor: {
          color: 'white',
        },
      },
      teachingShift: {
        gradient: ['#FFFFFF', '#FFFFFF'],
        textColor: {
          color: 'black',
        },
      },
      workShift: {
        gradient: ['#FFFFFF', '#FFFFFF'],
        textColor: {
          color: 'black',
        },
      },
      tabComponent: <HistoryAttendanceShiftContainer />,
    },
  };
}
