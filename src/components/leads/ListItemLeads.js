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
import {getShortName, isEmptyInput} from '../../helper';
import Call from '../common/Call';
import CallRegisterModal from '../infoStudent/CallRegisterModal';
import LeadAssignModal from './LeadAssignModal';

class ListItemLeads extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      callModalVisible: false,
      assignModalVisible: false,
    };
  }

  renderStars = (number) => {
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

  toggleCallModal = () => {
    this.setState({callModalVisible: !this.state.callModalVisible});
  };

  toggleAssignModal = () => {
    this.setState({assignModalVisible: !this.state.assignModalVisible});
  };

  getSource = () => {
    return this.props.sources.find(
      (source) => source.id === this.props.source_id,
    );
  };

  render() {
    const {
      id,
      avatar_url,
      name,
      email,
      rate,
      phone,
      campaign,
      campaigns,
      source,
      sources,
      carer,
      staff,
      lead_status,
      statuses,
      city,
      token,
      notes,
      father_name,
      interest,
      source_id,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.setStudentId(id);
          this.props.navigation.navigate('InfoStudent', {
            studentId: id,
          });
        }}>
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
                  <View
                    style={{
                      ...styles.card,
                      ...{
                        backgroundColor: '#999',
                        marginRight: 5,
                      },
                    }}>
                    <Text style={styles.saler}>No P.I.C</Text>
                  </View>
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
                  <View
                    style={{
                      ...styles.card,
                      ...{
                        backgroundColor: '#999',
                        marginRight: 5,
                      },
                    }}>
                    <Text style={styles.saler}>No Source</Text>
                  </View>
                )}
                {!isEmptyInput(this.getSource()) ? (
                  <View
                    style={{
                      ...styles.card,
                      ...{
                        backgroundColor:
                          !this.getSource().color ||
                          !this.getSource().color === ''
                            ? theme.processColor1
                            : this.getSource().color,
                        marginRight: 5,
                      },
                    }}>
                    <Text style={styles.campaign}>
                      {this.getSource().name.trim()}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      ...styles.card,
                      ...{
                        backgroundColor: '#999',
                        marginRight: 5,
                      },
                    }}>
                    <Text style={styles.saler}>No Campaign</Text>
                  </View>
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
                    <Text style={styles.campaign}>
                      {lead_status.name.trim()}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      ...styles.card,
                      ...{
                        backgroundColor: '#999',
                        marginRight: 5,
                      },
                    }}>
                    <Text style={styles.saler}>No status</Text>
                  </View>
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
                {father_name ? (
                  <Text numberOfLines={1} style={styles.classInfoContainer}>
                    {father_name}
                  </Text>
                ) : null}
                {interest ? (
                  <Text numberOfLines={1} style={styles.classInfoContainer}>
                    {interest}
                  </Text>
                ) : null}
                {city ? (
                  <Text numberOfLines={1} style={styles.classInfoContainer}>
                    TP. {city}
                  </Text>
                ) : null}
                {notes.map((note, index) => (
                  <Text numberOfLines={1} style={styles.classInfoContainer}>
                    Ghi chú {index + 1}: {note}
                  </Text>
                ))}
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
                <TouchableOpacity
                  onPress={() => {
                    this.toggleAssignModal();
                  }}>
                  <View style={[{marginLeft: 10}, styles.button]}>
                    <Text style={{fontSize: 16}}>Tag</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.setStudentId(id);
                    this.props.navigation.navigate('InfoStudentDetails');
                  }}>
                  <View style={[{marginLeft: 10}, styles.button]}>
                    <Text style={{fontSize: 16}}>Sửa</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <CallRegisterModal
              isVisible={this.state.callModalVisible}
              onSwipeComplete={this.toggleCallModal}
              imageSource={avatar_url}
              email={email}
              phone={phone}
              changeCallStatus={this.props.changeCallStatus}
              student_id={id}
              token={token}
              errorChangeCallStatus={this.props.errorChangeCallStatus}
            />
            <LeadAssignModal
              isVisible={this.state.assignModalVisible}
              closeModal={this.toggleAssignModal}
              name={name}
              source={this.getSource()}
              campaign={campaign}
              status={lead_status}
              carer={carer}
              campaigns={campaigns}
              staff={staff}
              sources={sources}
              statuses={statuses}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
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
