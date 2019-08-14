/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {Text, View, TouchableOpacity, Dimensions, Image} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import ScalableImage from "react-native-scalable-image";

class CardMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <LinearGradient colors={[this.props.colorOne, this.props.colorTwo]}
                                style={this.props.checkInOutStyle}>
                    <Text style={[styles.featureTitle, this.props.standOutFontSize]}>{this.props.title}</Text>
                    <View style={styles.characterImgPosition}>
                        <ScalableImage source={this.props.imageSource}
                                       width={this.props.imageWidth}/>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

class CircleTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={{alignItems: 'center'}}>
                    <LinearGradient colors={['#E26800', '#E00000']}
                                    style={styles.circleTab}>
                        <Image source={this.props.iconImage}
                               style={styles.iconTab}/>
                    </LinearGradient>
                    <Text style={styles.otherFeatureTitle}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        )
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
                    <CardMenu colorOne={'#E26800'}
                              colorTwo={'#E2DC50'}
                              checkInOutStyle={styles.checkInContainer}
                              standOutFontSize={{fontSize: 17}}
                              imageSource={require('../../assets/img/walle.png')}
                              imageWidth={(Dimensions.get('window').width - 32) * 0.40 * 0.8}
                              title={'Check in'}
                              onPress={() => {
                                  this.props.navigation.navigate("CheckIn", {
                                      title: 'Check in',
                                      type: 'checkin'
                                  })
                              }}/>
                    <CardMenu colorOne={'#6800E2'}
                              colorTwo={'#2F94EB'}
                              checkInOutStyle={styles.checkOutContainer}
                              imageSource={require('../../assets/img/buzzLightyear.png')}
                              imageWidth={(Dimensions.get('window').width - 32) * 0.26 * 0.5}
                              title={'Check out'}
                              onPress={() => {
                                  this.props.navigation.navigate("CheckOut", {
                                      title: 'Check out',
                                      type: 'checkout'
                                  })
                              }}/>
                    <CardMenu colorOne={'#E20000'}
                              colorTwo={'#E29950'}
                              checkInOutStyle={styles.checkOutContainer}
                              imageSource={require('../../assets/img/bunny.png')}
                              imageWidth={(Dimensions.get('window').width - 32) * 0.26 * 0.7}
                              title={'Lịch sử'}
                              onPress={() => {
                                  this.props.navigation.navigate("HistoryAllAttendance")
                              }}/>
                </View>
                <View style={styles.otherFeatureLine}>
                    <CircleTab iconImage={require('../../assets/img/icons8-ratings-90.png')}
                               title={'Thống kê'}
                               onPress={() => {
                                   this.props.navigation.navigate("Analytics")
                               }}/>
                    <CircleTab iconImage={require('../../assets/img/icons8-contact-100.png')}
                               title={'Xác thực'}
                               onPress={() => {
                                   this.props.navigation.navigate("AccurateStudent")
                               }}/>
                    <CircleTab iconImage={require('../../assets/img/icons8-idea-96-2.png')}
                               title={'Họp'}
                               onPress={() => {
                                   this.props.navigation.navigate("Meeting")
                               }}/>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        marginLeft: 16,
        marginRight: 16
    },
    mainFeatureLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },
    checkInContainer: {
        height: (Dimensions.get('window').width - 32) * 0.40 * (178 / 139),
        width: (Dimensions.get('window').width - 32) * 0.40,
        borderRadius: 10
    },
    checkOutContainer: {
        height: (Dimensions.get('window').width - 32) * 0.26 * (178 / 139),
        width: (Dimensions.get('window').width - 32) * 0.26,
        borderRadius: 10
    },
    featureTitle: {
        marginLeft: 8,
        marginTop: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    characterImgPosition: {
        flex:1 ,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    circleTab: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconTab: {
        width: 29,
        height: 29
    },
    otherFeatureLine: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-around'
    },
    otherFeatureTitle: {
        color: 'black',
        marginTop: 15
    }
};

export default (DashboardComponent);
