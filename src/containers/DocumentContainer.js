import React from 'react';
import {connect} from 'react-redux';
import * as documentActions from '../actions/documentActions';
import {bindActionCreators} from 'redux';
import DocumentComponent from '../components/DocumentComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';

class DocumentContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadDocuments(-1);
    this.loadDepartments();
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
          <Text style={styles.name}>Tài liệu</Text>
        </View>
      </View>
    ),
  });

  loadDocuments = (departmentId) => {
    if (departmentId === -1) {
      departmentId = '';
    }
    this.props.documentActions.loadDocuments(
      departmentId,
      this.props.token,
      this.props.domain,
    );
  };

  refreshDocuments = (departmentId) => {
    if (departmentId === -1) {
      departmentId = '';
    }
    this.props.documentActions.refreshDocuments(
      departmentId,
      this.props.token,
      this.props.domain,
    );
  };

  loadDepartments = () => {
    this.props.documentActions.loadDepartmentFilter(
      this.props.token,
      this.props.domain,
    );
  };

  render() {
    return (
      <DocumentComponent
        {...this.props}
        refreshDocuments={this.refreshDocuments}
        loadDocuments={this.loadDocuments}
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
    isLoadingDoc: state.document.isLoadingDoc,
    refreshingDoc: state.document.refreshingDoc,
    errorDoc: state.document.errorDoc,
    documents: state.document.documents,
    departments: state.document.departments,
    isLoadingDepartments: state.document.isLoadingDepartments,
    errorDepartments: state.document.errorDepartments,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    documentActions: bindActionCreators(documentActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentContainer);
