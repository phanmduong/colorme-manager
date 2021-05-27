/**
 * Created by phanmduong on 6/7/17.
 */
import * as React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import LoginContainer from '../containers/LoginContainer';
import ClassContainer from '../containers/ClassContainer';
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
import TaskContainer from '../containers/TaskContainer';
import NotificationContainer from '../containers/NotificationContainer';
import ProfileContainer from '../containers/ProfileContainer';
import EditProfileContainer from '../containers/EditProfileContainer';
import DocumentContainer from '../containers/DocumentContainer';
import DocumentWebViewContainer from '../containers/DocumentWebViewContainer';
import AddEditClassContainer from '../containers/AddEditClassContainer';
import LeadsContainer from '../containers/LeadsContainer';
import AddLeadsContainer from '../containers/AddEditLeadsContainer';
import StaffContainer from '../containers/StaffContainer';
import ClockManageContainer from '../containers/ClockManageContainer';
import ClockManageWorkShiftDetailsContainer from '../containers/ClockManageWorkShiftDetailsContainer';
import ListStudentAttendanceRegisterContainer from '../containers/ListStudentAttendanceRegisterContainer';
import KPIContainer from '../containers/KPIContainer';
import ClassInfoContainer from '../containers/ClassInfoContainer';
import AddKPIContainer from '../containers/AddKPIContainer';
import TeachingScheduleContainer from '../containers/TeachingScheduleContainer';
import FormContainer from '../containers/FormContainer';
import AddFormContainer from '../containers/AddFormContainer';
import AddClassScheduleContainer from '../containers/AddClassScheduleContainer';
import CourseContainer from '../containers/CourseContainer';
import AddCourseContainer from '../containers/AddCourseContainer';
import CourseInfoContainer from '../containers/CourseInfoContainer';
import AddCourseLessonContainer from '../containers/AddCourseLessonContainer';
import AddCourseExamContainer from '../containers/AddCourseExamContainer';
import AddCourseLinkContainer from '../containers/AddCourseLinkContainer';

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
    ListStudentAttendanceRegister: {
      screen: ListStudentAttendanceRegisterContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    ClassInfo: {
      screen: ClassInfoContainer,
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
      screen: AddEditClassContainer,
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
    AddLead: {
      screen: AddLeadsContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    Staff: {
      screen: StaffContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    ClockManage: {
      screen: ClockManageContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    ClockManageWorkShiftDetails: {
      screen: ClockManageWorkShiftDetailsContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    RegisterList: {
      screen: RegisterListContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    KPI: {
      screen: KPIContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    QRCode: {
      screen: QRCodeContainer,
    },
    AttendanceStudent: {
      screen: AttendanceStudentContainer,
    },
    ClassInfo: {
      screen: ClassInfoContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    AddKPI: {
      screen: AddKPIContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    TeachingSchedule: {
      screen: TeachingScheduleContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    Form: {
      screen: FormContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    AddForm: {
      screen: AddFormContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    AddClassSchedule: {
      screen: AddClassScheduleContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    Course: {
      screen: CourseContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    AddCourse: {
      screen: AddCourseContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    CourseInfo: {
      screen: CourseInfoContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    AddCourseLesson: {
      screen: AddCourseLessonContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    AddCourseExam: {
      screen: AddCourseExamContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    AddCourseLink: {
      screen: AddCourseLinkContainer,
      navigationOptions: () => ({
        headerTintColor: 'black',
        headerTitleStyle: {color: 'black'},
      }),
    },
    ShiftRegister: {
      screen: ShiftRegisterContainer,
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
    TabDashboard: {
      screen: TabDashboard,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Quản lý',
        tabBarIcon: ({tintColor}) => (
          <TabIcon nameIcon="material|apps" color={tintColor} />
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
