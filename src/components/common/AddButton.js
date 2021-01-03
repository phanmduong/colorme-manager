import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import theme from '../../styles';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

function AddButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.headerIconContainer}>
        <MatIcon name={'add-circle'} size={20} color={'black'} />
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  headerIconContainer: theme.headerIconContainer,
};

export default AddButton;
