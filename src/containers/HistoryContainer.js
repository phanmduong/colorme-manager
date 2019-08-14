import React from 'react';
import HistoryComponent from '../components/HistoryComponent';
import {connect}  from 'react-redux';
import * as historyTabAction from "../actions/historyTabActions";

class HistoryContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Lịch sử'
    });

    tabTeaching = () => {
        this.props.onTabTeaching();
    };

    tabWork = () => {
        this.props.onTabWork();
    };

    tabDuty = () => {
        this.props.onTabDuty();
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

const mapActionsToProps = {
    onTabTeaching: historyTabAction.tabTeaching,
    onTabWork: historyTabAction.tabWork,
    onTabDuty: historyTabAction.tabDuty
};

export default connect(mapStateToProps, mapActionsToProps)(HistoryContainer);
