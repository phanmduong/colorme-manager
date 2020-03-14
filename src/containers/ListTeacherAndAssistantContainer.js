import React from 'react';
import {connect} from 'react-redux';
import ListTeacherAndAssistantComponent from '../components/ListTeacherAndAssistantComponent';
import {bindActionCreators} from 'redux';
import * as teachingTeamActions from '../actions/teachingTeamActions';
import * as genActions from '../actions/genActions';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../styles";

class ListTeacherAndAssistantContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      checkedDataGen: false,
      checkedList: false,
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
    if (this.props.genData.length > 0 && !this.state.checkedDataGen) {
      this.setState({checkedDataGen: true});
      this.props.teachingTeamActions.selectedGenId(this.props.teachingGen.id);
    }

    if (this.props.genData.length > 0 && !this.state.checkedList) {
      this.setState({checkedList: true});
      this.loadTeacherList(this.props.teachingGen.id);
      this.loadAssistantList(this.props.teachingGen.id);
    }
  };

  loadTeacherList = genId => {
    this.props.teachingTeamActions.loadTeacherList(this.props.token, genId);
  };

  loadAssistantList = genId => {
    this.props.teachingTeamActions.loadAssistantList(this.props.token, genId);
  };

  onSelectGenId = genId => {
    this.props.teachingTeamActions.selectedGenId(genId);
    this.loadTeacherList(genId);
    this.loadAssistantList(genId);
  };

  render() {
    console.log('hello ' + this.props.teacherList);
    return (
      <ListTeacherAndAssistantComponent
        isLoadingTeacherList={this.props.isLoadingTeacherList}
        isLoadingAssistantList={this.props.isLoadingAssistantList}
        teacherList={this.props.teacherList}
        assistantList={this.props.assistantList}
        isLoadingGen={this.props.isLoadingGen}
        genData={this.props.genData}
        teachingGen={this.props.teachingGen}
        onSelectGenId={this.onSelectGenId}
        {...this.props}
      />
    );
  }
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    teacherList: state.teachingTeam.teacherList,
    assistantList: state.teachingTeam.assistantList,
    isLoadingTeacherList: state.teachingTeam.isLoadingTeacherList,
    isLoadingAssistantList: state.teachingTeam.isLoadingAssistantList,
    errorLoadingTeacherList: state.teachingTeam.errorLoadingTeacherList,
    errorLoadingAssistantList: state.teachingTeam.errorLoadingAssistantList,
    selectedGenId: state.teachingTeam.selectedGenId,
    teachingGen: state.gen.teachingGen,
    genData: state.gen.genData,
    isLoadingGen: state.gen.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    teachingTeamActions: bindActionCreators(teachingTeamActions, dispatch),
    genActions: bindActionCreators(genActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListTeacherAndAssistantContainer);
