import React from'react';
import {StyleSheet, Dimensions, RefreshControl, ScrollView, Animated} from 'react-native';
import {
    Container,
    Button,
    View,
    Text,
    Picker,
    Item,
    List
} from 'native-base';
import Icon from '../components/common/Icon';
var {height, width} = Dimensions.get('window');
import Spinkit from 'react-native-spinkit';
import Swiper from 'react-native-swiper'
import theme from '../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as alert from '../constants/alert';
import * as Progress from 'react-native-progress';

class DashboardComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadDataDashboard = this.loadDataDashboard.bind(this);
    }

    loadDataDashboard() {
        this.props.loadDataDashboard(this.props.selectedBaseId, this.props.selectedGenId);
    }

    errorData() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.textError}>{(this.props.errorDashboard) ? alert.LOAD_DATA_ERROR : alert.NO_DATA_SHIFT_REGISTER}</Text>
                <Button iconLeft danger small onPress={this.loadDataDashboard}
                        style={{marginTop: 10, alignSelf: null}}>
                    <MaterialCommunityIcons name='reload' color='white' size={20}/>
                    <Text>Thử lại</Text>
                </Button>
            </View>
        )
    }

    showDashboard() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.isLoadingDashboard}
                        onRefresh={this.loadDataDashboard}
                        titleColor={theme.mainColor}
                        title="Đang tải..."
                        tintColor='#d9534f'
                        colors={['#d9534f']}
                    />
                }>
                <Swiper
                    style={styles.wrapper}
                    height={height / 2.5}
                    dotColor={theme.secondColor}
                    dotStyle={styles.dotStyle}
                    activeDotColor={theme.secondColor}
                    index={1}
                >
                    <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={styles.slide1}>
                        <Progress.Circle
                            size={100}
                            progress={0.9}
                            indeterminate={false}
                            color={theme.mainColor}
                            showsText
                            formatText={(progressValue) => {
                                console.log(progressValue);
                                return parseInt(0.9 * 100) + '%';
                            }}
                        />
                        <Text style={{marginTop: 10, fontSize: 12, fontWeight: '500', color: '#555555'}}>123.000.000đ/130.000.000đ</Text>
                        <View style={{width: width - width / 10, marginVertical: 25}}>
                            <View style={{
                                ...styles.bar, ...styles.points, ...{
                                    backgroundColor: theme.secondColorOpacity
                                }
                            }}>
                                <Animated.View style={[styles.bar, styles.points, {width: 3 * width / 5}]}/>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 5,
                                marginHorizontal: 5
                            }}>
                                <Text style={{color: '#7d7d7d', fontSize: 12}}>{'Chỉ tiêu của bạn'}</Text>
                                <Text style={{color: '#7d7d7d', fontSize: 12}}>{'48/60 (70%)'}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>
                <List style={{
                    paddingTop: 10, paddingHorizontal: 20, borderTopColor: theme.borderColor,
                    borderTopWidth: 1
                }}>
                    <View style={{flexDirection: 'row', paddingTop: 20}}>
                        <Icon
                            name="entypo|add-to-list"
                            size={23}
                            color='#7d7d7d'
                        />
                        <View style={{
                            flex: 1, marginLeft: 30, borderBottomColor: theme.borderColor,
                            paddingBottom: 20,
                            borderBottomWidth: 1
                        }}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{color: '#555555', fontWeight: '500'}}>TỔNG SỐ LỚP</Text>
                                <Text style={{color: theme.secondColor, fontWeight: 'bold'}}>34</Text>
                            </View>
                            <Text style={{color: '#7d7d7d', fontSize: 12}}>{'Chỉ tiêu của bạn'}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', paddingTop: 20}}>
                        <Icon
                            name="entypo|add-to-list"
                            size={23}
                            color='#7d7d7d'
                        />
                        <View style={{
                            flex: 1, marginLeft: 30, borderBottomColor: theme.borderColor,
                            paddingBottom: 20,
                            borderBottomWidth: 1
                        }}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{color: '#555555', fontWeight: '500'}}>TỔNG SỐ LỚP</Text>
                                <Text style={{color: theme.secondColor, fontWeight: 'bold'}}>34</Text>
                            </View>
                            <Text style={{color: '#7d7d7d', fontSize: 12}}>{'Chỉ tiêu của bạn'}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', paddingTop: 20}}>
                        <Icon
                            name="entypo|add-to-list"
                            size={23}
                            color='#7d7d7d'
                        />
                        <View style={{
                            flex: 1, marginLeft: 30, borderBottomColor: theme.borderColor,
                            paddingBottom: 20,
                            borderBottomWidth: 1
                        }}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{color: '#555555', fontWeight: '500'}}>TỔNG SỐ LỚP</Text>
                                <Text style={{color: theme.secondColor, fontWeight: 'bold'}}>34</Text>
                            </View>
                            <Text style={{color: '#7d7d7d', fontSize: 12}}>{'Chỉ tiêu của bạn'}</Text>
                        </View>
                    </View>
                </List>
            </ScrollView>
        )
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Container>
                    <View style={styles.container}>
                        <Spinkit
                            isVisible
                            color={theme.mainColor}
                            type='Wave'
                            size={width / 8}
                        />
                    </View>
                </Container>
            )
        } else {
            return (
                <Container>
                    <View style={styles.containerPicker}>
                        <Picker
                            style={{width: width / 2, padding: 0, margin: 0}}
                            iosHeader="Chọn khóa học"
                            mode="dialog"
                            defaultLabel={"Chọn khóa"}
                            selectedValue={this.props.selectedGenId}
                            onValueChange={this.props.onSelectGenId}>
                            {this.props.genData.map(function (gen, index) {
                                return (<Item label={"Khóa " + gen.name} value={gen.id} key={index}/>)
                            })}
                        </Picker>
                        <Picker
                            style={{width: width / 2, padding: 0, margin: 0}}
                            iosHeader="Chọn cơ sở"
                            mode="dialog"
                            defaultLabel={"Chọn cơ sở"}
                            selectedValue={this.props.selectedBaseId}
                            onValueChange={this.props.onSelectBaseId}>
                            {this.props.baseData.map(function (base, index) {
                                return (<Item label={base.name} value={base.id} key={index}/>)
                            })}
                        </Picker>
                    </View>
                    {(!this.props.isLoadingDashboard && (this.props.errorDashboard)) ?
                        this.errorData() :
                        this.showDashboard()
                    }
                </Container>
            );
        }

    }
}

const styles = ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textError: {
        color: '#d9534f'
    },
    wrapper: {},
    dotStyle: {
        opacity: 0.4,
        width: 5,
        height: 5
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#000000',
        fontSize: 30,
        fontWeight: 'bold',
    },
    containerPicker: {
        flexDirection: 'row',
        borderBottomColor: theme.borderColor,
        borderBottomWidth: 1,
        shadowColor: '#b4b4b4',
        shadowOffset: {
            width: 0,
            height: 0
        },
        elevation: 0.5,
        shadowOpacity: 0.5
    },
    bar: {
        borderRadius: 5,
        height: 5
    },
    points: {
        backgroundColor: theme.secondColor
    }
});

export default DashboardComponent;