/**
 * Created by phanmduong on 4/5/17.
 */
import React from'react';
import {Scene, Router} from 'react-native-router-flux';
import LoginContainer from './containers/LoginContainer';
import BaseContainer from './containers/BaseContainer';
import CourseContainer from './containers/CourseContainer';
import {Navigator}from 'react-native'

class RouterComponent extends React.Component {
    render() {
        return (
            <Router sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}>
                <Scene key="root" >
                    <Scene key="login" component={LoginContainer} title="Login" initial hideNavBar/>
                </Scene>
                <Scene key="attendance">
                    <Scene key="base" component={BaseContainer} title="Cơ sở" initial/>
                    <Scene key="course" component={CourseContainer} title="Khóa học"/>
                </Scene>

            </Router>)
    }
}

export default RouterComponent;