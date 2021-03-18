import React from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import theme from '../../styles';
import {dotNumber, getShortName} from '../../helper';
import CallRegisterModal from './CallRegisterModal';
import SubmitMoneyModal from './SubmitMoneyModal';
import ActionSheet from 'react-native-actionsheet';

class ListItemInfoStudentRegister extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      callModalVisible: false,
      moneyModalVisible: false,
    };
  }

  toggleCallModal = () => {
    this.setState({callModalVisible: !this.state.callModalVisible});
  };

  toggleMoneyModal = () => {
    this.setState({moneyModalVisible: !this.state.moneyModalVisible});
  };

  render() {
    return (
      <View style={styles.listItemContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: this.props.register.class.avatar_url}}
            style={styles.classAva}
          />
          <Text numberOfLines={1} style={styles.className}>
            {this.props.register.class.name}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.classAva} />
          <View style={styles.infoContainer}>
            <View style={styles.containerSubTitle}>
              {this.props.register.saler ? (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !this.props.register.saler.color ||
                        this.props.register.saler.color === ''
                          ? theme.processColor1
                          : '#' + this.props.register.saler.color,
                      marginRight: 5,
                    },
                  }}>
                  <Text style={styles.saler}>
                    {getShortName(this.props.register.saler.name)}
                  </Text>
                </View>
              ) : (
                <View />
              )}
              {this.props.register.campaign ? (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !this.props.register.campaign.color ||
                        this.props.register.campaign.color === ''
                          ? theme.processColor1
                          : '#' + this.props.register.campaign.color,
                    },
                  }}>
                  <Text style={styles.campaign}>
                    {this.props.register.campaign.name.trim()}
                  </Text>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              <Text
                numberOfLines={1}
                style={[styles.classInfoContainer, {paddingTop: 0}]}>
                Đăng kí {this.props.register.created_at_cal}
              </Text>
              {this.props.register.paid_status ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  Đã nộp tiền {this.props.register.paid_time}
                </Text>
              ) : null}
              {this.props.register.class.study_time ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {this.props.register.class.study_time}
                </Text>
              ) : null}
              {this.props.register.class.base ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {this.props.register.class.room} -{' '}
                  {this.props.register.class.base}
                </Text>
              ) : null}
              {this.props.register.class.description ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {this.props.register.class.description}
                </Text>
              ) : null}
              {this.props.register.note ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {this.props.register.note}
                </Text>
              ) : null}
            </View>
            <View style={styles.buttonContainer}>
              {/*<TouchableOpacity*/}
              {/*  disabled={true}*/}
              {/*  onPress={() => {*/}
              {/*    Linking.openURL(`tel:${this.props.register.phone}`);*/}
              {/*    this.toggleCallModal();*/}
              {/*  }}>*/}
              {/*  <View style={styles.button}>*/}
              {/*    <Text style={{fontSize: 16}}>Gọi điện</Text>*/}
              {/*  </View>*/}
              {/*</TouchableOpacity>*/}
              {!this.props.register.paid_status ? (
                <TouchableOpacity
                    // onPress={() => this.toggleMoneyModal()}
                >
                  <View style={styles.button}>
                    <Text style={{fontSize: 16}}>Nộp học phí</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                    // onPress={() => this.toggleMoneyModal()}
                >
                  <View style={styles.collectedButton}>
                    <Text style={{fontSize: 16, color: 'white'}}>
                      {dotNumber(this.props.register.money)} vnđ
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <CallRegisterModal
          isVisible={this.state.callModalVisible}
          onSwipeComplete={this.toggleCallModal}
          imageSource={this.props.register.avatar_url}
          email={this.props.register.email}
          phone={this.props.register.phone}
          changeCallStatus={this.props.changeCallStatus}
          student_id={this.props.register.student_id}
          token={this.props.token}
          errorChangeCallStatus={this.props.errorChangeCallStatus}
        />
        <SubmitMoneyModal
          isVisible={this.state.moneyModalVisible}
          onSwipeComplete={this.toggleMoneyModal}
          avatar_url={this.props.register.avatar_url}
          classAva={this.props.register.class.avatar_url}
          name={this.props.register.name}
          next_code={this.props.register.next_code}
          next_waiting_code={this.props.register.next_waiting_code}
          token={this.props.token}
          submitMoney={this.props.submitMoney}
          register_id={this.props.register.id}
          errorSubmitMoney={this.props.errorSubmitMoney}
          room={this.props.register.class.room}
          base={this.props.register.class.base}
          className={this.props.register.class.name}
          study_time={this.props.register.class.study_time}
          description={this.props.register.class.description}
          type={this.props.register.class.type}
        />
      </View>
    );
  }
}

const styles = {
  listItemContainer: {
    marginHorizontal: theme.mainHorizontal,
    marginVertical: 10,
  },
  classAva: theme.mainAvatar,
  className: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
  containerSubTitle: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  card: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 5,
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
    paddingTop: 2,
    flex: 1,
    flexWrap: 'wrap',
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
};

export default ListItemInfoStudentRegister;
