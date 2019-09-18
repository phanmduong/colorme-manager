/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Dimensions} from 'react-native';
import {observer} from 'mobx-react';
import HistoryAttendanceShiftStore from './HistoryAttendanceShiftStore';
import Spinkit from 'react-native-spinkit';
import theme from '../../styles';
import {Button, Container, Item, Picker, Text, View} from 'native-base';
import ListHistoryAttendanceShift from './ListHistoryAttendanceShift';
import * as alert from '../../constants/alert';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

var {height, width} = Dimensions.get('window');

@observer
class HistoryAttendanceShiftContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = new HistoryAttendanceShiftStore();
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
  });

  componentWillMount = () => {
    this.loadData();
    this.store.loadBases(this.props.token);
    this.store.loadGens(this.props.token);
  };

  loadData = () => {
    this.store.loadHistoryWorkShift(this.props.token);
  };

  errorData() {
    const {error} = this.store;
    const NO_DATA = alert.NO_DATA_WORK_SHIFT_REGISTER;
    return (
      <View style={styles.container}>
        <Text style={styles.textError}>
          {error ? alert.LOAD_DATA_ERROR : NO_DATA}
        </Text>
        <Button
          iconLeft
          danger
          small
          onPress={this.loadData}
          style={{marginTop: 10, alignSelf: null}}>
          <MaterialCommunityIcons name="reload" color="white" size={20} />
          <Text>Thử lại</Text>
        </Button>
      </View>
    );
  }

  onSelectBaseId = baseId => {
    this.store.selectedBaseId = baseId;
    this.loadData();
  };

  onSelectGenId = genId => {
    this.store.selectedGenId = genId;
    this.loadData();
  };

  render() {
    const {
      isLoading,
      error,
      shifts,
      bases,
      gens,
      selectedBaseId,
      selectedGenId,
    } = this.store;
    return (
      <Container>
        <View style={styles.containerPicker}>
          <Picker
            iosHeader="Chọn khóa học"
            style={{width: width / 2}}
            mode="dialog"
            defaultLabel={'Chọn khóa'}
            selectedValue={selectedGenId}
            onValueChange={this.onSelectGenId}>
            {gens.map(function(gen, index) {
              return (
                <Item label={'Khóa ' + gen.name} value={gen.id} key={index} />
              );
            })}
          </Picker>
          <Picker
            iosHeader="Chọn cơ sở"
            style={{width: width / 2}}
            mode="dialog"
            defaultLabel={'Chọn cơ sở'}
            selectedValue={selectedBaseId}
            onValueChange={this.onSelectBaseId}>
            {bases.map(function(base, index) {
              return <Item label={base.name} value={base.id} key={index} />;
            })}
          </Picker>
        </View>
        {isLoading ? (
          <View style={styles.container}>
            <Spinkit
              isVisible
              color={theme.mainColor}
              type="Wave"
              size={width / 8}
            />
          </View>
        ) : error || (shifts && shifts.length <= 0) ? (
          this.errorData()
        ) : (
          <ListHistoryAttendanceShift store={this.store} />
        )}
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: '#d9534f',
    textAlign: 'center',
  },
  containerPicker: {
    flexDirection: 'row',
  },
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    user: state.login.user,
  };
}

export default connect(mapStateToProps)(HistoryAttendanceShiftContainer);
