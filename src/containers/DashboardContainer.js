/**
 * Created by phanmduong on 4/25/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Text} from 'react-native';
import * as baseActions from '../actions/baseActions';
import * as genActions from '../actions/genActions';
import * as dashboardActions from '../actions/dashboardActions';
import DashboardComponent from '../components/DashboardComponent';

class DashboardContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: false,
            checkedDataBase: false,
            checkedDataGen: false,
            checkedDataDashboard: false,
            genData: []
        }

        this.onSelectBaseId = this.onSelectBaseId.bind(this);
        this.onSelectGenId = this.onSelectGenId.bind(this);
        this.loadDataDashboard = this.loadDataDashboard.bind(this);
    }

    componentWillMount() {
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoadingBase && !nextProps.isLoadingGen) {
            this.setState({
                isLoading: false
            })
        } else {
            this.setState({
                isLoading: true
            })
        }

        if (nextProps.errorBase || nextProps.errorGen || nextProps.errorDashboard) {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                error: false
            })
        }

        if (!nextProps.isLoadingGen) {
            var genData = _.sortBy(nextProps.genData, [function (o) {
                return parseInt(o.name);
            }]);
            genData = _.reverse(genData);
            this.setState({
                genData: genData
            })
        }

        this.checkData(nextProps);
    }

    checkData(props) {
        if (props.baseData.length > 0 && !this.state.checkedDataBase) {
            this.setState({checkedDataBase: true});
            this.props.dashboardActions.selectedBaseId(props.baseData[0].id);
        }

        if (props.genData.length > 0 && !this.state.checkedDataGen) {
            this.setState({checkedDataGen: true});
            var genData = _.sortBy(props.genData, [function (o) {
                return parseInt(o.name);
            }]);
            genData = _.reverse(genData);
            this.setState({
                genData: genData
            })
            this.props.dashboardActions.selectedGenId(genData[0].id);
        }

        if (props.genData.length > 0 && props.baseData.length > 0 && !this.state.checkedDataDashboard) {
            this.setState({checkedDataDashboard: true});
            this.props.dashboardActions
                .loadDataDashboard(props.baseData[0].id, props.genData[0].id, this.props.token);
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
        this.props.dashboardActions
            .loadDataDashboard(baseId, genId, this.props.token);
    }

    onSelectBaseId(baseId) {
        this.props.dashboardActions.selectedBaseId(baseId);
        this.loadDataDashboard(baseId, this.props.selectedGenId);
    }

    onSelectGenId(genId) {
        this.props.dashboardActions.selectedGenId(genId);
        this.loadDataDashboard(this.props.selectedBaseId, genId);
    }

    render() {
        return (
            <DashboardComponent
                isLoading={this.state.isLoading}
                isLoadingDashboard={this.props.isLoadingDashboard}
                error={this.state.error}
                genData={this.state.genData}
                baseData={this.props.baseData}
                loadDataDashboard={this.loadDataDashboard}
                dashboardData={this.props.dashboardData}
                selectedBaseId={this.props.selectedBaseId}
                selectedGenId={this.props.selectedGenId}
                onSelectBaseId={this.onSelectBaseId}
                onSelectGenId={this.onSelectGenId}
                errorDashboard={this.props.errorDashboard}
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
        isLoadingGen: state.gen.isLoading,
        genData: state.gen.genData,
        errorGen: state.gen.error,
        isLoadingDashboard: state.dashboard.isLoading,
        dashboardData: Object.assign({}, state.dashboard.dashboardData),
        errorDashboard: state.dashboard.error,
        selectedBaseId: state.dashboard.selectedBaseId,
        selectedGenId: state.dashboard.selectedGenId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        baseActions: bindActionCreators(baseActions, dispatch),
        genActions: bindActionCreators(genActions, dispatch),
        dashboardActions: bindActionCreators(dashboardActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);