import React from 'react';
import {Image, Text, View} from 'react-native';
import theme from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {isEmptyInput} from '../../helper';

function NavigationLeftHeader({name, navigation, avatar_url}) {
  return (
    <View style={styles.headerLeftContainer}>
      <View style={styles.row}>
        <Icon
          name={'chevron-left'}
          size={33}
          color={'black'}
          onPress={() => navigation.goBack()}
        />
        {!isEmptyInput(avatar_url) && (
          <Image
            source={{uri: avatar_url}}
            style={[styles.ava, {marginRight: 10}]}
          />
        )}
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
  row: theme.row,
  ava: theme.mainAvatar,
};

export default NavigationLeftHeader;
