/**
 * Created by phanmduong on 6/7/17.
 */
import * as React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import LoginContainer from '../containers/LoginContainer';
import ClassContainer from '../containers/ClassContainer';
// import QRCodeContainer from '../containers/QRCodeContainer';
// import AttendanceStudentContainer from '../containers/AttendanceStudentContainer';
import CurrentClassStudyContainer from '../containers/CurrentClassStudyContainer';
import CollectMoneyContainer from '../containers/CollectMoneyContainer';
import StudentRegisterClassContainer from '../containers/StudentRegisterClassContainer';
import MoneyTransferContainer from '../containers/MoneyTransferContainer';
import ShiftRegisterContainer from '../containers/ShiftRegisterContainer';
import AnalyticsContainer from '../containers/AnalyticsContainer';
import ListStudentClassContainer from '../containers/ListStudentClassContainer';
import ListStudentPaidContainer from '../containers/ListStudentPaidContainer';
import ListStudentZeroContainer from '../containers/ListStudentZeroContainer';
import RegisterListContainer from '../containers/RegisterListContainer';
import TabIcon from '../components/common/TabIcon';
import CheckInContainer from '../containers/CheckInContainer';
import ListStudentAttendanceContainer from '../containers/ListStudentAttendanceContainer';
import HistoryAttendanceShiftContainer from '../containers/historyAttendanceShift/HistoryAttendanceShiftContainer';
import HistoryAttendanceTeachingContainer from '../containers/historyAttendanceTeaching/HistoryAttendanceTeachingContainer';
import QRCodeContainer from '../containers/QRCodeContainer';
import AttendanceStudentContainer from '../containers/AttendanceStudentContainer';
import AccurateStudentContainer from '../containers/accurateStudent/AccurateStudentContainer';
import TabBar from '../components/common/TabBar';
import DashboardContainer from '../containers/DashboardContainer';
import MeetingContainer from '../containers/meeting/MeetingContainer';
import MeetingDetailContainer from '../containers/meetingDetail/MeetingDetailContainer';
import HistoryContainer from '../containers/HistoryContainer';
import HistoryAttendanceWorkShiftContainer from '../containers/historyAttendanceShift/HistoryAttendanceWorkShiftContainer';
import StoreMeetingContainer from '../containers/storeMeeting/StoreMeetingContainer';
import {createStackNavigator} from 'react-navigation-stack';
import AuthLoadingContainer from '../containers/AuthLoadingContainer';
import WorkShiftRegisterContainer from '../containers/WorkShiftRegisterContainer';
import EditStoreMeetingContainer from '../containers/storeMeeting/EditStoreMeetingContainer';
import HistoryMeetingContainer from '../containers/meeting/HistoryMeetingContainer';
import HistoryMeetingDetailsContainer from '../containers/meetingDetail/HistoryMeetingDetailsContainer';
import TeachingRatingContainer from '../containers/TeachingRatingContainer';
import DetailShiftsContainer from '../containers/DetailShiftsContainer';
import ListDetailShiftsRegisteredContainer from '../containers/ListDetailShiftsRegisteredContainer';
import ListTeacherAndAssistantContainer from '../containers/ListTeacherAndAssistantContainer';
import TeachingRatingDuplicateContainer from '../containers/TeachingRatingDuplicateContainer';
import MakeupClassContainer from '../containers/MakeupClassContainer';
import SaveRegisterContainer from '../containers/SaveRegisterContainer';
import InfoStudentContainer from '../containers/InfoStudentContainer';
import InfoStudentRegistersContainer from '../containers/infoStudent/InfoStudentRegistersContainer';
import InfoStudentDetailsContainer from '../containers/infoStudent/InfoStudentDetailsContainer';
import InfoStudentEditProfileContainer from '../containers/infoStudent/InfoStudentEditProfileContainer';
import TaskContainer from '../containers/TaskContainer';
import NotificationContainer from '../containers/NotificationContainer';
import ProfileContainer from '../containers/ProfileContainer';
import EditProfileContainer from '../containers/EditProfileContainer';
import EditClassContainer from '../containers/EditClassContainer';
import DocumentContainer from '../containers/DocumentContainer';
import DocumentWebViewContainer from '../containers/DocumentWebViewContainer';
import AddClassContainer from '../containers/AddClassContainer';
import LeadsContainer from '../containers/LeadsContainer';

const navigationOptionsDefault = {
  defaultNavigationOptions: {
    headerStyle: {
      borderBottomWidth: 0,
    },
  },
};

const TabAttendance = createStackNavigator(
  {
    CurrentClassStudy: {
      screen: CurrentClassStudyContainer,
      navigationOptions: () => ({
        header: null,
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    ListStudentAttendance: {
      screen: ListStudentAttendanceContainer,
    },
    QRCode: {
      screen: QRCodeContainer,
    },
    AttendanceStudent: {
      screen: AttendanceStudentContainer,
    },
    Profile: {
      screen: ProfileContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    EditProfile: {
      screen: EditProfileContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    InfoStudent: {
      screen: InfoStudentContainer,
      navigationOptions: () => ({
        header: null,
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    InfoStudentRegister: {
      screen: InfoStudentRegistersContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    InfoStudentDetails: {
      screen: InfoStudentDetailsContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    ListStudentClass: {
      screen: ListStudentClassContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
  },
  navigationOptionsDefault,
);

const TabShiftRegister = createStackNavigator(
  {
    ShiftRegister: {
      screen: ShiftRegisterContainer,
      navigationOptions: () => ({
        header: null,
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    Profile: {
      screen: ProfileContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    EditProfile: {
      screen: EditProfileContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
  },
  navigationOptionsDefault,
);

const TabDashboard = createStackNavigator(
  {
    Dashboard: {
      screen: DashboardContainer,
      navigationOptions: () => ({
        header: null,
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    Analytics: {
      screen: AnalyticsContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    Class: {
      screen: ClassContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    ListStudentClass: {
      screen: ListStudentClassContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    ListStudentPaid: {
      screen: ListStudentPaidContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    ListStudentZero: {
      screen: ListStudentZeroContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    CheckIn: {
      screen: CheckInContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    CheckOut: {
      screen: CheckInContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    HistoryAllAttendance: {
      screen: HistoryContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    HistoryAttendanceShift: {
      screen: HistoryAttendanceShiftContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    HistoryAttendanceWorkShift: {
      screen: HistoryAttendanceWorkShiftContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    HistoryAttendanceTeaching: {
      screen: HistoryAttendanceTeachingContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    AccurateStudent: {
      screen: AccurateStudentContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    Meeting: {
      screen: MeetingContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    MeetingDetail: {
      screen: MeetingDetailContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    StoreMeeting: {
      screen: StoreMeetingContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    EditStoreMeeting: {
      screen: EditStoreMeetingContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    HistoryMeeting: {
      screen: HistoryMeetingContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    HistoryMeetingDetails: {
      screen: HistoryMeetingDetailsContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    TeachingRating: {
      screen: TeachingRatingContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    TeachingRatingDuplicate: {
      screen: TeachingRatingDuplicateContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    ListTeacherAndAssistant: {
      screen: ListTeacherAndAssistantContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    MakeupClass: {
      screen: MakeupClassContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    SaveRegister: {
      screen: SaveRegisterContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    InfoStudent: {
      screen: InfoStudentContainer,
      navigationOptions: () => ({
        header: null,
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    InfoStudentRegister: {
      screen: InfoStudentRegistersContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    InfoStudentDetails: {
      screen: InfoStudentDetailsContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    CollectMoney: {
      screen: CollectMoneyContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    StudentRegisterClass: {
      screen: StudentRegisterClassContainer,
    },
    MoneyTransfer: {
      screen: MoneyTransferContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    Task: {
      screen: TaskContainer,
      navigationOptions: () => ({
        header: null,
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    Notification: {
      screen: NotificationContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    Profile: {
      screen: ProfileContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    EditProfile: {
      screen: EditProfileContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    EditClass: {
      screen: EditClassContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    Document: {
      screen: DocumentContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    DocumentWebView: {
      screen: DocumentWebViewContainer,
      navigationOptions: () => ({
        header: null,
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    AddClass: {
      screen: AddClassContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    Leads: {
      screen: LeadsContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        borderBottomWidth: 0,
        color: 'blue',
      },
    },
  },
);

TabDashboard.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName === 'DocumentWebView') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const TabRegisterList = createStackNavigator(
  {
    RegisterList: {
      screen: RegisterListContainer,
      navigationOptions: () => ({
        header: null,
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    SaveRegister: {
      screen: SaveRegisterContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    InfoStudent: {
      screen: InfoStudentContainer,
      navigationOptions: () => ({
        header: null,
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    InfoStudentRegister: {
      screen: InfoStudentRegistersContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    InfoStudentDetails: {
      screen: InfoStudentDetailsContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    InfoStudentEditProfile: {
      screen: InfoStudentEditProfileContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    Profile: {
      screen: ProfileContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    EditProfile: {
      screen: EditProfileContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
  },
  navigationOptionsDefault,
);

const TabWorkShift = createStackNavigator(
  {
    WorkShiftRegister: {
      screen: WorkShiftRegisterContainer,
      navigationOptions: () => ({
        header: null,
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    ListDetailShiftsRegistered: {
      screen: ListDetailShiftsRegisteredContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    DetailShifts: {
      screen: DetailShiftsContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    Profile: {
      screen: ProfileContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
      EditProfile: {
        screen: EditProfileContainer,
        navigationOptions: () => ({
          headerTintColor: 'black',
          headerTitleStyle: {color: 'black'},
        }),
      },
    },
  },
  navigationOptionsDefault,
);

const DashboardMain = createBottomTabNavigator(
  {
    TabAttendance: {
      screen: TabAttendance,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Điểm danh',
        tabBarIcon: ({tintColor}) => (
          <TabIcon nameIcon="fontawesome|qrcode" color={tintColor} />
        ),
      }),
    },
    TabShiftRegister: {
      screen: TabShiftRegister,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Lịch trực',
        tabBarIcon: ({tintColor}) => (
          <TabIcon nameIcon="fontawesome|edit" color={tintColor} />
        ),
      }),
    },
    TabDashboard: {
      screen: TabDashboard,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Quản lý',
        tabBarIcon: ({tintColor}) => (
          <TabIcon nameIcon="material|apps" color={tintColor} />
        ),
      }),
    },
    TabRegisterList: {
      screen: TabRegisterList,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Nộp tiền',
        tabBarIcon: ({tintColor}) => (
          <TabIcon nameIcon="fontawesome|graduation-cap" color={tintColor} />
        ),
      }),
    },
    TabWorkShift: {
      screen: TabWorkShift,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Chuyển tiền',
        tabBarIcon: ({tintColor}) => (
          <TabIcon nameIcon="materialCommunity|calendar" color={tintColor} />
        ),
      }),
    },
  },
  {
    // tabBarComponent: TabBarTop,
    tabBarComponent: TabBar,
    swipeEnabled: false,
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: 'white',
      inactiveTintColor: '#a8a8a8',
    },
    initialRouteName: 'TabDashboard',
    tabBarPosition: 'bottom',
    backBehavior: 'none',
  },
);

const Main = createStackNavigator(
  {
    DashboardMain: {
      screen: DashboardMain,
    },
  },
  {headerMode: 'none'},
);

export const routeConfigs = {
  Login: {
    screen: LoginContainer,
  },
  AuthLoading: {
    screen: AuthLoadingContainer,
  },
  Main: {
    screen: Main,
  },
};

export const navigationOptions = {
  headerMode: 'none',
  initialRouteName: 'AuthLoading',
};
