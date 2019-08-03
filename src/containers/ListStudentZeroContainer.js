/**
 * Created by phanmduong on 5/30/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listStudentZeroActions from '../actions/listStudentZeroActions';
import ListStudenZeroComponent from '../components/ListStudenZeroComponent';

class ListStudentZeroContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onReload = this.onReload.bind(this);
    }

    componentWillMount() {
        this.onReload();
    }

    onReload() {
        this.props.listStudentZeroActions.loadDataListStudentZero(this.props.selectedGenId, this.props.selectedBaseId);
    }

    render() {
        return (
            <ListStudenZeroComponent
                listStudentZero={this.props.listStudentZeroData}
                error={this.props.error}
                isLoading={this.props.isLoading}
                onReload={this.onReload}
            />
        );
    }
}

ListStudentZeroContainer.navigationOptions = {
    title: 'Học viên nộp 0 đồng',
};

function mapStateToProps(state) {
    return {
        token: state.login.token,
        selectedGenId: state.analytics.selectedGenId,
        selectedBaseId: state.analytics.selectedBaseId,
        listStudentZeroData: state.listStudentZero.listStudentZeroData,
        isLoading: state.listStudentZero.isLoading,
        error: state.listStudentZero.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        listStudentZeroActions: bindActionCreators(listStudentZeroActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStudentZeroContainer);