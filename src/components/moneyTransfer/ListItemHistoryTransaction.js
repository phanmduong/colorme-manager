import React from 'react';
import {
  Dimensions,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import {View, Text, Thumbnail, List} from 'native-base';
import theme from '../../styles';
import {dotNumber} from '../../helper';
import Icon from '../common/Icon';
import Spinkit from 'react-native-spinkit';

var {height, width} = Dimensions.get('window');
var maxWidthProcess = width / 2;
class ListItemHistoryTransaction extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      onPressed: false,
    };
  }

  onChangePress() {
    this.setState({
      onPressed: !this.state.onPressed,
    });
  }

  content() {
    const {
      sender,
      money,
      type,
      receiver,
      note,
      created_at,
      status,
      id,
      isLoadingConfirmTransaction,
    } = this.props.data;
    if (type === 'chuyentien') {
      return (
        <View style={styles.container}>
          {receiver && receiver.id === this.props.userId ? (
            <Icon
              style={{...styles.icon, ...{color: '#13b300'}}}
              name="entypo|arrow-right"
            />
          ) : (
            <Icon
              name="entypo|arrow-left"
              style={{...styles.icon, ...{color: theme.secondColor}}}
            />
          )}

          <View style={styles.content}>
            <View style={styles.contentLeft}>
              <View style={styles.content}>
                <View style={styles.containerTitle}>
                  <Text style={styles.title}>
                    {receiver && receiver.id === this.props.userId
                      ? sender.name.trim().toUpperCase()
                      : receiver.name.trim().toUpperCase()}
                  </Text>
                </View>
                <View style={styles.containerSubTitle}>
                  <Text style={styles.subTitle}>
                    {dotNumber(money)}đ - {created_at.substr(0, 10)}
                  </Text>
                  <Text style={styles.subTitle}>
                    {type === 'thu' ? note : 'Nhân viên'}
                  </Text>
                </View>
              </View>
              <View>
                {status === 'pending' ? (
                  receiver && receiver.id === this.props.userId ? (
                    <View style={styles.containerButtonConform}>
                      <TouchableOpacity
                        style={{
                          ...styles.buttonConfirm,
                          backgroundColor: '#13b300',
                        }}
                        onPress={() => {
                          !isLoadingConfirmTransaction &&
                            this.props.acceptTransaction(id);
                        }}>
                        {isLoadingConfirmTransaction ? (
                          <View style={styles.containerLoading}>
                            <Spinkit
                              isVisible
                              color="white"
                              type="ThreeBounce"
                              size={20}
                            />
                          </View>
                        ) : (
                          <Text style={styles.textButtonConfirm}>ĐỒNG Ý</Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          ...styles.buttonConfirm,
                          backgroundColor: theme.secondColor,
                        }}
                        onPress={() => {
                          !isLoadingConfirmTransaction &&
                            this.props.rejectTransaction(id);
                        }}>
                        {isLoadingConfirmTransaction ? (
                          <View style={styles.containerLoading}>
                            <Spinkit
                              isVisible
                              color="white"
                              type="ThreeBounce"
                              size={20}
                            />
                          </View>
                        ) : (
                          <Text style={styles.textButtonConfirm}>TỪ CHỐI</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text
                      style={{
                        ...styles.statusTransaction,
                        ...{
                          color: theme.secondColor,
                        },
                      }}>
                      Đang chuyển tiền...
                    </Text>
                  )
                ) : (
                  <Text
                    style={{
                      ...styles.statusTransaction,
                      ...{
                        color:
                          status === 'success' ? '#13b300' : theme.secondColor,
                      },
                    }}>
                    {status === 'success' ? 'Thành công' : 'Thất bại'}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      let pos = note.indexOf('-');
      let nameStudent;

      if (pos > 0) {
        nameStudent = note.substring(9, pos);
      } else {
        nameStudent = note.slice(9);
      }

      return (
        <View style={styles.container}>
          <Icon
            style={{...styles.icon, ...{color: '#13b300'}}}
            name="entypo|arrow-right"
          />
          <View style={styles.content}>
            <View style={styles.contentLeft}>
              <View style={styles.content}>
                <View style={styles.containerTitle}>
                  <Text style={styles.title}>
                    {nameStudent.trim().toUpperCase()}
                  </Text>
                </View>
                <View style={styles.containerSubTitle}>
                  <Text style={styles.subTitle}>
                    {dotNumber(money)}đ - {created_at.substr(0, 10)}
                  </Text>
                  <Text style={styles.subTitle}>
                    {pos <= 0
                      ? 'Học viên'
                      : note.substr(0, 9) + note.slice(pos)}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    ...styles.statusTransaction,
                    ...{
                      color:
                        status === 'success' ? '#13b300' : theme.secondColor,
                    },
                  }}>
                  {status === 'success' ? 'Thành công' : 'Thất bại'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

  render() {
    if (Platform.OS === 'ios') {
      return (
        <View>
          <TouchableOpacity onPress={() => this.onChangePress()}>
            <View style={styles.containerAll}>{this.content()}</View>
          </TouchableOpacity>
          <View style={styles.line} />
        </View>
      );
    } else {
      return (
        <View>
          <TouchableNativeFeedback onPress={() => this.onChangePress()}>
            <View style={styles.containerAll}>{this.content()}</View>
          </TouchableNativeFeedback>
          <View style={styles.line} />
        </View>
      );
    }
  }
}

const styles = {
  containerAll: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  container: {
    flexDirection: 'row',
  },
  containerExpand: {
    marginLeft: 55,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  containerTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#555555',
    fontWeight: '900',
    fontSize: Platform.isPad ? 18 : 13,
    width: width / 2,
  },
  subTitle: {
    color: theme.colorSubTitle,
    fontSize: 12,
  },
  icon: {
    fontSize: 35,
  },
  line: {
    height: 1,
    backgroundColor: theme.borderColor,
    marginRight: 20,

    marginLeft: 75,
  },
  containerContentProcess: {
    paddingTop: 5,
  },
  containerProcess: {
    marginVertical: 5,
    backgroundColor: theme.secondColorOpacity,
    width: maxWidthProcess,
  },
  bar: {},
  process: {
    borderRadius: 5,
    height: 5,
    backgroundColor: theme.secondColor,
  },
  processAndText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textProcess: {
    color: theme.colorTitle,
    fontSize: 12,
  },
  containerSubTitle: {
    width: width / 2,
    flexDirection: 'column',
  },
  email: {
    color: theme.colorSubTitle,
    marginTop: 5,
    fontSize: Platform.isPad ? 18 : 13,
  },
  card: {
    paddingHorizontal: 10,
    marginLeft: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 15,
  },
  money: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  isReceivedCard: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  statusTransaction: {
    fontSize: 13,
  },
  contentLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerButtonConform: {
    flexDirection: 'column',
  },
  buttonConfirm: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 3.5,
    backgroundColor: theme.secondColor,
    padding: 5,
    borderRadius: 5,
    marginVertical: 2.5,
  },
  textButtonConfirm: {
    fontSize: 11,
    color: 'white',
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ListItemHistoryTransaction;
