import React from'react';
import {StyleSheet, Animated, Dimensions, TouchableHighlight} from 'react-native';
import {
    View,
    Text
}from 'native-base';
import theme from '../../styles';
var {height, width} = Dimensions.get('window');

const maxHeight = 150;
class BarchartItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        var {maxData, dataColMax, dataColMin} = this.props;
        return (
            <View style={{
                ...styles.bar, ...styles.points, ...{
                    marginHorizontal: 3,
                    height: height / 4,
                    position: 'relative',
                    backgroundColor: 'transparent'
                }
            }}>
                <Animated.View style={[styles.bar, styles.points, {
                    height: maxHeight * dataColMax / maxData,
                    backgroundColor: theme.secondColorOpacity,
                    position: 'absolute'
                }]}/>
                <Animated.View style={[styles.bar, styles.points, {
                    height: maxHeight * dataColMin / maxData,
                    position: 'absolute'
                }]}/>
            </View>
        );
    }
}

const styles = ({
    bar: {
        borderRadius: 5,
        width: 5,
        justifyContent: 'flex-end',
        bottom: 0
    },
    points: {
        backgroundColor: theme.secondColor
    }
});

export default BarchartItem;