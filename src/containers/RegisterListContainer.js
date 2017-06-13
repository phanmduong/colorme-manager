/**
 * Created by phanmduong on 6/1/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Segment from '../components/common/SegmentTwo';
import * as registerListActions from '../actions/registerListActions';
import RegisterListComponent from '../components/RegisterListComponent';

class RegisterListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadDataRegisterListAll = this.loadDataRegisterListAll.bind(this);
        this.updateFormAndLoadDataSearchAll = this.updateFormAndLoadDataSearchAll.bind(this);
        this.loadDataRegisterListMy = this.loadDataRegisterListMy.bind(this);
        this.updateFormAndLoadDataSearchMy = this.updateFormAndLoadDataSearchMy.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: (<Segment
                nameSeg1="Tất cả"
                nameSeg2="Của bạn"
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
        this.loadDataRegisterListAll();
        this.loadDataRegisterListMy();
        this.props.navigation.setParams({segment: 1});
        this.props.navigation.setParams({changeSegmentActive: this.props.registerListActions.changeSegmentRegisterList});
    }

    loadDataRegisterListAll() {
        if (this.props.currentPageAll < this.props.totalPageAll)
            this.props.registerListActions.loadDataRegisterListAll(this.props.token, this.props.currentPageAll + 1, this.props.searchAll);
    }

    updateFormAndLoadDataSearchAll(search) {
        this.props.registerListActions.updateFormAndLoadDataSearchAll(search, this.props.token);
    }

    loadDataRegisterListMy() {
        if (this.props.currentPageMy < this.props.totalPageMy)
            this.props.registerListActions
                .loadDataRegisterListMy(this.props.token, this.props.currentPageMy + 1, this.props.searchMy, this.props.userId);
    }

    updateFormAndLoadDataSearchMy(search) {
        this.props.registerListActions.updateFormAndLoadDataSearchMy(search, this.props.userId, this.props.token);
    }

    render() {
        if (this.props.segment === 1) {
            return (
                <RegisterListComponent
                    registerList={this.props.registerListDataAll}
                    error={this.props.errorAll}
                    isLoading={this.props.isLoadingAll}
                    search={this.props.searchAll}
                    loadDataRegisterList={this.loadDataRegisterListAll}
                    updateFormAndLoadDataSearch={this.updateFormAndLoadDataSearchAll}
                    segmentActive={1}
                />
            );
        } else {
            return (
                <RegisterListComponent
                    registerList={this.props.registerListDataMy}
                    error={this.props.errorMy}
                    isLoading={this.props.isLoadingMy}
                    search={this.props.searchMy}
                    loadDataRegisterList={this.loadDataRegisterListMy}
                    updateFormAndLoadDataSearch={this.updateFormAndLoadDataSearchMy}
                    segmentActive={2}

                />
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        userId: state.login.user.id,
        token: state.login.token,
        registerListDataAll: state.registerList.registerListDataAll,
        isLoadingAll: state.registerList.isLoadingAll,
        errorAll: state.registerList.errorAll,
        currentPageAll: state.registerList.currentPageAll,
        totalPageAll: state.registerList.totalPageAll,
        searchAll: state.registerList.searchAll,
        registerListDataMy: state.registerList.registerListDataMy,
        isLoadingMy: state.registerList.isLoadingMy,
        errorMy: state.registerList.errorMy,
        currentPageMy: state.registerList.currentPageMy,
        totalPageMy: state.registerList.totalPageMy,
        searchMy: state.registerList.searchMy,
        segment: state.registerList.segment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerListActions: bindActionCreators(registerListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterListContainer);