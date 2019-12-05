import React from 'react';
import {Image, Dimensions, TouchableOpacity, Alert} from 'react-native';
import {Container, Button, List, View, Text} from 'native-base';

var {height, width} = Dimensions.get('window');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import Loading from '../components/common/Loading';
import * as alert from '../constants/alert';
import ImageView from 'react-native-image-view';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

const options = {
  title: 'Chọn ảnh',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
class AttendanceStudentComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.renderRow = this.renderRow.bind(this);
    this.updateAttendance = this.updateAttendance.bind(this);
    this.state = {
      imageIndex: 0,
      isImageViewVisible: false,
    };
  }

  updateAttendance() {
    let attendanceId = this.props.student.attendances.filter(attendances => {
      return attendances.order == this.props.orderLessonCourse;
    })[0].id;
    this.props.onUpdateAttendance(attendanceId);
  }

  uploadImage = imageField => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        ImageResizer.createResizedImage(response.uri, 1000, 1000, 'JPEG', 100, 0)
          .then(response => {
            let source = {
              uri: response.uri,
              name: response.name ? response.name : 'image.png',
              type: 'image/*',
            };
            this.props.uploadImage(source, imageField);
          })
          .catch(err => {
            console.log(err)
            Alert.alert('Thông báo', 'Nén thất bại');
          });

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  render() {
    if (this.props.isLoadingInfoStudent) {
      return <Loading size={width / 8} />;
    } else {
      if (this.props.error) {
        return (
          <Container>
            <View style={styles.container}>
              <Text style={styles.textError}>
                {!this.props.messageError
                  ? alert.LOAD_DATA_ERROR
                  : this.props.messageError}{' '}
                {this.props.studentCode}
              </Text>
              <Button
                iconLeft
                danger
                small
                onPress={this.props.onReload}
                style={{marginTop: 10, alignSelf: null}}>
                <MaterialCommunityIcons name="reload" color="white" size={20} />
                <Text>Thử lại</Text>
              </Button>
            </View>
          </Container>
        );
      } else {
        const images = this.getImages(this.props.student);
        const hasEnoughImage =
          this.props.student.image1 || this.props.student.image2;
        return (
          <View style={styles.container}>
            <View style={styles.containerFlex1}>
              <Image
                source={
                  !this.props.student.avatar_url ||
                  this.props.student.avatar_url === ''
                    ? require('../../assets/img/colorme.jpg')
                    : {uri: this.props.student.avatar_url}
                }
                style={styles.image}
              />
            </View>
            <View style={styles.containerFlex1}>
              <Text style={styles.textName}>{this.props.student.name}</Text>
              <Text style={styles.textStudentCode}>
                {this.props.studentCode}
              </Text>
            </View>
            <View style={styles.containerFlexImage}>
              {images.map((image, index) => {
                return (
                  <View style={styles.viewImage}>
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        this.setState({
                          imageIndex: index,
                          isImageViewVisible: true,
                        })
                      }>
                      <Image
                        style={styles.imageStudent}
                        source={image.source}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                    <Button
                      rounded
                      small
                      block
                      style={[
                        image.isUploading
                          ? styles.disableButton
                          : styles.button,
                        {marginTop: 10},
                      ]}
                      onPress={() => this.uploadImage(image.name)}
                      disabled={image.isUploading}>
                      <Text>{image.isUploading ? 'Đang tải' : 'Đăng'}</Text>
                    </Button>
                  </View>
                );
              })}
            </View>

            <View style={styles.containerList}>
              <List
                style={{height: 30}}
                horizontal
                dataArray={this.props.student.attendances}
                renderRow={this.renderRow}
              />
            </View>
            <View style={styles.viewButton}>
              {this.props.student.is_blocked ? (
                <View style={styles.viewButton}>
                  <Button
                    disabled={
                      !hasEnoughImage || this.props.isChangeStatusBlocking
                    }
                    block
                    rounded
                    style={
                      !hasEnoughImage || this.props.isChangeStatusBlocking
                        ? styles.disableButton
                        : styles.button
                    }
                    onPress={this.props.studentUnblock}>
                    {this.props.isChangeStatusBlocking ? (
                      <Text>Đang cập nhật dữ liệu...</Text>
                    ) : (
                      <Text>{'Mở khoá'}</Text>
                    )}
                  </Button>
                  <Button
                    bordered
                    danger
                    full
                    rounded
                    style={{marginTop: 10}}
                    onPress={this.props.goBack}>
                    <Text>Mời học viên ra về</Text>
                  </Button>
                </View>
              ) : hasEnoughImage ? (
                <Button
                  disabled={this.props.isUpdatingAttendanceStudent}
                  block
                  rounded
                  style={
                    this.props.isUpdatingAttendanceStudent
                      ? styles.disableButton
                      : styles.button
                  }
                  onPress={this.updateAttendance}>
                  {this.props.isUpdatingAttendanceStudent ? (
                    <Text>Đang cập nhật dữ liệu...</Text>
                  ) : (
                    <Text>
                      {'Điểm danh buổi ' +
                        parseInt(this.props.orderLessonCourse)}
                    </Text>
                  )}
                </Button>
              ) : (
                <Button
                  disabled={this.props.isChangeStatusBlocking}
                  block
                  rounded
                  style={
                    this.props.isChangeStatusBlocking
                      ? styles.disableButton
                      : styles.button
                  }
                  onPress={this.props.studentBlock}>
                  {this.props.isChangeStatusBlocking ? (
                    <Text>Đang cập nhật dữ liệu...</Text>
                  ) : (
                    <Text>{'Khoá tài khoản'}</Text>
                  )}
                </Button>
              )}
            </View>
            <ImageView
              glideAlways
              images={images}
              imageIndex={this.state.imageIndex}
              animationType="fade"
              isVisible={this.state.isImageViewVisible}
              onClose={() => this.setState({isImageViewVisible: false})}
            />
          </View>
        );
      }
    }
  }

  renderRow(rowData) {
    switch (rowData.status) {
      case 0: // chua diem danh
        return (
          <View style={styles.textNumber}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              {rowData.order}
            </Text>
          </View>
        );
      case 1: // di hoc
        return (
          <View style={styles.textNumberGreen}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              {rowData.order}
            </Text>
          </View>
        );
      default:
        // nghi hoc, -100
        return (
          <View style={styles.textNumberRed}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              {rowData.order}
            </Text>
          </View>
        );
    }
  }

  getImages(student) {
    return [
      {
        source:
          student.image1 == null || student.image1 === ''
            ? require('../../assets/img/no_photo.png')
            : {
                uri: student.image1,
              },
        title: 'Ảnh 1',
        width: 1280,
        height: 960,
        name: 'image1',
        isUploading: student.isUploading_image1,
      },
      {
        source:
          student.image2 == null || student.image2 === ''
            ? require('../../assets/img/no_photo.png')
            : {
                uri: student.image2,
              },
        title: 'Ảnh 2',
        width: 1280,
        height: 960,
        name: 'image2',
        isUploading: student.isUploading_image2,
      },
    ];
  }
}

const styles = {
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFlex1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFlexImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  containerFlex2: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerList: {
    marginTop: 15,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  imageStudent: {
    width: width / 3.5,
    height: width / 3.5,
    marginHorizontal: 10,
  },
  image: {
    width: width / 4,
    height: width / 4,
    borderRadius: width / 8,
  },
  textNumberRed: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.mainColor,
    marginHorizontal: 7,
  },
  textNumberGreen: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009e23',
    marginHorizontal: 7,
  },
  textNumber: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
    backgroundColor: '#6b6b6b',
  },
  button: {
    backgroundColor: theme.mainColor,
  },
  disableButton: {
    backgroundColor: theme.mainColor + 'AF',
  },
  viewButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: width - width / 8,
  },
  textName: {
    fontSize: 20,
  },
  textStudentCode: {
    fontSize: 15,
    color: '#888888',
    marginTop: 10,
  },
  textError: {
    color: '#d9534f',
    textAlign: 'center',
  },
  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: 10,
  },
};

export default AttendanceStudentComponent;
