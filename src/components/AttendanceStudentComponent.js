import React from'react';
import {ActivityIndicator, Image, Dimensions} from 'react-native';
import {
    Container,
    Button,
    List,
    View,
    Text
} from 'native-base';
var {height, width} = Dimensions.get('window');
import Spinkit from 'react-native-spinkit';
import BusyIndicator from 'react-native-busy-indicator';
import LoaderHandler from 'react-native-busy-indicator/LoaderHandler';
import theme from '../styles';

class AttendanceStudentComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderRow = this.renderRow.bind(this);
        this.updateAttendance = this.updateAttendance.bind(this);
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isUpdatingAttendanceStudent) {
            LoaderHandler.showLoader('Updating');
        } else {
            LoaderHandler.hideLoader();
        }
    }

    updateAttendance() {
        this.props.onUpdateAttendance(this.props.student.attendances[this.props.orderLessonCourse-1].id);
    }

    render() {
        return (
            <Container>
                {(this.props.isLoadingInfoStudent) ?
                    (
                        <View style={styles.containerFlex1}>
                            <Spinkit
                                isVisible
                                color={theme.mainColor}
                                type='Wave'
                                size={width/8}
                            />
                        </View>
                    ) :
                    (
                        <View style={styles.container}>
                            <View style={styles.containerFlex2}>
                                <Image
                                    source={
                                        (!this.props.student.avatar_url || this.props.student.avatar_url === '') ? (
                                            require('../../assets/img/colorme.jpg')
                                        ) :
                                            ({uri: this.props.student.avatar_url})}
                                    style={styles.image}
                                />
                            </View>
                            <View style={styles.containerFlex1}>
                                <Text style={styles.textName}>{this.props.student.name}</Text>
                                <Text style={styles.textStudentCode}>{this.props.studentCode}</Text>
                            </View>

                            <View style={styles.containerList}>
                                <List
                                    horizontal
                                    dataArray={this.props.student.attendances}
                                    renderRow={this.renderRow}
                                />
                            </View>
                            <View style={styles.viewButton}>
                                <Button
                                    block
                                    rounded
                                    style={styles.button}
                                    onPress={this.updateAttendance}
                                >
                                    <Text>{'Điểm danh buổi ' + (parseInt(this.props.orderLessonCourse))}</Text>
                                </Button>
                            </View>

                            <BusyIndicator/>
                        </View>
                    )}
            </Container>
        );
    }

    renderRow(rowData) {
        switch (rowData.status) {
            case 0: // chua diem danh
                return (
                    <View style={styles.textNumber}>
                        <Text style={{color: 'white', textAlign: 'center'}}>{rowData.order}</Text>
                    </View>
                );
            case 1: // di hoc
                return (
                    <View style={styles.textNumberGreen}>
                        <Text style={{color: 'white', textAlign: 'center'}}>{rowData.order}</Text>
                    </View>
                );
            default: // nghi hoc, -100
                return (
                    <View style={styles.textNumberRed}>
                        <Text style={{color: 'white', textAlign: 'center'}}>{rowData.order}</Text>
                    </View>
                );
        }
    }
}

const styles = ({
    header:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    containerFlex1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerFlex2: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerList: {
        paddingTop: height/12,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: width
    },
    image: {
        width: width / 3,
        height: width / 3,
        borderRadius: width / 6
    },
    textNumberRed: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.mainColor,
        marginHorizontal: 7
    },
    textNumberGreen: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#009e23',
        marginHorizontal: 7
    },
    textNumber: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 7,
        backgroundColor: '#6b6b6b',
    },
    button: {
        backgroundColor: theme.mainColor
    },
    viewButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: width - width / 8
    },
    textName: {
        fontSize: 20
    },
    textStudentCode: {
        fontSize: 15,
        color: '#888888',
        marginTop: 10
    }
});

export default AttendanceStudentComponent;