import React from 'react';
import {Dimensions, RefreshControl} from 'react-native';
import {Text, View, List} from 'native-base';
import Loading from '../common/Loading';
import Search from '../common/Search';
import ListItemStaffMoneyTransfer from './ListItemStaffMoneyTransfer';
import theme from '../../styles';

var {height, width} = Dimensions.get('window');
let self;

class SearchStaffMoneyTransferComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    self = this;
  }

  renderSearch = () => {
    const {updateFormAndLoadDataSearch, search} = this.props;
    return (
      <Search
        placeholder="Tìm kiếm (Email, tên, số điện thoại)"
        onChangeText={updateFormAndLoadDataSearch}
        value={search}
        autoFocus={false}
      />
    );
  };

  renderContent() {
    return (
      <List
        style={styles.list}
        onEndReached={this.props.loadDataStaffList}
        dataArray={this.props.staffList}
        renderRow={(item, sectionID, rowID) => {
          return (
            <ListItemStaffMoneyTransfer
              postTransaction={this.props.postTransaction}
              userId={item.id}
              name={item.name}
              avatar={item.avatar_url}
              email={item.email}
              phone={item.phone}
              role={this.props.user.role}
              money={item.money}
              isTransaction={item.isTransaction || this.props.user.status == 2}
            />
          );
        }}
        ListHeaderComponent={this.renderSearch}
        contentContainerStyle={{flexGrow: 1}}
        ListEmptyComponent={
          this.props.isLoading ? (
            this.props.refreshing ? (
              <View />
            ) : (
              <Loading size={width / 8} />
            )
          ) : this.props.refreshing ? (
            <View />
          ) : (
            <View style={styles.container}>
              <Text style={{color: theme.dangerColor, fontSize: 16}}>
                Không có kết quả
              </Text>
            </View>
          )
        }
        renderFooter={() => {
          if (this.props.isLoading) {
            return (
              <View style={styles.loading}>
                <Loading size={width / 12} />
              </View>
            );
          } else {
            <View />;
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.props.onRefresh}
          />
        }
      />
    );
  }

  render() {
    return (
      <View style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  list: {},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: '#d9534f',
    textAlign: 'center',
  },
  loading: {
    height: 95,
  },
  headerContainer: {
    marginHorizontal: theme.mainHorizontal,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'black',
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerAva: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
};

export default SearchStaffMoneyTransferComponent;
