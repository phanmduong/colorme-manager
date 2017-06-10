import React from'react';
import {StyleSheet, Dimensions, RefreshControl, ScrollView, Animated, Platform} from 'react-native';
import {
    Container,
    Button,
    View,
    Text,
    Picker,
    Item,
    List
} from 'native-base';
import Swiper from 'react-native-swiper'
import theme from '../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as alert from '../constants/alert';
import SlideBarchartRegister from './dashboard/SlideBarchartRegister';
import SlideTarget from './dashboard/SlideTarget';
import SlideBarchartMoney from './dashboard/SlideBarchartMoney';
import ListItem from './dashboard/ListItem';
import Loading from './common/Loading';
import {dotNumber} from '../helper';

var {height, width} = Dimensions.get('window');
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
        var {dashboardData} = this.props;
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
                    height={(Platform.isPad) ? height / 2.8 : height / 2}
                    dotColor={theme.secondColor}
                    dotStyle={styles.dotStyle}
                    activeDotColor={theme.secondColor}
                    index={1}
                    loop={false}
                >
                    {(dashboardData && dashboardData.date_array) ?
                        (
                            <SlideBarchartRegister
                                dateArray={dashboardData.date_array}
                                registersByDate={dashboardData.registers_by_date}
                                paidByDate={dashboardData.paid_by_date}
                            />
                        )
                        :
                        (<Loading size={width / 12}/>)
                    }
                    {(dashboardData && dashboardData.date_array) ?
                        (
                            <SlideTarget
                                totalMoney={dashboardData.total_money}
                                countPaid={dashboardData.count_paid}
                                countTotal={dashboardData.count_total}
                                bonus={dashboardData.bonus}
                                targetRevenue={dashboardData.target_revenue}
                            />
                        )
                        :
                        (<Loading size={width / 12}/>)
                    }
                    {(dashboardData && dashboardData.date_array) ?
                        (
                            <SlideBarchartMoney
                                dateArray={dashboardData.date_array}
                                moneyByDate={dashboardData.money_by_date}
                                moneyToday={dashboardData.money_today}
                            />
                        )
                        :
                        (<Loading size={width / 12}/>)
                    }
                </Swiper>
                {(dashboardData && dashboardData.total_classes) ?
                    (
                        <List style={styles.containerList}>
                            <ListItem
                                nameIcon="material|attach-money"
                                title={"Tổng số tiền đã thu"}
                                subTitle={"Chỉ tiêu của bạn"}
                                number={dotNumber(parseInt(dashboardData.total_money)) + "đ"}
                            />
                            <ListItem
                                nameIcon="material|class"
                                title={"Tổng số lớp"}
                                subTitle={"Chỉ tiêu của bạn"}
                                onPress={this.props.onClickClass}
                                number={dotNumber(dashboardData.total_classes)}
                            />
                            <ListItem
                                nameIcon="fontawesome|registered"
                                title={"Tổng số đăng kí"}
                                subTitle={"Chỉ tiêu của bạn"}
                                number={dotNumber(dashboardData.register_number)}
                                onPress={this.props.onClickRegisterList}
                            />
                            <ListItem
                                nameIcon="material|attach-money"
                                title={"Số học viên đã đóng tiền"}
                                subTitle={"Chỉ tiêu của bạn"}
                                number={dotNumber(parseInt(dashboardData.paid_number))}
                            />
                            <ListItem
                                nameIcon="material|money-off"
                                title={"Số học viên nộp 0 đồng"}
                                subTitle={"Chỉ tiêu của bạn"}
                                number={dotNumber(parseInt(dashboardData.zero_paid_num))}
                            />
                            <ListItem
                                nameIcon="material|phonelink-erase"
                                title={"Số học viên chưa gọi điện"}
                                subTitle={"Chỉ tiêu của bạn"}
                                number={dotNumber(parseInt(dashboardData.uncalled_number))}
                            />
                            <ListItem
                                nameIcon="material|update"
                                title={"Số ngày còn lại"}
                                number={(dashboardData.remain_days < 0) ? "Đã hết" : dashboardData.remain_days}
                            />
                        </List>
                    )
                    :
                    (<View/>)
                }
            </ScrollView>
        )
    }

    render() {
        if (this.props.isLoading) {
            return (<Loading size={width / 8}/>)
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
        color: '#d9534f',
        textAlign: 'center'
    },
    wrapper: {},
    dotStyle: {
        opacity: 0.4,
        width: 5,
        height: 5
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
    containerList: {
        borderTopColor: theme.borderColor,
        borderTopWidth: 1
    }
});

export default DashboardComponent;