import React from 'react';
import {
  Image,
  Linking,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
} from 'react-native';
import {View, Thumbnail} from 'native-base';
import theme from '../../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {dotNumber, getShortName, isEmptyInput} from '../../helper';
import CallRegisterModal from '../infoStudent/CallRegisterModal';
import SubmitMoneyModal from '../infoStudent/SubmitMoneyModal';
import Call from '../common/Call';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ActionSheet from 'react-native-actionsheet';
import ChangeStudentClassModal from './ChangeStudentClassModal';
import * as moment from 'moment';

class ListItemStudent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      callModalVisible: false,
      moneyModalVisible: false,
      changeClassModalVisible: false,
    };
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  executeActions = (index) => {
    switch (index) {
      case 0:
        this.toggleChangeClassModal();
        break;
      default:
        return;
    }
  };

  toggleChangeClassModal = () => {
    this.setState({
      changeClassModalVisible: !this.state.changeClassModalVisible,
    });
  };

  toggleCallModal = () => {
    this.setState({callModalVisible: !this.state.callModalVisible});
  };

  toggleMoneyModal = () => {
    this.setState({moneyModalVisible: !this.state.moneyModalVisible});
  };

  getSource = () => {
    return this.props.sources.find(
      (source) => source.id === this.props.source_id,
    );
  };

  content() {
    const {
      saler,
      campaign,
      callStatus,
      money,
      registerId,
      created_at,
      paidTime,
      source,
      register_status,
      user,
      classItem,
      code,
      receivedBook,
    } = this.props;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={{position: 'relative'}}>
              {classItem && classItem.course && (
                <Thumbnail
                  small
                  source={{uri: classItem.course.icon_url}}
                  style={theme.mainAvatar}
                />
              )}
              <View
                style={{
                  ...styles.dotCall,
                  ...{
                    backgroundColor:
                      callStatus === 'not-yet'
                        ? '#bdbdbd'
                        : callStatus === 'success'
                        ? '#4dc151'
                        : theme.secondColor,
                  },
                }}
              />
            </View>
            <Text numberOfLines={1} style={styles.className}>
              {user && user.name}
            </Text>
            {paidTime && (
              <MaterialCommunityIcons
                name="checkbox-marked-circle"
                color={money <= 0 ? '#bdbdbd' : '#4dc151'}
                size={12}
              />
            )}
          </View>
          <Image
            source={require('../../../assets/img/icons8-more-than-100.png')}
            style={{width: 15, height: 15}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.classAva} />
          <View style={styles.infoContainer}>
            <View style={styles.containerSubTitle}>
              {saler && !isEmptyInput(saler.name) && (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !saler.color || saler.color === ''
                          ? theme.processColor1
                          : saler.color,
                      marginRight: 5,
                    },
                  }}>
                  <Text style={styles.saler}>{getShortName(saler.name)}</Text>
                </View>
              )}
              {campaign && !isEmptyInput(campaign.name) && (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !campaign.color || campaign.color === ''
                          ? theme.processColor1
                          : campaign.color,
                      marginRight: 5,
                    },
                  }}>
                  <Text style={styles.campaign}>{campaign.name.trim()}</Text>
                </View>
              )}
              {source && !isEmptyInput(source.name) && (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !source.color || source.color === ''
                          ? theme.processColor1
                          : source.color,
                      marginRight: 5,
                    },
                  }}>
                  <Text style={styles.campaign}>{source.name.trim()}</Text>
                </View>
              )}
              {register_status &&
                !isEmptyInput(register_status.name) &&
                !isEmptyInput(register_status.color) && (
                  <View
                    style={{
                      ...styles.card,
                      ...{
                        backgroundColor:
                          !register_status.color || register_status.color === ''
                            ? theme.processColor1
                            : register_status.color,
                      },
                    }}>
                    <Text style={styles.campaign}>
                      {register_status.name.trim()}
                    </Text>
                  </View>
                )}
            </View>
            <View>
              {user && !isEmptyInput(user.phone.trim()) && (
                <Call
                  extraPadding={{paddingTop: 0, fontSize: 15}}
                  url={'tel:' + user.phone}
                  phone={user.phone}
                />
              )}
              {created_at && (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  Đăng kí {moment.unix(created_at).format('DD/MM/YYYY')}
                </Text>
              )}
              {paidTime ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  Đã nộp tiền {moment.unix(paidTime).format('DD/MM/YYYY')}
                </Text>
              ) : null}
              {classItem && !isEmptyInput(classItem.name) ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {classItem.name}
                </Text>
              ) : null}
              {classItem && !isEmptyInput(classItem.study_time) ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {classItem.study_time}
                </Text>
              ) : null}
              {classItem &&
              classItem.base &&
              !isEmptyInput(classItem.base.name) &&
              !isEmptyInput(classItem.base.address) ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {classItem.base.name} - {classItem.base.address}
                </Text>
              ) : null}
              {classItem && !isEmptyInput(classItem.description) ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {classItem.description}
                </Text>
              ) : null}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  if (user && !isEmptyInput(user.phone)) {
                    Linking.openURL(`tel:${user.phone}`);
                  }
                  this.toggleCallModal();
                }}>
                <View style={styles.button}>
                  <Text style={{fontSize: 16}}>Gọi điện</Text>
                </View>
              </TouchableOpacity>
              {!paidTime ? (
                <TouchableOpacity onPress={() => this.toggleMoneyModal()}>
                  <View style={styles.button}>
                    <Text style={{fontSize: 16}}>Nộp học phí</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => this.toggleMoneyModal()}>
                  <View style={styles.collectedButton}>
                    <Text style={{fontSize: 16, color: 'white'}}>
                      {dotNumber(money)} vnđ
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={this.showActionSheet}>
                <View style={styles.button}>
                  <MaterialIcon
                    name={'arrow-drop-down'}
                    size={20}
                    color={'black'}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <ActionSheet
            ref={(o) => (this.ActionSheet = o)}
            title={'Chọn hành động'}
            options={['Đổi lớp', 'Hủy']}
            cancelButtonIndex={1}
            onPress={this.executeActions}
          />
          <CallRegisterModal
            {...this.props}
            isVisible={this.state.callModalVisible}
            onSwipeComplete={this.toggleCallModal}
            avatar_url={
              user && !isEmptyInput(user.avatar_url) && user.avatar_url
            }
            email={user && !isEmptyInput(user.email) && user.email}
            phone={user && !isEmptyInput(user.phone) && user.phone}
            changeCallStatus={this.props.changeCallStatus}
            studentId={user && user.id}
          />
          <SubmitMoneyModal
            {...this.props}
            isVisible={this.state.moneyModalVisible}
            onSwipeComplete={this.toggleMoneyModal}
            avatar_url={
              user && !isEmptyInput(user.avatar_url) && user.avatar_url
            }
            name={user && !isEmptyInput(user.name) && user.name}
            submitMoney={this.props.submitMoney}
            registerId={registerId}
            errorSubmitMoney={this.props.errorSubmitMoney}
            classItem={classItem}
            code={code}
            receivedBook={receivedBook}
          />
          <ChangeStudentClassModal
            isVisible={this.state.changeClassModalVisible}
            closeModal={this.toggleChangeClassModal}
            registerId={registerId}
            loadAvailableClasses={this.props.loadAvailableClasses}
            availableClasses={this.props.availableClasses}
            isLoadingAvailableClasses={this.props.isLoadingAvailableClasses}
            resetAvailableClasses={this.props.resetAvailableClasses}
            changingClass={this.props.changingClass}
            changeClassStatus={this.props.changeClassStatus}
            changeClass={this.props.changeClass}
            avatar_url={user && user.avatar_url && user.avatar_url}
          />
        </View>
      </>
    );
  }

  render() {
    const {user} = this.props;
    if (Platform.OS === 'ios') {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              if (user && user.id) {
                this.props.setStudentId(user.id);
                this.props.navigation.navigate('InfoStudent', {
                  studentId: user.id,
                });
              }
            }}>
            <View style={styles.containerAll}>{this.content()}</View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableNativeFeedback
            onPress={() => {
              if (user && user.id) {
                this.props.setStudentId(user.id);
                this.props.navigation.navigate('InfoStudent', {
                  studentId: user.id,
                });
              }
            }}>
            <View style={styles.containerAll}>{this.content()}</View>
          </TouchableNativeFeedback>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerAll: {
    paddingHorizontal: theme.mainHorizontal,
    paddingVertical: 16,
  },
  containerExpand: {
    marginLeft: 55,
    paddingTop: 5,
  },
  content: {
    flex: 1,
    marginLeft: 20,
  },
  containerTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    fontWeight: '900',
    fontSize: Platform.isPad ? 18 : 13,
    marginRight: 5,
  },
  subTitle: {
    color: '#7d7d7d',
    fontSize: 12,
  },
  icon: {
    fontSize: 20,
    color: theme.colorTitle,
  },
  line: {
    height: 1,
    backgroundColor: theme.borderColor,
    marginRight: 20,
    marginLeft: 75,
  },
  email: {
    color: theme.colorSubTitle,
    marginTop: 5,
    fontSize: Platform.isPad ? 18 : 13,
  },
  contentTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotCall: {
    position: 'absolute',
    top: 25,
    left: 25,
    height: 12,
    width: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'white',
  },

  listItemContainer: {
    marginHorizontal: theme.mainHorizontal,
    marginVertical: 10,
  },
  classAva: {
    width: 37,
    height: 37,
    borderRadius: 19,
  },
  className: {
    fontSize: theme.title.fontSize,
    fontWeight: theme.title.fontWeight,
    marginLeft: 15,
    marginRight: 5,
  },
  containerSubTitle: {
    flexDirection: 'row',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  card: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saler: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  campaign: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 18,
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
    marginRight: 10,
  },
  collectedButton: {
    backgroundColor: '#C50000',
    paddingHorizontal: 18,
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
    marginRight: 10,
  },
  classInfoContainer: {
    paddingTop: 5,
    flex: 1,
    flexWrap: 'wrap',
    color: '#707070',
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
};

export default ListItemStudent;
