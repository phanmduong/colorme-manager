import React from'react';
import {StyleSheet, Image, ActivityIndicator, View, Text, ListView} from 'react-native';
import Button from './common/Button';

class AttendanceStudentComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount(){
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows([])
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.student.attendances)
        });
    }

    render() {
        return (
            (this.props.isLoadingInfoStudent) ?
                (
                    <ActivityIndicator
                        animating = {this.props.isLoadingInfoStudent}
                        style = {styles.indicator}
                        size = "large"
                    />
                ) :
                (
                    <View style = {styles.container} >
                        <Text>{this.props.student.name}</Text>
                        <Text>{this.props.studentCode}</Text>
                        <ListView
                            horizontal
                            enableEmptySections
                            style = {styles.list}
                            dataSource = {this.state.dataSource}
                            renderRow = {(rowdata)=><Text>{rowdata.order}</Text>}
                        />
                    </View>
                )
        );
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
    }
});

export default AttendanceStudentComponent;