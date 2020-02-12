import React from 'react';
import {Container, Item, List, Picker, View} from 'native-base';
import ListItemClass from './listItem/ListItemClass';
import Loading from './common/Loading';
import theme from '../styles';
import {Dimensions, Image, TouchableOpacity} from 'react-native';
import Search from './common/Search';
import FilterModal from './infoStudent/FilterModal';
import {convertVietText} from '../helper';

var {height, width} = Dimensions.get('window');

class ClassComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
      selectedCourseId: 0,
    };
  }

  searchClass = classList => {
    if (this.state.search === '') {
      return classList;
    } else {
      let searchedClassList = [];
      for (let classItem of classList) {
        if (
          convertVietText(classItem.name).includes(
            convertVietText(this.state.search),
          )
        ) {
          searchedClassList.push(classItem);
        }
      }
      return searchedClassList;
    }
  };

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

  headerComponent = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Search
          placeholder="Tìm kiếm lớp học"
          onChangeText={search => this.setState({search})}
          value={this.state.search}
          autoFocus={false}
          extraStyle={{width: width - 85}}
          extraInputStyle={{width: width - 85 - 48}}
        />
        <TouchableOpacity onPress={this.toggleFilterModal}>
          <View style={styles.fitlerContainer}>
            <Image
              source={require('../../assets/img/icons8-sorting_options_filled.png')}
              style={{width: 18, height: 18}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    if (this.props.isLoadingCourse) {
      return <Loading size={width / 8} />;
    }

    const courses = [{id: 0, name: 'Tất cả'}, ...this.props.courseData];

    return (
      <Container>
        <List
          dataArray={this.searchClass(this.getDataClass())}
          ListHeaderComponent={this.headerComponent}
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
  },
  fitlerContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
};

export default ClassComponent;
