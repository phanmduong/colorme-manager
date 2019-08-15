import React from 'react';
import HistoryComponent from '../components/HistoryComponent';
import {connect}  from 'react-redux';
import * as historyTabAction from "../actions/historyTabActions";
import {bindActionCreators} from "redux";

class HistoryContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Lịch sử'
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
            <HistoryComponent teachingShiftGradient={this.props.teachingShift.gradient}
                              teachingShiftTextColor={this.props.teachingShift.textColor}
                              workShiftGradient={this.props.workShift.gradient}
                              workShiftTextColor={this.props.workShift.textColor}
                              dutyShiftGradient={this.props.dutyShift.gradient}
                              dutyShiftTextColor={this.props.dutyShift.textColor}
                              tabComponent={this.props.tabComponent}
                              tabTeaching={()=> {this.tabTeaching()}}
                              tabWork={() => {this.tabWork()}}
                              tabDuty={() => {this.tabDuty()}}/>
        )
    }
}

function mapStateToProps(state) {
    return {
        teachingShift: state.historyTab.teachingShift,
        workShift: state.historyTab.workShift,
        dutyShift: state.historyTab.dutyShift,
        tabComponent: state.historyTab.tabComponent
    }
}

function mapDispatchToProps(dispatch) {
    return {
        historyTabAction: bindActionCreators(historyTabAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);
