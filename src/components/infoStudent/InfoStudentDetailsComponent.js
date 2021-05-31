import React from 'react';
import {
  Image,
  View,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import Spinkit from 'react-native-spinkit';
import theme from '../../styles';
import ScalableImage from 'react-native-scalable-image';
import Call from '../common/Call';
import {isEmptyInput} from '../../helper';
import ImagePicker from 'react-native-image-picker';
import InfoRow from '../common/InfoRow';
import moment from 'moment';
import {GENDER} from '../../constants/constant';
const {width} = Dimensions.get('window');

class InfoStudentDetailsComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  getGender = (genderId) => {
    for (let gender of GENDER) {
      if (parseInt(gender.id) === parseInt(genderId)) {
        return gender.name;
      }
    }
    return null;
  };

  renderStars = (number) => {
    switch (number) {
      case 1:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
          </View>
        );
      case 4:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
          </View>
        );
      case 5:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
          </View>
        );
      default:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
          </View>
        );
    }
  };

  uploadImage = (imageField) => {
    const options = {};
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        let imageUri = response.uri;
        this.props.uploadImage(imageField, imageUri);
        if (this.props.errorUploadingImage) {
          Alert.alert('Thông báo', 'Có lỗi xảy ra');
        }
      }
    });
  };

  render() {
    if (
      !this.props.isLoadingStudent &&
      !this.props.isUploadingImage &&
      !this.props.isUpdatingProfile
    ) {
      return (
        <ScrollView
          style={{marginHorizontal: theme.mainHorizontal}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isLoadingStudent}
              onRefresh={() => this.props.onRefresh()}
            />
          }>
          <View style={{alignItems: 'center', paddingTop: 30}}>
            <TouchableOpacity onPress={() => this.uploadImage('avatar_url')}>
              {!isEmptyInput(this.props.student.avatar_url) ? (
                <Image
                  source={{uri: this.props.student.avatar_url}}
                  style={theme.largeAvatar}
                />
              ) : (
                <Image
                  source={require('../../../assets/img/icons8-male-user-96.png')}
                  style={theme.largeAvatar}
                />
              )}
            </TouchableOpacity>
            <View style={{marginTop: 25}}>
              {this.renderStars(this.props.student.rate)}
            </View>
            <Text style={{marginTop: 10, fontSize: 16}}>
              {this.props.student.email}
            </Text>
            <Call
              extraPadding={{paddingTop: 5, fontSize: 16}}
              url={'tel:' + this.props.student.phone}
              phone={this.props.student.phone}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: 25}}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('AddLead', {
                  lead: this.props.student,
                  mode: 'edit',
                })
              }>
              <View style={styles.editButton}>
                <Text style={{fontSize: 16}}>Sửa thông tin</Text>
              </View>
            </TouchableOpacity>
          </View>

          <InfoRow
            title={'Giới tính'}
            value={this.getGender(this.props.student.gender)}
          />
          <InfoRow
            title={'Ngày sinh'}
            value={
              this.props.student.dob &&
              moment.unix(this.props.student.dob).format('DD/MM/YYYY')
            }
          />
          <InfoRow title={'Công việc'} value={this.props.student.work} />
          <InfoRow title={'Trường học'} value={this.props.student.university} />
          <InfoRow title={'Địa chỉ'} value={this.props.student.address} />
          <InfoRow
            title={'Phụ huynh 1'}
            value={this.props.student.father_name}
          />
          <InfoRow
            title={'Phụ huynh 2'}
            value={this.props.student.mother_name}
          />
          <InfoRow
            title={'Lý do biết đến'}
            value={this.props.student.how_know}
          />
          <InfoRow title={'Facebook'} value={this.props.student.facebook} />
          <InfoRow title={'CMND'} value={this.props.student.identity_code} />
          <InfoRow title={'Quốc tịch'} value={this.props.student.nationality} />

          <View style={{marginTop: 25}}>
            {!isEmptyInput(this.props.student.image1) ? (
              <TouchableOpacity onPress={() => this.uploadImage('image1')}>
                <View style={{borderRadius: 8, overflow: 'hidden'}}>
                  <ScalableImage
                    source={{uri: this.props.student.image1}}
                    width={width - 32}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.uploadImage('image1')}>
                <View style={styles.idContainer}>
                  <ScalableImage
                    source={require('../../../assets/img/icons8-user_folder_filled.png')}
                    width={40}
                    style={{borderRadius: 8}}
                  />
                  <Text
                    style={{color: '#9c9c9c', fontSize: 16, paddingTop: 10}}>
                    Ảnh xác thực
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={{marginTop: 25}}>
            {!isEmptyInput(this.props.student.image2) ? (
              <TouchableOpacity onPress={() => this.uploadImage('image2')}>
                <View style={{borderRadius: 8, overflow: 'hidden'}}>
                  <ScalableImage
                    source={{uri: this.props.student.image2}}
                    width={width - 32}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.uploadImage('image2')}>
                <View style={styles.idContainer}>
                  <ScalableImage
                    source={require('../../../assets/img/icons8-user_folder_filled.png')}
                    width={40}
                  />
                  <Text
                    style={{color: '#9c9c9c', fontSize: 16, paddingTop: 10}}>
                    Ảnh xác thực
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <Spinkit
              isVisible
              color={theme.mainColor}
              type="Wave"
              size={width / 8}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateIcon: {
    width: 15,
    height: 15,
    marginRight: 2,
  },
  rateRow: {
    flexDirection: 'row',
    marginTop: 3,
  },
  idContainer: {
    height: 300,
    borderWidth: 1,
    borderColor: '#9c9c9c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  editButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
  },
};

export default InfoStudentDetailsComponent;
