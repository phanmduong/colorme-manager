import React from 'react';
import {FlatList} from 'react-native';
import ListCourseItem from './course/ListCourseItem';
import Search from './common/Search';
import Loading from './common/Loading';
import EmptyMessage from './common/EmptyMessage';

function CourseComponent(props) {
  function renderCourses({item}) {
    return (
      <ListCourseItem
        name={item.name}
        description={item.description}
        avatar_url={item.icon_url}
        lessons={item.lessons}
        price={item.price}
        id={item.id}
        onStatusChange={props.onStatusChange}
        currentStatus={item.status}
        parentCourses={props.parentCourses}
        is_parent={item.is_parent}
        parent_id={item.parent_id}
        navigation={props.navigation}
      />
    );
  }

  function headerComponent() {
    return (
      <Search onChangeText={props.onSearch} placeholder={'Tìm kiếm môn học'} />
    );
  }

  return (
    <FlatList
      data={props.courseData}
      renderItem={renderCourses}
      contentContainerStyle={{flexGrow: 1}}
      keyExtractor={(item) => item.id}
      onEndReached={props.loadCourses}
      onRefresh={props.onRefresh}
      refreshing={props.refreshing}
      ListHeaderComponent={headerComponent()}
      ListEmptyComponent={
        props.isLoading
          ? !props.refreshing && <Loading />
          : !props.refreshing && <EmptyMessage />
      }
    />
  );
}

export default CourseComponent;
