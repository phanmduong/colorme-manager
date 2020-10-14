import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import ClassInfoComponent from '../components/ClassInfoComponent';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import {bindActionCreators} from 'redux';
import * as classActions from '../actions/classActions';

const ClassInfoContainer = (props) => {
  useEffect(() => {
    loadClassInfo();
  }, []);

  const loadClassInfo = () => {
    props.classActions.loadClassInfo(props.selectedClassId, props.token);
  };

  return <ClassInfoComponent {...props} loadClassInfo={loadClassInfo} />;
};

ClassInfoContainer.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <View style={styles.headerLeftContainer}>
      <View style={styles.row}>
        <Icon
          name={'chevron-left'}
          size={33}
          color={'black'}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.name}>Thông tin lớp học</Text>
      </View>
    </View>
  ),
});

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    classInfo: state.class.classInfo,
    loadingClassInfo: state.class.loadingClassInfo,
    errorClassInfo: state.class.errorClassInfo,
    selectedClassId: state.class.selectedClassId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    classActions: bindActionCreators(classActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassInfoContainer);
