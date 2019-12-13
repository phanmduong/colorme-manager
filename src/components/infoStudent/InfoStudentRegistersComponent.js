import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Spinkit from 'react-native-spinkit';
import theme from '../../styles';
import {getShortName} from '../../helper';
var {height, width} = Dimensions.get('window');

class InfoStudentRegistersComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderRegisters = () => {
    return this.props.registers.map(register => (
      <View style={styles.listItemContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: register.class.avatar_url}}
            style={styles.classAva}
          />
          <Text numberOfLines={1} style={styles.className}>
            {register.class.name}
          </Text>
        </View>
        <View style={styles.containerSubTitle}>
          {register.saler ? (
            <View
              style={{
                ...styles.card,
                ...{
                  backgroundColor:
                    !register.saler.color || register.saler.color === ''
                      ? theme.processColor1
                      : '#' + register.saler.color,
                },
              }}>
              <Text style={styles.saler}>
                {getShortName(register.saler.name)}
              </Text>
            </View>
          ) : (
            <View />
          )}
          {register.campaign ? (
            <View
              style={{
                ...styles.card,
                ...{
                  backgroundColor:
                    !register.campaign.color || register.campaign.color === ''
                      ? theme.processColor1
                      : '#' + register.campaign.color,
                  marginLeft: 5,
                },
              }}>
              <Text style={styles.campaign}>
                {register.campaign.name.trim()}
              </Text>
            </View>
          ) : (
            <View />
          )}
        </View>
        <View style={{marginLeft: 55}}>
          <Text numberOfLines={1} style={{paddingTop: 2}}>
            {register.class.study_time}
          </Text>
          <Text numberOfLines={1} style={{paddingTop: 2}}>
            {register.class.description}
          </Text>
          <Text numberOfLines={1} style={{paddingTop: 2}}>
            {register.class.room} - {register.class.base}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={{fontSize: 16}}>Gọi điện</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[{marginLeft: 10}, styles.button]}>
              <Text style={{fontSize: 16}}>Nộp học phí</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[{marginLeft: 10}, styles.button]}>
              <Text style={{fontSize: 16}}>▼</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  render() {
    if (!this.props.isLoadingRegisters) {
      return (
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          {this.renderRegisters()}
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

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  classAva: {
    width: 37,
    height: 37,
    borderRadius: 19,
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
  containerSubTitle: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 55,
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
    marginLeft: 55,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#F6F6F6',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
};

export default InfoStudentRegistersComponent;
