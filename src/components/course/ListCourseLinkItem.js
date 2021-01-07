import React from 'react';
import {
  View,
  Image,
  Text,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import theme from '../../styles';

function ListCourseLinkItem({
  name,
  avatar_url,
  description,
  link,
  id,
  deleteLink,
}) {
  function onDelete() {
    Alert.alert('Thông báo', 'Bạn có muốn xóa không?', [
      {
        text: 'Hủy bỏ',
        style: 'cancel',
      },
      {
        text: 'Xóa bỏ',
        onPress: () => deleteLink(id),
        style: 'destructive',
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{uri: avatar_url}} style={styles.ava} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={{width: 35}} />
        <View style={styles.rightContainer}>
          <Text style={styles.info}>{description}</Text>
          <Text style={styles.hyperLink} onPress={() => Linking.openURL(link)}>
            {link}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onDelete}>
              <View style={[{marginRight: 10}, styles.button]}>
                <Text style={{fontSize: 16}}>Xóa</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = {
  container: {
    paddingVertical: theme.mainHorizontal,
    paddingHorizontal: theme.mainHorizontal,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ava: theme.mainAvatar,
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: theme.title,
  rightContainer: {
    flex: 1,
    marginLeft: 10,
  },
  info: {
    paddingTop: 5,
    flexWrap: 'wrap',
  },
  hyperLink: {
    paddingTop: 5,
    color: '#2980b9',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 18,
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
  },
};

export default ListCourseLinkItem;
