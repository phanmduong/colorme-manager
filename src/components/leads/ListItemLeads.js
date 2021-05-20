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
import LeadAssignModal from './LeadAssignModal';

class ListItemLeads extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      assignModalVisible: false,
    };
  }

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
      staff,
      lead_status,
      statuses,
      city,
      pic,
      note,
      lead,
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
          <View style={styles.headerContainer}>
            <View style={styles.row}>
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
              <TouchableOpacity
                onPress={() => {
                  this.toggleAssignModal();
                }}>
                <View style={styles.containerSubTitle}>
                  {rate ? (
                    <View
                      style={{
                        ...styles.card,
                        ...{
                          backgroundColor: '#FFC106',
                          marginRight: 5,
                        },
                      }}>
                      <Text style={styles.saler}>{rate} sao</Text>
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
                      <Text style={styles.saler}>No Rate</Text>
                    </View>
                  )}
                  {pic && pic.name && pic.color ? (
                    <View
                      style={{
                        ...styles.card,
                        ...{
                          backgroundColor:
                            !pic.color || pic.color === ''
                              ? theme.processColor1
                              : pic.color,
                          marginRight: 5,
                        },
                      }}>
                      <Text style={styles.saler}>{getShortName(pic.name)}</Text>
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
                  {!isEmptyInput(source) ? (
                    <View
                      style={{
                        ...styles.card,
                        ...{
                          backgroundColor:
                            !source.color || !source.color === ''
                              ? theme.processColor1
                              : source.color,
                          marginRight: 5,
                        },
                      }}>
                      <Text style={styles.campaign}>{source.name.trim()}</Text>
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
                  {campaign && campaign.name && campaign.color ? (
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
                      <Text style={styles.campaign}>
                        {campaign.name.trim()}
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
                      <Text style={styles.saler}>No Source</Text>
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
              </TouchableOpacity>
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
              {note ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  Ghi chú: {note}
                </Text>
              ) : null}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.setStudentId(id);
                    this.props.navigation.navigate('AddLead', {
                      lead: lead,
                      mode: 'edit',
                    });
                  }}>
                  <View style={styles.button}>
                    <Text style={{fontSize: 16}}>Sửa</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <LeadAssignModal
              isVisible={this.state.assignModalVisible}
              closeModal={this.toggleAssignModal}
              name={name}
              source={source}
              campaign={campaign}
              status={lead_status}
              pic={pic}
              campaigns={campaigns}
              staff={staff}
              sources={sources}
              statuses={statuses}
              lead_id={id}
              changeTags={this.props.changeTags}
              loadStaff={this.props.loadStaff}
              rate={rate}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export default ListItemLeads;
