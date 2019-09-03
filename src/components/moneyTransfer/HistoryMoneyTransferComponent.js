import React from 'react';
import {Dimensions, Platform} from 'react-native';
import {Container, Button, View, List, Text} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as alert from '../../constants/alert';
import Loading from '../common/Loading';
import ListItemHistoryTransaction from './ListItemHistoryTransaction';
import {dotNumber} from '../../helper/index';
import theme from '../../styles';

var {height, width} = Dimensions.get('window');
let self;
class HistoryMoneyTransferComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    self = this;
  }

  render() {
    if (this.props.isLoading && this.props.transactionList.length <= 0) {
      return <Loading size={width / 8} />;
    } else {
      if (this.props.error || this.props.transactionList.length <= 0) {
        return (
          <Container>
            <View style={styles.container}>
              <Text style={styles.textError}>
                {this.props.error
                  ? alert.LOAD_DATA_ERROR
                  : alert.NO_DATA_HISTORY_TRANSACTION}
              </Text>
              <Button
                iconLeft
                danger
                small
                onPress={this.props.loadDataHistoryTransaction}
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
            <View style={styles.contentCurrentMoney}>
              <Text style={styles.titleCurrentMoney}>SỐ TIỀN CỦA BẠN: </Text>
              <Text style={styles.textCurrentMoney}>
                {dotNumber(this.props.currentMoney)}đ
              </Text>
            </View>
            <List
              style={styles.list}
              onEndReached={this.props.loadDataHistoryTransaction}
              onEndReachedThreshold={height / 2}
              dataArray={this.props.transactionList}
              renderRow={(item, sectionID, rowID) => (
                <ListItemHistoryTransaction
                  data={item}
                  userId={this.props.userId}
                  acceptTransaction={this.props.acceptTransaction}
                  rejectTransaction={this.props.rejectTransaction}
                />
              )}
              renderFooter={() => {
                if (this.props.isLoading) {
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
  loading: {
    height: 95,
  },
  contentCurrentMoney: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  titleCurrentMoney: {
    color: '#555555',
    fontWeight: '900',
    fontSize: Platform.isPad ? 18 : 13,
  },
  textCurrentMoney: {
    color: theme.secondColor,
    fontWeight: 'bold',
    fontSize: Platform.isPad ? 18 : 13,
  },
};

export default HistoryMoneyTransferComponent;
