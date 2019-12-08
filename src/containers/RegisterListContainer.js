/**
 * Created by phanmduong on 6/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Segment from '../components/common/SegmentTwo';
import * as registerListActions from '../actions/registerListActions';
import RegisterListComponent from '../components/RegisterListComponent';

class RegisterListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.loadDataRegisterListAll = this.loadDataRegisterListAll.bind(this);
    this.updateFormAndLoadDataSearchAll = this.updateFormAndLoadDataSearchAll.bind(
      this,
    );
    this.loadDataRegisterListMy = this.loadDataRegisterListMy.bind(this);
    this.updateFormAndLoadDataSearchMy = this.updateFormAndLoadDataSearchMy.bind(
      this,
    );
  }

  componentWillMount() {
    this.loadDataRegisterListAll();
    this.loadDataRegisterListMy();
  }

  changeSegmentRegisterList = segment => {
    this.props.registerListActions.changeSegmentRegisterList(segment);
  };

  loadDataRegisterListAll() {
    if (this.props.currentPageAll < this.props.totalPageAll) {
      this.props.registerListActions.loadDataRegisterListAll(
        this.props.token,
        this.props.currentPageAll + 1,
        this.props.searchAll,
      );
    }
  }

  refreshRegisterListAll = () => {
    this.props.registerListActions.refreshRegisterListAll(
      this.props.searchAll,
      this.props.token,
    );
  };

  refreshRegisterListMy = () => {
    this.props.registerListActions.refreshRegisterListMy(
      this.props.searchMy,
      this.props.token,
      this.props.userId,
    );
  };

  updateFormAndLoadDataSearchAll(search) {
    this.props.registerListActions.updateFormAndLoadDataSearchAll(
      search,
      this.props.token,
    );
  }

  loadDataRegisterListMy() {
    if (this.props.currentPageMy < this.props.totalPageMy) {
      this.props.registerListActions.loadDataRegisterListMy(
        this.props.token,
        this.props.currentPageMy + 1,
        this.props.searchMy,
        this.props.userId,
      );
    }
  }

  updateFormAndLoadDataSearchMy(search) {
    this.props.registerListActions.updateFormAndLoadDataSearchMy(
      search,
      this.props.userId,
      this.props.token,
    );
  }

  render() {
    if (this.props.segment === 1) {
      return (
        <RegisterListComponent
          registerList={this.props.registerListDataAll}
          error={this.props.errorAll}
          isLoading={this.props.isLoadingAll}
          search={this.props.searchAll}
          refreshing={this.props.refreshingAll}
          onRefresh={this.refreshRegisterListAll}
          loadDataRegisterList={this.loadDataRegisterListAll}
          updateFormAndLoadDataSearch={this.updateFormAndLoadDataSearchAll}
          changeSegmentRegisterList={this.changeSegmentRegisterList}
          segmentActive={1}
        />
      );
    } else {
      console.log(this.props.registerListDataMy);
      return (
        <RegisterListComponent
          registerList={this.props.registerListDataMy}
          error={this.props.errorMy}
          isLoading={this.props.isLoadingMy}
          search={this.props.searchMy}
          refreshing={this.props.refreshingMy}
          onRefresh={this.refreshRegisterListMy}
          loadDataRegisterList={this.loadDataRegisterListMy}
          updateFormAndLoadDataSearch={this.updateFormAndLoadDataSearchMy}
          changeSegmentRegisterList={this.changeSegmentRegisterList}
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
    segment: state.registerList.segment,
    refreshingAll: state.registerList.refreshingAll,
    refreshingMy: state.registerList.refreshingMy,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerListActions: bindActionCreators(registerListActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterListContainer);
