import React from 'react';
import {View, Dimensions, Image, Text} from 'react-native';
import Loading from '../common/Loading';
import {dotNumber} from '../../helper';
import theme from '../../styles';
const {width} = Dimensions.get('window');
import moment from 'moment';

class InfoStudentHistoryCollectComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  convertPaymentMethod = (method) => {
    switch (method) {
      case 'internet_banking':
        return 'Chuyển khoản';
      case 'cash':
        return 'Tiền mặt';
      case 'swipe':
        return 'Quẹt thẻ';
      default:
        return '';
    }
  };

  renderCollect = () => {
    return this.props.historyCollect.map((collect) => (
      <View style={styles.listItemContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: collect.register.class.course.icon_url}}
            style={styles.classAva}
          />
          <Text numberOfLines={1} style={styles.className}>
            {collect.register.class.name}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.classAva} />
          <View style={styles.infoContainer}>
            <Text numberOfLines={1} style={styles.classInfoContainer}>
              Tạo vào lúc:{' '}
              {moment.unix(collect.created_at).format('HH:mm DD/MM/YYYY')}
            </Text>
            <Text numberOfLines={1} style={styles.classInfoContainer}>
              Ngày thực thu tiền:{' '}
              {moment.unix(collect.actual_input_at).format('DD/MM/YYYY')}
            </Text>
            <Text style={styles.classInfoContainer}>
              Ghi chú: {collect.register.note && collect.register.note}
            </Text>
            <Text numberOfLines={1} style={styles.classInfoContainer}>
              Người thu: {collect.staff.name}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.classAva} />
          <View style={[styles.infoContainer, {flexDirection: 'row'}]}>
            <View
              style={{
                ...styles.card,
                ...{
                  backgroundColor: '#C50000',
                  marginRight: 5,
                },
              }}>
              <Text style={styles.saler}>{dotNumber(collect.money)} vnđ</Text>
            </View>
            <View
              style={{
                ...styles.card,
                ...{
                  backgroundColor: '#2ACC4C',
                },
              }}>
              <Text style={styles.saler}>
                {this.convertPaymentMethod(collect.payment_method)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    ));
  };

  render() {
    if (this.props.isLoadingHistoryCollect) {
      return (
        <View style={{flex: 1}}>
          <Loading size={width / 8} />
        </View>
      );
    } else {
      return <View style={{flex: 1}}>{this.renderCollect()}</View>;
    }
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
  classInfoContainer: {
    paddingTop: 2,
    flex: 1,
    flexWrap: 'wrap',
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  card: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saler: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
};

export default InfoStudentHistoryCollectComponent;
