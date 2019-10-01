import React from 'react';
import TeachingRatingComponent from '../components/TeachingRatingComponent';
import {connect} from 'react-redux';
import * as teachingRatingActions from '../actions/teachingRatingActions';
import {bindActionCreators} from 'redux';
import * as genActions from '../actions/genActions';

class TeachingRatingContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      checkedDataGen: false,
      checkedFeedback: false,
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Đánh giá',
  });

  componentDidMount = () => {
    this.loadTeacherRatingData();
    this.loadAssistantRatingData();
    this.loadGenData();
  };

  componentWillReceiveProps(props) {
    if (props.genData.length > 0 && !this.state.checkedDataGen) {
      this.setState({checkedDataGen: true});
      this.props.teachingRatingActions.selectedGenId(props.teachingGen.id);
    }

    if (props.genData.length > 0 && !this.state.checkedFeedback) {
      this.setState({checkedFeedback: true});
      this.loadFeedback(props.teachingGen.id);
    }
  }

  loadTeacherRatingData = () => {
    this.props.teachingRatingActions.loadTeacherRating(this.props.token);
  };

  loadAssistantRatingData = () => {
    this.props.teachingRatingActions.loadAssistantRating(this.props.token);
  };

  loadFeedback = genId => {
    this.props.teachingRatingActions.loadFeedback(this.props.token, genId);
  };

  loadGenData = () => {
    this.props.genActions.loadDataGen(this.props.token);
  };

  onSelectGenId = genId => {
    this.props.teachingRatingActions.selectedGenId(genId);
    this.loadFeedback(genId);
  };

  render() {
    return (
      <TeachingRatingComponent
        isLoadingTeacherRating={this.props.isLoadingTeacherRating}
        teacherRatingData={this.props.teacherRatingData}
        feedback={this.props.feedback}
        isLoadingFeedback={this.props.isLoadingFeedback}
        assistantRatingData={this.props.assistantRatingData}
        isLoadingAssistantRating={this.props.isLoadingAssistantRating}
        genData={this.props.genData}
        isLoadingGen={this.props.isLoadingGen}
        onSelectGenId={this.onSelectGenId}
        teachingGen={this.props.teachingGen}
        onRefresh={() => {
          this.loadTeacherRatingData();
          this.loadAssistantRatingData();
          this.loadFeedback(this.props.selectedGenId);
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    teacherRatingData: state.teachingRating.teacherRatingData,
    isLoadingTeacherRating: state.teachingRating.isLoadingTeacherRating,
    errorTeachingRating: state.teachingRating.errorTeacherRating,
    assistantRatingData: state.teachingRating.assistantRatingData,
    isLoadingAssistantRating: state.teachingRating.isLoadingAssistantRating,
    errorAssistantRating: state.teachingRating.errorAssistantRating,
    feedback: state.teachingRating.feedback,
    isLoadingFeedback: state.teachingRating.isLoadingFeedback,
    errorLoadingFeedback: state.teachingRating.errorLoadingFeedback,
    genData: state.gen.genData,
    selectedGenId: state.teachingRating.selectedGenId,
    teachingGen: state.gen.teachingGen,
    isLoadingGen: state.gen.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    teachingRatingActions: bindActionCreators(teachingRatingActions, dispatch),
    genActions: bindActionCreators(genActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeachingRatingContainer);
