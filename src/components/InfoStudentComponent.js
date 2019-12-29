import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CallRegisterModal from './infoStudent/CallRegisterModal';

class InfoStudentComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      callModalVisible: false,
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

  render() {
    let name = this.props.navigation.getParam('name');
    let phone = this.props.navigation.getParam('phone');
    let email = this.props.navigation.getParam('email');
    let avatar_url = this.props.navigation.getParam('avatar_url');
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View style={{height: 50}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.tabContainer}>
              <LinearGradient
                colors={this.props.registersGradient}
                style={styles.gradientSize}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <TouchableOpacity onPress={this.tabRegisters}>
                  <Text style={[styles.tabText, this.props.registersTextColor]}>
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
                    style={[styles.tabText, this.props.historyCallsTextColor]}>
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
                  <Text style={[styles.tabText, this.props.progressTextColor]}>
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
                isSubScreen: false,
              })
            }>
            <View style={[styles.essentialButton, {marginLeft: 10}]}>
              <Text style={{fontSize: 16}}>Đăng ký</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>{this.props.tabComponent}</View>
        <CallRegisterModal
          isVisible={this.state.callModalVisible}
          onSwipeComplete={this.toggleCallModal}
          imageSource={avatar_url}
          email={email}
          phone={phone}
          changeCallStatus={this.props.changeCallStatus}
          student_id={this.props.student_id}
          token={this.props.token}
          errorChangeCallStatus={this.props.errorChangeCallStatus}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    marginTop: 5,
    flexDirection: 'row',
    paddingHorizontal: 16,
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
    marginHorizontal: 16,
    marginVertical: 20,
  },
  starContainer: {
    width: 37,
    height: 37,
    borderRadius: 19,
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
});

export default InfoStudentComponent;
