import React from 'react';
import {View, Dimensions} from 'react-native';
import WorkShiftClockSelectionCell from './WorkShiftClockSelectionCell';
import theme from '../../styles';
import Spinkit from 'react-native-spinkit';
import Search from '../common/Search';
const {width, height} = Dimensions.get('window');

class ClockManageWorkShiftComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
    };
  }

  renderWorkShiftCells = () => {
    const {workShiftData} = this.props;
    const data = workShiftData.filter((person) => {
      let normalizedName = person.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return normalizedName
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
    });
    return data.map((person) => (
      <WorkShiftClockSelectionCell
        avatar_url={person.avatar_url}
        name={person.name}
        selectedDate={this.props.selectedDate}
        work_shifts={person.work_shifts}
        onPress={() => {
          this.props.navigation.navigate('ClockManageWorkShiftDetails', {
            name: person.name,
            avatar_url: person.avatar_url,
          });
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
      <View style={styles.workShiftsContainer}>
        <Search
          placeholder="Tìm kiếm"
          onChangeText={(search) => {
            this.setState({search});
          }}
        />
        <View>{this.renderWorkShiftCells()}</View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workShiftsContainer: {
    marginTop: 10,
  },
};

export default ClockManageWorkShiftComponent;
