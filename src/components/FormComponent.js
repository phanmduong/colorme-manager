import React from 'react';
import {FlatList, View, Dimensions} from 'react-native';
import ListFormItem from './form/ListFormItem';
import Loading from './common/Loading';
import {Text} from 'native-base';
import theme from '../styles';
import Search from './common/Search';
const {width} = Dimensions.get('window');

function FormComponent(props) {
  function renderForms({item}) {
    return (
      <ListFormItem
        name={item.title}
        created_at={item.created_at}
        slug={item.slug}
        description={item.description}
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
      contentContainerStyle={{flexGrow: 1}}
      ListHeaderComponent={headerComponent()}
      ListEmptyComponent={
        props.isLoadingForms
          ? !props.refreshingForms && <Loading size={width / 8} />
          : !props.refreshingForms && (
              <View style={styles.container}>
                <Text style={{color: theme.dangerColor, fontSize: 16}}>
                  Không có kết quả
                </Text>
              </View>
            )
      }
      onRefresh={props.onRefresh}
      refreshing={props.refreshingForms}
      onEndReached={props.loadForms}
    />
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default FormComponent;
