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
import {dotNumber, getShortName} from '../../helper';
import CallRegisterModal from '../infoStudent/CallRegisterModal';
import SubmitMoneyModal from '../infoStudent/SubmitMoneyModal';
import Call from '../common/Call';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ActionSheet from 'react-native-actionsheet';
import ChangeStudentClassModal from './ChangeStudentClassModal';

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

  content() {
    const {
      name,
      avatar,
      saler,
      campaign,
      callStatus,
      classInfo,
      paidStatus,
      money,
      phone,
      email,
      avatar_url,
      studentId,
      next_code,
      next_waiting_code,
      registerId,
      created_at_cal,
      paidTime,
      source,
      register_status,
    } = this.props;
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{position: 'relative'}}>
              <Thumbnail
                small
                source={{uri: avatar}}
                style={theme.mainAvatar}
              />
              <View
                style={{
                  ...styles.dotCall,
                  ...{
                    backgroundColor:
                      callStatus === 'uncall'
                        ? '#bdbdbd'
                        : callStatus === 'success'
                        ? '#4dc151'
                        : theme.secondColor,
                  },
                }}
              />
            </View>
            <Text numberOfLines={1} style={styles.className}>
              {name}
            </Text>
            {paidStatus ? (
              <MaterialCommunityIcons
                name="checkbox-marked-circle"
                color={money <= 0 ? '#bdbdbd' : '#4dc151'}
                size={12}
              />
            ) : (
              <View />
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
              {saler ? (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !saler.color || saler.color === ''
                          ? theme.processColor1
                          : '#' + saler.color,
                      marginRight: 5,
                    },
                  }}>
                  <Text style={styles.saler}>{getShortName(saler.name)}</Text>
                </View>
              ) : (
                <View />
              )}
              {campaign ? (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !campaign.color || campaign.color === ''
                          ? theme.processColor1
                          : '#' + campaign.color,
                      marginRight: 5,
                    },
                  }}>
                  <Text style={styles.campaign}>{campaign.name.trim()}</Text>
                </View>
              ) : (
                <View />
              )}
              {source ? (
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
              ) : (
                <View />
              )}
              {register_status &&
              register_status.name &&
              register_status.color ? (
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
              ) : (
                <View />
              )}
            </View>
            <View>
              <Call
                extraPadding={{paddingTop: 0, fontSize: 15}}
                url={'tel:' + phone}
                phone={phone}
              />
              <Text numberOfLines={1} style={styles.classInfoContainer}>
                Đăng kí {created_at_cal}
              </Text>
              {paidStatus ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  Đã nộp tiền {paidTime}
                </Text>
              ) : null}
              {classInfo.name ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {classInfo.name}
                </Text>
              ) : null}
              {classInfo.study_time ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {classInfo.study_time}
                </Text>
              ) : null}
              {classInfo.base ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {classInfo.room} - {classInfo.base}
                </Text>
              ) : null}
              {classInfo.description ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {classInfo.description}
                </Text>
              ) : null}
            </View>
            <View style={styles.buttonContainer}>
              {/*<TouchableOpacity*/}
              {/*  onPress={() => {*/}
              {/*    Linking.openURL(`tel:${phone}`);*/}
              {/*    this.toggleCallModal();*/}
              {/*  }}>*/}
              {/*  <View style={styles.button}>*/}
              {/*    <Text style={{fontSize: 16}}>Gọi điện</Text>*/}
              {/*  </View>*/}
              {/*</TouchableOpacity>*/}
              {!paidStatus ? (
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
                <View style={[{marginLeft: 10}, styles.button]}>
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
            isVisible={this.state.callModalVisible}
            onSwipeComplete={this.toggleCallModal}
            imageSource={avatar_url}
            email={email}
            phone={phone}
            changeCallStatus={this.props.changeCallStatus}
            student_id={studentId}
            token={this.props.token}
            errorChangeCallStatus={this.props.errorChangeCallStatus}
          />
          <SubmitMoneyModal
            isVisible={this.state.moneyModalVisible}
            onSwipeComplete={this.toggleMoneyModal}
            avatar_url={avatar_url}
            classAva={classInfo.avatar_url}
            name={name}
            next_code={next_code}
            next_waiting_code={next_waiting_code}
            token={this.props.token}
            submitMoney={this.props.submitMoney}
            register_id={registerId}
            errorSubmitMoney={this.props.errorSubmitMoney}
            room={classInfo.room}
            base={classInfo.base}
            className={classInfo.name}
            study_time={classInfo.study_time}
            description={classInfo.description}
            type={classInfo.type}
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
            avatar_url={avatar}
          />
        </View>
      </View>
    );
  }

  render() {
    let studentId = this.props.studentId;
    if (Platform.OS === 'ios') {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.setStudentId(studentId);
              this.props.navigation.navigate('InfoStudent', {
                studentId: studentId,
              });
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
              this.props.setStudentId(studentId);
              this.props.navigation.navigate('InfoStudent', {
                studentId: studentId,
              });
            }}>
            <View style={styles.containerAll}>{this.content()}</View>
          </TouchableNativeFeedback>
        </View>
      );
    }
  }
}

const styles = {
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
  },
  collectedButton: {
    backgroundColor: '#C50000',
    paddingHorizontal: 18,
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
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
