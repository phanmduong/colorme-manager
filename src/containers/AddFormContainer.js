import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import * as formActions from '../actions/formActions';
import {bindActionCreators} from 'redux';
import NavigationLeftHeader from '../components/common/NavigationLeftHeader';
import AddFormComponent from '../components/AddFormComponent';
import * as saveRegisterActions from '../actions/saveRegisterActions';
import * as baseActions from '../actions/baseActions';

function AddFormContainer(props) {
  useEffect(() => {
    loadCourses();
    loadDataBase();
  }, []);

  function loadCourses() {
    props.saveRegisterActions.loadCourses(props.token);
  }

  function loadDataBase() {
    props.baseActions.loadDataBase(props.token);
  }

  function createForm(data) {
    props.formActions.createForm(data, props.token);
  }

  function updateForm(data) {
    props.formActions.updateForm(data, props.token);
  }

  const editMode = props.navigation.getParam('editMode');
  const data = props.navigation.getParam('data');

  return (
    <AddFormComponent
      {...props}
      createForm={createForm}
      editMode={editMode}
      data={data}
      updateForm={updateForm}
    />
  );
}

AddFormContainer.navigationOptions = ({navigation}) => {
  return {
    headerLeft: () => (
      <NavigationLeftHeader name={'Tạo form'} navigation={navigation} />
    ),
  };
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    isLoadingCourses: state.saveRegister.isLoadingCourses,
    errorLoadingCourses: state.saveRegister.errorLoadingCourses,
    courses: state.saveRegister.courses,
    isLoadingBase: state.base.isLoading,
    errorLoadingBase: state.base.error,
    baseData: state.base.baseData,
    creating: state.form.creating,
    errorCreate: state.form.errorCreate,
    updating: state.form.updating,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    formActions: bindActionCreators(formActions, dispatch),
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
    baseActions: bindActionCreators(baseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFormContainer);
