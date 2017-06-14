/**
 * Created by phanmduong on 4/24/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as collectMoneyActions from '../actions/collectMoneyActions';
import CollectMoneyComponent from '../components/CollectMoneyComponent';

class CollectMoneyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadDataStudentList = this.loadDataStudentList.bind(this);
        this.updateFormAndLoadDataSearch = this.updateFormAndLoadDataSearch.bind(this);
    }


    componentWillMount() {
        this.loadDataStudentList();
    }

    loadDataStudentList() {
        if (this.props.currentPage < this.props.totalPage)
            this.props.collectMoneyActions.loadDataStudentList(this.props.token, this.props.search, this.props.currentPage + 1);
    }

    updateFormAndLoadDataSearch(search) {
        this.props.collectMoneyActions.updateFormAndLoadDataSearch(search, this.props.token);
    }

    render() {

        return (
            <CollectMoneyComponent
                studentList={this.props.studentListData}
                error={this.props.error}
                isLoading={this.props.isLoading}
                search={this.props.search}
                loadDataStudentList={this.loadDataStudentList}
                updateFormAndLoadDataSearch={this.updateFormAndLoadDataSearch}
            />
        );
    }
}

CollectMoneyContainer.navigationOptions = {
    title: 'Nộp tiền',
};

function mapStateToProps(state) {
    return {
        token: state.login.token,
        studentListData: state.collectMoney.studentListData,
        isLoading: state.collectMoney.isLoading,
        error: state.collectMoney.error,
        currentPage: state.collectMoney.currentPage,
        totalPage: state.collectMoney.totalPage,
        search: state.collectMoney.search,
        newestCode: state.collectMoney.newestCode
    };
}

function mapDispatchToProps(dispatch) {
    return {
        collectMoneyActions: bindActionCreators(collectMoneyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectMoneyContainer);