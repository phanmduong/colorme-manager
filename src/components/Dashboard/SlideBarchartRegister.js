import React from'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import BarchartItem from '../common/BarchartItem';

var {height, width} = Dimensions.get('window');

class SlideBarchartRegister extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        var {dateArray, registersByDate, paidByDate} = this.props;
        return (
            <View style={styles.slide}>
                <View style={styles.barchart}>
                    {
                        dateArray.map(function (date, index) {
                            return (<BarchartItem
                                key={index}
                                maxData={_.max(registersByDate)}
                                dataColMax={registersByDate[index]}
                                dataColMin={paidByDate[index]}
                                width={width / (2 * (dateArray.length + 2))}
                            />)
                        })
                    }
                </View>
                <Text style={styles.note}>
                    {_.sum(paidByDate) + " đóng tiền/" +
                    _.sum(registersByDate) + " đăng kí học"}
                </Text>
            </View>
        );
    }
}

const styles = ({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    barchart: {
        flexDirection: 'row'
    },
    note: {
        marginTop: 10,
        fontSize: 12,
        fontWeight: '500',
        color: '#555555'
    }
});

export default SlideBarchartRegister;