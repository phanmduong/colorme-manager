import React from 'react';
import {View, Dimensions} from 'react-native';
import WorkShiftClockSelectionCell from './WorkShiftClockSelectionCell';
import theme from '../../styles';
import Spinkit from 'react-native-spinkit';
const {width, height} = Dimensions.get('window');

class ClockManageWorkShiftComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderWorkShiftCells = () => {
    const {workShiftData} = this.props;
    return workShiftData.map((person) => (
      <WorkShiftClockSelectionCell
        avatar_url={person.avatar_url}
        name={person.name}
        onPress={() => {
          this.props.navigation.navigate('ClockManageWorkShiftDetails');
          this.props.onSelectWorkShiftEmployee(person);
        }}
      />
    ));
  };

  render() {
    return this.props.isLoadingWorkShiftData ? (
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
    ) : (
      <View>{this.renderWorkShiftCells()}</View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ClockManageWorkShiftComponent;
