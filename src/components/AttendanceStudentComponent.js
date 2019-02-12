import React from 'react';
import {Image, Dimensions, TouchableOpacity} from 'react-native';
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
import ImageView from "react-native-image-view";

class AttendanceStudentComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderRow = this.renderRow.bind(this);
        this.updateAttendance = this.updateAttendance.bind(this);
        this.state = {
            imageIndex: 0,
            isImageViewVisible: false
        }
    }


    updateAttendance() {
        let attendanceId = this.props.student.attendances.filter((attendances) => {
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
                                style={styles.textError}>{(!this.props.messageError) ? alert.LOAD_DATA_ERROR : this.props.messageError} {this.props.studentCode}</Text>
                            <Button iconLeft danger small onPress={this.props.onReload}
                                    style={{marginTop: 10, alignSelf: null}}>
                                <MaterialCommunityIcons name='reload' color='white' size={20}/>
                                <Text>Thử lại</Text>
                            </Button>
                        </View>
                    </Container>
                )
            } else {
                const images = this.getImages(this.props.student);
                return (
                    <View style={styles.container}>
                        <View style={styles.containerFlex1}>
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
                        <View style={styles.containerFlexImage}>
                            {images.map((image, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => this.setState({imageIndex: index, isImageViewVisible: true})}
                                    >
                                        <Image
                                            style={styles.imageStudent}
                                            source={image.source}
                                            resizeMode="cover"
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>

                        <View style={styles.containerList}>
                            <List
                                style={{height: 30}}
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
                        <ImageView
                            glideAlways
                            images={images}
                            imageIndex={this.state.imageIndex}
                            animationType="fade"
                            isVisible={this.state.isImageViewVisible}
                            onClose={() => this.setState({isImageViewVisible: false})}
                        />
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

    getImages(student) {
        return [
            {
                source: (student.image1 == null || student.image1 === '') ? require('../../assets/img/no_photo.png') : {
                    uri: student.image1
                },
                title: 'Ảnh 1',
                width: 1280,
                height: 960
            },
            {
                source: (student.image2 == null || student.image2 === '') ? require('../../assets/img/no_photo.png') : {
                    uri: student.image2
                },
                title: 'Ảnh 2',
                width: 1280,
                height: 960
            }
        ];
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
    containerFlexImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    containerFlex2: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerList: {
        marginTop: 15,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: width
    },
    imageStudent: {
        width: width / 3.5,
        height: width / 3.5,
        marginHorizontal: 10,
    },
    image: {
        width: width / 4,
        height: width / 4,
        borderRadius: width / 8
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