import React from'react';
import {Animated, Dimensions} from 'react-native';
import {
    View
}from 'native-base';
import theme from '../../styles';
var {height, width} = Dimensions.get('window');

const maxHeight = height / 5;
class BarchartItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        var {maxData, dataColMax, dataColMin, width} = this.props;

        console.log("data" + dataColMin);
        console.log('maxData' + maxData);
        return (
            <View style={{
                ...styles.bar, ...styles.points, ...{
                    marginHorizontal: width / 2,
                    height: height / 4,
                    position: 'relative',
                    backgroundColor: 'transparent',
                    width: width
                }
            }}>
                <Animated.View style={[styles.bar, styles.points, {
                    height: (dataColMax === 0) ? 1 : maxHeight * dataColMax / maxData,
                    backgroundColor: theme.secondColorOpacity,
                    position: 'absolute',
                    width: width
                }]}/>
                <Animated.View style={[styles.bar, styles.points, {
                    height: maxHeight * dataColMin / maxData,
                    position: 'absolute',
                    width: width
                }]}/>
            </View>
        );
    }
}

const styles = ({
    bar: {
        borderRadius: 50,
        justifyContent: 'flex-end',
        bottom: 0
    },
    points: {
        backgroundColor: theme.secondColor
    }
});

export default BarchartItem;