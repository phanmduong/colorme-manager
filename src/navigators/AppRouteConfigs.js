/**
 * Created by phanmduong on 6/7/17.
 */
import * as React from "react";
import {StackNavigator, TabBarTop, TabNavigator, DrawerNavigator} from 'react-navigation';
import theme from '../styles';
import LoginContainer from '../containers/LoginContainer';
import ClassContainer from '../containers/ClassContainer';
// import QRCodeContainer from '../containers/QRCodeContainer';
// import AttendanceStudentContainer from '../containers/AttendanceStudentContainer';
import CurrentClassStudyContainer from '../containers/CurrentClassStudyContainer';
import CollectMoneyContainer from '../containers/CollectMoneyContainer';
import StudentRegisterClassContainer from '../containers/StudentRegisterClassContainer';
import MoneyTransferContainer from '../containers/MoneyTransferContainer';
import ShiftRegisterContainer from '../containers/ShiftRegisterContainer';
import DashboardContainer from '../containers/DashboardContainer';
import ListStudentClassContainer from '../containers/ListStudentClassContainer';
import ListStudentPaidContainer from '../containers/ListStudentPaidContainer';
import ListStudentZeroContainer from '../containers/ListStudentZeroContainer';
import RegisterListContainer from '../containers/RegisterListContainer';
import SidebarContainer from '../containers/SidebarContainer';
import TabIcon from '../components/common/TabIcon';
import MenuButton from '../components/common/MenuButton';
import CheckInContainer from '../containers/CheckInContainer';
import ListStudentAttendanceContainer from "../containers/ListStudentAttendanceContainer";
import HistoryAttendanceShiftContainer from "../containers/historyAttendanceShift/HistoryAttendanceShiftContainer";
import HistoryAttendanceTeachingContainer
    from "../containers/historyAttendanceTeaching/HistoryAttendanceTeachingContainer";
import QRCodeContainer from "../containers/QRCodeContainer";
import AttendanceStudentContainer from "../containers/AttendanceStudentContainer";
import AccurateStudentContainer from "../containers/accurateStudent/AccurateStudentContainer";

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
    ListStudentAttendance: {
        screen: ListStudentAttendanceContainer
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
    ListStudentPaid: {
        screen: ListStudentPaidContainer
    },
    ListStudentZero: {
        screen: ListStudentZeroContainer
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

const CheckIn = StackNavigator({
    CheckIn: {
        screen: CheckInContainer,

    }
}, {
    ...navigationOptionsDefault,
    ...{
        initialRouteName: 'CheckIn',
        initialRouteParams: {
            title: 'Check in',
            type: 'checkin'
        }
    }
});

const HistoryAttendanceShift = StackNavigator({
    HistoryAttendanceShift: {
        screen: HistoryAttendanceShiftContainer,
    }
}, {
    ...navigationOptionsDefault,
    ...{
        initialRouteName: 'HistoryAttendanceShift',
        initialRouteParams: {
            title: 'Lịch sử lịch trực',
            type: 'shift'
        }
    }
});

const HistoryAttendanceWorkShift = StackNavigator({
    HistoryAttendanceWorkShift: {
        screen: HistoryAttendanceShiftContainer,
    }
}, {
    ...navigationOptionsDefault,
    ...{
        initialRouteName: 'HistoryAttendanceWorkShift',
        initialRouteParams: {
            title: 'Lịch sử lịch làm việc',
            type: 'work_shift'
        }
    }
});

const AccurateStudent = StackNavigator({
    AccurateStudent: {
        screen: AccurateStudentContainer,
    }
}, {
    ...navigationOptionsDefault,
    ...{
        initialRouteName: 'AccurateStudent',
        initialRouteParams: {
            title: 'Xác thực học viên',
        }
    }
});

const HistoryAttendanceTeaching = StackNavigator({
    HistoryAttendanceTeaching: {
        screen: HistoryAttendanceTeachingContainer,
    }
}, {
    ...navigationOptionsDefault,
    ...{
        initialRouteName: 'HistoryAttendanceTeaching',
        initialRouteParams: {
            title: 'Lịch sử lịch giảng dạy',
        }
    }
});

const CheckOut = StackNavigator({
    CheckOut: {
        screen: CheckInContainer,

    }
}, {
    ...navigationOptionsDefault, ...{
        initialRouteName: 'CheckOut',
        initialRouteParams: {
            title: 'Check out',
            type: 'checkout'
        }
    }
});


const Drawer = DrawerNavigator({
    TabDashboard: {
        screen: DashboardMain,
        navigationOptions: ({navigation}) => ({
            title: 'Bảng điều khiển',
        })
    },
    MenuCheckIn: {
        screen: CheckIn,
        navigationOptions: ({navigation}) => ({
            title: 'Check in',
        })
    },
    MenuCheckOut: {
        screen: CheckOut,
        navigationOptions: ({navigation}) => ({
            title: 'Check out',
        })
    },
    HistoryAttendanceShift: {
        screen: HistoryAttendanceShift,
        navigationOptions: ({navigation}) => ({
            title: 'Lịch sử điểm danh lịch trực',
        })
    },
    HistoryAttendanceWorkShift: {
        screen: HistoryAttendanceWorkShift,
        navigationOptions: ({navigation}) => ({
            title: 'Lịch sử điểm danh lịch làm việc',

        })
    },
    HistoryAttendanceTeaching: {
        screen: HistoryAttendanceTeaching,
        navigationOptions: ({navigation}) => ({
            title: 'Lịch sử điểm danh lịch giảng dạy',

        })
    },
    AccurateStudent: {
        screen: AccurateStudent,
        navigationOptions: ({navigation}) => ({
            title: 'Xác thực học viên',

        })
    },
}, {
    drawerPosition: 'right',
    // backBehavior: 'none',
    useNativeAnimations: 'false',
    disableOpenGesture: false,
    drawerLockMode: 'locked-closed',
    contentComponent: props => (<SidebarContainer {...props}/>)
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