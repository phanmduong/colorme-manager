/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Platform, Dimensions} from 'react-native';
import {observer} from "mobx-react";
import HistoryAttendanceShiftStore from "./HistoryAttendanceShiftStore";
import Spinkit from "react-native-spinkit";
import theme from "../../styles";
import {Container} from "native-base";
import Swiper from "react-native-swiper";
import ShiftRegisterWeek from "../../components/shiftRegister/ShiftRegisterWeek";

var {height, width} = Dimensions.get('window');

const heightSwiper = (Platform.OS === 'ios') ? height - 165 : height - 180;

@observer
class ListHistoryAttendanceShift extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    renderShiftRegister() {
        const {listShift} = this.props.store;
        return (
            listShift.map((week, index) => {
                return (
                    <View>
                        <Text>
                            {week.week}
                        </Text>
                    </View>
                );
            })
        )
    }

    render() {
        const {shifts} = this.props.store;

        if (shifts.length > 0) {
            if (Platform.OS === 'ios') {
                return (
                    <Swiper
                        height={heightSwiper}
                        loop={false}
                        showsPagination={false}
                    >
                        {this.renderShiftRegister()}
                    </Swiper>

                )
            }
        }
        return (<View/>);
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
});


function mapStateToProps(state) {
    return {
        token: state.login.token,
        user: state.login.user
    };
}


export default connect(mapStateToProps)(ListHistoryAttendanceShift);