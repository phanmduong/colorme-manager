import React from'react';
import {Platform} from 'react-native';
import {View, Segment, Button, Text} from 'native-base';
import theme from '../../styles';
const SegmentRegisterList = (props) => {
    return (
        <View>
            <Segment style={styles.segment}>
                <Button
                    first
                    active={(props.segmentActive === 1)}
                    onPress={() => {
                        props.changeSegment(1);
                    }}
                >
                    <Text>Tất cả</Text>
                </Button>
                <Button
                    last
                    active={(props.segmentActive === 2)}
                    onPress={() => {
                        props.changeSegment(2);
                    }}
                >
                    <Text>Của tôi</Text>
                </Button>
            </Segment>
        </View>

    )
}

const styles = ({
    segment: {
        backgroundColor: theme.mainColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: (Platform.OS === 'ios') ? 17 : 4
    }
});

export default SegmentRegisterList;