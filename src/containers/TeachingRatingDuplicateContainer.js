import React from 'react';
import TeachingRatingComponent from '../components/TeachingRatingComponent';
import {connect} from 'react-redux';
import * as teachingRatingActions from '../actions/teachingRatingDuplicateActions';
import {bindActionCreators} from 'redux';
import * as genActions from '../actions/genActions';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class TeachingRatingDuplicateContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      checkedDataGen: false,
      checkedFeedback: false,
    };
  }

  static navigationOptions = ({navigation}) => ({
    headerLeft: () => (
      <View style={styles.headerLeftContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name={'chevron-left'}
            size={33}
            color={'black'}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.name}>Đánh giá</Text>
        </View>
      </View>
    ),
  });

  componentDidMount = () => {
    const {navigation} = this.props;
    let userId = navigation.getParam('userId', 0);
    this.loadTeacherRatingData(userId);
    this.loadAssistantRatingData(userId);

    if (this.props.genData.length > 0 && !this.state.checkedDataGen) {
      this.setState({checkedDataGen: true});
      this.props.teachingRatingActions.selectedGenId(this.props.teachingGen.id);
    }

    if (this.props.genData.length > 0 && !this.state.checkedFeedback) {
      this.setState({checkedFeedback: true});
      this.loadTeacherFeedback(this.props.teachingGen.id, userId);
      this.loadAssistantFeedback(this.props.teachingGen.id, userId);
    }
  };

  loadTeacherRatingData = userId => {
    this.props.teachingRatingActions.loadTeacherRating(
      this.props.token,
      userId,
    );
  };

  loadAssistantRatingData = userId => {
    this.props.teachingRatingActions.loadAssistantRating(
      this.props.token,
      userId,
    );
  };

  loadTeacherFeedback = (genId, userId) => {
    this.props.teachingRatingActions.loadTeacherFeedback(
      this.props.token,
      genId,
      userId,
    );
  };

  loadAssistantFeedback = (genId, userId) => {
    this.props.teachingRatingActions.loadAssistantFeedback(
      this.props.token,
      genId,
      userId,
    );
  };

  onSelectGenId = genId => {
    const {navigation} = this.props;
    let userId = navigation.getParam('userId', 0);
    this.props.teachingRatingActions.selectedGenId(genId);
    this.loadTeacherFeedback(genId, userId);
    this.loadAssistantFeedback(genId, userId);
  };

  render() {
    const {navigation} = this.props;
    let userId = navigation.getParam('userId', 0);
    return (
      <TeachingRatingComponent
        isLoadingTeacherRating={this.props.isLoadingTeacherRating}
        teacherRatingData={this.props.teacherRatingData}
        teacherFeedback={this.props.teacherFeedback}
        isLoadingTeacherFeedback={this.props.isLoadingTeacherFeedback}
        assistantRatingData={this.props.assistantRatingData}
        isLoadingAssistantRating={this.props.isLoadingAssistantRating}
        genData={this.props.genData}
        isLoadingGen={this.props.isLoadingGen}
        onSelectGenId={this.onSelectGenId}
        teachingGen={this.props.teachingGen}
        assistantFeedback={this.props.assistantFeedback}
        isLoadingAssistantFeedback={this.props.isLoadingAssistantFeedback}
        onRefresh={() => {
          this.loadTeacherRatingData(userId);
          this.loadAssistantRatingData(userId);
          this.loadTeacherFeedback(this.props.selectedGenId, userId);
          this.loadAssistantFeedback(this.props.selectedGenId, userId);
        }}
      />
    );
  }
}

const styles = {
  name: {
    fontWeight: '600',
    fontSize: 23,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginLeft: 10,
  },
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    teacherRatingData: state.teachingRatingDuplicate.teacherRatingData,
    isLoadingTeacherRating:
      state.teachingRatingDuplicate.isLoadingTeacherRating,
    errorTeachingRating: state.teachingRatingDuplicate.errorTeacherRating,
    assistantRatingData: state.teachingRatingDuplicate.assistantRatingData,
    isLoadingAssistantRating:
      state.teachingRatingDuplicate.isLoadingAssistantRating,
    errorAssistantRating: state.teachingRatingDuplicate.errorAssistantRating,
    genData: state.gen.genData,
    selectedGenId: state.teachingRatingDuplicate.selectedGenId,
    teachingGen: state.gen.teachingGen,
    isLoadingGen: state.gen.isLoading,
    teacherFeedback: state.teachingRatingDuplicate.teacherFeedback,
    isLoadingTeacherFeedback:
      state.teachingRatingDuplicate.isLoadingTeacherFeedback,
    errorLoadingTeacherFeedback:
      state.teachingRatingDuplicate.errorLoadingTeacherFeedback,
    assistantFeedback: state.teachingRatingDuplicate.assistantFeedback,
    isLoadingAssistantFeedback:
      state.teachingRatingDuplicate.isLoadingAssistantFeedback,
    errorLoadingAssistantFeedback:
      state.teachingRatingDuplicate.errorLoadingAssistantFeedback,
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
)(TeachingRatingDuplicateContainer);
