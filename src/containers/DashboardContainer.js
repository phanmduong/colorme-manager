/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import DashboardComponent from "../components/DashboardComponent";
import {Platform} from "react-native";

class DashboardContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: "Quản lý",
    });

    render() {
        return (
            <DashboardComponent {...this.props}/>
        );
    }
}


export default (DashboardContainer);