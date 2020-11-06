import React from 'react';
import InfoStudentProgressAttendanceItem from './InfoStudentProgressAttendanceItem';

function InfoStudentProgressAttendance({attendances}) {
  return attendances.map((attendance) => (
    <InfoStudentProgressAttendanceItem
      order={attendance.order}
      status={attendance.status.status}
      date={attendance.status.class_lesson.time}
      note={attendance.status.note}
    />
  ));
}

export default InfoStudentProgressAttendance;
