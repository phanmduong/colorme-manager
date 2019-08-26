/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {Dimensions, Image, Text, View, ScrollView, TouchableWithoutFeedback} from 'react-native';
import ModalCustom from "../../components/common/ModalCustom";
import {observer} from "mobx-react";
import {getMeetingStatus} from "../../helper";
import {ifIphoneX} from "react-native-iphone-x-helper";

var {width} = Dimensions.get('window');

@observer
class ModalMeetingParticipate extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {isVisibleModalParticipate, participates} = this.props.store;
        return (
            <ModalCustom isVisible={isVisibleModalParticipate}
                         animationInTiming={800}
                         animationOutTiming={800}
                         closeModal={() => this.props.store.isVisibleModalParticipate = false}
            >
                <ScrollView scrollEventThrottle={16}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{"Thành phần tham gia (" + participates.length + ")"}</Text>
                    </View>
                    {
                        participates.map((participate, index) => {
                            const status = getMeetingStatus(participate.status);
                            console.log(status)
                            return (
                                <View style={styles.containerItem} key={index}>
                                    <View style={styles.containerPerson}>
                                        <Image source={{uri: participate.user.avatar_url}}
                                               style={styles.avatar}/>
                                        <View>
                                            <Text style={styles.name}>{participate.user.name}</Text>
                                            { (participate.note !== "" && participate.note !== null) ?
                                                <Text style={styles.titleStatus}>{participate.note}</Text>
                                                :
                                                <Text style={styles.titleStatus}>{status.text}</Text>
                                            }
                                        </View>
                                    </View>
                                    <View style={styles.status}>
                                        <Image style={styles.iconStatus} source={status.icon}/>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>

            </ModalCustom>
        );
    }
}

const styles = {
    containerItem: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: width,
        marginVertical: 15,
        paddingHorizontal: 20
    },
    containerPerson: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    person: {},
    avatar: {
        height: 36,
        width: 36,
        borderRadius: 18,
        marginRight: 10
    },
    name: {
        fontWeight: 'bold',
    },
    titleStatus: {
        fontSize: 12,
        color: '#858585',
        marginTop: 2,
        marginRight: 60
    },
    status: {
        position: 'absolute',
        right: 20
    },
    iconStatus: {
        width: 36,
        height: 36,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
        ...ifIphoneX({
            marginTop: 44
        }, {
            marginTop: 34
        })
    },
}

export default (ModalMeetingParticipate);
