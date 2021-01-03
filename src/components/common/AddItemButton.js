import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function AddItemButton({onPress, title, containerStyle}) {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <View style={styles.addScheduleButton}>
        <Text style={styles.addScheduleText}>{title}</Text>
        <MaterialIcons name={'add-circle-outline'} size={25} color={'white'} />
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  addScheduleText: {
    color: 'white',
    marginRight: 5,
  },
  addScheduleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2ACC4C',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
};

export default AddItemButton;
