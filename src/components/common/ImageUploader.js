import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  ActivityIndicator,
  Text,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
const {width} = Dimensions.get('window');
import * as courseApi from '../../apis/courseApi';
import ImageResizer from 'react-native-image-resizer';
import {Thumbnail} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';

function ImageUploader(props) {
  const [loading, setLoading] = useState(false);

  const {title, avatar_url, onUpload, containerStyle} = props;

  function uploadImage() {
    const options = {};
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        ImageResizer.createResizedImage(
          response.uri,
          1000,
          1000,
          'JPEG',
          100,
          0,
        )
          .then((response) => {
            setLoading(true);
            courseApi
              .uploadImage(response.uri, props.token)
              .then((res) => {
                onUpload(res.data.url);
              })
              .catch((error) => {
                Alert.alert('Thông báo', 'Không upload được ảnh');
                throw error;
              })
              .finally(() => {
                setLoading(false);
              });
          })
          .catch((err) => {
            console.log(err);
            Alert.alert('Thông báo', 'Nén thất bại');
          });
      }
    });
  }

  return (
    <View style={containerStyle}>
      {loading ? (
        <View style={styles.idContainer}>
          <ActivityIndicator />
        </View>
      ) : avatar_url ? (
        <TouchableOpacity onPress={uploadImage}>
          <View style={styles.imageContainer}>
            <Thumbnail
              source={{uri: avatar_url}}
              square
              style={{width: width - 32, height: 300}}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={uploadImage}>
          <View style={styles.idContainer}>
            <MaterialIcons name={'folder-shared'} size={40} color={'#9c9c9c'} />
            <Text>{title}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = {
  idContainer: {
    height: 300,
    borderWidth: 1,
    borderColor: '#9c9c9c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
};

function mapStateToProp(state) {
  return {
    token: state.login.token,
  };
}

export default connect(mapStateToProp)(ImageUploader);
