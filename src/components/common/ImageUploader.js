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

  function updateProgress(evt) {
    if (evt.lengthComputable) {
      let percentComplete = (evt.loaded / evt.total) * 100;
      console.log(percentComplete + '% completed');
    }
  }

  function uploadImage() {
    const options = {};
    // Chọn ảnh từ máy
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        // Nén ảnh
        ImageResizer.createResizedImage(
          response.uri,
          1000,
          1000,
          'JPEG',
          100,
          0,
        )
          .then((response) => {
            let source = {
              uri: response.uri,
              name: 'image.png',
              type: 'image/*',
            };
            setLoading(true);
            // Bắt đầu upload ảnh
            courseApi.uploadImage(
              source,
              (event) => {
                setLoading(false);
                console.log(event.currentTarget.response);
              },
              null,
              () => Alert.alert('Thông báo', 'Không upload được ảnh'),
              props.token,
            );
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
