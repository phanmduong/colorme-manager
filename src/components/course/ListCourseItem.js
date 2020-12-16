import React, {useState} from 'react';
import {View, Image, Text, Switch, TouchableOpacity} from 'react-native';
import theme from '../../styles';
import {dotNumber} from '../../helper';

function ListCourseItem({
  name,
  price,
  lessons,
  description,
  avatar_url,
  id,
  onStatusChange,
  currentStatus,
  parentCourses,
  parent_id,
  navigation,
}) {
  const [status, setStatus] = useState(currentStatus === 1);

  function getParentCourse() {
    if (parent_id) {
      for (const parent of parentCourses) {
        if (parent.id === parent_id) {
          return parent.name;
        }
      }
    }
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{uri: avatar_url}} style={styles.headerAva} />
        <View style={styles.contentColumn}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{name}</Text>
            <Switch
              onValueChange={(value) => {
                onStatusChange(id, value);
                setStatus(value);
              }}
              value={status}
            />
          </View>
          <View style={styles.row}>
            {parent_id && (
              <View
                style={{
                  ...styles.card,
                  ...{
                    backgroundColor: '#32CA41',
                  },
                }}>
                <Text style={styles.saler}>{getParentCourse()}</Text>
              </View>
            )}
          </View>
          <Text style={styles.info}>{description}</Text>
          <Text style={styles.info}>{lessons.length} buổi</Text>
          <Text style={styles.info}>{dotNumber(price)}đ</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddCourse', {
                  editMode: true,
                  id: id,
                })
              }>
              <View style={styles.button}>
                <Text style={{fontSize: 16}}>Sửa thông tin</Text>
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
    paddingVertical: 16,
    marginHorizontal: theme.mainHorizontal,
  },
  row: {
    flexDirection: 'row',
  },
  headerAva: theme.mainAvatar,
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentColumn: {
    flex: 1,
    marginLeft: 10,
  },
  info: {
    paddingTop: 5,
  },
  card: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saler: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
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

export default ListCourseItem;
