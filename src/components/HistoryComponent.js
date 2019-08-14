import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import HistoryAttendanceShiftContainer from "../containers/historyAttendanceShift/HistoryAttendanceShiftContainer";
import HistoryAttendanceWorkShiftContainer from "../containers/historyAttendanceShift/HistoryAttendanceWorkShiftContainer";
import HistoryAttendanceTeachingContainer from "../containers/historyAttendanceTeaching/HistoryAttendanceTeachingContainer";

class HistoryComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            teachingShift: {
                gradient: ['#E26800', '#E00000'],
                textColor: {
                    color: 'white'
                }
            },
            workShift: {
                gradient: ['#FFFFFF', '#FFFFFF'],
                textColor: {
                    color: 'black'
                }
            },
            dutyShift: {
                gradient: ['#FFFFFF', '#FFFFFF'],
                textColor: {
                    color: 'black'
                }
            },
            tabComponent: <HistoryAttendanceTeachingContainer/>
        };
    }

    tabTeaching = () => {
        this.setState({
            teachingShift: {
                gradient: ['#E26800', '#E00000'],
                textColor: {
                    color: 'white'
                }
            },
            workShift: {
                gradient: ['#FFFFFF', '#FFFFFF'],
                textColor: {
                    color: 'black'
                }
            },
            dutyShift: {
                gradient: ['#FFFFFF', '#FFFFFF'],
                textColor: {
                    color: 'black'
                }
            },
            tabComponent: <HistoryAttendanceTeachingContainer/>
        })
    };

    tabWork = () => {
        this.setState({
            workShift: {
                gradient: ['#E26800', '#E00000'],
                textColor: {
                    color: 'white'
                }
            },
            teachingShift: {
                gradient: ['#FFFFFF', '#FFFFFF'],
                textColor: {
                    color: 'black'
                }
            },
            dutyShift: {
                gradient: ['#FFFFFF', '#FFFFFF'],
                textColor: {
                    color: 'black'
                }
            },
            tabComponent: <HistoryAttendanceWorkShiftContainer type={'work_shift'}/>
        });
    };

    tabDuty = () => {
        this.setState({
            dutyShift: {
                gradient: ['#E26800', '#E00000'],
                textColor: {
                    color: 'white'
                }
            },
            teachingShift: {
                gradient: ['#FFFFFF', '#FFFFFF'],
                textColor: {
                    color: 'black'
                }
            },
            workShift: {
                gradient: ['#FFFFFF', '#FFFFFF'],
                textColor: {
                    color: 'black'
                }
            },
            tabComponent: <HistoryAttendanceShiftContainer type={'shift'}/>
        });

    };

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.tabContainer}>
                    <LinearGradient colors={this.state.teachingShift.gradient}
                                    style={styles.gradientSize}>
                        <TouchableOpacity onPress={this.tabTeaching}>
                            <Text style={[styles.tabText, this.state.teachingShift.textColor]}>Giảng dạy</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient colors={this.state.workShift.gradient}
                                    style={styles.gradientSize}>
                        <TouchableOpacity onPress={this.tabWork}>
                            <Text style={[styles.tabText, this.state.workShift.textColor]}>Làm việc</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient colors={this.state.dutyShift.gradient}
                                    style={styles.gradientSize}>
                        <TouchableOpacity onPress={this.tabDuty}>
                            <Text style={[styles.tabText, this.state.dutyShift.textColor]}>Trực</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                <View style={{flex: 1}}>
                    {this.state.tabComponent}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    gradientSize: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 104,
        height: 42,
        borderRadius: 24
    },
    tabText:{
        fontSize: 16
    }
});

export default (HistoryComponent);
