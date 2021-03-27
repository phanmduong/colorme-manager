import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  RefreshControl, SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CallRegisterModal from './infoStudent/CallRegisterModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShortName, isEmptyInput} from '../helper';
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import ChangePasswordModal from './infoStudent/ChangePasswordModal';
var {height, width} = Dimensions.get('window');

class InfoStudentComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      callModalVisible: false,
      changePasswordModalVisible: false,
    };
  }

  tabRegisters = () => {
    this.props.tabRegisters();
  };

  tabHistoryCalls = () => {
    this.props.tabHistoryCalls();
  };

  tabProgress = () => {
    this.props.tabProgress();
  };

  tabHistoryCollectMoney = () => {
    this.props.tabHistoryCollectMoney();
  };

  toggleCallModal = () => {
    this.setState({callModalVisible: !this.state.callModalVisible});
  };

  toggleChangePasswordModal = () => {
    this.setState({
      changePasswordModalVisible: !this.state.changePasswordModalVisible,
    });
  };

  render() {
    if (!this.props.isLoadingStudent) {
      let name = this.props.student.name;
      let phone = this.props.student.phone;
      let email = this.props.student.email;
      let avatar_url = this.props.student.avatar_url;
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, marginTop: 10}}
          refreshControl={
            <RefreshControl
              refreshing={
                this.props.refreshingRegisters ||
                this.props.refreshingHistoryCalls ||
                this.props.refreshingHistoryCollect ||
                this.props.refreshingProgress
              }
              onRefresh={() => this.props.onRefresh()}
            />
          }>
          <SafeAreaView
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name={'chevron-left'}
                size={33}
                color={'black'}
                onPress={() => this.props.navigation.goBack()}
              />
              {!isEmptyInput(avatar_url) ? (
                <Image source={{uri: avatar_url}} style={styles.ava} />
              ) : (
                <Image
                  source={require('../../assets/img/icons8-male-user-96.png')}
                  style={styles.ava}
                />
              )}
              <Text style={styles.name}>{getShortName(name)}</Text>
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() =>
                  this.props.navigation.navigate('InfoStudentDetails')
                }>
                <Image
                  source={require('../../assets/img/icons8-info_filled.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <View style={{height: 50}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.tabContainer}>
                <LinearGradient
                  colors={this.props.registersGradient}
                  style={styles.gradientSize}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <TouchableOpacity onPress={this.tabRegisters}>
                    <Text
                      style={[styles.tabText, this.props.registersTextColor]}>
                      Đăng ký
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                  colors={this.props.historyCallsGradient}
                  style={styles.gradientSize}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <TouchableOpacity onPress={this.tabHistoryCalls}>
                    <Text
                      style={[
                        styles.tabText,
                        this.props.historyCallsTextColor,
                      ]}>
                      Cuộc gọi
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                  colors={this.props.progressGradient}
                  style={styles.gradientSize}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <TouchableOpacity onPress={this.tabProgress}>
                    <Text
                      style={[styles.tabText, this.props.progressTextColor]}>
                      Học tập
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                  colors={this.props.historyCollectMoneyGradient}
                  style={styles.gradientSize}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <TouchableOpacity onPress={this.tabHistoryCollectMoney}>
                    <Text
                      style={[
                        styles.tabText,
                        this.props.historyCollectMoneyTextColor,
                      ]}>
                      Nộp tiền
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </ScrollView>
          </View>
          <View style={styles.essentialContainer}>
            <View style={styles.starContainer}>
              <Image
                source={require('../../assets/img/icons8-star-90.png')}
                style={{height: 18, width: 18}}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${phone}`);
                this.toggleCallModal();
              }}>
              <View style={[styles.essentialButton, {marginLeft: 15}]}>
                <Text style={{fontSize: 16}}>Gọi điện</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('SaveRegister', {
                  name: name,
                  phone: phone,
                  email: email,
                })
              }>
              <View style={[styles.essentialButton, {marginLeft: 15}]}>
                <Text style={{fontSize: 16}}>Đăng ký</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.toggleChangePasswordModal()}>
              <View style={[styles.essentialButton, {marginLeft: 10}]}>
                <Text style={{fontSize: 16}}>Đổi MK</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>{this.props.tabComponent}</View>
          {/*<CallRegisterModal*/}
          {/*  isVisible={this.state.callModalVisible}*/}
          {/*  onSwipeComplete={this.toggleCallModal}*/}
          {/*  imageSource={avatar_url}*/}
          {/*  email={email}*/}
          {/*  phone={phone}*/}
          {/*  changeCallStatus={this.props.changeCallStatus}*/}
          {/*  student_id={this.props.student_id}*/}
          {/*  token={this.props.token}*/}
          {/*  errorChangeCallStatus={this.props.errorChangeCallStatus}*/}
          {/*/>*/}
          <CallRegisterModal
            {...this.props}
            isVisible={this.state.callModalVisible}
            onSwipeComplete={this.toggleCallModal}
            avatar_url={avatar_url}
            email={email}
            phone={phone}
            changeCallStatus={this.props.changeCallStatus}
            studentId={this.props.student_id}
          />
          <ChangePasswordModal
            {...this.props}
            isVisible={this.state.changePasswordModalVisible}
            changePassword={this.props.changePassword}
            closeModal={this.toggleChangePasswordModal}
          />
        </ScrollView>
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

const styles = StyleSheet.create({
  tabContainer: {
    marginTop: 5,
    flexDirection: 'row',
    paddingHorizontal: theme.mainHorizontal,
  },
  gradientSize: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 104,
    height: 35,
    borderRadius: 24,
  },
  tabText: {
    fontSize: 16,
  },
  essentialContainer: {
    flexDirection: 'row',
    marginHorizontal: theme.mainHorizontal,
    marginVertical: 20,
  },
  starContainer: {
    width: theme.mainAvatar.width,
    height: theme.mainAvatar.height,
    borderRadius: theme.mainAvatar.borderRadius,
    backgroundColor: '#FCCD03',
    justifyContent: 'center',
    alignItems: 'center',
  },
  essentialButton: {
    backgroundColor: '#F6F6F6',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  ava: theme.mainAvatar,
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  btnContainer: {
    padding: 8,
    backgroundColor: '#F6F6F6',
    marginLeft: 10,
    borderRadius: 18,
  },
  icon: {
    width: 18,
    height: 18,
  },
  name: {
    fontWeight: '600',
    fontSize: 23,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InfoStudentComponent;
