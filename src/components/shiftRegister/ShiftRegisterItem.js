import React from'react';
import {Image} from 'react-native'
import {
    View,
    Text,
    Button
} from 'native-base';
import _ from 'lodash';

class ShiftRegisterItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.shift, this.props.shift);
    }

    render() {
        var {shift, onRegister, onUnRegister, user} = this.props;
        if (shift.isLoadingRegister) {
            return (
                <View full style={styles.register}>
                    <Text style={styles.textRegister}>Đang đăng kí lịch trực...</Text>
                </View>
            );
        } else if (shift.isLoadingUnRegister) {
            return (
                <View full style={styles.registeredByUser}>
                    <Text style={styles.textRegisteredByUser}>Đang hủy lịch trực...</Text>
                </View>
            );
        } else if (shift.user) {
            if (shift.user.id === user.id) {
                return (
                    <Button full style={styles.registeredByUser}
                            onPress={() => onUnRegister(shift.id)}>
                        <Image
                            style={styles.avatar}
                            source={{uri: shift.user.avatar_url}}
                        />
                        <Text style={styles.textRegisteredByUser}>
                            {(shift.isLoadingUnRegisterError) ?
                                "Hủy đăng kí thất bại. Thử lại." : shift.user.name
                            }
                        </Text>
                    </Button>
                );
            } else
                return (
                    <View style={styles.registered}>
                        <Image
                            style={styles.avatar}
                            source={{uri: shift.user.avatar_url}}
                        />
                        <Text style={styles.textRegistered}>{shift.user.name}</Text>
                    </View>
                )
        } else {
            return (
                <Button full style={styles.register} onPress={() => onRegister(shift.id)}>
                    <Text
                        style={styles.textRegister}>
                        {(shift.isLoadingRegisterError) ?
                            "Đăng kí thất bại. Thử lại." :
                            shift.name + ": " + shift.start_time + " - " + shift.end_time}
                    </Text>
                </Button>
            )
        }
    }
}

const styles = {
    register: {
        backgroundColor: '#4dc151',
        marginVertical: 5,
        padding: 5,
        borderRadius: 3,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    registered: {
        backgroundColor: '#bdbdbd',
        marginVertical: 5,
        padding: 5,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
    },
    registeredByUser: {
        backgroundColor: '#d9534f',
        marginVertical: 5,
        padding: 5,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
    },
    textRegister: {
        color: 'white',
        textAlign: 'center',

    },
    textRegistered: {
        textAlign: 'center',
        marginLeft: 10
    },
    textRegisteredByUser: {
        textAlign: 'center',
        marginLeft: 10,
        color: 'white'
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
};

export default ShiftRegisterItem;