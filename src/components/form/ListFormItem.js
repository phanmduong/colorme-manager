import React from 'react';
import {View, Text, Linking} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../styles';
import moment from 'moment';

function ListFormItem({name, description, slug, created_at}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.headerAva}>
          <MaterialIcons
            name={'format-list-bulleted'}
            size={20}
            color={'white'}
          />
        </View>
        <Text style={styles.formName}>{name}</Text>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.placeholderAva} />
        <View style={styles.content}>
          <Text style={styles.info}>{description}</Text>
          <Text
            style={styles.hyperLink}
            onPress={() =>
              Linking.openURL(
                `http://manage.colorme.vn:2222/pages/registers/${slug}`,
              )
            }>
            http://manage.colorme.vn:2222/pages/registers/{slug}
          </Text>
          <Text style={styles.info}>
            {moment.unix(created_at).format('HH:MM DD/MM/YYYY')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = {
  container: {
    marginHorizontal: theme.mainHorizontal,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAva: {
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F29C38',
  },
  placeholderAva: {
    width: 35,
  },
  formName: {
    fontSize: theme.title.fontSize,
    fontWeight: theme.title.fontWeight,
    marginLeft: 15,
    marginRight: 5,
  },
  subContainer: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  info: {
    flexWrap: 'wrap',
    paddingTop: 5,
  },
  hyperLink: {
    paddingTop: 5,
    color: '#2980b9',
  },
};

export default ListFormItem;
