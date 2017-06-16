import React from'react';
import {Dimensions, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {
    View,
    Text,
    Thumbnail,
    Icon
} from 'native-base';
import theme from '../../styles';
import Call from '../common/Call';

var {height, width} = Dimensions.get('window');
var maxWidthProcess = width / 2;
class ListItemStudentCollectMoney extends React.Component {
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
        const {className, avatar, isPaid, money, receivedIdCard} = this.props;
        return (
            <View style={styles.container}>
                <Thumbnail small source={{uri: avatar}}/>
                <View style={styles.content}>
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>{className.trim().toUpperCase()}</Text>
                    </View>
                    <View style={styles.containerSubTitle}>
                        {Boolean(isPaid) && <Text style={styles.subTitle}>{money} đ</Text>}
                        {Boolean(isPaid) &&
                        (
                            (Boolean(receivedIdCard)) ?
                                (
                                    <Text style={styles.subTitle}>Đã nhận thẻ</Text>
                                )
                                :
                                (
                                    <Text style={styles.subTitle}>Chưa nhận thẻ</Text>
                                )
                        )

                        }
                    </View>
                    <View style={styles.isPaid}><Text
                        style={styles.textIsPaid}>{(Boolean(isPaid)) ? 'Đã nộp tiền' : 'Chưa nộp tiền'}</Text></View>
                </View>

            </View>
        )
    }

    renderExpand() {
        if (this.state.onPressed) {
            return (
                <View style={styles.containerExpand}>
                </View>
            );
        }
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.props.onPress(this.props.register, this.props.student)}>
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
                    <TouchableNativeFeedback
                        onPress={() => this.props.onPress(this.props.register, this.props.student)}>
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
        position: 'relative'
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
        color: theme.colorSubTitle,
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
        flexDirection: 'column'
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
    },
    isPaid: {
        position: 'absolute',
        right: 0,
    },
    textIsPaid: {
        fontSize: 12
    }
});

export default ListItemStudentCollectMoney;