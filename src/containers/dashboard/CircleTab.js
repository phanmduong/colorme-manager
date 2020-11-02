import React from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
const {width} = Dimensions.get('window');

export default class CircleTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.circleTab}>
          <View
            style={[
              styles.iconContainer,
              {backgroundColor: this.props.backgroundColor},
            ]}>
            <Image source={this.props.iconImage} style={styles.icon} />
          </View>
          <Text numberOfLines={2} style={styles.otherFeatureTitle}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  circleTab: {
    alignItems: 'center',
    width: width / 3,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  icon: {
    width: 100,
    height: 80,
    marginLeft: -15,
  },
  otherFeatureTitle: {
    color: 'black',
    marginTop: 15,
    textAlign: 'center',
  },
};
