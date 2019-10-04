import React from 'react';
import {connect} from 'react-redux';
import ListTeacherAndAssistantComponent from '../components/ListTeacherAndAssistantComponent';
import {bindActionCreators} from 'redux';
import * as teachingRatingActions from '../actions/teachingRatingActions';

class ListTeacherAndAssistantContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Đánh giá',
  });

  componentDidMount = () => {
    this.loadTeacherList(this.props.selectedGenId);
    this.loadAssistantList(this.props.selectedGenId);
  };

  loadTeacherList = genId => {
    this.props.teachingRatingActions.loadTeacherList(this.props.token, genId);
  };

  loadAssistantList = genId => {
    this.props.teachingRatingActions.loadAssistantList(this.props.token, genId);
  };

  render() {
    return (
      <ListTeacherAndAssistantComponent
        isLoadingTeacherList={this.props.isLoadingTeacherList}
        isLoadingAssistantList={this.props.isLoadingAssistantList}
        teacherList={this.props.teacherList}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    teacherList: state.teachingRating.teacherList,
    assistantList: state.teachingRating.assistantList,
    isLoadingTeacherList: state.teachingRating.isLoadingTeacherList,
    isLoadingAssistantList: state.teachingRating.isLoadingAssistantList,
    errorLoadingTeacherList: state.teachingRating.errorLoadingTeacherList,
    errorLoadingAssistantList: state.teachingRating.errorLoadingAssistantList,
    selectedGenId: state.teachingRating.selectedGenId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    teachingRatingActions: bindActionCreators(teachingRatingActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListTeacherAndAssistantContainer);
