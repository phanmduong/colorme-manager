import React from'react';
import {StyleSheet, Image} from 'react-native'
import {
    View,
    Text,
    Card,
    CardItem,
    Body,
    Button
} from 'native-base';

var self;
class ShiftRegisterDate extends React.Component {
    constructor(props, context) {
        super(props, context);
        self = this;
    }

    onUnRegister(registerId) {
        this.props.onUnRegister(registerId);
    }

    onRegister(registerId) {
        this.props.onRegister(registerId);
    }

    renderShiftItem() {
        return this.props.dateData.shifts.map((shift, index) => {
            if (shift.isLoadingRegister) {
                return (
                    <View full key={index} style={styles.register}>
                        <Text style={styles.textRegister}>Đang đăng kí lịch trực...</Text>
                    </View>
                );
            } else if (shift.isLoadingUnRegister) {
                return (
                    <View full key={index} style={styles.registeredByUser}>
                        <Text style={styles.textRegisteredByUser}>Đang hủy lịch trực...</Text>
                    </View>
                );
            } else if (shift.user) {
                if (shift.user.id === this.props.user.id) {
                    return (
                        <Button full key={index} style={styles.registeredByUser}
                                onPress={() => self.onUnRegister(shift.id)}>
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
                        <View key={index} style={styles.registered}>
                            <Image
                                style={styles.avatar}
                                source={{uri: shift.user.avatar_url}}
                            />
                            <Text style={styles.textRegistered}>{shift.user.name}</Text>
                        </View>
                    )
            } else {
                return (
                    <Button full style={styles.register} key={index} onPress={() => self.onRegister(shift.id)}>
                        <Text
                            style={styles.textRegister}>
                            {(shift.isLoadingRegisterError) ?
                                "Đăng kí thất bại. Thử lại." :
                                shift.name + ": " + shift.start_time + " - " + shift.end_time}
                        </Text>
                    </Button>
                )
            }
        });

    }

    render() {
        return (
            <View style={styles.card}>
                <Card>
                    <CardItem>
                        <Body style={styles.container}>
                        <View style={styles.date}>
                            <Text style={styles.textDate}>{this.props.dateData.date}</Text>
                        </View>
                        {this.renderShiftItem()}
                        </Body>
                    </CardItem>
                </Card>
            </View>
        );
    }
}

const styles = {
    container: {
        alignItems: 'stretch'
    },
    textDate: {
        fontWeight: 'bold'
    },
    card: {
        marginHorizontal: 10
    },
    date: {
        padding: 5,
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1,
        marginBottom: 5,
    },
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

export default ShiftRegisterDate;