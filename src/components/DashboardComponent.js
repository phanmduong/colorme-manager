/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {Text, View, TouchableOpacity, Dimensions, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScalableImage from 'react-native-scalable-image';
var {height, width} = Dimensions.get('window');

class CardMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <LinearGradient
          colors={[this.props.colorOne, this.props.colorTwo]}
          style={this.props.checkInOutStyle}>
          <Text style={[styles.featureTitle, this.props.standOutFontSize]}>
            {this.props.title}
          </Text>
        </LinearGradient>
        <View style={this.props.characterImgPosition}>
          <ScalableImage
            source={this.props.imageSource}
            width={this.props.imageWidth}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

class CircleTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{alignItems: 'center', width: 50}}>
          <LinearGradient
            colors={['#E26800', '#E00000']}
            style={styles.circleTab}>
            <Image source={this.props.iconImage} style={styles.iconTab} />
          </LinearGradient>
          <Text numberOfLines={2} style={styles.otherFeatureTitle}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class DashboardComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainFeatureLine}>
          <CardMenu
            colorOne={'#E26800'}
            colorTwo={'#E2DC50'}
            checkInOutStyle={styles.checkInContainer}
            standOutFontSize={{fontSize: 17}}
            imageSource={require('../../assets/img/MiM-check-in.png')}
            imageWidth={(Dimensions.get('window').width - 32) * 0.38}
            title={'Check in'}
            characterImgPosition={styles.checkInCharacterImgPosition}
            onPress={() => {
              this.props.navigation.navigate('CheckIn', {
                title: 'Check in',
                type: 'checkin',
              });
            }}
          />
          <CardMenu
            colorOne={'#6800E2'}
            colorTwo={'#2F94EB'}
            checkInOutStyle={styles.checkOutContainer}
            imageSource={require('../../assets/img/MiM-check-out.png')}
            imageWidth={(Dimensions.get('window').width - 32) * 0.3 * 0.7}
            title={'Check out'}
            characterImgPosition={styles.checkOutCharacterImgPosition}
            onPress={() => {
              this.props.navigation.navigate('CheckOut', {
                title: 'Check out',
                type: 'checkout',
              });
            }}
          />
          <CardMenu
            colorOne={'#E20000'}
            colorTwo={'#E29950'}
            checkInOutStyle={styles.checkOutContainer}
            imageSource={require('../../assets/img/MiM-history.png')}
            imageWidth={(Dimensions.get('window').width - 32) * 0.26 * 0.9}
            title={'Lịch sử'}
            characterImgPosition={styles.historyCharacterImgPosition}
            onPress={() => {
              this.props.navigation.navigate('HistoryAllAttendance');
            }}
          />
        </View>
        <View style={styles.otherFeatureLine}>
          <CircleTab
            iconImage={require('../../assets/img/icons8-ratings-90.png')}
            title={'Thống kê'}
            onPress={() => {
              this.props.navigation.navigate('Analytics');
            }}
          />
          <CircleTab
            iconImage={require('../../assets/img/icons8-contact-100.png')}
            title={'Xác thực'}
            onPress={() => {
              this.props.navigation.navigate('AccurateStudent');
            }}
          />
          <CircleTab
            iconImage={require('../../assets/img/icons8-idea-96-2.png')}
            title={'Họp'}
            onPress={() => {
              this.props.navigation.navigate('Meeting');
            }}
          />
        </View>
        <View style={styles.otherFeatureLine}>
          <CircleTab
            iconImage={require('../../assets/img/icons8-time-card-90.png')}
            title={'ĐK làm việc'}
            onPress={() => {
              this.props.navigation.navigate('WorkShiftRegister');
            }}
          />
          <View style={{width: 50}} />
          <View style={{width: 50}} />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
  mainFeatureLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  // 32 is the total left, right margin,
  // 0.40 is the relative ratio of container to screen width,
  // (178/139) is the ratio between height and width
  checkInContainer: {
    height: (Dimensions.get('window').width - 32) * 0.4 * (178 / 139),
    width: (Dimensions.get('window').width - 32) * 0.4,
    borderRadius: 10,
  },
  // 32 is the total left, right margin,
  // 0.26 is the relative ratio of container to screen width,
  // (178/139) is the ratio between height and width
  checkOutContainer: {
    height: (Dimensions.get('window').width - 32) * 0.26 * (178 / 139),
    width: (Dimensions.get('window').width - 32) * 0.26,
    borderRadius: 10,
  },
  featureTitle: {
    marginLeft: 8,
    marginTop: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  // 32 is the total left, right margin,
  // 0.18, 0.08 is the relative ratio of image to screen width
  checkInCharacterImgPosition: {
    position: 'absolute',
    top: (Dimensions.get('window').width - 32) * 0.19,
    left: (Dimensions.get('window').width - 32) * 0.06,
  },
  // 32 is the total left, right margin,
  // 0.15, 0.09 is the relative ratio of image to screen width
  checkOutCharacterImgPosition: {
    position: 'absolute',
    top: (Dimensions.get('window').width - 32) * 0.15,
    left: (Dimensions.get('window').width - 32) * 0.07,
  },
  // 32 is the total left, right margin,
  // 0.14, 0.06 is the relative ratio of image to screen width
  historyCharacterImgPosition: {
    position: 'absolute',
    top: (Dimensions.get('window').width - 32) * 0.15,
    left: (Dimensions.get('window').width - 32) * 0.05,
  },
  circleTab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTab: {
    width: 29,
    height: 29,
  },
  otherFeatureLine: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-around',
  },
  otherFeatureTitle: {
    color: 'black',
    marginTop: 15,
    textAlign: 'center',
  },
};

export default DashboardComponent;
