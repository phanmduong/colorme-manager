import React from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import theme from '../../styles';
import {dotNumber, getShortName, isEmptyInput} from '../../helper';
import CallRegisterModal from './CallRegisterModal';
import SubmitMoneyModal from './SubmitMoneyModal';
import moment from 'moment';

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
            source={{uri: this.props.register.class.course.icon_url}}
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
              {this.props.register.saler && (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !this.props.register.saler.color ||
                        this.props.register.saler.color === ''
                          ? theme.processColor1
                          : this.props.register.saler.color,
                    },
                  }}>
                  <Text style={styles.saler}>
                    {getShortName(this.props.register.saler.name)}
                  </Text>
                </View>
              )}
              {this.props.register.source && (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !this.props.register.source.color ||
                        this.props.register.source.color === ''
                          ? theme.processColor1
                          : this.props.register.source.color,
                    },
                  }}>
                  <Text style={styles.campaign}>
                    {this.props.register.source.name.trim()}
                  </Text>
                </View>
              )}
              {this.props.register.campaign && (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !this.props.register.campaign.color ||
                        this.props.register.campaign.color === ''
                          ? theme.processColor1
                          : this.props.register.campaign.color,
                    },
                  }}>
                  <Text style={styles.campaign}>
                    {this.props.register.campaign.name.trim()}
                  </Text>
                </View>
              )}
              {this.props.register.register_status && (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !this.props.register.register_status.color ||
                        this.props.register.register_status.color === ''
                          ? theme.processColor1
                          : this.props.register.register_status.color,
                    },
                  }}>
                  <Text style={styles.campaign}>
                    {this.props.register.register_status.name.trim()}
                  </Text>
                </View>
              )}
              {this.props.register.coupons.length > 0 &&
                this.props.register.coupons.map((coupon) => (
                  <View
                    style={{
                      ...styles.card,
                      ...{
                        backgroundColor:
                          !coupon.color || coupon.color === ''
                            ? theme.processColor1
                            : coupon.color,
                      },
                    }}>
                    <Text style={styles.campaign}>{coupon.name.trim()}</Text>
                  </View>
                ))}
            </View>
            <View>
              {this.props.register.created_at && (
                <Text
                  numberOfLines={1}
                  style={[styles.classInfoContainer, {paddingTop: 0}]}>
                  Tạo vào lúc:{' '}
                  {moment
                    .unix(this.props.register.created_at)
                    .format('HH:mm DD/MM/YYYY')}
                </Text>
              )}
              {!isEmptyInput(this.props.register.paid_time) && (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  Nộp tiền lúc:{' '}
                  {moment
                    .unix(this.props.register.paid_time)
                    .format('HH:mm DD/MM/YYYY')}
                </Text>
              )}
              {!isEmptyInput(this.props.register.code) && (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  Mã đăng kí: {this.props.register.code}
                </Text>
              )}
              {!isEmptyInput(this.props.register.class.datestart) && (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  Ngày khai giảng:{' '}
                  {moment
                    .unix(this.props.register.class.datestart)
                    .format('HH:mm DD/MM/YYYY')}
                </Text>
              )}
              {!isEmptyInput(this.props.register.class.study_time) && (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {this.props.register.class.study_time}
                </Text>
              )}
              {!isEmptyInput(this.props.register.class.base) && (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {this.props.register.class.base.name}:{' '}
                  {this.props.register.class.base.address}
                </Text>
              )}
              {!isEmptyInput(this.props.register.class.description) && (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {this.props.register.class.description}
                </Text>
              )}
              {!isEmptyInput(this.props.register.received_book_at) ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  Đã nhận giáo trình ngày:{' '}
                  {moment
                    .unix(this.props.register.received_book_at)
                    .format('DD/MM/YYYY')}
                </Text>
              ) : (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  Chưa nhận giáo trình
                </Text>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${this.props.register.phone}`);
                  this.toggleCallModal();
                }}>
                <View style={styles.button}>
                  <Text style={{fontSize: 16}}>Gọi điện</Text>
                </View>
              </TouchableOpacity>
              {!this.props.register.paid_time ? (
                <TouchableOpacity onPress={() => this.toggleMoneyModal()}>
                  <View style={styles.button}>
                    <Text style={{fontSize: 16}}>Nộp học phí</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => this.toggleMoneyModal()}>
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
          {...this.props}
          isVisible={this.state.callModalVisible}
          onSwipeComplete={this.toggleCallModal}
          avatar_url={this.props.register.avatar_url}
          email={this.props.register.email}
          phone={this.props.register.phone}
          changeCallStatus={this.props.changeCallStatus}
          student_id={this.props.register.student_id}
        />
        <SubmitMoneyModal
          {...this.props}
          isVisible={this.state.moneyModalVisible}
          onSwipeComplete={this.toggleMoneyModal}
          avatar_url={this.props.register.avatar_url}
          name={this.props.register.name}
          submitMoney={this.props.submitMoney}
          registerId={this.props.register.id}
          errorSubmitMoney={this.props.errorSubmitMoney}
          classItem={this.props.register.class}
          code={this.props.register.code}
          receivedBook={
            this.props.register.received_book_at &&
            moment(this.props.register.received_book_at).unix()
          }
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
    flex: 1,
    flexWrap: 'wrap',
  },
  containerSubTitle: {
    flexDirection: 'row',
    marginBottom: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  card: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
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
