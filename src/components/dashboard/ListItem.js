import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {View, Text} from 'native-base';
import Icon from '../common/Icon';
import theme from '../../styles';

let {height, width} = Dimensions.get('window');
class ListItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  content() {
    var {title, subTitle, number, nameIcon} = this.props;
    return (
      <View style={styles.container}>
        <Icon name={nameIcon} size={23} color="#7d7d7d" />
        <View style={styles.content}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>{title.toUpperCase()}</Text>
            <Text style={styles.numberTitle}>{number}</Text>
          </View>
          {!this.props.disableSubTitle && (
            <Text style={styles.subTitle}>{subTitle}</Text>
          )}
        </View>
      </View>
    );
  }

  render() {
    if (Platform.OS === 'ios') {
      return (
        <View>
          <TouchableOpacity onPress={this.props.onPress}>
            {this.content()}
          </TouchableOpacity>
          <View style={styles.line} />
        </View>
      );
    } else {
      return (
        <View>
          <TouchableNativeFeedback onPress={this.props.onPress}>
            {this.content()}
          </TouchableNativeFeedback>
          <View style={styles.line} />
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
    marginLeft: 20,
    paddingBottom: 20,
  },
  containerTitle: {
    width: width - 80,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#555555',
    fontWeight: '900',
    fontSize: Platform.isPad ? 18 : 13,
  },
  subTitle: {
    color: '#7d7d7d',
    fontSize: 12,
  },
  numberTitle: {
    color: theme.secondColor,
    fontWeight: 'bold',
    fontSize: Platform.isPad ? 18 : 13,
  },
  line: {
    height: 1,
    backgroundColor: theme.borderColor,
    marginRight: 20,
    marginLeft: 65,
  },
};

export default ListItem;
