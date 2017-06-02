import React from'react';
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
        const {name, avatar, nameClass, saler, campaign} = this.props;
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
                        <Text style={styles.subTitle}>{nameClass}</Text>
                    </View>
                    <View style={styles.containerSubTitle}>
                        {(saler) ?
                            (
                                <View style={{
                                    ...styles.card, ...
                                        {
                                            backgroundColor: (!saler.color || saler.color === '')
                                                ? theme.processColor1 : '#' + saler.color
                                        }
                                }}
                                >
                                    <Text style={styles.saler}>{saler.name}</Text>
                                </View>
                            )
                            :
                            (
                                <View/>
                            )
                        }
                        {(campaign) ?
                            (
                                <View style={{
                                    ...styles.card, ...
                                        {
                                            backgroundColor: (!campaign.color || campaign.color === '')
                                                ? theme.processColor1 : '#' + campaign.color,
                                            marginLeft: 5
                                        }
                                }}
                                >
                                    <Text style={styles.campaign}>{campaign.name}</Text>
                                </View>
                            )
                            :
                            (
                                <View/>
                            )
                        }

                    </View>
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
                    <Text style={styles.phone}>{formatPhone(phone)}</Text>
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
    containerSubTitle: {
        flexDirection: 'row'
    },
    email: {
        color: theme.colorSubTitle,
        marginTop: 5,
        fontSize: (Platform.isPad) ? 18 : 13
    },
    phone: {
        color: '#0087ff',
        fontSize: (Platform.isPad) ? 18 : 13
    },
    card: {
        paddingHorizontal: 10,
        marginTop: 5,
        borderRadius: 20,
    },
    saler: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center'
    },
    campaign: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center'
    }
});

export default ListItemStudent;