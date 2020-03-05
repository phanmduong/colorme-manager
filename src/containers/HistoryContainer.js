import React from 'react';
import HistoryComponent from '../components/HistoryComponent';
import {connect} from 'react-redux';
import * as historyTabAction from '../actions/historyTabActions';
import {bindActionCreators} from 'redux';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class HistoryContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  static navigationOptions = ({navigation}) => ({
    headerLeft: () => (
      <View style={styles.headerLeftContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name={'chevron-left'}
            size={33}
            color={'black'}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.name}>Lịch sử</Text>
        </View>
      </View>
    ),
  });

  tabTeaching = () => {
    this.props.historyTabAction.tabTeaching();
  };

  tabWork = () => {
    this.props.historyTabAction.tabWork();
  };

  tabDuty = () => {
    this.props.historyTabAction.tabDuty();
  };

  render() {
    return (
      <HistoryComponent
        teachingShiftGradient={this.props.teachingShift.gradient}
        teachingShiftTextColor={this.props.teachingShift.textColor}
        workShiftGradient={this.props.workShift.gradient}
        workShiftTextColor={this.props.workShift.textColor}
        dutyShiftGradient={this.props.dutyShift.gradient}
        dutyShiftTextColor={this.props.dutyShift.textColor}
        tabComponent={this.props.tabComponent}
        tabTeaching={() => {
          this.tabTeaching();
        }}
        tabWork={() => {
          this.tabWork();
        }}
        tabDuty={() => {
          this.tabDuty();
        }}
      />
    );
  }
}

const styles = {
  name: {
    fontWeight: '600',
    fontSize: 23,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginLeft: 10,
  },
};

function mapStateToProps(state) {
  return {
    teachingShift: state.historyTab.teachingShift,
    workShift: state.historyTab.workShift,
    dutyShift: state.historyTab.dutyShift,
    tabComponent: state.historyTab.tabComponent,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    historyTabAction: bindActionCreators(historyTabAction, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryContainer);
