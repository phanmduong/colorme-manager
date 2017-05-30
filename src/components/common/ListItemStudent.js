import React from'react';
import {Dimensions, Platform, TouchableNativeFeedback, TouchableOpacity, Animated} from 'react-native';
import {
    View,
    Text,
    Thumbnail,
    Icon
} from 'native-base';
import theme from '../../styles';
import _ from 'lodash';
var {height, width} = Dimensions.get('window');

var maxWidthProcess = width / 2;
class ListItemStudent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            onPressed: false
        };
    }

    onChangePress() {
        this.setState({
            onPressed: !this.state.onPressed
        });
    }

    content() {
        var {name, avatar, code} = this.props;
        return (
            <View style={styles.container}>
                <Thumbnail small source={{uri: avatar}}/>
                <View style={styles.content}>
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>{name.trim().toUpperCase()}</Text>
                        {(this.state.onPressed) ?
                            (
                                <Icon
                                    style={styles.icon}
                                    ios='ios-arrow-up'
                                    android="md-arrow-dropup"
                                    name="ios-arrow-up"/>
                            )
                            :
                            (
                                <Icon
                                    name="ios-arrow-up"
                                    ios='ios-arrow-down'
                                    android="md-arrow-dropdown"
                                    style={styles.icon}
                                />
                            )
                        }
                    </View>
                    <Text style={styles.subTitle}>{code}</Text>
                </View>
            </View>
        )
    }

    renderExpand() {
        var {attendances} = this.props;
        var sumLesson = attendances.length;
        var sumAttendance = _.filter(attendances, {status: 1}).length;
        var sumHomeWork = _.filter(attendances, {hw_status: 1}).length;
        if (this.state.onPressed) {
            return (
                <View style={styles.containerExpand}>
                    <View style={styles.containerContentProcess}>
                        <View style={styles.processAndText}>
                            <View style={{
                                ...styles.process, ...styles.containerProcess, ...{
                                    backgroundColor: theme.processColorOpacity1,
                                }
                            }}>
                                <Animated.View
                                    style={[styles.process, styles.bar,
                                        {
                                            width: maxWidthProcess * sumAttendance / sumLesson,
                                            backgroundColor: theme.processColor1
                                        }]}
                                />
                            </View>
                            <Text style={styles.textProcess}>{sumAttendance}/{sumLesson}</Text>
                        </View>
                        <View style={styles.processAndText}>
                            <View style={{
                                ...styles.process, ...styles.containerProcess, ...{
                                    backgroundColor: theme.processColorOpacity2
                                }
                            }}>
                                <Animated.View
                                    style={[styles.process, styles.bar,
                                        {
                                            width: maxWidthProcess * sumHomeWork / sumLesson,
                                            backgroundColor: theme.processColor2
                                        }]}
                                />
                            </View>
                            <Text style={styles.textProcess}>{sumHomeWork}/{sumLesson}</Text>
                        </View>
                    </View>
                </View>
            );
        }
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.onChangePress()}>
                        <View style={styles.containerAll}>
                            {this.content()}
                            {this.renderExpand()}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}/>
                </View>
            );
        } else {
            return (
                <View>
                    <TouchableNativeFeedback onPress={() => this.onChangePress()}>
                        <View style={styles.containerAll}>
                            {this.content()}
                            {this.renderExpand()}
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.line}/>
                </View>
            );
        }

    }
}

const styles = ({
    containerAll: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    container: {
        flexDirection: 'row',
    },
    containerExpand: {
        marginLeft: 55
    },
    content: {
        flex: 1,
        marginLeft: 20,
    },
    containerTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: '#555555',
        fontWeight: '900',
        fontSize: (Platform.isPad) ? 18 : 13
    },
    subTitle: {
        color: '#7d7d7d',
        fontSize: 12
    },
    icon: {
        fontSize: 20,
        color: theme.colorTitle,
    },
    line: {
        height: 1,
        backgroundColor: theme.borderColor,
        marginRight: 20,
        marginLeft: 75
    },
    containerContentProcess: {},
    containerProcess: {
        marginVertical: 5,
        backgroundColor: theme.secondColorOpacity,
        width: maxWidthProcess
    },
    bar: {},
    process: {
        borderRadius: 5,
        height: 5,
        backgroundColor: theme.secondColor
    },
    processAndText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textProcess: {
        color: theme.colorTitle,
        fontSize: 12
    },
    containerSubTitle: {
        flexDirection: 'row'
    }
});

export default ListItemStudent;