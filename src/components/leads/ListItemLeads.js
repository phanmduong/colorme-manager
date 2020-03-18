import React from 'react';
import {
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Thumbnail} from 'native-base';
import theme from '../../styles';
import {getShortName} from '../../helper';
import Call from '../common/Call';
import CallRegisterModal from '../infoStudent/CallRegisterModal';

class ListItemLeads extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      callModalVisible: false,
    };
  }

  renderStars = number => {
    switch (number) {
      case 1:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
          </View>
        );
      case 4:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
          </View>
        );
      case 5:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
          </View>
        );
      default:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
          </View>
        );
    }
  };

  render() {
    const {
      avatar_url,
      name,
      email,
      rate,
      phone,
      campaign,
      source,
      carer,
      lead_status,
      city,
    } = this.props;
    return (
      <View style={styles.containerAll}>
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
                source={{uri: avatar_url}}
                style={theme.mainAvatar}
              />
            </View>
            <Text numberOfLines={1} style={styles.className}>
              {name}
            </Text>
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
              {carer && carer.name && carer.color ? (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !carer.color || carer.color === ''
                          ? theme.processColor1
                          : '#' + carer.color,
                      marginRight: 5,
                    },
                  }}>
                  <Text style={styles.saler}>{getShortName(carer.name)}</Text>
                </View>
              ) : (
                <View />
              )}
              {campaign && campaign.name && campaign.color ? (
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
              {source && source.name && source.color ? (
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
              {lead_status && lead_status.name && lead_status.color ? (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !lead_status.color || lead_status.color === ''
                          ? theme.processColor1
                          : lead_status.color,
                    },
                  }}>
                  <Text style={styles.campaign}>{lead_status.name.trim()}</Text>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.renderStars(rate)}
              {email ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {email}
                </Text>
              ) : null}
              {phone ? (
                <Call
                  extraPadding={{paddingTop: 5, fontSize: 15}}
                  url={'tel:' + phone}
                  phone={phone}
                />
              ) : null}
              {city ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  TP. {city}
                </Text>
              ) : null}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${phone}`);
                  this.toggleCallModal();
                }}>
                <View style={styles.button}>
                  <Text style={{fontSize: 16}}>Gọi điện</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.button}>
                  <Text style={{fontSize: 16}}>Chỉnh sửa</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/*<CallRegisterModal*/}
          {/*  isVisible={this.state.callModalVisible}*/}
          {/*  onSwipeComplete={this.toggleCallModal}*/}
          {/*  imageSource={avatar_url}*/}
          {/*  email={email}*/}
          {/*  phone={phone}*/}
          {/*  changeCallStatus={this.props.changeCallStatus}*/}
          {/*  student_id={studentId}*/}
          {/*  token={this.props.token}*/}
          {/*  errorChangeCallStatus={this.props.errorChangeCallStatus}*/}
          {/*/>*/}
        </View>
      </View>
    );
  }
}

const styles = {
  containerAll: {
    paddingHorizontal: 16,
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
    marginHorizontal: 16,
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
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  collectedButton: {
    backgroundColor: '#C50000',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
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
  rateIcon: {
    width: 10,
    height: 10,
    marginRight: 2,
  },
  rateRow: {
    flexDirection: 'row',
  },
};

export default ListItemLeads;
