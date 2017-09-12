import React from 'react';
import {Image, Dimensions} from 'react-native';
import {
    Container,
    Button,
    List,
    View,
    Text
} from 'native-base';

var {height, width} = Dimensions.get('window');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import theme from '../styles';
import Loading from '../components/common/Loading';
import * as alert from '../constants/alert';

class AttendanceStudentComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderRow = this.renderRow.bind(this);
        this.updateAttendance = this.updateAttendance.bind(this);
    }


    updateAttendance() {
        let attendanceId = this.props.student.attendances.filter( (attendances) => {
            return attendances.order == this.props.orderLessonCourse;
        })[0].id;
        this.props.onUpdateAttendance(attendanceId);
    }

    render() {
        if (this.props.isLoadingInfoStudent) {
            return (
                <Loading size={width / 8}/>
            )
        } else {
            if (this.props.error) {
                return (
                    <Container>
                        <View style={styles.container}>
                            <Text
                                style={styles.textError}>{(!this.props.messageError) ? alert.LOAD_DATA_ERROR : this.props.messageError}</Text>
                            <Button iconLeft danger small onPress={this.props.onReload}
                                    style={{marginTop: 10, alignSelf: null}}>
                                <MaterialCommunityIcons name='reload' color='white' size={20}/>
                                <Text>Thử lại</Text>
                            </Button>
                        </View>
                    </Container>
                )
            } else {
                return (
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
                                disabled={this.props.isUpdatingAttendanceStudent}
                                block
                                rounded
                                style={(this.props.isUpdatingAttendanceStudent) ? styles.disableButton : styles.button}
                                onPress={this.updateAttendance}
                            >
                                {(this.props.isUpdatingAttendanceStudent) ?
                                    (
                                        <Text>Đang cập nhật dữ liệu...</Text>
                                    )
                                    :
                                    (
                                        <Text>{'Điểm danh buổi ' + (parseInt(this.props.orderLessonCourse))}</Text>
                                    )
                                }
                            </Button>
                        </View>
                    </View>
                )
            }
        }
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
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        paddingTop: height / 12,
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
    disableButton: {
        backgroundColor: theme.mainColor + 'AF'
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
    },
    textError: {
        color: '#d9534f',
        textAlign: 'center'
    }
});

export default AttendanceStudentComponent;