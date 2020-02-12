import React from 'react';
import {Dimensions, Platform} from 'react-native';
import {Container, Button, View, List, Text} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import * as alert from '../constants/alert';
import ListItemStudent from './listItem/ListItemStudent';
import _ from 'lodash';
import Search from './common/Search';
import {convertVietText} from '../helper';
import SubmitMoneyModal from "./infoStudent/SubmitMoneyModal";

var {height, width} = Dimensions.get('window');
const heightSwiper = Platform.OS === 'ios' ? height - 170 : height - 125;
class ListStudenClassComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
    };
  }

  headerComponent = () => {
    return (
      <Search
        placeholder="Tìm kiếm (Email, tên, số điện thoại)"
        onChangeText={search => this.setState({search})}
        value={this.state.search}
        autoFocus={false}
      />
    );
  };

  searchStudent = stdLst => {
    if (this.state.search === '') {
      return stdLst;
    } else {
      let searchStdLst = [];
      for (let student of stdLst) {
        if (
          convertVietText(student.name).includes(
            convertVietText(this.state.search),
          ) ||
          student.phone.includes(this.state.search) ||
          student.email.includes(this.state.search)
        ) {
          searchStdLst.push(student);
        }
      }
      return searchStdLst;
    }
  };

  render() {
    if (this.props.isLoading) {
      return (
        <Container>
          <View style={styles.container}>
            <Spinkit
              isVisible
              color={theme.mainColor}
              type="Wave"
              size={width / 8}
            />
          </View>
        </Container>
      );
    } else {
      if (this.props.error || this.props.listStudentClass.length <= 0) {
        return (
          <Container>
            <View style={styles.container}>
              <Text style={styles.textError}>
                {this.props.error
                  ? alert.LOAD_DATA_ERROR
                  : alert.NO_DATA_LIST_STUDENT_CLASS}
              </Text>
              <Button
                iconLeft
                danger
                small
                onPress={this.props.onReload}
                style={{marginTop: 10, alignSelf: null}}>
                <MaterialCommunityIcons name="reload" color="white" size={20} />
                <Text>Thử lại</Text>
              </Button>
            </View>
          </Container>
        );
      } else {
        return (
          <List
            style={styles.list}
            dataArray={this.searchStudent(this.props.listStudentClass)}
            ListHeaderComponent={this.headerComponent}
            renderRow={(item, sectionID, rowID) => (
              <ListItemStudent
                {...this.props}
                name={item.name}
                avatar={item.avatar_url}
                phone={item.phone}
                email={item.email}
                status={item.status}
                money={item.money}
                saler={item.saler}
                campaign={item.campaign}
                classInfo={this.props.classInfo}
                studentId={item.id}
                next_code={this.props.classInfo.next_code}
                next_waiting_code={this.props.classInfo.next_waiting_code}
                registerId={item.register_id}
                changeCallStatus={this.props.changeCallStatus}
                token={this.props.token}
                errorChangeCallStatus={this.props.errorChangeCallStatus}
                errorSubmitMoney={this.props.errorSubmitMoney}
                submitMoney={this.props.submitMoney}
                setStudentId={this.props.setStudentId}
              />
            )}
          />
        );
      }
    }
  }
}

const styles = {
  list: {
    marginTop: 5,
  },
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
  slide: {
    height: heightSwiper,
  },
};

export default ListStudenClassComponent;
