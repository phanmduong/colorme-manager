/**
 * Created by phanmduong on 4/25/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from '../actions/baseActions';
import * as genActions from '../actions/genActions';
import * as dashboardActions from '../actions/analyticsActions';
import * as loginActions from '../actions/loginActions';
import AnalyticsComponent from '../components/AnalyticsComponent';
import {NavigationActions} from 'react-navigation';
import {Alert} from 'react-native';
import _ from 'lodash';

class AnalyticsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: true,
      checkedDataBase: false,
      checkedDataGen: false,
      checkedDataDashboard: false,
      genData: [],
      baseData: [],
    };

    this.onSelectBaseId = this.onSelectBaseId.bind(this);
    this.onSelectGenId = this.onSelectGenId.bind(this);
    this.loadDataDashboard = this.loadDataDashboard.bind(this);
    this.onClickClass = this.onClickClass.bind(this);
    this.onClickRegisterList = this.onClickRegisterList.bind(this);
    this.onClickListStudentPaid = this.onClickListStudentPaid.bind(this);
    this.onClickListStudentZero = this.onClickListStudentZero.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Thống kê',
  });

  componentWillMount() {
    if (!this.props.isCheckIn) {
      Alert.alert(
        'Thiết bị',
        'Đây là máy của ' +
          this.props.deviceUser.name +
          '. Bạn sẽ không thể dùng tính năng check in và check out. Bạn có muốn tiếp tục?',
        [
          {text: 'Đăng xuất', onPress: () => this.logout()},
          {
            text: 'Tiếp tục',
            onPress: () => {},
          },
        ],
        {cancelable: false},
      );
    }
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoadingBase && !nextProps.isLoadingGen) {
      this.setState({
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: true,
      });
    }

    if (nextProps.errorBase || nextProps.errorGen || nextProps.errorDashboard) {
      this.setState({
        error: true,
      });
    } else {
      this.setState({
        error: false,
      });
    }

    if (
      !nextProps.isLoadingGen &&
      this.props.isLoadingGen !== nextProps.isLoadingGen
    ) {
      // if (nextProps.errorGen) {
      //     Alert.alert('Điểm danh', "Kiểm tra các kết nối trước khi điểm danh");
      // } else {
      //     Alert.alert('Điểm danh', "Đã lưu trữ thời gian và toạ độ của bạn");
      // }

      var genData = _.sortBy(nextProps.genData, [
        function(o) {
          return parseInt(o.name);
        },
      ]);
      genData = _.reverse(genData);
      this.setState({
        genData: genData,
      });
    }

    this.checkData(nextProps);
  }

  logout() {
    this.props.loginActions.logout();
  }

  checkData(props) {
    if (props.baseData.length > 0 && !this.state.checkedDataBase) {
      this.setState({checkedDataBase: true});
      var baseData = [{id: -1, name: 'Tất cả'}, ...props.baseData];
      this.setState({baseData: baseData});
      this.props.dashboardActions.selectedBaseId(baseData[0].id);
    }

    if (props.genData.length > 0 && !this.state.checkedDataGen) {
      this.setState({checkedDataGen: true});
      var genData = _.sortBy(props.genData, [
        function(o) {
          return parseInt(o.name);
        },
      ]);
      genData = _.reverse(genData);
      this.setState({
        genData: genData,
      });
      this.props.dashboardActions.selectedGenId(props.currentGen.id);
    }

    if (
      props.genData.length > 0 &&
      props.baseData.length > 0 &&
      !this.state.checkedDataDashboard
    ) {
      this.setState({checkedDataDashboard: true});
      this.props.dashboardActions.loadDataDashboard(
        -1,
        props.currentGen.id,
        this.props.token,
      );
    }
  }

  loadData() {
    if (!this.props.baseData || this.props.baseData.length <= 0) {
      this.props.baseActions.loadDataBase(this.props.token);
    }
    if (!this.props.genData || this.props.genData.length <= 0) {
      this.props.genActions.loadDataGen(this.props.token);
    }
    this.checkData(this.props);
  }

  loadDataDashboard(baseId, genId) {
    this.props.dashboardActions.loadDataDashboard(
      baseId,
      genId,
      this.props.token,
    );
  }

  onSelectBaseId(baseId) {
    this.props.dashboardActions.selectedBaseId(baseId);
    this.loadDataDashboard(baseId, this.props.selectedGenId);
  }

  onSelectGenId(genId) {
    this.props.dashboardActions.selectedGenId(genId);
    this.loadDataDashboard(this.props.selectedBaseId, genId);
  }

  onClickClass() {
    this.props.navigation.navigate('Class');
  }

  onClickListStudentPaid() {
    this.props.navigation.navigate('ListStudentPaid');
  }

  onClickListStudentZero() {
    this.props.navigation.navigate('ListStudentZero');
  }

  onClickRegisterList() {
    this.props.navigation.navigate('RegisterList');
  }

  render() {
    return (
      <AnalyticsComponent
        isLoading={this.state.isLoading}
        isLoadingDashboard={this.props.isLoadingDashboard}
        error={this.state.error}
        genData={this.state.genData}
        baseData={this.state.baseData}
        loadDataDashboard={this.loadDataDashboard}
        dashboardData={this.props.dashboardData}
        selectedBaseId={this.props.selectedBaseId}
        selectedGenId={this.props.selectedGenId}
        onSelectBaseId={this.onSelectBaseId}
        onSelectGenId={this.onSelectGenId}
        errorDashboard={this.props.errorDashboard}
        onClickClass={this.onClickClass}
        onClickRegisterList={this.onClickRegisterList}
        onClickListStudentPaid={this.onClickListStudentPaid}
        onClickListStudentZero={this.onClickListStudentZero}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoadingBase: state.base.isLoading,
    baseData: state.base.baseData,
    errorBase: state.base.error,
    token: state.login.token,
    isCheckIn: state.login.isCheckIn,
    deviceUser: state.login.deviceUser,
    isLoadingGen: state.gen.isLoading,
    currentGen: state.gen.currentGen,
    genData: state.gen.genData,
    errorGen: state.gen.error,
    isLoadingDashboard: state.analytics.isLoading,
    dashboardData: state.analytics.dashboardData,
    errorDashboard: state.analytics.error,
    selectedBaseId: state.analytics.selectedBaseId,
    selectedGenId: state.analytics.selectedGenId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    baseActions: bindActionCreators(baseActions, dispatch),
    genActions: bindActionCreators(genActions, dispatch),
    dashboardActions: bindActionCreators(dashboardActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnalyticsContainer);
