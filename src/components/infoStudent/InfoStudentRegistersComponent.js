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
};

export default InfoStudentRegistersComponent;
