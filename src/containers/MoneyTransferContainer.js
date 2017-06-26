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
import MoneyTransferComponent from '../components/moneyTransfer/MoneyTransferComponent';
class MoneyTransferContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
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
        this.props.navigation.setParams({changeSegmentActive: this.props.moneyTransferActions.changeSegmentMoneyTransfer});
    }

    render() {
        if (this.props.segment === 1) {
            return (
                <MoneyTransferComponent/>
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
        segment: state.moneyTransfer.segment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        moneyTransferActions: bindActionCreators(moneyTransferActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyTransferContainer);