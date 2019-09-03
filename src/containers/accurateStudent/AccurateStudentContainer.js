/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Dimensions, Image, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import theme from '../../styles';
import {Button, Container, Item, List, Picker, Text, View} from 'native-base';
import * as alert from '../../constants/alert';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AccurateStudentStore from './AccurateStudentStore';
import Search from '../../components/common/Search';
import Loading from '../../components/common/Loading';
import ListItemStudent from './ListItemStudent';
import Modal from 'react-native-modalbox';
import Call from '../../components/common/Call';
import ImagePicker from 'react-native-image-picker';

var {height, width} = Dimensions.get('window');

const options = {
  title: 'Chọn ảnh',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

@observer
class AccurateStudentContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = new AccurateStudentStore();
    this.state = {
      imageIndex: 0,
      isImageViewVisible: false,
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Xác thực học viên',
  });

  searchStudent = value => {
    this.store.search = value;
    if (this.timeOut !== null) {
      clearTimeout(this.timeOut);
    }
    this.timeOut = setTimeout(
      function() {
        this.store.searchStudent(this.props.token);
      }.bind(this),
      500,
    );
  };

  componentDidMount() {
    this.store.searchStudent(this.props.token);
  }

  renderSearch() {
    return (
      <Search
        placeholder="Tìm kiếm (Email, tên, số điện thoại)"
        onChangeText={this.searchStudent}
        value={this.store.search}
      />
    );
  }

  renderContent() {
    const {isLoading, error, students} = this.store;
    if (isLoading && students.length <= 0) {
      return <Loading size={width / 8} />;
    } else {
      if (error || students.length <= 0) {
        return (
          <Container>
            <View style={styles.container}>
              <Text style={styles.textError}>
                {error ? alert.LOAD_DATA_ERROR : alert.NO_DATA_STUDENT_LIST}
              </Text>
              <Button
                iconLeft
                danger
                small
                onPress={() => {
                  this.store.searchStudent(this.props.token);
                }}
                style={{marginTop: 10, alignSelf: null}}>
                <MaterialCommunityIcons name="reload" color="white" size={20} />
                <Text>Thử lại</Text>
              </Button>
            </View>
          </Container>
        );
      } else {
        return (
          <List
            dataArray={students.slice()}
            renderRow={(item, sectionID, rowID) => (
              <ListItemStudent
                name={item.name}
                avatar={item.avatar_url}
                email={item.email}
                phone={item.phone}
                student={item}
                onPress={this.openModal}
              />
            )}
          />
        );
      }
    }
  }

  openModal = student => {
    this.store.studentSelected = student;
    this._modal.open();
  };

  getImages(student = {}) {
    return [
      {
        source:
          student.image1 == null || student.image1 === ''
            ? require('../../../assets/img/no_photo.png')
            : {
                uri: student.image1,
              },
        title: 'Ảnh 1',
        width: 1280,
        height: 960,
        isUploading: student.isUploading_image1,
        name: 'image1',
      },
      {
        source:
          student.image2 == null || student.image2 === ''
            ? require('../../../assets/img/no_photo.png')
            : {
                uri: student.image2,
              },
        title: 'Ảnh 2',
        width: 1280,
        height: 960,
        isUploading: student.isUploading_image2,
        name: 'image2',
      },
    ];
  }

  render() {
    const images = this.getImages(this.store.studentSelected);
    const student = this.store.studentSelected;

    return (
      <Container>
        {this.renderSearch()}
        {this.renderContent()}
        {student && (
          <Modal
            style={styles.modalFull}
            ref={modal => {
              this._modal = modal;
            }}
            position={'center'}
            // backdropPressToClose={!this.props.isUpdatingMoneyStudent}
            // swipeToClose={!this.props.isUpdatingMoneyStudent}
          >
            <View style={styles.container}>
              <View style={styles.containerFlex1}>
                <Image
                  source={
                    !student.avatar_url || student.avatar_url === ''
                      ? require('../../../assets/img/colorme.jpg')
                      : {uri: student.avatar_url}
                  }
                  style={styles.image}
                />
              </View>
              <View style={styles.containerFlex1}>
                <Text style={styles.textName}>
                  {student.name ? student.name.trim().toUpperCase() : ''}
                </Text>
                <Text style={styles.subTitle}>{student.email}</Text>
                <Call url={'tel:' + student.phone} phone={student.phone} />
              </View>
              <View style={styles.containerFlexImage}>
                {images.map((image, index) => {
                  console.log(image);
                  if (image.isUploading) {
                    return (
                      <View style={styles.containerUploading} key={index}>
                        <Loading size={width / 12} />
                      </View>
                    );
                  }
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => this.uploadImage(image.name)}>
                      <Image
                        style={styles.imageStudent}
                        source={image.source}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </Modal>
        )}
      </Container>
    );
  }

  uploadImage(imageField) {
    this.studentSelected = {
      ...this.studentSelected,
      ['isUploading_' + imageField]: true,
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        this.studentSelected = {
          ...this.studentSelected,
          ['isUploading_' + imageField]: false,
        };
        console.log('User cancelled image picker');
      } else if (response.error) {
        this.studentSelected = {
          ...this.studentSelected,
          ['isUploading_' + imageField]: false,
        };
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {
          uri: response.uri,
          name: response.fileName ? response.fileName : 'image.png',
          type: 'image/*',
        };

        this.store.uploadImage(source, imageField, this.props.token);

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  }
}

const styles = {
  container: {
    height: height - 200,
    justifyContent: 'center',
    alignItems: 'center',
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
  containerPicker: {
    flexDirection: 'row',
    borderBottomColor: theme.borderColor,
    borderBottomWidth: 1,
    shadowColor: '#b4b4b4',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 0.5,
    shadowOpacity: 0.5,
  },
  modalFull: {
    height: height - 200,
    width: width - 40,
    borderRadius: 10,
  },
  containerFlex1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFlexImage: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  imageStudent: {
    width: width / 3.5,
    height: width / 3.5,
    marginHorizontal: 10,
  },
  containerUploading: {
    width: width / 3.5,
    height: width / 3.5,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width / 4,
    height: width / 4,
    borderRadius: width / 8,
    marginTop: 20,
  },
  subTitle: {
    color: theme.colorSubTitle,
    fontSize: 12,
    marginVertical: 5,
  },
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    user: state.login.user,
  };
}

export default connect(mapStateToProps)(AccurateStudentContainer);
