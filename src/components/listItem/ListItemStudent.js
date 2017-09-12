import React from 'react';
import {Dimensions, Platform, TouchableNativeFeedback, TouchableOpacity, Animated} from 'react-native';
import {
    View,
    Text,
    Thumbnail,
    Icon
} from 'native-base';
import theme from '../../styles';
import _ from 'lodash';
import {formatPhone, dotNumber} from '../../helper/index';
import Call from '../common/Call';

var {height, width} = Dimensions.get('window');
var maxWidthProcess = width / 2;

class ListItemStudent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            onPressed: false
        };
    }

    onChangePress() {
        this.setState({
            onPressed: !this.state.onPressed
        });
    }

    content() {
        const {name, avatar, code, status, money, receivedIdCard, attendances, score, maxScore} = this.props;
        const sumLesson = attendances.length;
        const sumAttendance = _.filter(attendances, {status: 1}).length;
        return (
            <View style={styles.container}>
                <Thumbnail small source={{uri: avatar}}/>
                <View style={styles.content}>
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>{name.trim().toUpperCase()}</Text>
                        {(this.state.onPressed) ?
                            (
                                <Icon
                                    style={styles.icon}
                                    ios='ios-arrow-up'
                                    android="md-arrow-dropup"
                                    name="ios-arrow-up"/>
                            )
                            :
                            (
                                <Icon
                                    name="ios-arrow-up"
                                    ios='ios-arrow-down'
                                    android="md-arrow-dropdown"
                                    style={styles.icon}
                                />
                            )
                        }
                    </View>
                    <View style={styles.containerSubTitle}>
                        <Text style={styles.subTitle}>{code}</Text>
                        {(Boolean(status)) ?
                            (
                                <View style={styles.containerSubTitle}>
                                    <View style={{...styles.card, ... {backgroundColor: theme.processColor1}}}>
                                        <Text style={styles.money}>{dotNumber(money)}đ</Text>
                                    </View>
                                    {(Boolean(receivedIdCard)) ?
                                        (
                                            <View style={{...styles.card, ... {backgroundColor: theme.processColor2}}}>
                                                <Text style={styles.isReceivedCard}>ĐÃ NHẬN THẺ</Text>
                                            </View>
                                        )
                                        :
                                        (
                                            <View style={{...styles.card, ... {backgroundColor: theme.secondColor}}}>
                                                <Text style={styles.isReceivedCard}>CHƯA NHẬN THẺ</Text>
                                            </View>
                                        )
                                    }
                                </View>
                            )
                            :
                            (
                                <View/>
                            )
                        }


                    </View>
                    {(Boolean(status)) ?
                        (
                            <View style={styles.containerContentProcess}>
                                <View style={styles.processAndText}>
                                    <View style={{
                                        ...styles.process, ...styles.containerProcess, ...{
                                            backgroundColor: theme.processColorOpacity1,
                                        }
                                    }}>
                                        <Animated.View
                                            style={[styles.process, styles.bar,
                                                {
                                                    width: maxWidthProcess * sumAttendance / sumLesson,
                                                    backgroundColor: theme.processColor1
                                                }]}
                                        />
                                    </View>
                                    <Text style={styles.textProcess}>{sumAttendance}/{sumLesson}</Text>
                                </View>
                                <View style={styles.processAndText}>
                                    <View style={{
                                        ...styles.process, ...styles.containerProcess, ...{
                                            backgroundColor: theme.processColorOpacity2
                                        }
                                    }}>
                                        <Animated.View
                                            style={[styles.process, styles.bar,
                                                {
                                                    width: maxWidthProcess * score / maxScore,
                                                    backgroundColor: theme.processColor2
                                                }]}
                                        />
                                    </View>
                                    <Text style={styles.textProcess}>{score}/{maxScore}</Text>
                                </View>
                            </View>
                        )
                        :
                        (
                            <View/>
                        )
                    }
                </View>
            </View>
        )
    }

    renderExpand() {
        var {phone, email} = this.props;
        if (this.state.onPressed) {
            return (
                <View style={styles.containerExpand}>
                    <Text style={styles.email}>{email}</Text>
                    <Call
                        url={'tel:' + phone}
                        phone={phone}
                    />
                </View>
            );
        }
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.onChangePress()}>
                        <View style={styles.containerAll}>
                            {this.content()}
                            {this.renderExpand()}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}/>
                </View>
            );
        } else {
            return (
                <View>
                    <TouchableNativeFeedback onPress={() => this.onChangePress()}>
                        <View style={styles.containerAll}>
                            {this.content()}
                            {this.renderExpand()}
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.line}/>
                </View>
            );
        }

    }
}

const styles = ({
    containerAll: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    container: {
        flexDirection: 'row',
    },
    containerExpand: {
        marginLeft: 55,
    },
    content: {
        flex: 1,
        marginLeft: 20,
    },
    containerTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: '#555555',
        fontWeight: '900',
        fontSize: (Platform.isPad) ? 18 : 13
    },
    subTitle: {
        color: '#7d7d7d',
        fontSize: 12
    },
    icon: {
        fontSize: 20,
        color: theme.colorTitle,
    },
    line: {
        height: 1,
        backgroundColor: theme.borderColor,
        marginRight: 20,

        marginLeft: 75
    },
    containerContentProcess: {
        paddingTop: 5
    },
    containerProcess: {
        marginVertical: 5,
        backgroundColor: theme.secondColorOpacity,
        width: maxWidthProcess
    },
    bar: {},
    process: {
        borderRadius: 5,
        height: 5,
        backgroundColor: theme.secondColor
    },
    processAndText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textProcess: {
        color: theme.colorTitle,
        fontSize: 12
    },
    containerSubTitle: {
        flexDirection: 'row'
    },
    email: {
        color: theme.colorSubTitle,
        marginTop: 5,
        fontSize: (Platform.isPad) ? 18 : 13
    },
    card: {
        paddingHorizontal: 10,
        marginLeft: 5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 15,
    },
    money: {
        fontSize: 10,
        color: 'white',
        textAlign: 'center'
    },
    isReceivedCard: {
        fontSize: 10,
        color: 'white',
        textAlign: 'center'
    }
});

export default ListItemStudent;