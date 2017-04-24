/**
 * Created by phanmduong on 4/5/17.
 */
import React from'react';
import {StyleSheet, Text} from'react-native';
import {Scene, Router, ActionConst} from 'react-native-router-flux';
import LoginContainer from './containers/LoginContainer';
import BaseContainer from './containers/BaseContainer';
import CourseContainer from './containers/CourseContainer';
import GenContainer from './containers/GenContainer';
import LessonCourseContainer from './containers/LessonCourseContainer';
import ClassContainer from './containers/ClassContainer';
import QRCodeContainer from './containers/QRCodeContainer';
import AttendanceStudentContainer from './containers/AttendanceStudentContainer';
import CollectMoneyContainer from './containers/CollectMoneyContainer';
import MoneyTransferContainer from './containers/MoneyTransferContainer';
import AttendanceContainer from './containers/AttendanceContainer';
import ShiftRegisterContainer from './containers/ShiftRegisterContainer';
import CheckInContainer from './containers/CheckInContainer';
import DashboardContainer from './containers/DashboardContainer';
import TabIcon from './components/common/TabIcon';
import theme from './styles';

class RouterComponent extends React.Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="login" component={LoginContainer} hideNavBar initial type={ActionConst.RESET}/>
                    <Scene
                        key="main"
                        tabs
                        tabBarStyle={styles.tabBarStyle}
                        tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                        type={ActionConst.RESET}
                        hideNavBar={false}
                    >
                        <Scene
                            key="tabAttendance"
                            component={AttendanceContainer}
                            title="Điểm danh"
                            nameIcon="fontawesome|qrcode"
                            icon={TabIcon}
                            navigationBarStyle={styles.navigationBarStyle}
                            titleStyle={styles.title}
                            renderLeftButton={() => {
                            }}

                        />
                        <Scene
                            key="tabShiftRegister"
                            component={ShiftRegisterContainer}
                            title="Lịch trực"
                            nameIcon="fontawesome|edit"
                            icon={TabIcon}
                            navigationBarStyle={styles.navigationBarStyle}
                            titleStyle={styles.title}
                            renderLeftButton={() => {
                            }}
                        />
                        <Scene
                            key="tabDashboard"
                            component={DashboardContainer}
                            title="Dashboard"
                            nameIcon="material|apps"
                            icon={TabIcon}
                            initial
                            renderLeftButton={() => {
                            }}
                            navigationBarStyle={styles.navigationBarStyle}
                            titleStyle={styles.title}
                        />
                        <Scene
                            key="tabCollectMoney"
                            component={CollectMoneyContainer}
                            title="Nộp tiền"
                            nameIcon="material|attach-money"
                            icon={TabIcon}
                            navigationBarStyle={styles.navigationBarStyle}
                            titleStyle={styles.title}
                            renderLeftButton={() => {
                            }}
                        />
                        <Scene
                            key="tabMoneyTransfer"
                            component={MoneyTransferContainer}
                            title="Chuyển tiền"
                            nameIcon="entypo|wallet"
                            icon={TabIcon}
                            navigationBarStyle={styles.navigationBarStyle}
                            titleStyle={styles.title}
                            renderLeftButton={() => {
                            }}
                        />
                    </Scene>
                </Scene>
            </Router>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'white'
    },
    navigationBarStyle: {
        backgroundColor: theme.mainColor
    },
    tabBarStyle: {
        backgroundColor: theme.mainColor
    },
    tabBarSelectedItemStyle: {},
});

export default RouterComponent;