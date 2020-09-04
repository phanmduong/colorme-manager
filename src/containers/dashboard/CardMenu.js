import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScalableImage from 'react-native-scalable-image';
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
          <Text style={[styles.featureTitle, this.props.standOutFontSize]}>
            {this.props.title}
          </Text>
          <View style={{alignSelf: 'center', marginTop: 20}}>
            <ScalableImage
              source={this.props.imageSource}
              width={this.props.imageWidth}
            />
          </View>
        </LinearGradient>
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
  checkInOutStyle: {
    height: 150,
    width: (width - theme.mainHorizontal) / 3 - 10,
    borderRadius: 10,
  },
};
