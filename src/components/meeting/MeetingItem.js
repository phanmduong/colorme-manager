/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {View, Text, ImageBackground, Image, TouchableOpacity, Alert} from 'react-native';
import {observer} from "mobx-react";
import moment from "moment";
import {FORMAT_TIME_MYSQL} from "../../constants/constant";
import * as alert from "../../constants/alert";

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
        const {name, total_issues, date, month, hour, joined, participates, isNow} = this.props;
        return (
            <View style={style.container}>
                <ImageBackground
                    source={require('./background.png')}
                    style={style.containerContent}
                    imageStyle={{borderRadius: 10}}
                >
                    <View style={style.row}>
                        <View style={style.flex1}>
                            <Text style={style.timeDate}>
                                {date}
                            </Text>
                        </View>
                        <View style={style.flex1}>
                            <Text style={style.title}>
                                {name}
                            </Text>
                        </View>
                    </View>
                    <View style={style.row}>
                        <View style={style.flex1}>
                            <Text style={style.timeMonth}>
                                Tháng {month}
                            </Text>
                        </View>
                        <View style={style.flex1}>
                            <View style={style.row}>
                                <Text style={style.issue}>
                                    {total_issues} vấn đề
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={style.row}>
                        <View style={style.flex1}>
                            <Text style={style.timeHour}>
                                {hour}
                            </Text>
                        </View>
                        <View style={style.flex1}>
                            <View style={style.row}>
                                {participates.slice(0, 3).map((participate) => {
                                    return (
                                        <Image
                                            style={style.avatar}
                                            source={{uri: participate.user.avatar_url}}
                                        >
                                        </Image>
                                    )
                                })}
                                {participates.length > 3 &&
                                <Text style={style.numberParticipate}>
                                    +{participates.length - 3}
                                </Text>
                                }
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <View style={style.containerAction}>
                    {
                        joined ?
                            <View>
                                {
                                    joined.status == "accept" ?
                                        (
                                            isNow ?
                                                (
                                                    this.isCheckIn() ?
                                                        <View style={style.contentAction}>
                                                            <Image style={style.iconAction2}
                                                                   source={require("./heart.png")}/>
                                                            <Text style={style.textAction}>
                                                                Đã check in
                                                            </Text>
                                                        </View>
                                                        :
                                                        <TouchableOpacity onPress={this.onCheckin}>
                                                            <View style={style.contentAction}>
                                                                <Image style={style.iconAction}
                                                                       source={require("./heart.png")}/>
                                                                <Text style={style.textAction}>
                                                                    Check in
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                )
                                                :
                                                <View style={style.contentAction}>
                                                    <Image style={style.iconAction2} source={require("./like.png")}/>
                                                    <Text style={style.textAction}>
                                                        Sẽ tham gia
                                                    </Text>
                                                </View>
                                        )


                                        :
                                        <View style={style.contentAction}>
                                            <Image style={[style.iconAction2, {marginTop: 20}]}
                                                   source={require("./sad.png")}/>
                                            <Text style={style.textAction}>
                                                Không tham gia
                                            </Text>
                                        </View>

                                }
                            </View>
                            :
                            <View>
                                <TouchableOpacity onPress={this.onAccept}>
                                    <Image style={style.iconAction} source={require("./like.png")}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onReject}>
                                    <Image style={[style.iconAction, {marginTop: 20}]} source={require("./sad.png")}/>
                                </TouchableOpacity>
                            </View>
                    }
                </View>
            </View>
        );
    }
}

const style = {
    container: {
        flexDirection: 'row',
        marginBottom: 10
    },
    containerContent: {
        flex: 2,
        flexDirection: "column",
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    containerAction: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    contentTime: {
        flexDirection: "column",
        flex: 1
    },
    timeDate: {
        fontSize: 45,
        fontWeight: "bold",
        color: "white"
    },
    timeMonth: {
        fontWeight: "bold",
        color: "white",
        fontSize: 18
    },
    timeHour: {
        color: "white",
        fontSize: 12,
        marginVertical: 5
    },
    contentTitle: {
        flexDirection: "column",
        flex: 1,
    },
    title: {
        textTransform: "uppercase",
        flexWrap: "wrap",
        flexDirection: 'row',
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    issue: {
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontSize: 12,
        marginVertical: 5,
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    flex1: {
        flex: 1,
    },
    avatar: {
        width: 14,
        height: 14,
        marginRight: 5,
        borderRadius: 7
    },
    numberParticipate: {
        borderRadius: 7,
        height: 14,
        alignItems: "center",
        backgroundColor: "white",
        fontSize: 12,
        paddingHorizontal: 5
    },
    iconAction: {
        width: 35,
        height: 35,
    },
    textAction: {
        marginTop: 20,
        fontSize: 12,
        textAlign: 'center'
    },
    iconAction2: {
        width: 50,
        height: 50,
    },
    contentAction: {
        justifyContent: "center",
        alignItems: "center",
    },
}

export default (MeetingItem);