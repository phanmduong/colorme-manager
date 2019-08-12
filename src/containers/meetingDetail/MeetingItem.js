/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {View, Text, ImageBackground, Image, TouchableOpacity, Alert, Dimensions} from 'react-native';
import {observer} from "mobx-react";
import moment from "moment";
import {FORMAT_TIME_MYSQL} from "../../constants/constant";
import {getMeetingStatus} from "../../helper";

var {height, width} = Dimensions.get('window');

@observer
class MeetingItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    checkCanJoin = () => {
        const date = moment(this.props.datetime, FORMAT_TIME_MYSQL).format("X");
        const now = moment().unix();
        if (now <= date - 18000) {
            return true
        }
        return false;
    }

    onAccept = () => {
        const {meetingId, store} = this.props;
        const {joinMeeting} = store;
        if (this.checkCanJoin()) {
            joinMeeting(meetingId, "accept", "");
        } else {
            Alert.alert('Thông báo', "Bạn phải đăng kí trước 5 tiếng");
        }

    };

    onCheckin = () => {
        const {meetingId, store} = this.props;
        const {checkInMeeting} = store;
        checkInMeeting(meetingId)
    };

    onReject = () => {
        const {meetingId, store} = this.props;
        const {joinMeeting} = store;
        if (this.checkCanJoin()) {
            joinMeeting(meetingId, "reject", "");
        } else {
            Alert.alert('Thông báo', "Bạn phải đăng kí trước 5 tiếng");
        }
    };

    isCheckIn = () => {
        const {joined} = this.props;
        const date = moment(joined.check_in_time, FORMAT_TIME_MYSQL);
        if (joined) {
            console.log(date.isValid())
            return date.isValid();
        }
        return false;
    }

    render() {
        const {name, total_issues, date, month, hour, keyIndex, meetingId, isNow} = this.props;
        return (
            <TouchableOpacity onPress={() => {
                this.props.onClick(meetingId, keyIndex)
            }}>
                <View style={style.container}>
                    <ImageBackground
                        source={require('../../../assets/meeting/background.png')}
                        style={style.containerContent}
                        imageStyle={{borderRadius: 20}}
                    >
                        <Text style={style.timeDate}>
                            {date}
                        </Text>
                        <Text style={style.timeMonth}>
                            Tháng {month}
                        </Text>
                        <Text style={style.timeHour}>
                            {hour}
                        </Text>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={style.issue}>
                                {total_issues} vấn đề
                            </Text>
                        </View>

                        <Text style={style.title}>
                            {name} {keyIndex}
                        </Text>
                    </ImageBackground>
                </View>
            </TouchableOpacity>

        );
    }
}

const style = {
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        width: (width - 20) / 3,
        marginRight: 20
    },
    containerContent: {
        flex: 2,
        flexDirection: "column",
        padding: 10,
        borderRadius: 20,
        marginTop: 10
    },
    timeDate: {
        fontSize: 45,
        fontWeight: "bold",
        color: "white"
    },
    timeMonth: {
        fontWeight: "bold",
        color: "white",
        fontSize: 16
    },
    timeHour: {
        color: "white",
        fontSize: 12,
    },
    title: {
        flexWrap: "wrap",
        flexDirection: 'row',
        color: "white",
        fontSize: 12,
    },
    issue: {
        backgroundColor: "white",
        flexWrap: "wrap",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontSize: 10,
        marginVertical: 5,
    },
}

export default (MeetingItem);