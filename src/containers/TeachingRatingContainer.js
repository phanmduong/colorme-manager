import React from 'react';
import TeachingRatingComponent from '../components/TeachingRatingComponent';
import {connect} from 'react-redux';
import * as teachingRatingActions from '../actions/teachingRatingActions';
import {bindActionCreators} from 'redux';
import * as genActions from '../actions/genActions';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class TeachingRatingContainer extends React.Component {
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
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('ListTeacherAndAssistant')}>
        <Image
          source={require('../../assets/img/icons8-user-group-90.png')}
          style={{width: 20, height: 20, marginRight: 20}}
        />
      </TouchableOpacity>
    ),
  });

  componentDidMount = () => {
    this.loadTeacherRatingData(this.props.user.id);
    this.loadAssistantRatingData(this.props.user.id);
    this.loadGenData();
  };

  componentWillReceiveProps(props) {
    if (props.genData.length > 0 && !this.state.checkedDataGen) {
      this.setState({checkedDataGen: true});
      this.props.teachingRatingActions.selectedGenId(props.teachingGen.id);
    }

    if (props.genData.length > 0 && !this.state.checkedFeedback) {
      this.setState({checkedFeedback: true});
      this.loadTeacherFeedback(props.teachingGen.id, this.props.user.id);
      this.loadAssistantFeedback(props.teachingGen.id, this.props.user.id);
    }
  }

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

  loadGenData = () => {
    this.props.genActions.loadDataGen(this.props.token);
  };

  onSelectGenId = genId => {
    this.props.teachingRatingActions.selectedGenId(genId);
    this.loadTeacherFeedback(genId, this.props.user.id);
    this.loadAssistantFeedback(genId, this.props.user.id);
  };

  render() {
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
          this.loadTeacherRatingData(this.props.user.id);
          this.loadAssistantRatingData(this.props.user.id);
          this.loadTeacherFeedback(
            this.props.selectedGenId,
            this.props.user.id,
          );
          this.loadAssistantFeedback(
            this.props.selectedGenId,
            this.props.user.id,
          );
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
    user: state.login.user,
    teacherRatingData: state.teachingRating.teacherRatingData,
    isLoadingTeacherRating: state.teachingRating.isLoadingTeacherRating,
    errorTeachingRating: state.teachingRating.errorTeacherRating,
    assistantRatingData: state.teachingRating.assistantRatingData,
    isLoadingAssistantRating: state.teachingRating.isLoadingAssistantRating,
    errorAssistantRating: state.teachingRating.errorAssistantRating,
    genData: state.gen.genData,
    selectedGenId: state.teachingRating.selectedGenId,
    teachingGen: state.gen.teachingGen,
    isLoadingGen: state.gen.isLoading,
    teacherFeedback: state.teachingRating.teacherFeedback,
    isLoadingTeacherFeedback: state.teachingRating.isLoadingTeacherFeedback,
    errorLoadingTeacherFeedback:
      state.teachingRating.errorLoadingTeacherFeedback,
    assistantFeedback: state.teachingRating.assistantFeedback,
    isLoadingAssistantFeedback: state.teachingRating.isLoadingAssistantFeedback,
    errorLoadingAssistantFeedback:
      state.teachingRating.errorLoadingAssistantFeedback,
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
