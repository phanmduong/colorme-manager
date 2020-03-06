import React from 'react';
import {connect} from 'react-redux';
import * as documentActions from '../actions/documentActions';
import {bindActionCreators} from 'redux';
import DocumentComponent from '../components/DocumentComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class DocumentContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = () => {
    this.loadDocuments(this.props.selectedDepartmentId);
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

  loadDocuments = departmentId => {
    if (departmentId === -1) {
      departmentId = '';
    }
    this.props.documentActions.loadDocuments(departmentId, this.props.token);
  };

  refreshDocuments = departmentId => {
    if (departmentId === -1) {
      departmentId = '';
    }
    this.props.documentActions.refreshDocuments(departmentId, this.props.token);
  };

  loadDepartments = () => {
    this.props.documentActions.loadDepartmentFilter(this.props.token);
  };

  onSelectDepartmentId = departmentId => {
    this.props.documentActions.selectedDepartmentId(departmentId);
  };

  render() {
    return (
      <DocumentComponent
        {...this.props}
        onSelectDepartmentId={this.onSelectDepartmentId}
        refreshDocuments={this.refreshDocuments}
        loadDocuments={this.loadDocuments}
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
    isLoadingDoc: state.document.isLoadingDoc,
    refreshingDoc: state.document.refreshingDoc,
    errorDoc: state.document.errorDoc,
    documents: state.document.documents,
    selectedDepartmentId: state.document.selectedDepartmentId,
    departments: state.document.departments,
    isLoadingDepartments: state.document.isLoadingDepartments,
    errorDepartments: state.document.errorDepartments,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    documentActions: bindActionCreators(documentActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocumentContainer);
