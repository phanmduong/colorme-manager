import React from'react';
import {Dimensions, Platform, TouchableOpacity} from 'react-native';
import {
    View,
    Text
} from 'native-base';
import theme from '../../styles';
import _ from 'lodash';

var {height, width} = Dimensions.get('window');
class ListItemStudentCollectMoney extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.isPaid, this.props.isPaid);
    }

    content() {
        const {className, isPaid} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{className.trim().toUpperCase()}</Text>
                {(Boolean(isPaid)) ?
                    (
                        <View style={styles.isPaid}>
                            <Text style={styles.textIsPaid}>Đã nộp tiền</Text>
                        </View>
                    )
                    :
                    (
                        <TouchableOpacity
                            style={styles.buttonPaid}
                            onPress={() => this.props.onPress(this.props.student, this.props.register)}
                        >
                            <Text style={styles.textPaid}>NỘP TIỀN</Text>
                        </TouchableOpacity>
                    )}

            </View>
        )
    }

    render() {
        console.log('render collect Money');
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.onPress(this.props.student, this.props.register)}>
                    {this.content()}
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = ({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    title: {
        color: '#555555',
        fontWeight: '900',
        fontSize: (Platform.isPad) ? 18 : 13,
        width: width / 2 - 50
    },
    textIsPaid: {
        fontSize: 13,
        color: '#4CAF50',
        fontWeight: '500'
    },
    buttonPaid: {
        backgroundColor: theme.secondColor,
        padding: 5,
        borderRadius: 5
    },
    textPaid: {
        fontSize: 13,
        color: 'white',
        fontWeight: '500'
    }
});

export default ListItemStudentCollectMoney;