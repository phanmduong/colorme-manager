import React from 'react';
import {Dimensions, Text, TouchableOpacity, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const {width} = Dimensions.get('window');
import theme from '../../styles';

export default class CardMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <LinearGradient
          colors={[this.props.colorOne, this.props.colorTwo]}
          style={styles.checkInOutStyle}>
          <View style={styles.content}>
            <Image source={this.props.imageSource} style={styles.image} />
            <Text style={styles.featureTitle}>{this.props.title}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = {
  featureTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: 100,
    height: 100,
  },
  checkInOutStyle: {
    height: 150,
    width: (width - theme.mainHorizontal) / 3 - 10,
    borderRadius: 10,
  },
  content: {
    alignItems: 'center',
    marginTop: 20,
  },
};
