import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Expand({isExpanded, toggleExpand}) {
  return (
    <TouchableOpacity onPress={toggleExpand}>
      <View style={styles.expandContainer}>
        <Text style={styles.expandTitle}>Mở rộng</Text>
        {!isExpanded ? (
          <MaterialIcons name={'expand-more'} color={'black'} size={20} />
        ) : (
          <MaterialIcons name={'expand-less'} color={'black'} size={20} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  expandTitle: {
    fontSize: 18,
    color: 'black',
  },
  expandContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

export default Expand;
