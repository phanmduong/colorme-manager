import React from 'react';
import {
    View,
    Text,
    Card,
    CardItem,
    Body,
} from 'native-base';
import _ from 'lodash';
import ShiftRegisterItem from "./ShiftRegisterItem";
import {observer} from "mobx-react";

var self;

@observer
class ShiftRegisterDate extends React.Component {
    constructor(props, context) {
        super(props, context);
        self = this;
    }

    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.dateData, this.props.dateData);
    }

    renderShiftItem() {
        const data = _.sortBy(this.props.dateData.shifts, shift => shift.id);
        return data.map((shift, index) => (
            <ShiftRegisterItem
                shift={shift}
                key={index}
            />
        ));

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