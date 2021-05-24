import React from 'react';
import {connect} from 'react-redux';
import * as infoStudentActions from '../../actions/infoStudentActions';
import {bindActionCreators} from 'redux';
import InfoStudentDetailsComponent from '../../components/infoStudent/InfoStudentDetailsComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as leadsActions from '../../actions/leadsActions';
import * as saveRegisterActions from '../../actions/saveRegisterActions';

class InfoStudentDetailsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadStudent();
    this.loadStaff('');
    this.loadStatuses();
    this.loadCampaigns();
    this.loadCampaigns();
  };

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
          <Text style={styles.name}>Thông tin học viên</Text>
        </View>
      </View>
    ),
  });

  loadStudent = () => {
    this.props.infoStudentActions.loadStudent(
      this.props.studentId,
      this.props.token,
      this.props.domain,
    );
  };

  loadStaff = (search) => {
    this.props.leadsActions.getStaff(
      search,
      this.props.token,
      this.props.domain,
    );
  };

  loadStatuses = () => {
    this.props.saveRegisterActions.loadStatuses(
      'leads',
      this.props.token,
      this.props.domain,
    );
  };

  loadCampaigns = () => {
    this.props.saveRegisterActions.loadCampaigns(
      this.props.token,
      this.props.domain,
    );
  };

  loadSources = () => {
    this.props.saveRegisterActions.loadSources(
      this.props.token,
      this.props.domain,
    );
  };

  uploadImage = (imageField, imageUri) => {
    this.props.infoStudentActions.uploadImage(
      imageUri,
      this.props.studentId,
      imageField,
      this.props.token,
      this.props.domain,
    );
  };

  render() {
    return (
      <InfoStudentDetailsComponent
        {...this.props}
        isLoadingStudent={this.props.isLoadingStudent}
        student={this.props.student}
        uploadImage={this.uploadImage}
        isUploadingImage={this.props.isUploadingImage}
        errorUploadingImage={this.props.errorUploadingImage}
        isUpdatingProfile={this.props.isUpdatingProfile}
        onRefresh={this.loadStudent}
        loadStaff={this.loadStaff}
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
    student: state.infoStudent.student,
    isLoadingStudent: state.infoStudent.isLoadingStudent,
    errorStudent: state.infoStudent.errorStudent,
    studentId: state.infoStudent.studentId,
    isUploadingImage: state.infoStudent.isUploadingImage,
    errorUploadingImage: state.infoStudent.errorUploadingImage,
    isUpdatingProfile: state.infoStudent.isUpdatingProfile,
    errorUpdatingProfile: state.infoStudent.errorUpdatingProfile,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    infoStudentActions: bindActionCreators(infoStudentActions, dispatch),
    leadsActions: bindActionCreators(leadsActions, dispatch),
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoStudentDetailsContainer);
