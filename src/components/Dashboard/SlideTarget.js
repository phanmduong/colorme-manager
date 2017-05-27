import React from'react';
import {Dimensions, Animated} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import * as Progress from 'react-native-progress';
import theme from '../../styles';
import {dotNumber} from '../../helper';

var {height, width} = Dimensions.get('window');
class SlideTarget extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        var {totalMoney, countPaid, countTotal, bonus} = this.props;
        return (
            <View style={styles.slide}>
                <Progress.Circle
                    size={100}
                    progress={0.9}
                    indeterminate={false}
                    color={theme.mainColor}
                    showsText
                    formatText={(progressValue) => {
                        return parseInt(0.9 * 100) + '%';
                    }}
                />
                <Text style={styles.note}>123.000.000đ/{dotNumber(totalMoney)}đ</Text>
                {(countPaid) ?
                    (
                        <View style={styles.containerContentProcess}>
                            <View style={{...styles.process, ...styles.containerProcess}}>
                                <Animated.View
                                    style={[styles.process, styles.bar, {width: countPaid * (width - width / 10) / countTotal}]}/>
                            </View>
                            <View style={styles.containerText}>
                                <View style={styles.contentSpaceBetween}>
                                    <Text style={styles.text}>{'Chỉ tiêu của bạn'}</Text>
                                    <Text
                                        style={styles.text}>{countPaid + '/' + countTotal + ' (' + Math.round(countPaid * 100 / countTotal) + '%)'}</Text>
                                </View>
                                {(bonus) ?
                                    (
                                        <View style={styles.contentSpaceBetween}>
                                            <Text style={styles.text}>{'Thưởng của bạn'}</Text>
                                            <Text
                                                style={styles.text}>{bonus + ''}</Text>
                                        </View>
                                    )
                                    :
                                    (<View/>)
                                }

                            </View>
                        </View>
                    )
                    :
                    (<View/>)

                }
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
    note: {
        marginTop: 10,
        fontSize: 12,
        fontWeight: '500',
        color: '#555555'
    },
    containerContentProcess: {
        marginVertical: 25,
        width: width - width / 10
    },
    containerProcess: {
        backgroundColor: theme.secondColorOpacity
    },
    bar: {
    },
    process: {
        borderRadius: 5,
        height: 5,
        backgroundColor: theme.secondColor
    },
    text: {
        color: '#7d7d7d',
        fontSize: 12
    },
    containerText: {
        marginTop: 5,
        marginHorizontal: 5
    },
    contentSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default SlideTarget;