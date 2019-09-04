/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Dimensions} from 'react-native';
import {observer} from 'mobx-react';
import HistoryAttendanceTeachingStore from './HistoryAttendanceTeachingStore';
import Spinkit from 'react-native-spinkit';
import theme from '../../styles';
import {Button, Container, Item, Picker, Text, View} from 'native-base';
import ListHistoryAttendanceTeaching from './ListHistoryAttendanceTeaching';
import * as alert from '../../constants/alert';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

var {height, width} = Dimensions.get('window');

@observer
class HistoryAttendanceTeachingContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = new HistoryAttendanceTeachingStore();
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Lịch sử lịch giảng dạy',
  });

  componentWillMount() {
    this.loadData();
    this.store.loadGens(this.props.token);
  }

  loadData = () => {
    this.store.loadHistoryTeaching(this.props.token);
  };

  errorData() {
    const {error} = this.store;
    return (
      <View style={styles.container}>
        <Text style={styles.textError}>
          {error ? alert.LOAD_DATA_ERROR : alert.NO_DATA_CLASS}
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

  onSelectGenId = genId => {
    this.store.selectedGenId = genId;
    this.loadData();
  };

  render() {
    const {isLoading, error, attendances, gens, selectedGenId} = this.store;
    return (
      <Container>
        <View style={styles.containerPicker}>
          <Picker
            style={{marginLeft: -6}}
            iosHeader="Chọn khóa học"
            mode="dialog"
            defaultLabel={'Chọn khóa'}
            textStyle={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: '#F6F7F6',
              borderRadius: 16,
            }}
            selectedValue={selectedGenId}
            onValueChange={this.onSelectGenId}>
            {gens.map(function(gen, index) {
              return (
                <Item label={'Khóa ' + gen.name} value={gen.id} key={index} />
              );
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
        ) : error || (attendances && attendances.length <= 0) ? (
          this.errorData()
        ) : (
          <ListHistoryAttendanceTeaching store={this.store} />
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

export default connect(mapStateToProps)(HistoryAttendanceTeachingContainer);
