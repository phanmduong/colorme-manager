import React from 'react';
import {Text, View} from 'react-native';
import theme from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function NavigationLeftHeader({name, navigation}) {
  return (
    <View style={styles.headerLeftContainer}>
      <View style={styles.row}>
        <Icon
          name={'chevron-left'}
          size={33}
          color={'black'}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
  row: theme.row,
};

export default NavigationLeftHeader;
