import React from 'react';
import {View, Dimensions, Image, Text} from 'react-native';
import Loading from '../common/Loading';
import theme from '../../styles';
import {getShortName, isEmptyInput} from '../../helper';
const {width} = Dimensions.get('window');
import moment from 'moment';

class InfoStudentHistoryCallsComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderCalls = () => {
    return this.props.historyCalls.map((call) => (
      <View style={styles.listItemContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {call.call_status === 'success' ? (
            <View style={[styles.callStatus, {backgroundColor: '#2ACC4C'}]}>
              <Image
                source={require('../../../assets/img/icons8-phone_filled.png')}
                style={{height: 18, width: 18}}
              />
            </View>
          ) : (
            <View style={[styles.callStatus, {backgroundColor: '#F54335'}]}>
              <Image
                source={require('../../../assets/img/icons8-missed_call_filled.png')}
                style={{height: 18, width: 18}}
              />
            </View>
          )}
          <View style={styles.infoContainer}>
            {call.caller ? (
              <View
                style={{
                  ...styles.card,
                  ...{
                    backgroundColor:
                      !call.caller.color || call.caller.color === ''
                        ? theme.processColor1
                        : call.caller.color,
                    marginRight: 5,
                  },
                }}>
                <Text style={styles.saler}>
                  {getShortName(call.caller.name)}
                </Text>
              </View>
            ) : (
              <View />
            )}
            {call.created_at ? (
              <View
                style={{
                  ...styles.card,
                  ...{
                    backgroundColor: '#707070',
                  },
                }}>
                <Text style={styles.saler}>
                  Gọi vào lúc:{' '}
                  {moment.unix(call.created_at).format('HH:mm DD/MM/YYYY')}
                </Text>
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.classAva} />
          <View style={{marginLeft: 15, marginTop: 8}}>
            {!isEmptyInput(call.note) ? (
              <Text style={styles.classInfoContainer}>{call.note}</Text>
            ) : null}
          </View>
        </View>
      </View>
    ));
  };

  render() {
    if (this.props.isLoadingHistoryCalls) {
      return (
        <View style={{flex: 1}}>
          <Loading size={width / 8} />
        </View>
      );
    } else {
      return <View style={{flex: 1}}>{this.renderCalls()}</View>;
    }
  }
}

const styles = {
  listItemContainer: {
    marginHorizontal: theme.mainHorizontal,
    marginVertical: 10,
  },
  callStatus: {
    width: theme.mainAvatar.width,
    height: theme.mainAvatar.height,
    borderRadius: theme.mainAvatar.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saler: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
    flexDirection: 'row',
  },
  classInfoContainer: {
    paddingTop: 2,
    flex: 1,
    flexWrap: 'wrap',
  },
  classAva: theme.mainAvatar,
};

export default InfoStudentHistoryCallsComponent;
