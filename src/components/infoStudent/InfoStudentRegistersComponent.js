import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Spinkit from 'react-native-spinkit';
import theme from '../../styles';
import {getShortName} from '../../helper';
import CallRegisterModal from './CallRegisterModal';
import SubmitMoneyModal from './SubmitMoneyModal';
var {height, width} = Dimensions.get('window');

class InfoStudentRegistersComponent extends React.Component {
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
        <View style={{flexDirection: 'row'}}>
          <View style={styles.classAva} />
          <View style={styles.infoContainer}>
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
                        !register.campaign.color ||
                        register.campaign.color === ''
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
            <View>
              <Text
                numberOfLines={1}
                style={[styles.classInfoContainer, {paddingTop: 0}]}>
                {register.class.study_time}
              </Text>
              <Text numberOfLines={1} style={styles.classInfoContainer}>
                {register.class.description}
              </Text>
              <Text numberOfLines={1} style={styles.classInfoContainer}>
                {register.class.room} - {register.class.base}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${register.phone}`);
                  this.toggleCallModal();
                }}>
                <View style={styles.button}>
                  <Text style={{fontSize: 16}}>Gọi điện</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleMoneyModal()}>
                <View style={[{marginLeft: 10}, styles.button]}>
                  <Text style={{fontSize: 16}}>Nộp học phí</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <CallRegisterModal
          isVisible={this.state.callModalVisible}
          onSwipeComplete={this.toggleCallModal}
          imageSource={register.avatar_url}
          email={register.email}
          phone={register.phone}
          changeCallStatus={this.props.changeCallStatus}
          student_id={register.student_id}
          token={this.props.token}
          errorChangeCallStatus={this.props.errorChangeCallStatus}
        />
        <SubmitMoneyModal
          isVisible={this.state.moneyModalVisible}
          onSwipeComplete={this.toggleMoneyModal}
          avatar_url={register.avatar_url}
          class={register.class}
          name={register.name}
          code={register.code}
          token={this.props.token}
          submitMoney={this.props.submitMoney}
          register_id={register.id}
          errorSubmitMoney={this.props.errorSubmitMoney}
        />
      </View>
    ));
  };

  render() {
    if (!this.props.isLoadingRegisters) {
      return <View style={{flex: 1}}>{this.renderRegisters()}</View>;
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
    marginHorizontal: 16,
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
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
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

export default InfoStudentRegistersComponent;
