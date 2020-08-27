import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import theme from '../../styles';
import {dotNumber, findSum} from '../../helper';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');

class AnalyticsStudentBarChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={styles.infoRow}>
          <View style={[styles.infoContainer, {marginRight: 8}]}>
            <View style={styles.row}>
              <Text style={{marginRight: 10}}>Học viên mới</Text>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: '#65DA3A',
                  },
                ]}>
                <MatIcon name={'add-circle'} size={18} color={'white'} />
              </View>
            </View>
            <Text style={styles.infoNum}>
              {this.props.newRegis
                ? dotNumber(findSum(this.props.newRegis))
                : null}
            </Text>
          </View>
          <View style={[styles.infoContainer, {marginLeft: 8}]}>
            <View style={styles.row}>
              <Text style={{marginRight: 10}}>Học viên cũ</Text>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: '#FFDB5A',
                  },
                ]}>
                <Ionicon name={'ios-refresh'} size={15} color={'white'} />
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.infoNum}>
                {this.props.oldRegis
                  ? dotNumber(findSum(this.props.oldRegis))
                  : null}
              </Text>
              <View style={styles.extraNumContainer}>
                <Text style={styles.extraNum}>
                  {this.props.newRegis && this.props.oldRegis
                    ? Math.round(
                        (findSum(this.props.oldRegis) /
                          findSum(this.props.newRegis)) *
                          100,
                      )
                    : null}
                  %
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  infoRow: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: theme.mainHorizontal,
  },
  infoContainer: {
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    padding: 10,
    width: (width - theme.mainHorizontal) / 2 - 16,
  },
  iconContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  infoNum: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: theme.mainHorizontal,
    marginTop: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  tag: {
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraNumContainer: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#65DA3A',
    marginTop: 10,
    marginLeft: 5,
  },
  extraNum: {
    color: 'white',
    fontSize: 12,
  },
};

export default AnalyticsStudentBarChart;
