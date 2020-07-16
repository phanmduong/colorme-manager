import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import theme from '../../styles';

class WorkShiftClockSelectionCell extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {avatar_url, name, onPress} = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.containerItem}>
          <View style={styles.containerPerson}>
            <Image source={{uri: avatar_url}} style={styles.avatar} />
            <View>
              <Text style={{fontWeight: '600'}}>{name}</Text>
            </View>
          </View>
          <Image
            source={require('../../../assets/img/icons8-more-than-100.png')}
            style={{width: 15, height: 15}}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  containerItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  containerPerson: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: theme.mainAvatar.height,
    width: theme.mainAvatar.width,
    borderRadius: theme.mainAvatar.borderRadius,
    marginRight: 10,
  },
};

export default WorkShiftClockSelectionCell;
