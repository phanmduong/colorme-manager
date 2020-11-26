import React from 'react';
import {Dimensions, Text, TouchableOpacity, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const {width} = Dimensions.get('window');
import theme from '../../styles';
import ScalableImage from 'react-native-scalable-image';

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
            <Text style={styles.featureTitle}>{this.props.title}</Text>
          </View>
        </LinearGradient>
        <ScalableImage
          source={this.props.imageSource}
          style={styles.image}
          width={(width - 10) / 3}
        />
      </TouchableOpacity>
    );
  }
}

const styles = {
  featureTitle: {
    fontWeight: 'bold',
    color: '#5E5E5E',
  },
  image: {
    position: 'absolute',
    top: 20,
    left: -5,
  },
  checkInOutStyle: {
    height: 150,
    width: (width - theme.mainHorizontal) / 3 - 10,
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
  content: {
    alignItems: 'center',
    marginBottom: 10,
  },
};
