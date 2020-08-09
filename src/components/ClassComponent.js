import React from 'react';
import {Container, List, Text, View} from 'native-base';
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
      // selectedProvinceId: -1,
      filterModalVisible: false,
    };
  }

  onSelectProvinceId = (provinceId) => {
    this.setState({selectedProvinceId: provinceId});
  };

  searchClass = (classList) => {
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

  // getDataClass = () => {
  //   if (this.props.classData === null || this.props.classData === undefined) {
  //     return [];
  //   }
  //   let filterClasses = this.props.classData;
  //   if (this.state.selectedCourseId !== -1) {
  //     filterClasses = filterClasses.filter(
  //       (classItem) => classItem.course_id === this.state.selectedCourseId,
  //     );
  //   }
  //   if (this.state.selectedProvinceId !== -1) {
  //     filterClasses = filterClasses.filter(
  //       (classItem) =>
  //         classItem.base.district.provinceid === this.state.selectedProvinceId,
  //     );
  //   }
  //   return filterClasses;
  // };

  toggleFilterModal = () => {
    this.setState({filterModalVisible: !this.state.filterModalVisible});
  };

  headerComponent = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Search
          placeholder="Tìm kiếm lớp học"
          onChangeText={this.props.searchClass}
          value={this.props.search}
          autoFocus={false}
          extraStyle={{width: width - (theme.mainHorizontal * 2 + 40 + 10)}}
          extraInputStyle={{
            width: width - (theme.mainHorizontal * 2 + 40 + 10) - 48,
          }}
        />
        <TouchableOpacity onPress={this.toggleFilterModal}>
          <View style={styles.filterContainer}>
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
          onSelectCourseId={this.props.onSelectCourseId}
          selectedCourseId={this.props.selectedCourseId}
          onSelectBaseId={this.props.onSelectBaseId}
          selectedBaseId={this.props.selectedBaseId}
          // onSelectProvinceId={this.onSelectProvinceId}
          // selectedProvinceId={this.state.selectedProvinceId}
          onSelectGenId={this.props.onSelectGenId}
          selectedGenId={this.props.selectedGenId}
          closeModal={this.toggleFilterModal}
          currentGen={this.props.currentGen}
          isVisible={this.state.filterModalVisible}
          filter={this.props.filter}
          provinces={this.props.provinces}
          isLoadingProvinces={this.props.isLoadingProvinces}
        />
      </View>
    );
  };

  render() {
    if (
      this.props.isLoadingCourse ||
      this.props.isLoadingBase ||
      this.props.isLoadingGen ||
      this.props.isLoadingProvinces
    ) {
      return <Loading size={width / 8} />;
    }
    return (
      <Container>
        <List
          dataArray={this.props.classData}
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
            />
          }
          onEndReached={this.props.loadDataClass}
          contentContainerStyle={{flexGrow: 1}}
          renderRow={(item, sectionID, rowID) => (
            <ListItemClass
              {...this.props}
              key={item.id}
              nameClass={item.name}
              avatar={item.course.icon_url} // CHANGED
              studyTime={item.study_time}
              address={
                item.room ? `${item.room.name} - ${item.room.address}` : null
              } // CHANGED
              totalPaid={item.total_paid}
              totalRegisters={item.total_register}
              paidTarget={item.target}
              registerTarget={item.regis_target}
              onPress={this.props.onSelectedItem}
              classId={item.id}
              teach={item.teacher}
              assist={item.teacher_assistant}
              courseId={item.course.id} // CHANGED
              baseId={item.room ? item.room.base_id : null} // CHANGED
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
          ListEmptyComponent={
            this.props.isLoadingClass ? (
              this.props.isRefreshing ? (
                <View />
              ) : (
                <Loading size={width / 8} />
              )
            ) : this.props.isRefreshing ? (
              <View />
            ) : (
              <View style={styles.container}>
                <Text style={{color: theme.dangerColor, fontSize: 16}}>
                  Không có kết quả
                </Text>
              </View>
            )
          }
        />
      </Container>
    );
  }
}

const styles = {
  containerPicker: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
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
