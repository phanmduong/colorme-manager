import React from 'react';
import {
  Dimensions,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Right,
  Body,
  View,
  ListItem,
  List,
  Thumbnail,
  Text,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

var {height, width} = Dimensions.get('window');
import * as alert from '../constants/alert';
import Loading from '../components/common/Loading';
import theme from '../styles';
import Icon from './common/Icon';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

class ClassComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  headerComponent = () => (
    <View style={styles.headerContainer}>
      <Image
        source={{uri: this.props.avatar_url}}
        style={{width: 35, height: 35, borderRadius: 18}}
      />
      <Text
        style={{
          color: 'black',
          fontSize: 23,
          fontWeight: 'bold',
          marginLeft: 10,
        }}>
        Danh sách lớp học
      </Text>
    </View>
  );

  render() {
    if (this.props.isLoading && this.props.classData.length <= 0) {
      return <Loading size={width / 8} />;
    } else {
      if (this.props.error || this.props.classData.length <= 0) {
        return (
          <Container style={{flex: 1, marginTop: getStatusBarHeight() + 10}}>
            <View style={styles.headerContainer}>
              <Image
                source={{uri: this.props.avatar_url}}
                style={styles.headerAva}
              />
              <Text style={styles.headerTitle}>Danh sách lớp học</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.textError}>
                {this.props.error
                  ? alert.LOAD_DATA_ERROR
                  : alert.NO_CURRENT_CLASS_STUDY}
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
          <View style={{flex: 1, marginTop: getStatusBarHeight() + 10}}>
            <List
              refreshControl={
                <RefreshControl
                  refreshing={this.props.isLoading}
                  onRefresh={this.props.onReload}
                  titleColor={theme.mainColor}
                  title="Đang tải..."
                  tintColor="#d9534f"
                  colors={['#d9534f']}
                />
              }
              ListHeaderComponent={this.headerComponent}
              dataArray={this.props.classData}
              renderRow={(item, sectionID, rowID) => (
                <ListItem
                  // onPress={() => this.props.onSelectedItem(item.id, item.lesson[0].order, rowID)}
                  onPress={() => this.props.onSelectedItem(item, rowID)}
                  onLongPress={() => {}}
                  button
                  style={{borderBottomWidth: 0}}>
                  <Thumbnail small source={{uri: item.avatar_url}} />
                  <Body>
                    <View style={styles.containerClassName}>
                      <Text>{item.name}</Text>
                      {item.lesson[0] && (
                        <View
                          style={{
                            ...styles.card,
                            ...{backgroundColor: theme.processColor1},
                          }}>
                          <Text style={styles.textCard}>
                            BUỔI {item.lesson[0].order}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text note>{item.study_time}</Text>
                    {item.lesson[0] && (
                      <Text note style={{color: theme.colorSubTitle}}>
                        {item.lesson[0].number_student_attendance}/
                        {item.total_paid} học viên
                      </Text>
                    )}
                  </Body>
                  <Right>
                    <View
                      style={{
                        backgroundColor: '#f6f6f6',
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => this.props.openQrCode(item, rowID)}>
                        <Icon
                          name="fontawesome|qrcode"
                          size={25}
                          color={'black'}
                        />
                      </TouchableOpacity>
                    </View>
                  </Right>
                </ListItem>
              )}
            />
          </View>
        );
      }
    }
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
  containerClassName: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    paddingHorizontal: 10,
    marginLeft: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 15,
  },
  textCard: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  headerContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerTitle: {
    color: 'black',
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerAva: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
};

export default ClassComponent;
