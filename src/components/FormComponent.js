import React from 'react';
import {FlatList} from 'react-native';
import ListFormItem from './form/ListFormItem';
import Loading from './common/Loading';
import Search from './common/Search';
import EmptyMessage from './common/EmptyMessage';

function FormComponent(props) {
  function renderForms({item}) {
    return (
      <ListFormItem
        name={item.title}
        created_at={item.created_at}
        slug={item.slug}
        description={item.description}
        navigation={props.navigation}
        base_id={item.base_id}
        course_id={item.course_id}
        data_fields={item.data_fields}
        title={item.title}
        id={item.id}
        duplicateForm={props.duplicateForm}
        deleteForm={props.deleteForm}
        sources={props.sources}
        campaigns={props.campaigns}
      />
    );
  }

  function headerComponent() {
    return (
      <Search
        placeholder={'Tìm kiếm theo tên form đăng kí'}
        onChangeText={props.searchForms}
        value={props.search}
      />
    );
  }

  return (
    <FlatList
      data={props.forms}
      renderItem={renderForms}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{flexGrow: 1}}
      ListHeaderComponent={headerComponent()}
      ListEmptyComponent={
        props.isLoadingForms
          ? !props.refreshingForms && <Loading />
          : !props.refreshingForms && <EmptyMessage />
      }
      onRefresh={props.onRefresh}
      refreshing={props.refreshingForms}
      onEndReached={props.loadForms}
    />
  );
}

export default FormComponent;
