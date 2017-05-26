import React from'react';
import {Dimensions, Animated} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import * as Progress from 'react-native-progress';
import theme from '../../styles';

var {height, width} = Dimensions.get('window');
class SlideTarget extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
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
                <Text style={styles.note}>123.000.000đ/130.000.000đ</Text>
                <View style={styles.containerContentProcess}>
                    <View style={{...styles.process, ...styles.containerProcess}}>
                        <Animated.View style={[styles.process, styles.bar]}/>
                    </View>
                    <View style={styles.containerTextProcess}>
                        <Text style={styles.text}>{'Chỉ tiêu của bạn'}</Text>
                        <Text style={styles.text}>{'48/60 (70%)'}</Text>
                    </View>
                </View>

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
        width: width - width / 10,
        marginVertical: 25
    },
    containerProcess: {
        backgroundColor: theme.secondColorOpacity
    },
    bar: {
        width: 3 * width / 5
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
    containerTextProcess: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginHorizontal: 5
    }
});

export default SlideTarget;