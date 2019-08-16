/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Dimensions,
    FlatList,
    KeyboardAvoidingView
} from 'react-native';
import {observer} from "mobx-react";
import moment from "moment";
import {FORMAT_TIME_MYSQL} from "../../constants/constant";
import {getMeetingStatus} from "../../helper";

var {height, width} = Dimensions.get('window');

@observer
class MeetingDetailItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    checkCanJoin = () => {
        const date = moment(this.props.datetime, FORMAT_TIME_MYSQL).format("X");
        const now = moment().unix();
        if (now <= date - 3600) {
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
            Alert.alert('Thông báo', "Bạn phải đăng kí trước 1 tiếng");
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

    render() {
        const {name, issues, datetime, joined, participates} = this.props;
        const meetingDate = moment(datetime, FORMAT_TIME_MYSQL).format("X");
        const now = moment().unix();

        const isNow = meetingDate - 1800 <= now && now <= parseInt(meetingDate) + 3600;

        const totalCheckIn = participates.filter((item) => item.status == "check_in").length;
        const totalAccept = participates.filter((item) => item.status == "accept").length;
        const totalReject = participates.filter((item) => item.status == "reject").length;

        console.log(issues);

        const headerComponent = (
            <View style={styles.container}>
                {this.props.carouselProps}
                <View style={styles.containerAction}>
                    {
                        joined ?
                            <View>
                                {
                                    joined.status != "reject" ?
                                        (
                                            isNow ?
                                                (
                                                    joined.status == "check_in" ?
                                                        <View style={styles.buttonAction}>
                                                            <Image style={styles.iconAction}
                                                                   source={getMeetingStatus('check_in').icon}/>
                                                            <Text style={styles.textAction}>
                                                                {getMeetingStatus('check_in').text}
                                                            </Text>
                                                        </View>
                                                        :
                                                        <TouchableOpacity onPress={this.onCheckin}
                                                                          style={styles.buttonAction}>
                                                            <Image style={styles.iconAction}
                                                                   source={getMeetingStatus('check_in').icon}/>
                                                            <Text style={styles.textAction}>
                                                                Đã đến
                                                            </Text>
                                                        </TouchableOpacity>
                                                )
                                                :
                                                <View style={styles.buttonAction}>
                                                    <Image style={styles.iconAction}
                                                           source={getMeetingStatus('accept').icon}/>
                                                    <Text
                                                        style={styles.textAction}>{getMeetingStatus('accept').text}</Text>
                                                </View>
                                        )


                                        :
                                        <View style={styles.buttonAction}>
                                            <Image style={[styles.iconAction]}
                                                   source={getMeetingStatus('reject').icon}/>
                                            <Text style={styles.textAction}>{getMeetingStatus('reject').text}</Text>
                                        </View>

                                }
                            </View>
                            :
                            <View style={styles.containerAction}>
                                <TouchableOpacity onPress={this.onAccept} style={styles.buttonAction}>
                                    <Image style={styles.iconAction}
                                           source={getMeetingStatus('accept').icon}/>
                                    <Text style={styles.textAction}>{getMeetingStatus('accept').text}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onReject}
                                                  style={[styles.buttonAction, {marginLeft: 20}]}>
                                    <Image style={[styles.iconAction]}
                                           source={getMeetingStatus('reject').icon}/>
                                    <Text style={styles.textAction}>{getMeetingStatus('reject').text}</Text>
                                </TouchableOpacity>
                            </View>
                    }
                </View>
                <View style={styles.containerParticipates}>
                    <Text style={styles.titleParticipates}>Thành phần tham gia ({participates.length})</Text>
                    <View style={styles.contentParticipates}>
                        <View style={styles.statusParticipates}>
                            <Text style={styles.textStatus}>
                                <Text style={{fontWeight: 'bold'}}>{totalCheckIn} </Text>
                                Check in
                            </Text>
                            <Image style={[styles.iconStatus]}
                                   source={getMeetingStatus('check_in').icon}/>
                        </View>
                        <View style={styles.statusParticipates}>
                            <Text style={styles.textStatus}>
                                <Text style={{fontWeight: 'bold'}}>{totalAccept} </Text>
                                Tham gia
                            </Text>
                            <Image style={[styles.iconStatus]}
                                   source={getMeetingStatus('accept').icon}/>
                        </View>
                        <View style={styles.statusParticipates}>
                            <Text style={styles.textStatus}>
                                <Text style={{fontWeight: 'bold'}}>{totalReject} </Text>
                                Ko tham gia
                            </Text>
                            <Image style={[styles.iconStatus]}
                                   source={getMeetingStatus('reject').icon}/>
                        </View>

                    </View>
                </View>
                <View style={styles.containerParticipates}>
                    <Text style={styles.titleParticipates}>Các vấn đề cần xử lý</Text>
                </View>
            </View>
        );

        const footerComponent = (
            <View style={{height: 50}} />
        );

        return (

            <FlatList
                data={issues}
                ListHeaderComponent={headerComponent}
                ListFooterComponent={footerComponent}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    return (
                        <View style={styles.itemIssue}>
                            <Image style={styles.avatarIssue}
                                   source={{uri: item.creator.avatar_url}}/>
                            <View>
                                <Text style={styles.titleIssue}>{item.issue}</Text>
                                <Text
                                    style={styles.subTitleIssue}>{item.creator.name} - {item.created_at}</Text>
                            </View>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
    },
    containerAction: {
        flexDirection: 'row',
        justifyContent: "flex-start",
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
        textAlign: 'center',
        paddingHorizontal: 15,
        fontSize: 10
    },
    iconStatus: {
        width: 15,
        height: 15,
        marginLeft: 5
    },
    contentAction: {
        justifyContent: "center",
        alignItems: "center",
    },
    buttonAction: {
        flexDirection: 'row',
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerParticipates: {
        flexDirection: 'column',
        marginTop: 20,
    },
    titleParticipates: {
        fontSize: 10
    },
    contentParticipates: {
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        marginTop: 10,
        paddingHorizontal: 10
    },
    statusParticipates: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStatus: {
        fontSize: 12
    },
    itemIssue: {
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 20
    },
    avatarIssue: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginRight: 20,
    },
    titleIssue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subTitleIssue: {
        color: '#828282',
        fontSize: 12
    },
    containerInput: {
        position: 'absolute',
        bottom: 0,
        width: width - 40,
    },
    createIssue: {
        borderRadius: 20,
        height: 40,
        flex: 1,
        backgroundColor: '#ececec',
        paddingHorizontal: 20,
        color: "#363636",
    }
});

export default (MeetingDetailItem);
