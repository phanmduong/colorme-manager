/**
 * Created by phanmduong on 4/25/17.
 */
import React from 'react';
import {Text, View} from 'react-native';

const HeaderSection = ({title, subtitle}) => (
  <View style={style.container}>
    <Text style={style.title}>{title}</Text>
    <Text style={style.subtitle}>{subtitle}</Text>
  </View>
);

const style = {
  container: {
    flexDirection: 'column',
  },
  title: {},
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
};

export default HeaderSection;
