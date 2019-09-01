import React from 'react';
import {Container, Item, List, Picker, View} from 'native-base';
import ListItemClass from './listItem/ListItemClass';
import Loading from './common/Loading';
import theme from '../styles';
import {Dimensions} from 'react-native';

var {height, width} = Dimensions.get('window');

class ClassComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedCourseId: 0,
    };
  }

  onChangeCourse = course => {
    this.setState({selectedCourseId: course});
  };

  getDataClass = () => {
    if (this.state.selectedCourseId == 0) {
      return this.props.classData;
    }

    if (this.props.classData == null || this.props.classData == undefined) {
      return [];
    }

    return this.props.classData.filter(
      classItem => classItem.course_id == this.state.selectedCourseId,
    );
  };

  render() {
    if (this.props.isLoadingCourse) {
      return <Loading size={width / 8} />;
    }

    const courses = [{id: 0, name: 'Tất cả'}, ...this.props.courseData];

    return (
      <Container>
        <View style={styles.containerPicker}>
          <Picker
            style={{width: width / 2, padding: 0, margin: 0}}
            iosHeader="Chọn môn học"
            mode="dialog"
            defaultLabel={'Chọn môn'}
            selectedValue={this.state.selectedCourseId}
            onValueChange={this.onChangeCourse}>
            {courses.map(function(course, index) {
              return <Item label={course.name} value={course.id} key={index} />;
            })}
          </Picker>
        </View>
        <List
          dataArray={this.getDataClass()}
          renderRow={(item, sectionID, rowID) => (
            <ListItemClass
              nameClass={item.name}
              avatar={item.avatar_url}
              studyTime={item.study_time}
              totalPaid={item.total_paid}
              totalRegisters={item.total_registers}
              paidTarget={item.paid_target}
              registerTarget={item.register_target}
              onPress={this.props.onSelectedItem}
              classId={item.id}
            />
          )}
        />
      </Container>
    );
  }
}

const styles = {
  containerPicker: {
    flexDirection: 'row',
    borderBottomColor: theme.borderColor,
    borderBottomWidth: 1,
    shadowColor: '#b4b4b4',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 0.5,
    shadowOpacity: 0.5,
  },
};

export default ClassComponent;
