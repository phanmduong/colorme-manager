/**
 * Created by phanmduong on 4/24/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import {bindActionCreators} from 'redux';
import Segment from '../components/common/SegmentTwo';
import * as moneyTransferActions from '../actions/moneyTransferActions';
import HistoryMoneyTransferComponent from '../components/moneyTransfer/HistoryMoneyTransferComponent';
import SearchStaffMoneyTransferComponent from '../components/moneyTransfer/SearchStaffMoneyTransferComponent';

class MoneyTransferContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadDataStaffList = this.loadDataStaffList.bind(this);
        this.updateFormAndLoadDataSearchStaff = this.updateFormAndLoadDataSearchStaff.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: (<Segment
                nameSeg1="Chuyển tiền"
                nameSeg2="Lịch sử"
                segmentActive={(navigation.state.params && navigation.state.params.segment) ? navigation.state.params.segment : 1}
                changeSegmentActive={(navigation.state.params && navigation.state.params.changeSegmentActive)
                    ? navigation.state.params.changeSegmentActive : null
                }
            />
        ),
    });

    componentWillReceiveProps(nextProps) {
        if (nextProps.segment !== this.props.segment) {
            nextProps.navigation.setParams({segment: nextProps.segment});
        }
    }

    componentWillMount() {
        this.loadDataStaffList();
        this.props.navigation.setParams({changeSegmentActive: this.props.moneyTransferActions.changeSegmentMoneyTransfer});
    }

    loadDataStaffList() {
        if (this.props.currentPageStaffList < this.props.totalPageStaffList)
            this.props.moneyTransferActions.loadDataStaffList(this.props.token, this.props.currentPageStaffList + 1, this.props.searchStaff);
    }

    updateFormAndLoadDataSearchStaff(search) {
        this.props.moneyTransferActions.updateFormAndLoadDataSearchStaff(search, this.props.token);
    }

    render() {
        if (this.props.segment === 1) {
            return (
                <SearchStaffMoneyTransferComponent
                    updateFormAndLoadDataSearch={this.updateFormAndLoadDataSearchStaff}
                    loadDataStaffList={this.loadDataStaffList}
                    isLoading={this.props.isLoadingStaffList}
                    error={this.props.errorStaffList}
                    staffList={this.props.staffListData}
                    search={this.props.searchStaff}
                />
            )
        } else {
            return (
                <HistoryMoneyTransferComponent/>
            )
        }
    }
}
function mapStateToProps(state) {
    return {
        token: state.login.token,
        segment: state.moneyTransfer.segment,
        currentPageStaffList: state.moneyTransfer.currentPageStaffList,
        totalPageStaffList: state.moneyTransfer.totalPageStaffList,
        searchStaff: state.moneyTransfer.searchStaff,
        staffListData: state.moneyTransfer.staffListData,
        isLoadingStaffList: state.moneyTransfer.isLoadingStaffList,
        errorStaffList: state.moneyTransfer.errorStaffList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        moneyTransferActions: bindActionCreators(moneyTransferActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyTransferContainer);