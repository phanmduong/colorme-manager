import React from 'react';
import {
  Dimensions,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {View, Text, Thumbnail} from 'native-base';
import theme from '../../styles';

var {height, width} = Dimensions.get('window');

var maxWidthProcess = width / 2;
class ListItemClass extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  content() {
    var {
      nameClass,
      studyTime,
      avatar,
      totalPaid,
      totalRegisters,
      paidTarget,
      registerTarget,
    } = this.props;
    var tmpTotalPaid, tmpTotalRegister;
    tmpTotalPaid = totalPaid < paidTarget ? totalPaid : paidTarget;
    tmpTotalRegister =
      totalRegisters < registerTarget ? totalRegisters : registerTarget;
    return (
      <View style={styles.container}>
        <Thumbnail small source={{uri: avatar}} />
        <View style={styles.content}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>{nameClass}</Text>
          </View>
          <Text style={styles.subTitle}>{studyTime}</Text>
          <View style={styles.containerContentProcess}>
            <View style={styles.processAndText}>
              <View
                style={{
                  ...styles.process,
                  ...styles.containerProcess,
                  ...{
                    backgroundColor: theme.processColorOpacity1,
                  },
                }}>
                <Animated.View
                  style={[
                    styles.process,
                    styles.bar,
                    {
                      width: (maxWidthProcess * tmpTotalPaid) / paidTarget,
                      backgroundColor: theme.processColor1,
                    },
                  ]}
                />
              </View>
              <Text style={styles.textProcess}>
                {totalPaid}/{paidTarget}
              </Text>
            </View>
            <View style={styles.processAndText}>
              <View
                style={{
                  ...styles.process,
                  ...styles.containerProcess,
                  ...{
                    backgroundColor: theme.processColorOpacity2,
                  },
                }}>
                <Animated.View
                  style={[
                    styles.process,
                    styles.bar,
                    {
                      width:
                        (maxWidthProcess * tmpTotalRegister) / registerTarget,
                      backgroundColor: theme.processColor2,
                    },
                  ]}
                />
              </View>
              <Text style={styles.textProcess}>
                {totalRegisters}/{registerTarget}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    if (Platform.OS === 'ios') {
      return (
        <View>
          <TouchableOpacity
            onPress={() => this.props.onPress(this.props.classId)}>
            {this.content()}
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableNativeFeedback
            onPress={() => this.props.onPress(this.props.classId)}>
            {this.content()}
          </TouchableNativeFeedback>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    paddingTop: 20,
  },
  content: {
    flex: 1,
    marginLeft: 20,
    paddingBottom: 20,
  },
  containerTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    fontWeight: '900',
    fontSize: Platform.isPad ? 18 : 13,
  },
  subTitle: {
    color: '#7d7d7d',
    fontSize: 12,
    paddingTop: 5,
  },
  icon: {
    fontSize: 20,
    color: theme.colorTitle,
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
};

export default ListItemClass;
