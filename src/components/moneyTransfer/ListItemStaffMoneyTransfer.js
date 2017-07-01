import React from'react';
import {Dimensions, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {
    View,
    Text,
    Thumbnail,
    Icon,
    List,
    Button
} from 'native-base';
import theme from '../../styles';
import Call from '../common/Call';
import Spinkit from 'react-native-spinkit';

var {height, width} = Dimensions.get('window');
var maxWidthProcess = width / 2;
class ListItemStaffMoneyTransfer extends React.Component {
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
        const {name, avatar, email, phone} = this.props;
        return (
            <View style={styles.container}>
                <Thumbnail small source={{uri: avatar}}/>
                <View style={styles.contentLeft}>
                    <View style={styles.content}>
                        <View style={styles.containerTitle}>
                            <Text style={styles.title}>{name.trim().toUpperCase()}</Text>
                        </View>
                        <View style={styles.containerSubTitle}>
                            <Text style={styles.subTitle}>{email}</Text>
                            <Call
                                url={'tel:' + phone}
                                phone={phone}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.buttonMoneyTransfer}
                        onPress={() => {!this.props.isTransaction && this.props.postTransaction(this.props.userId)}}
                    >
                        {(this.props.isTransaction) ? (
                            <View style={styles.containerLoading}>
                                <Spinkit
                                    isVisible
                                    color='white'
                                    type='ThreeBounce'
                                    size={20}
                                />
                            </View>
                        ) : (
                            <Text style={styles.textButtonMoneyTransfer}>CHUYỂN TIỀN</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.onChangePress()}>
                        <View style={styles.containerAll}>
                            {this.content()}
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
        marginLeft: 20
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
    buttonMoneyTransfer: {
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: width/3.5,
        backgroundColor: theme.secondColor,
        padding: 5,
        borderRadius: 5
    },
    textButtonMoneyTransfer: {
        fontSize: 11,
        color: 'white'
    },
    contentLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default ListItemStaffMoneyTransfer;