import React from 'react';
import _ from 'lodash';
import InfoStudentProgressEventItem from './InfoStudentProgressEventItem';

function InfoStudentProgressEvent({events}) {
  function orderEvents() {
    events = _.orderBy(events, ['order'], ['asc']);
    return events;
  }

  return orderEvents().map((event) => (
    <InfoStudentProgressEventItem event={event} />
  ));
}

export default InfoStudentProgressEvent;
