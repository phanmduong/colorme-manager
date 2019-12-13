import React from 'react';
import {connect} from 'react-redux';
import * as infoStudentTabActions from '../actions/infoStudentTabActions';
import * as infoStudentActions from '../actions/infoStudentActions';
import InfoStudentComponent from '../components/InfoStudentComponent';
import {bindActionCreators} from 'redux';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShortName} from '../helper';

class InfoStudentContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  static navigationOptions = ({navigation}) => ({
    headerLeft: (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name={'chevron-left'}
          size={33}
          color={'black'}
          onPress={() => navigation.goBack()}
        />
        <Image
          source={{uri: navigation.getParam('avatar_url')}}
          style={{width: 30, height: 30, borderRadius: 15, marginLeft: 5}}
        />
        <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 10}}>
          {getShortName(navigation.getParam('name'))}
        </Text>
      </View>
    ),
    headerRight: (
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
        <TouchableOpacity
          style={{padding: 8, backgroundColor: '#F6F6F6', borderRadius: 18}}>
          <Image
            source={require('../../assets/img/icons8-attendance_mark_filled.png')}
            style={{width: 18, height: 18}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 8,
            backgroundColor: '#F6F6F6',
            marginLeft: 10,
            borderRadius: 18,
          }}>
          <Image
            source={require('../../assets/img/icons8-info_filled.png')}
            style={{width: 18, height: 18}}
          />
        </TouchableOpacity>
      </View>
    ),
  });

  setStudentId = studentId => {
    this.props.infoStudentActions.setStudentId(studentId);
  };

  tabRegisters = () => {
    this.props.infoStudentTabActions.tabRegisters();
  };

  tabHistoryCalls = () => {
    this.props.infoStudentTabActions.tabHistoryCalls();
  };

  tabProgress = () => {
    this.props.infoStudentTabActions.tabProgress();
  };

  tabHistoryCollectMoney = () => {
    this.props.infoStudentTabActions.tabHistoryCollectMoney();
  };

  render() {
    return (
      <InfoStudentComponent
        {...this.props}
        registersGradient={this.props.registers.gradient}
        registersTextColor={this.props.registers.textColor}
        historyCallsGradient={this.props.historyCalls.gradient}
        historyCallsTextColor={this.props.historyCalls.textColor}
        progressGradient={this.props.progress.gradient}
        progressTextColor={this.props.progress.textColor}
        historyCollectMoneyGradient={this.props.historyCollectMoney.gradient}
        historyCollectMoneyTextColor={this.props.historyCollectMoney.textColor}
        tabComponent={this.props.tabComponent}
        tabRegisters={() => {
          this.tabRegisters();
        }}
        tabHistoryCalls={() => {
          this.tabHistoryCalls();
        }}
        tabProgress={() => {
          this.tabProgress();
        }}
        tabHistoryCollectMoney={() => {
          this.tabHistoryCollectMoney();
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    registers: state.infoStudentTab.registers,
    historyCalls: state.infoStudentTab.historyCalls,
    progress: state.infoStudentTab.progress,
    historyCollectMoney: state.infoStudentTab.historyCollectMoney,
    tabComponent: state.infoStudentTab.tabComponent,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    infoStudentTabActions: bindActionCreators(infoStudentTabActions, dispatch),
    infoStudentActions: bindActionCreators(infoStudentActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoStudentContainer);
