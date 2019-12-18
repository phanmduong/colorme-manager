import React from 'react';
import {Dimensions, TouchableOpacity, ScrollView} from 'react-native';
import {Container, Button, View, List, Text} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import * as alert from '../constants/alert';
import ListItemRegisterStudent from './registerList/ListItemRegisterStudent';
import Loading from './common/Loading';
import Search from './common/Search';
import LinearGradient from 'react-native-linear-gradient';

var {height, width} = Dimensions.get('window');
class RegisterListComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderSearch() {
    const {updateFormAndLoadDataSearch, search} = this.props;
    return (
      <Search
        placeholder="Tìm kiếm (Email, tên, số điện thoại)"
        onChangeText={updateFormAndLoadDataSearch}
        value={search}
        autoFocus={this.props.autoFocus}
      />
    );
  }

  renderPicker = () => (
    <View style={styles.containerTag}>
      {this.props.segmentActive === 1 ? (
        <TouchableOpacity>
          <LinearGradient
            colors={['#F6F6F6', '#F6F6F6']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.tag}>
            <Text style={{color: 'black'}}>Tất cả</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.tag}
          onPress={() => this.props.changeSegmentRegisterList(1)}>
          <Text>Tất cả</Text>
        </TouchableOpacity>
      )}
      {this.props.segmentActive === 2 ? (
        <TouchableOpacity>
          <LinearGradient
            colors={['#F6F6F6', '#F6F6F6']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.tag}>
            <Text style={{color: 'black'}}>Của bạn</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.tag}
          onPress={() => this.props.changeSegmentRegisterList(2)}>
          <Text>Của bạn</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  headerComponent = () => (
    <View style={{height: 50, width: 50, backgroundColor: 'red'}} />
  );

  renderContent() {
    if (this.props.isLoading && this.props.registerList.length <= 0) {
      return <Loading size={width / 8} />;
    } else {
      if (
        (this.props.error || this.props.registerList.length <= 0) &&
        !this.props.isSearchLoading
      ) {
        return (
          <Container>
            <View style={styles.container}>
              <Text style={styles.textError}>
                {this.props.error
                  ? alert.LOAD_DATA_ERROR
                  : alert.NO_DATA_REGISTER_LIST_CLASS}
              </Text>
              <Button
                iconLeft
                danger
                small
                onPress={this.props.onRefresh}
                style={{marginTop: 10, alignSelf: null}}>
                <MaterialCommunityIcons name="reload" color="white" size={20} />
                <Text>Thử lại</Text>
              </Button>
            </View>
          </Container>
        );
      } else {
        return (
          <View style={{flex: 1}}>
            <List
              style={styles.list}
              onEndReached={this.props.loadDataRegisterList}
              onEndReachedThreshold={height / 2}
              dataArray={this.props.registerList}
              onRefresh={this.props.onRefresh}
              refreshing={this.props.refreshing}
              scrollEnabled={false}
              renderRow={(item, sectionID, rowID) => (
                <ListItemRegisterStudent
                  {...this.props}
                  nameClass={item.class.name}
                  name={item.name}
                  avatar={item.course_avatar_url}
                  email={item.email}
                  phone={item.phone}
                  saler={this.props.segmentActive === 1 ? item.saler : null}
                  campaign={item.campaign}
                  callStatus={item.call_status}
                  paidStatus={item.paid_status}
                  money={item.money}
                  studentId={item.student_id}
                  setStudentId={this.props.setStudentId}
                  avatar_url={item.avatar_url}
                />
              )}
              renderFooter={() => {
                if (this.props.isLoading || this.props.isSearchLoading) {
                  return (
                    <View style={styles.loading}>
                      <Loading size={width / 12} />
                    </View>
                  );
                } else {
                  <View />;
                }
              }}
            />
          </View>
        );
      }
    }
  }

  render() {
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        {this.renderSearch()}
        {this.renderPicker()}
        {this.renderContent()}
      </ScrollView>
    );
  }
}

const styles = {
  list: {},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: '#d9534f',
    textAlign: 'center',
  },
  wrapper: {},
  dotStyle: {
    opacity: 0.4,
    width: 5,
    height: 5,
  },
  titleList: {
    paddingTop: 10,
    width: width,
    textAlign: 'center',
    color: theme.colorTitle,
    fontWeight: '900',
  },
  loading: {
    height: 95,
  },
  containerTag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  tag: {
    paddingHorizontal: 20,
    marginRight: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default RegisterListComponent;
