import React from'react';
import {ActivityIndicator, ListView} from 'react-native';
import {
    Container,
    Header,
    Button,
    Left,
    Right,
    Title,
    Body,
    Icon,
    Text,
    View
} from 'native-base';
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
        if (!this.props.isUpdatingAttendanceStudent) {
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
            <Container>
                <Header>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Left>
                            <Button
                                transparent
                                onPress={this.props.popRouter}
                                style={{paddingLeft: 0, paddingRight: 0}}
                            >
                                <Icon
                                    name="arrow-back"
                                    style={{color: '#fff'}}
                                />
                            </Button>
                        </Left>
                        <Body>
                        <Title>Điểm danh</Title>
                        </Body>
                        <Right style={{paddingRight: 6}}>
                            <Button
                                transparent
                                style={{paddingLeft: 0, paddingRight: 0}}
                            >
                                <Icon name='menu' style={{color: '#fff'}}/>
                            </Button>
                        </Right>
                    </View>
                </Header>
                {(this.props.isLoadingInfoStudent) ?
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
                            <Button
                                block
                                rounded
                                style={styles.button}
                                onPress={this.updateAttendance}
                            >
                                <Text>{'Điểm danh buổi ' + (parseInt(this.props.orderLessonCourse) + 1)}</Text>
                            </Button>
                            <BusyIndicator/>
                        </View>
                    )}
            </Container>
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

const styles = ({
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 37
    },
    container: {
    },
    list: {
        height: 50,
        marginTop: 20
    },
    textNumberRed: {
        marginHorizontal: 7,
        height: 40,
        width: 30,
        borderRadius: 10,
        color: '#ff0800',
        fontSize: 15,
    },
    textNumberGreen: {
        marginHorizontal: 7,
        height: 40,
        width: 30,
        borderRadius: 10,
        color: '#00ff43',
        fontSize: 15,
    },
    textNumber: {
        marginHorizontal: 7,
        height: 40,
        width: 30,
        borderRadius: 10,
        fontSize: 15,
    },
    button: {
        backgroundColor: '#C50000',
    }
});

export default AttendanceStudentComponent;