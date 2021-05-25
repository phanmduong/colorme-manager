import React from 'react';
import {Container, List, View} from 'native-base';
import ListItemClass from './listItem/ListItemClass';
import Loading from './common/Loading';
import {
  Dimensions,
  Image,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import Search from './common/Search';
import FilterClassModal from './class/FilterClassModal';
import theme from '../styles';
import LinearGradient from 'react-native-linear-gradient';
const {width} = Dimensions.get('window');

class ClassComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filterModalVisible: false,
      courseId: '',
    };
  }

  selectTab = (course) => {
    this.setState({courseId: course.id});
    this.props.onSelectCourseId(course.id);
    setTimeout(() => this.props.onRefresh(), 50);
  };

  renderTabs = () => {
    return this.props.courseData.map((course) => (
      <TouchableOpacity onPress={() => this.selectTab(course)}>
        <LinearGradient
          colors={
            this.state.courseId === course.id
              ? ['#F6F6F6', '#F6F6F6']
              : ['white', 'white']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.tag}>
          <Text style={{color: 'black'}}>{course.name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    ));
  };

  toggleFilterModal = () => {
    this.setState({filterModalVisible: !this.state.filterModalVisible});
  };

  headerComponent = () => {
    return (
      <View>
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
            {...this.props}
            onSelectCourseId={this.props.onSelectCourseId}
            onSelectBaseId={this.props.onSelectBaseId}
            onSelectGenId={this.props.onSelectGenId}
            closeModal={this.toggleFilterModal}
            isVisible={this.state.filterModalVisible}
            filter={this.props.filter}
            onSelectStatusId={this.props.onSelectStatusId}
            onSelectType={this.props.onSelectType}
            onSelectProvinceId={this.props.onSelectProvinceId}
            onSelectTeacherId={this.props.onSelectTeacherId}
            loadStaff={this.props.loadStaff}
            onSelectEnrollStartTime={this.props.onSelectEnrollStartTime}
            onSelectEnrollEndTime={this.props.onSelectEnrollEndTime}
            onSelectLessonStartTime={this.props.onSelectLessonStartTime}
            onSelectLessonEndTime={this.props.onSelectLessonEndTime}
            onSelectStartTime={this.props.onSelectStartTime}
            onSelectEndTime={this.props.onSelectEndTime}
            onSelectClassStatus={this.props.onSelectClassStatus}
            onSelectRoomId={this.props.onSelectRoomId}
          />
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.tabContainer}>{this.renderTabs()}</View>
        </ScrollView>
      </View>
    );
  };

  render() {
    if (
      this.props.isLoadingCourse ||
      this.props.isLoadingBase ||
      this.props.isLoadingGen ||
      this.props.isLoadingProvinces ||
      this.props.isLoadingRooms
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
              refreshing={this.props.isRefreshing}
              onRefresh={() => this.props.onRefresh()}
            />
          }
          onEndReached={this.props.loadDataClass}
          contentContainerStyle={{flexGrow: 1}}
          renderRow={(item, sectionID, rowID) => (
            <ListItemClass
              {...this.props}
              key={item.id}
              nameClass={item.name}
              avatar={item.course ? item.course.icon_url : null}
              onPress={this.props.onSelectedItem}
              teach={item.teacher}
              assist={item.teacher_assistant}
              courseId={item.course ? item.course.id : null} // CHANGED
              baseId={item.room ? item.room.base_id : null} // CHANGED
              changeClassStatus={this.props.changeClassStatus}
              classStatus={item.status}
              user={this.props.user}
              classData={item}
              selectedGenId={this.state.selectedGenId}
              selectedBaseId={this.state.selectedBaseId}
              teachers={item.teachers}
              teaching_assistants={item.teaching_assistants}
              date_start={item.datestart}
              description={item.description}
              schedule={item.schedule}
              base={item.base}
              target={item.target}
              register_target={item.register_target}
            />
          )}
          ListEmptyComponent={
            this.props.isLoadingClass
              ? !this.props.isRefreshing && <Loading size={width / 8} />
              : !this.props.isRefreshing && (
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
  tag: {
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    paddingHorizontal: theme.mainHorizontal,
    flexDirection: 'row',
  },
};

export default ClassComponent;
