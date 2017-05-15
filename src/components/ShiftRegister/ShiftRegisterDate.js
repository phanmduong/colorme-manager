import React from'react';
import {StyleSheet, Image} from 'react-native'
import {
    View,
    Text,
    Card,
    CardItem,
    Body
} from 'native-base';


class ShiftRegisterDate extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    renderShiftItem() {
        return this.props.dateData.shifts.map((shift, index) => {
            if (shift.user) {
                if (shift.user.id === this.props.user.id) {
                    return (
                        <View key={index} style={styles.registeredByUser}>
                            <Image
                                style={styles.avatar}
                                source={{uri: shift.user.avatar_url}}
                            />
                            <Text style={styles.textRegisteredByUser}>{shift.user.name}</Text>
                        </View>
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
                    <View key={index} style={styles.register}>
                        <Text
                            style={styles.textRegister}>{shift.name + ": " + shift.start_time + " - " + shift.end_time}</Text>
                    </View>
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