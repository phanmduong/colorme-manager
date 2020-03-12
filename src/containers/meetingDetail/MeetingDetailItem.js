/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';
import {observer} from 'mobx-react';
import {getMeetingStatus} from '../../helper';
import SwipeOut from 'react-native-swipeout';
import theme from '../../styles';

var {height, width} = Dimensions.get('window');

@observer
class MeetingDetailItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      rowIndex: null,
    };
  }

  onSwipeOpen = rowIndex => {
    this.setState({
      rowIndex: rowIndex,
    });
  };

  onSwipeClose(rowIndex) {
    if (rowIndex === this.state.rowIndex) {
      this.setState({rowIndex: null});
    }
  }

  render() {
    const {issues, participates, store} = this.props;

    const totalCheckIn = participates.filter(item => item.status == 'check_in')
      .length;
    const totalAccept = participates.filter(item => item.status == 'accept')
      .length;
    const totalReject = participates.filter(item => item.status == 'reject')
      .length;
    const totalPending = participates.filter(item => item.status == 'pending')
      .length;

    console.log(issues);

    const headerComponent = (
      <View style={styles.container}>
        {this.props.carouselProps}
        <View style={styles.containerParticipates}>
          <Text style={styles.titleParticipates}>
            Thành phần tham gia ({participates.length})
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.openModalParticipate(participates);
            }}>
            <View style={styles.contentParticipates}>
              <View style={styles.statusParticipates}>
                <Text style={styles.textStatus}>
                  <Text style={{fontWeight: 'bold'}}>{totalCheckIn} </Text>
                </Text>
                <Image
                  style={[styles.iconStatus]}
                  source={getMeetingStatus('check_in').icon}
                />
              </View>
              <View style={styles.statusParticipates}>
                <Text style={styles.textStatus}>
                  <Text style={{fontWeight: 'bold'}}>{totalAccept} </Text>
                </Text>
                <Image
                  style={[styles.iconStatus]}
                  source={getMeetingStatus('accept').icon}
                />
              </View>
              <View style={styles.statusParticipates}>
                <Text style={styles.textStatus}>
                  <Text style={{fontWeight: 'bold'}}>{totalReject} </Text>
                </Text>
                <Image
                  style={[styles.iconStatus]}
                  source={getMeetingStatus('reject').icon}
                />
              </View>
              <View style={styles.statusParticipates}>
                <Text style={styles.textStatus}>
                  <Text style={{fontWeight: 'bold'}}>{totalPending} </Text>
                  chưa trả lời
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.containerParticipates}>
          <Text style={styles.titleParticipates}>Các vấn đề cần xử lý</Text>
        </View>
      </View>
    );

    const footerComponent = <View style={{height: 50}} />;

    return (
      <FlatList
        data={issues}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={footerComponent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        refreshControl={
          <RefreshControl
            refreshing={store.refreshing}
            onRefresh={this.props.refreshMeetingDetail}
            titleColor={theme.mainColor}
            title="Đang tải..."
            tintColor="#d9534f"
            colors={['#d9534f']}
          />
        }
        renderItem={({item, index}) => {
          const rightButton = [
            {
              onPress: () => {
                this.props.store.deleteMeetingIssue(item.id);
              },
              text: 'Delete',
              type: 'delete',
            },
          ];
          return (
            <SwipeOut
              autoClose={true}
              backgroundColor={'white'}
              right={rightButton}
              onOpen={() => this.onSwipeOpen(index)}
              close={this.state.rowIndex !== index}
              onClose={() => this.onSwipeClose(index)}>
              <View style={styles.itemIssue}>
                <Image
                  style={styles.avatarIssue}
                  source={{uri: item.creator.avatar_url}}
                />
                <View>
                  <Text numberOfLines={2} style={styles.titleIssue}>
                    {item.issue}
                  </Text>
                  <Text style={styles.subTitleIssue}>{item.creator.name}</Text>
                </View>
              </View>
            </SwipeOut>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  containerAction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentTime: {
    flexDirection: 'column',
    flex: 1,
  },
  timeDate: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
  },
  timeMonth: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  timeHour: {
    color: 'white',
    fontSize: 12,
    marginVertical: 5,
  },
  contentTitle: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    textTransform: 'uppercase',
    flexWrap: 'wrap',
    flexDirection: 'row',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  issue: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 12,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  avatar: {
    width: 14,
    height: 14,
    marginRight: 5,
    borderRadius: 7,
  },
  numberParticipate: {
    borderRadius: 7,
    height: 14,
    alignItems: 'center',
    backgroundColor: 'white',
    fontSize: 12,
    paddingHorizontal: 5,
  },
  iconAction: {
    width: 35,
    height: 35,
  },
  textAction: {
    textAlign: 'center',
    paddingHorizontal: 15,
    fontSize: 10,
  },
  iconStatus: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  contentAction: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAction: {
    flexDirection: 'row',
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerParticipates: {
    flexDirection: 'column',
    marginTop: 20,
  },
  titleParticipates: {
    fontSize: 10,
  },
  contentParticipates: {
    borderRadius: 25,
    backgroundColor: '#ececec',
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  statusParticipates: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStatus: {
    fontSize: 12,
  },
  itemIssue: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  avatarIssue: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  titleIssue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 60,
  },
  subTitleIssue: {
    color: '#828282',
    fontSize: 12,
  },
  containerInput: {
    position: 'absolute',
    bottom: 0,
    width: width - 40,
  },
  createIssue: {
    borderRadius: 20,
    height: 40,
    flex: 1,
    backgroundColor: '#ececec',
    paddingHorizontal: 20,
    color: '#363636',
  },
});

export default MeetingDetailItem;
