import React from 'react';
import {Container, List, View} from 'native-base';
import ListItemClass from './listItem/ListItemClass';
import Loading from './common/Loading';
import {
  Dimensions,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Search from './common/Search';
import {convertVietText} from '../helper';
import FilterClassModal from './class/FilterClassModal';
import theme from '../styles';
var {height, width} = Dimensions.get('window');

class ClassComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
      selectedCourseId: -1,
      selectedBaseId: this.props.analyticBaseId,
      selectedProvinceId: -1,
      selectedGenId: this.props.analyticGenId,
      filterModalVisible: false,
    };
  }

  onSelectBaseId = baseId => {
    this.setState({selectedBaseId: baseId});
  };

  onSelectProvinceId = provinceId => {
    this.setState({selectedProvinceId: provinceId});
  };

  onSelectCourseId = courseId => {
    this.setState({selectedCourseId: courseId});
  };

  onSelectGenId = genId => {
    this.setState({selectedGenId: genId});
  };

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

  getDataClass = () => {
    if (this.props.classData === null || this.props.classData === undefined) {
      return [];
    }
    let filterClasses = this.props.classData;
    if (this.state.selectedCourseId !== -1) {
      filterClasses = filterClasses.filter(
        classItem => classItem.course_id === this.state.selectedCourseId,
      );
    }
    if (this.state.selectedProvinceId !== -1) {
      filterClasses = filterClasses.filter(
        classItem =>
          classItem.base.district.provinceid === this.state.selectedProvinceId,
      );
    }
    return filterClasses;
  };

  toggleFilterModal = () => {
    this.setState({filterModalVisible: !this.state.filterModalVisible});
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
        <FilterClassModal
          isLoadingGen={this.props.isLoadingGen}
          isLoadingBase={this.props.isLoadingBase}
          isLoadingCourse={this.props.isLoadingCourse}
          genData={this.props.genData}
          baseData={this.props.baseData}
          courseData={this.props.courseData}
          onSelectCourseId={this.onSelectCourseId}
          selectedCourseId={this.state.selectedCourseId}
          onSelectBaseId={this.onSelectBaseId}
          selectedBaseId={this.state.selectedBaseId}
          onSelectProvinceId={this.onSelectProvinceId}
          selectedProvinceId={this.state.selectedProvinceId}
          onSelectGenId={this.onSelectGenId}
          selectedGenId={this.state.selectedGenId}
          closeModal={this.toggleFilterModal}
          currentGen={this.props.currentGen}
          isVisible={this.state.filterModalVisible}
          filter={this.props.filter}
          analyticBaseId={this.props.analyticBaseId}
          analyticGenId={this.props.analyticGenId}
          provinces={this.props.provinces}
          isLoadingProvinces={this.props.isLoadingProvinces}
        />
      </View>
    );
  };

  render() {
    if (
      this.props.isLoadingCourse ||
      this.props.isLoadingClass ||
      this.props.isLoadingBase ||
      this.props.isLoadingGen ||
      this.props.isLoadingProvinces
    ) {
      return <Loading size={width / 8} />;
    }
    return (
      <Container>
        <List
          dataArray={this.searchClass(this.getDataClass())}
          ListHeaderComponent={this.headerComponent}
          refreshControl={
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={() =>
                this.props.onRefresh(
                  this.state.selectedBaseId,
                  this.state.selectedGenId,
                )
              }
              titleColor={theme.mainColor}
              title="Đang tải..."
              tintColor="#d9534f"
              colors={['#d9534f']}
            />
          }
          renderRow={(item, sectionID, rowID) => (
            <ListItemClass
              {...this.props}
              nameClass={item.name}
              avatar={item.avatar_url}
              studyTime={item.study_time}
              address={item.address}
              totalPaid={item.total_paid}
              totalRegisters={item.total_registers}
              paidTarget={item.paid_target}
              registerTarget={item.register_target}
              onPress={this.props.onSelectedItem}
              classId={item.id}
              teach={item.teacher}
              assist={item.teacher_assistant}
              courseId={item.course_id}
              baseId={item.base.id}
              changeClassStatus={this.props.changeClassStatus}
              classStatus={item.status}
              user={this.props.user}
              classData={item}
              selectedGenId={this.state.selectedGenId}
              selectedBaseId={this.state.selectedBaseId}
              description={item.description}
              date_end={item.date_end}
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
