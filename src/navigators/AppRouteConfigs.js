/**
 * Created by phanmduong on 6/7/17.
 */
import * as React from "react";
import {StackNavigator, TabBarTop, TabNavigator, DrawerNavigator}from 'react-navigation';
import theme from '../styles';
import LoginContainer from '../containers/LoginContainer';
import ClassContainer from '../containers/ClassContainer';
import QRCodeContainer from '../containers/QRCodeContainer';
import AttendanceStudentContainer from '../containers/AttendanceStudentContainer';
import CurrentClassStudyContainer from '../containers/CurrentClassStudyContainer';
import CollectMoneyContainer from '../containers/CollectMoneyContainer';
import StudentRegisterClassContainer from '../containers/StudentRegisterClassContainer';
import MoneyTransferContainer from '../containers/MoneyTransferContainer';
import ShiftRegisterContainer from '../containers/ShiftRegisterContainer';
import DashboardContainer from '../containers/DashboardContainer';
import ListStudentClassContainer from '../containers/ListStudentClassContainer';
import RegisterListContainer from '../containers/RegisterListContainer';
import TabIcon from '../components/common/TabIcon';
import MenuButton from '../components/common/MenuButton';


const navigationOptionsDefault = {
    navigationOptions: ({navigation}) => ({
        headerBackTitle: null,
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: theme.mainColor
        },
        headerPressColorAndroid: '#ffffff80',
        headerRight: (<MenuButton onOpenMenu={() => navigation.navigate('DrawerOpen')}/>)
    }),
};

const TabAttendance = StackNavigator({
    CurrentClassStudy: {
        screen: CurrentClassStudyContainer
    },
    QRCode: {
        screen: QRCodeContainer
    },
    AttendanceStudent: {
        screen: AttendanceStudentContainer
    }
}, navigationOptionsDefault);

const TabShiftRegister = StackNavigator({
    ShiftRegister: {
        screen: ShiftRegisterContainer
    }
}, navigationOptionsDefault);

const TabDashboard = StackNavigator({
    Dashboard: {
        screen: DashboardContainer
    },
    Class: {
        screen: ClassContainer
    },
    ListStudentClass: {
        screen: ListStudentClassContainer
    },
    RegisterList: {
        screen: RegisterListContainer
    }
}, navigationOptionsDefault);

const TabCollectMoney = StackNavigator({
    CollectMoney: {
        screen: CollectMoneyContainer
    },
    StudentRegisterClass: {
        screen: StudentRegisterClassContainer
    }
}, navigationOptionsDefault);

const TabMoneyTransfer = StackNavigator({
    MoneyTransfer: {
        screen: MoneyTransferContainer
    }
}, navigationOptionsDefault);

const DashboardMain = TabNavigator({
    TabAttendance: {
        screen: TabAttendance,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: 'Điểm danh',
            tabBarIcon: (<TabIcon nameIcon="fontawesome|qrcode"/>)
        }),
    },
    TabShiftRegister: {
        screen: TabShiftRegister,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: 'Lịch trực',
            tabBarIcon: (<TabIcon nameIcon="fontawesome|edit"/>)
        }),
    },
    TabDashboard: {
        screen: TabDashboard,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: 'Quản lý',
            tabBarIcon: (<TabIcon nameIcon="material|apps"/>),
        }),
    },
    TabCollectMoney: {
        screen: TabCollectMoney,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: 'Nộp tiền',
            tabBarIcon: (<TabIcon nameIcon="material|attach-money"/>)
        }),
    },
    TabMoneyTransfer: {
        screen: TabMoneyTransfer,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: 'Chuyển tiền',
            tabBarIcon: (<TabIcon nameIcon="entypo|wallet"/>)
        }),
    }
}, {
    tabBarComponent: TabBarTop,
    swipeEnabled: false,
    animationEnabled: true,
    tabBarOptions: {
        indicatorStyle: {
            backgroundColor: 'transparent'
        },
        style: {
            backgroundColor: theme.mainColor,
        },
        showIcon: true,
        showLabel: false
    },
    initialRouteName: 'TabDashboard',
    tabBarPosition: 'bottom',
    backBehavior: 'none',

});

const Drawer = DrawerNavigator({
    TabDashboard: {
        screen: DashboardMain,
        navigationOptions: ({navigation}) => ({
            title: 'Bảng điều khiển',
        })
    }
}, {
    drawerPosition: 'right',
    backBehavior: 'none',
});

const Main = StackNavigator({
    Drawer: {
        screen: Drawer
    }
}, {
    headerMode: 'none'
});

export const routeConfigs = {
    Login: {
        screen: LoginContainer,
    },
    Main: {
        screen: Main
    }
};

export const navigationOptions = {
    headerMode: 'none'
};