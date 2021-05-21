import React from 'react';
import {View, Text, Card, CardItem, Body} from 'native-base';
import _ from 'lodash';
import {getFirstDayOfWeek, getLastDayOfWeek} from '../../helper';
import moment from 'moment';
import {observer} from 'mobx-react';
import TeachingLesson from './TeachingLesson';

@observer
class TeachingClass extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderHeader() {
    const classData = this.props.classData.lessons[0];
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {classData.class_lesson.study_class.name}
        </Text>
        <Text>{classData.class_lesson.study_class.study_time}</Text>
      </View>
    );
  }

  renderItem() {
    const data = _.sortBy(
      this.props.classData.lessons,
      (lesson) => lesson.class_lesson.id,
    );
    return data.map((lesson, index) => (
      <TeachingLesson lesson={lesson} key={index} />
    ));
  }

  render() {
    return (
      <View style={styles.card}>
        {this.renderHeader()}
        <Card>
          <CardItem style={{width: '100%'}}>
            <Body style={styles.container}>{this.renderItem()}</Body>
          </CardItem>
        </Card>
      </View>
    );
  }

  time(dateData) {
    const strDate = dateData.substr(dateData.length - 10);
    const date = new Date(
      strDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'),
    );
    const startDate = moment(getFirstDayOfWeek(date));
    const endDate = moment(getLastDayOfWeek(date));
    return (
      startDate.format('DD/MM/YYYY') + ' - ' + endDate.format('DD/MM/YYYY')
    );
  }
}

const styles = {
  header: {
    marginHorizontal: 8,
    padding: 5,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#d9534f',
  },
  container: {
    alignItems: 'stretch',
  },
  textDate: {
    fontWeight: 'bold',
  },
  card: {
    marginHorizontal: 10,
  },
  date: {
    padding: 5,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
};

export default TeachingClass;
