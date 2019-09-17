import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
          style={this.props.checkInOutStyle}>
          <Text style={[styles.featureTitle, this.props.standOutFontSize]}>
            {this.props.title}
          </Text>
        </LinearGradient>
        <View style={this.props.characterImgPosition}>
          <ScalableImage
            source={this.props.imageSource}
            width={this.props.imageWidth}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  featureTitle: {
    marginLeft: 8,
    marginTop: 12,
    fontWeight: 'bold',
    color: 'white',
  },
};
