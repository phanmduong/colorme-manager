import React from 'react';
import {FlatList, View, Dimensions, RefreshControl} from 'react-native';
import StaffItem from './staff/StaffItem';
import Loading from './common/Loading';
import {Text} from 'native-base';
import theme from '../styles';
import Search from './common/Search';
const {width, height} = Dimensions.get('window');

class StaffComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderSearch = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Search
          placeholder={'Tìm kiếm học viên'}
          onChangeText={this.props.searchStaff}
        />
      </View>
    );
  };

  headerComponent = () => {
    return <View>{this.renderSearch()}</View>;
  };

  renderStaff = ({item}) => (
    <StaffItem
      {...this.props}
      key={item.id}
      avatar={item.avatar_url}
      phone={item.phone}
      email={item.email}
      name={item.name}
      base_id={item.base_id}
      department_id={item.department_id}
      role_id={item.role_id}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.staff}
        renderItem={this.renderStaff}
        contentContainerStyle={{flexGrow: 1}}
        onEndReached={this.props.loadStaff}
        ListHeaderComponent={this.headerComponent}
        ListEmptyComponent={
          this.props.isLoadingStaff ||
          this.props.isLoadingBase ||
          this.props.isLoadingDepartments ||
          this.props.isLoadingRoles ? (
            this.props.refreshingStaff ? (
              <View />
            ) : (
              <Loading size={width / 8} />
            )
          ) : this.props.refreshingStaff ? (
            <View />
          ) : (
            <View style={styles.container}>
              <Text style={{color: theme.dangerColor, fontSize: 16}}>
                Không có kết quả
              </Text>
            </View>
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshingStaff}
            onRefresh={this.props.onRefresh}
          />
        }
      />
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default StaffComponent;
