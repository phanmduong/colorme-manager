import React from 'react';
import {
  View,
  FlatList,
  Text,
  Dimensions,
  RefreshControl,
  Image,
} from 'react-native';
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
var {width, height} = Dimensions.get('window');
import HTML from 'react-native-render-html';

class NotificationComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      page: 1,
    };
  }

  renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: item.image_url}}
          style={{height: 50, width: 50, borderRadius: 30}}
        />
        <View style={{flex: 1, flexWrap: 'wrap', marginLeft: 15}}>
          <HTML html={item.message} baseFontStyle={{fontSize: 16}} />
          <Text style={styles.itemText}>{item.created_at}</Text>
        </View>
      </View>
    </View>
  );

  handleLoadMore = () => {
    this.setState({page: this.state.page + 1}, () => {
      this.props.loadMoreNotifications(this.state.page);
    });
  };

  handleRefresh = () => {
    this.setState({page: 1}, () => {
      this.props.refreshNotifications(this.state.page);
    });
  };

  emptyData = () => {
    return (
      <View>
        <View style={styles.noNotificationContainer}>
          <Text style={styles.noNotificationText}>Không có thông báo nào</Text>
        </View>
      </View>
    );
  };

  render() {
    if (!this.props.isLoadingNotifications) {
      return (
        <FlatList
          data={this.props.notifications}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          onEndReached={this.handleLoadMore}
          ListEmptyComponent={
            this.props.isRefreshingNotifications ? null : this.emptyData
          }
          refreshControl={
            <RefreshControl
              refreshing={this.props.isRefreshingNotifications}
              onRefresh={this.handleRefresh}
              titleColor={theme.mainColor}
              title="Đang tải..."
              tintColor="#d9534f"
              colors={['#d9534f']}
            />
          }
        />
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <Spinkit
              isVisible
              color={theme.mainColor}
              type="Wave"
              size={width / 8}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotificationContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  noNotificationText: {
    color: '#707070',
    fontSize: 16,
  },
  itemContainer: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  itemText: {
    fontSize: 14,
    color: '#707070',
    paddingTop: 5,
  },
};

export default NotificationComponent;
