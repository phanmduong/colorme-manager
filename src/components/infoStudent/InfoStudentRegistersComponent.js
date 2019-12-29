import React from 'react';
import {View, Dimensions} from 'react-native';
import Spinkit from 'react-native-spinkit';
import theme from '../../styles';
import ListItemInfoStudentRegister from './ListItemInfoStudentRegister';
var {height, width} = Dimensions.get('window');

class InfoStudentRegistersComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderRegisters = () => {
    return this.props.registers.map(register => (
      <ListItemInfoStudentRegister
        register={register}
        changeCallStatus={this.props.changeCallStatus}
        submitMoney={this.props.submitMoney}
        errorSubmitMoney={this.props.errorSubmitMoney}
        token={this.props.token}
        errorChangeCallStatus={this.props.errorChangeCallStatus}
      />
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
