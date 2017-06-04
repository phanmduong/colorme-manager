/**
 * Created by phanmduong on 4/5/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StyleSheet, Platform, View, Text} from'react-native';
import io from 'socket.io-client';
import {Scene, Router, ActionConst, Actions} from 'react-native-router-flux';
import LoginContainer from './containers/LoginContainer';
import BaseContainer from './containers/BaseContainer';
import CourseContainer from './containers/CourseContainer';
import GenContainer from './containers/GenContainer';
import LessonCourseContainer from './containers/LessonCourseContainer';
import ClassContainer from './containers/ClassContainer';
import QRCodeContainer from './containers/QRCodeContainer';
import AttendanceStudentContainer from './containers/AttendanceStudentContainer';
import CurrentClassStudyContainer from './containers/CurrentClassStudyContainer';
import CollectMoneyContainer from './containers/CollectMoneyContainer';
import MoneyTransferContainer from './containers/MoneyTransferContainer';
import AttendanceContainer from './containers/AttendanceContainer';
import ShiftRegisterContainer from './containers/ShiftRegisterContainer';
import CheckInContainer from './containers/CheckInContainer';
import DashboardContainer from './containers/DashboardContainer';
import NatigationDrawerContainer from './containers/NatigationDrawerContainer';
import ListStudentClassContainer from './containers/ListStudentClassContainer';
import RegisterListContainer from './containers/RegisterListContainer';
import TabIcon from './components/common/TabIcon';
import BackButton from './components/common/BackButton';
import MenuButton from './components/common/MenuButton';
import SegmentRegisterList from './components/registerList/SegmentRegisterList';
import theme from './styles';

import * as QRCodeActions from './actions/QRCodeActions';
import * as drawerActions from './actions/drawerActions';
import * as registerListActions from './actions/registerListActions';

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : (Platform.OS === 'ios') ? 64 : 52;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};

class RouterComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.socket = io.connect("http://colorme.vn:3000/");
        this.changeSegment = this.changeSegment.bind(this);
    }

    changeSegment(segment) {
        this.props.registerListActions.changeSegmentRegisterList(segment);
    }

    componentWillReceiveProps(nextProps) {
        console.log("props" + nextProps.segmentActive);
    }

    render() {
        return (
            <Router getSceneStyle={getSceneStyle}>
                <Scene key="root">
                    <Scene key="login" component={LoginContainer} hideNavBar hideTabBar initial
                           type={ActionConst.RESET}/>
                    <Scene key="drawer" component={NatigationDrawerContainer} type={ActionConst.RESET}>
                        <Scene
                            key="main"
                            tabs
                            tabBarStyle={styles.tabBarStyle}
                            tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                            hideNavBar={false}
                            initial
                        >
                            <Scene
                                key="tabAttendance"
                                nameIcon="fontawesome|qrcode"
                                icon={TabIcon}
                                navigationBarStyle={styles.navigationBarStyle}
                                titleStyle={styles.title}
                            >
                                <Scene
                                    key="currentClassStudy"
                                    component={CurrentClassStudyContainer}
                                    title="Điểm danh"
                                    renderLeftButton={() => {
                                    }}
                                    renderRightButton={MenuButton}
                                    onRight={this.props.drawerActions.openDrawer}
                                />
                                <Scene
                                    key="scanQRCode"
                                    component={QRCodeContainer}
                                    title="Điểm danh"
                                    renderBackButton={BackButton}
                                    renderRightButton={MenuButton}
                                    onBack={() => {
                                        Actions.pop();
                                    }}
                                    onRight={this.props.drawerActions.openDrawer}
                                />
                                <Scene
                                    key="attendanceStudentCode"
                                    component={AttendanceStudentContainer}
                                    title="Điểm danh"
                                    renderBackButton={BackButton}
                                    renderRightButton={MenuButton}
                                    onBack={() => {
                                        Actions.pop();
                                        this.props.QRCodeActions.beginScanQRCode();
                                    }}
                                    onRight={this.props.drawerActions.openDrawer}
                                />
                            </Scene>
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
                                renderRightButton={MenuButton}
                                onRight={this.props.drawerActions.openDrawer}
                                socket={this.socket}
                            />
                            <Scene
                                key="tabDashboard"
                                title="Quản lý"
                                nameIcon="material|apps"
                                icon={TabIcon}
                                navigationBarStyle={styles.navigationBarStyle}
                                titleStyle={styles.title}
                                initial
                            >
                                <Scene
                                    key="dashboard"
                                    component={DashboardContainer}
                                    title="Dashboard"
                                    renderLeftButton={() => {
                                    }}
                                    initial
                                    renderRightButton={MenuButton}
                                    onRight={this.props.drawerActions.openDrawer}
                                />
                                <Scene
                                    key="class"
                                    component={ClassContainer}
                                    title="Danh sách lớp"
                                    renderBackButton={BackButton}
                                    renderRightButton={MenuButton}
                                    onBack={() => {
                                        Actions.pop();
                                    }}
                                    onRight={this.props.drawerActions.openDrawer}
                                />
                                <Scene
                                    key="listStudentClass"
                                    component={ListStudentClassContainer}
                                    title="Danh sách học viên"
                                    renderBackButton={BackButton}
                                    renderRightButton={MenuButton}
                                    onBack={() => {
                                        Actions.pop();
                                    }}
                                    onRight={this.props.drawerActions.openDrawer}
                                />
                                <Scene
                                    key="registerList"
                                    component={RegisterListContainer}
                                    title="Danh sách đăng ký"
                                    renderTitle={SegmentRegisterList}
                                    renderBackButton={BackButton}
                                    renderRightButton={MenuButton}
                                    onBack={() => {
                                        Actions.pop();
                                    }}
                                    onRight={this.props.drawerActions.openDrawer}
                                    changeSegment={this.changeSegment}
                                    segmentActive={this.props.segmentActive}
                                />
                            </Scene>
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
                                renderRightButton={MenuButton}
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
                                renderRightButton={MenuButton}
                            />
                        </Scene>
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

function mapStateToProps(state) {
    return {
        segmentActive: state.registerList.segment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        QRCodeActions: bindActionCreators(QRCodeActions, dispatch),
        drawerActions: bindActionCreators(drawerActions, dispatch),
        registerListActions: bindActionCreators(registerListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent);
