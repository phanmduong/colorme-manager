/**
 * Created by phanmduong on 4/24/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {Text, Alert} from 'react-native';
import {bindActionCreators} from 'redux';
import Segment from '../components/common/SegmentTwo';
import * as moneyTransferActions from '../actions/moneyTransferActions';
import HistoryMoneyTransferComponent from '../components/moneyTransfer/HistoryMoneyTransferComponent';
import SearchStaffMoneyTransferComponent from '../components/moneyTransfer/SearchStaffMoneyTransferComponent';
import * as alert from '../constants/alert';

class MoneyTransferContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadDataStaffList = this.loadDataStaffList.bind(this);
        this.updateFormAndLoadDataSearchStaff = this.updateFormAndLoadDataSearchStaff.bind(this);
        this.loadDataHistoryTransaction = this.loadDataHistoryTransaction.bind(this);
        this.postTransaction = this.postTransaction.bind(this);
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

        if (nextProps.isLoadingTransaction !== this.props.isLoadingTransaction) {
            if (!nextProps.isLoadingTransaction) {
                if (nextProps.errorTransaction) {
                    Alert.alert(
                        'Thông báo',
                        alert.TRANSACTION_ERROR
                    );
                }
            }

        }
    }

    postTransaction(receiverId){
        this.props.moneyTransferActions.updateTransaction(receiverId, this.props.token);
    }

    componentWillMount() {
        this.loadDataStaffList();
        this.loadDataHistoryTransaction();
        this.props.navigation.setParams({changeSegmentActive: this.props.moneyTransferActions.changeSegmentMoneyTransfer});
    }

    loadDataStaffList() {
        if (this.props.currentPageStaffList < this.props.totalPageStaffList)
            this.props.moneyTransferActions.loadDataStaffList(this.props.token, this.props.currentPageStaffList + 1, this.props.searchStaff);
    }

    updateFormAndLoadDataSearchStaff(search) {
        this.props.moneyTransferActions.updateFormAndLoadDataSearchStaff(search, this.props.token);
    }

    loadDataHistoryTransaction() {
        if (this.props.currentPageHistoryTransaction < this.props.totalPageHistoryTransaction)
            this.props.moneyTransferActions.loadDataHistoryTransaction(this.props.token, this.props.currentPageHistoryTransaction + 1);
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
                    postTransaction={this.postTransaction}
                    isLoadingTransaction={this.props.isLoadingTransaction}
                />
            )
        } else {
            return (
                <HistoryMoneyTransferComponent
                    loadDataHistoryTransaction={this.loadDataHistoryTransaction}
                    isLoading={this.props.isLoadingHistoryTransaction}
                    error={this.props.errorHistoryTransaction}
                    transactionList={this.props.transactionListData}
                />
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
        currentPageHistoryTransaction: state.moneyTransfer.currentPageHistoryTransaction,
        totalPageHistoryTransaction: state.moneyTransfer.totalPageHistoryTransaction,
        transactionListData: state.moneyTransfer.transactionListData,
        isLoadingHistoryTransaction: state.moneyTransfer.isLoadingHistoryTransaction,
        errorHistoryTransaction: state.moneyTransfer.errorHistoryTransaction,
        isLoadingTransaction: state.moneyTransfer.isLoadingTransaction,
        errorTransaction: state.moneyTransfer.errorTransaction,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        moneyTransferActions: bindActionCreators(moneyTransferActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyTransferContainer);