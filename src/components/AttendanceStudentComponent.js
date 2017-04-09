import React from'react';
import {StyleSheet, Image, ActivityIndicator, View, Text, ListView} from 'react-native';
import Button from './common/Button';
import BusyIndicator from 'react-native-busy-indicator';
import LoaderHandler from 'react-native-busy-indicator/LoaderHandler';

class AttendanceStudentComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderRow = this.renderRow.bind(this);
        this.updateAttendance = this.updateAttendance.bind(this);
    }

    componentWillMount() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows([])
        });
    }

    componentWillReceiveProps(nextProps) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
                    dataSource: ds.cloneWithRows(nextProps.student.attendances),
                });
        if (!this.props.isUpdatingAttendanceStudent){
            LoaderHandler.showLoader('Updating');
        } else {
            LoaderHandler.hideLoader();
        }
    }

    updateAttendance() {
        this.props.onUpdateAttendance(this.props.student.attendances[this.props.orderLessonCourse].id, this.props.orderLessonCourse);
    }

    render() {
        return (
            (this.props.isLoadingInfoStudent) ?
                (
                    <ActivityIndicator
                        animating={this.props.isLoadingInfoStudent}
                        style={styles.indicator}
                        size="large"
                    />
                ) :
                (
                    <View style={styles.container}>
                        <View style={styles.container}/>
                        <Text>{this.props.student.name}</Text>
                        <Text>{this.props.studentCode}</Text>
                        <View/>
                        <View style={styles.container}/>
                        <ListView
                            horizontal
                            enableEmptySections
                            style={styles.list}
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                        />
                        <View/>
                        <View style={styles.button}/>
                                <Button
                                    title={'Điểm danh buổi ' + (parseInt(this.props.orderLessonCourse) + 1)}
                                    onPress={this.updateAttendance}
                                />

                        <View/>
                        <BusyIndicator/>
                    </View>
                )
        );
    }

    renderRow(rowData) {
        switch (rowData.status) {
            case 0: // chua diem danh
                return (<Text style={styles.textNumber}>{rowData.order}</Text>);
            case 1: // di hoc
                return (<Text style={styles.textNumberGreen}>{rowData.order}</Text>);
            default: // nghi hoc, -100
                return (<Text style={styles.textNumberRed}>{rowData.order}</Text>);
        }
    }
}

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 37
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        height: 50,
        marginTop: 20
    },
    button: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textNumberRed: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 7,
        height: 40,
        width: 30,
        borderRadius: 10,
        color: '#ff0800',
        fontSize:15,
        textAlign: 'center'
    },
    textNumberGreen: {
        marginHorizontal: 7,
        height: 40,
        width: 30,
        borderRadius: 10,
        color: '#00ff43',
        fontSize:15,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    textNumber: {
        marginHorizontal: 7,
        height: 40,
        width: 30,
        borderRadius: 10,
        fontSize:15,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
});

export default AttendanceStudentComponent;