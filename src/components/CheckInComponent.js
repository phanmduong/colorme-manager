import React from 'react';
import {StyleSheet} from 'react-native'
import Loading from '../components/common/Loading';
import {Dimensions, NetInfo} from 'react-native';
import {
    View,
    List,
    Text,
    Thumbnail,
    Button
} from 'native-base';
import theme from '../styles';
import {NetworkInfo} from 'react-native-network-info';
import Call from './common/Call';
import ListItem from './dashboard/ListItem';

let {height, width} = Dimensions.get('window');
import * as helper from '../helper/index';

class CheckInComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            typeConnect: '',
            wifiName: ''
        };
        this.handleConnectChange = this.handleConnectChange.bind(this);
    }

    componentWillMount() {
        NetInfo.addEventListener(
            'change',
            this.handleConnectChange
        );
        NetInfo.fetch().done(
            (reachability) => {
                this.getWifiName();
                this.setState({
                    typeConnect: helper.typeConnect(reachability)
                });
            }
        );
    }

    componentWillUnmount() {
        NetInfo.removeEventListener(
            'change',
            this.handleConnectChange
        );
    };

    getWifiName() {
        NetworkInfo.getSSID(ssid => {
            let wifiName = '';
            if (ssid && ssid != 'error' && ssid.indexOf("ssid") == -1) {
                wifiName = ssid;
            }
            this.setState({wifiName: wifiName});
        });
    }

    handleConnectChange(reachability) {
        this.getWifiName();
        this.setState({
            typeConnect: helper.typeConnect(reachability)
        });
    };

    render() {
        if (this.props.isLoadingCheckIn) {
            return (
                <Loading size={width / 8}/>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.containerInfoUser}>
                        <View style={styles.containerImage}>
                            <Thumbnail large source={this.props.errorCheckIn ? require('../../assets/img/failed.png') :
                                require('../../assets/img/success.png')}
                            />
                        </View>
                        <View style={styles.contentInfoUser}>
                            <Text
                                style={styles.status}
                            >{this.props.errorCheckIn ? "Thất bại".toUpperCase() : "Thành công".toUpperCase()}</Text>
                            <Text style={styles.name}>{this.props.user.name}</Text>
                            <Call
                                url={'tel:' + this.props.user.phone}
                                phone={this.props.user.phone.trim()}
                            />
                            <Text style={styles.email}>{this.props.user.email.trim()}</Text>
                        </View>

                    </View>
                    <View style={styles.containerStatus}>
                        <Text style={styles.message}>{this.props.message}</Text>
                        <View style={{flex: 1}}>
                            <List style={styles.containerList}>
                                <ListItem
                                    nameIcon="fontawesome|clock-o"
                                    title="Giờ"
                                    disableSubTitle
                                    number={this.props.checkInData.time}
                                />
                                <ListItem
                                    nameIcon="material|share"
                                    title={"Kết nối với mạng"}
                                    disableSubTitle
                                    number={this.state.typeConnect}
                                />
                                <ListItem
                                    nameIcon="fontawesome|wifi"
                                    title={"Tên wifi"}
                                    disableSubTitle
                                    number={this.state.wifiName}
                                />
                                <ListItem
                                    nameIcon="material|place"
                                    title={"Địa điểm"}
                                    disableSubTitle
                                    number={this.props.checkInData.base}
                                />
                            </List>
                        </View>
                    </View>
                    <View style={styles.buttonGroup}>
                        <Button
                            block
                            rounded
                            style={styles.button}
                            onPress={this.props.errorCheckIn ? this.props.onCheck : this.props.onExit}
                        >
                            <Text>{this.props.errorCheckIn ? 'Thử lại' : 'OK'}</Text>
                        </Button>
                    </View>
                </View>
            );
        }

    }
}

const styles = ({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    containerText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        width: width
    },
    containerInfoUser: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        flex: 1,
    },
    contentInfoUser: {
        paddingLeft: 15,
        flex: 2,
        justifyContent: 'center'
    },
    status: {
        fontSize: 15,
        fontWeight: '500'
    },
    name: {
        fontSize: 13,
        color: theme.colorSubTitle,
    },
    email: {
        fontSize: 13,
        color: theme.colorSubTitle,
    },
    containerImage: {
        flex: 1,
    },
    containerStatus: {
        flex: 4
    },
    containerList: {
        borderTopColor: theme.borderColor,
        borderTopWidth: 1
    },
    message: {
        color: theme.colorSubTitle,
        paddingHorizontal: 20,
        fontSize: 13,
        paddingBottom: 30,
    },
    button: {
        backgroundColor: theme.mainColor,
        marginHorizontal: width / 4,
    },
    buttonGroup: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CheckInComponent;
