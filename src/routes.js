/**
 * Created by phanmduong on 4/5/17.
 */
import React from'react';
import {Scene, Router} from 'react-native-router-flux';
import LoginContainer from './containers/LoginContainer';


class RouterComponent extends React.Component {
    render() {
        return (
        <Router>
            <Scene key="root" >
                <Scene key="login" component={LoginContainer} title="Login" initial hideNavBar/>
            </Scene>
        </Router>)
    }
}

export default RouterComponent;