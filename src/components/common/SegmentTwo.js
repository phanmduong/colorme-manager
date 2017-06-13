import React from'react';
import {Platform, Dimensions} from 'react-native'
import {
    Text,
    Button,
    Segment
} from 'native-base';

var {height, width} = Dimensions.get('window');
const SegmentTwo = ({segmentActive, changeSegmentActive, nameSeg1, nameSeg2}) => {

    return (
        <Segment style={(Platform.OS === 'ios') ? styles.containerIos : styles.containerAndroid}>
            <Button first active={(segmentActive === 1)} onPress={() => changeSegmentActive(1)}><Text>{nameSeg1}</Text></Button>
            <Button last active={(segmentActive === 2)}
                    onPress={() => changeSegmentActive(2)}><Text>{nameSeg2}</Text></Button>
        </Segment>
    );

}

const styles = ({
    containerIos: {
        marginBottom: 2,
    },
    containerAndroid: {
        marginBottom: 2,
        width: width - 87,
    }
});

export default SegmentTwo;