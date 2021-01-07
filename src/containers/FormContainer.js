import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import NavigationLeftHeader from '../components/common/NavigationLeftHeader';
import FormComponent from '../components/FormComponent';
import * as formActions from '../actions/formActions';
import {bindActionCreators} from 'redux';
import AddButton from '../components/common/AddButton';
import * as saveRegisterActions from '../actions/saveRegisterActions';

function FormContainer(props) {
  useEffect(() => {
    loadSources();
    loadCampaigns();
    getForms();
  }, []);

  function getForms() {
    props.formActions.getForms(
      false,
      props.currentPage + 1,
      props.search,
      props.token,
      props.domain,
    );
  }

  function loadSources() {
    props.saveRegisterActions.loadSources(props.token, props.domain);
  }

  function loadCampaigns() {
    props.saveRegisterActions.loadCampaigns(props.token, props.domain);
  }

  function refreshForms() {
    props.formActions.refreshForms(props.search, props.token, props.domain);
  }

  function searchForms(search) {
    props.formActions.searchForms(search, props.token, props.domain);
  }

  function duplicateForm(id) {
    props.formActions.duplicateForm(id, props.token, props.domain);
  }

  function deleteForm(id) {
    props.formActions.deleteForm(id, props.token, props.domain);
  }

  console.log(props.forms);

  return (
    <FormComponent
      {...props}
      onRefresh={refreshForms}
      loadForms={getForms}
      searchForms={searchForms}
      duplicateForm={duplicateForm}
      deleteForm={deleteForm}
    />
  );
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    forms: state.form.forms,
    isLoadingForms: state.form.loading,
    errorForms: state.form.error,
    refreshingForms: state.form.refreshing,
    currentPage: state.form.currentPage,
    totalPage: state.form.totalPage,
    search: state.form.search,
    duplicating: state.form.duplicating,
    deleting: state.form.deleting,
    isLoadingSources: state.saveRegister.isLoadingSources,
    errorLoadingSources: state.saveRegister.errorLoadingSources,
    sources: state.saveRegister.sources,
    isLoadingCampaigns: state.saveRegister.isLoadingCampaigns,
    errorLoadingCampaigns: state.saveRegister.errorLoadingCampaigns,
    campaigns: state.saveRegister.campaigns,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    formActions: bindActionCreators(formActions, dispatch),
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
  };
}

FormContainer.navigationOptions = ({navigation}) => {
  return {
    headerLeft: () => (
      <NavigationLeftHeader name={'Form đăng kí'} navigation={navigation} />
    ),
    headerRight: () => (
      <AddButton onPress={() => navigation.navigate('AddForm')} />
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
