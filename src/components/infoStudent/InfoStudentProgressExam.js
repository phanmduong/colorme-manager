import React from 'react';
import InfoStudentProgressExamItem from './InfoStudentProgressExamItem';

function InfoStudentProgressExam({examGroups, exams}) {
  function getExamsByGroup(group) {
    return exams.filter((exam) => exam.group_exam_id === group.id);
  }

  return examGroups.map((group) => (
    <InfoStudentProgressExamItem group={group} exams={getExamsByGroup(group)} />
  ));
}

export default InfoStudentProgressExam;
