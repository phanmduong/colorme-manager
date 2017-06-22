import React from'react';
import {Dimensions, Keyboard, Platform, Alert} from 'react-native';
import {
    Container,
    Button,
    View,
    List,
    Text,
    Thumbnail,
    Input,
    CheckBox,
    InputGroup
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import * as alert from '../constants/alert';
import Loading from './common/Loading';
import Search from './common/Search';
import ListItemStudentCollectMoney from "./collectMoney/ListItemStudentCollectMoney";
import Modal from 'react-native-modalbox';
import Call from './common/Call';

var {height, width} = Dimensions.get('window');
let self;
class CollectMoneyComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openModal = this.openModal.bind(this);
        this.state = ({
            student: {
                name: '',
                phone: '',
                email: ''
            },
            register: {
                class: '',
            },
            isKeyboardShow: false
        });
        this.updateMoneyStudent = this.updateMoneyStudent.bind(this);
        self = this;
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isUpdatingMoneyStudent !== this.props.isUpdatingMoneyStudent) {
            if (!nextProps.isUpdatingMoneyStudent) {
                    this._modal.close();
            }

        }
    }

    renderSearch() {
        const {updateFormAndLoadDataSearch, search} = this.props;
        return (
            <Search
                placeholder="Tìm kiếm (Email, tên, số điện thoại)"
                onChangeText={updateFormAndLoadDataSearch}
                value={search}
            />
        )
    }

    openModal(student, register) {
        let formInfoMoney = Object.assign({}, this.props.formInfoMoney);
        if (register.is_paid) {
            formInfoMoney.code = register.code;
            formInfoMoney.money = register.money;
            formInfoMoney.note = register.note;
            formInfoMoney.isReceivedCard = Boolean(register.received_id_card);
            this.props.updateFormDataAll(formInfoMoney);
        } else {
            if (register.class && register.class.indexOf('.') !== -1) {
                formInfoMoney.code = this.props.nextCode;
            } else {
                formInfoMoney.code = this.props.nextWaitingCode;
            }
            formInfoMoney.money = '';
            formInfoMoney.note = '';
            formInfoMoney.isReceivedCard = false;
            this.props.updateFormDataAll(formInfoMoney);
        }
        this.setState({
            student: student,
            register: register
        });
        this._modal.open();
    }

    updateMoneyStudent() {
        if (this.props.formInfoMoney.code.trim().length <= 0) {
            Alert.alert(
                'Thông báo',
                alert.MUST_ENTER_CODE
            );
            return;
        }
        if (this.props.formInfoMoney.money.trim().length <= 0) {
            Alert.alert(
                'Thông báo',
                alert.MUST_ENTER_MONEY
            );
            return;
        }
        this.props.updateMoneyStudent(this.state.register.id);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardDidShow() {
        self.setState({
            isKeyboardShow: true
        })
    }

    keyboardDidHide() {
        self.setState({
            isKeyboardShow: false
        })
    }


    renderContent() {
        if (this.props.isLoading && this.props.studentList.length <= 0) {
            return (
                <Loading size={width / 8}/>
            )
        } else {
            if (this.props.error || this.props.studentList.length <= 0) {
                return (
                    <Container>
                        <View style={styles.container}>
                            <Text
                                style={styles.textError}>{(this.props.error) ? alert.LOAD_DATA_ERROR : alert.NO_DATA_STUDENT_LIST}</Text>
                            <Button iconLeft danger small onPress={this.props.loadDataStudentList}
                                    style={{marginTop: 10, alignSelf: null}}>
                                <MaterialCommunityIcons name='reload' color='white' size={20}/>
                                <Text>Thử lại</Text>
                            </Button>
                        </View>
                    </Container>
                )
            } else {
                return (
                    <List
                        style={styles.list}
                        dataArray={this.props.studentList}
                        renderRow={
                            (item, sectionID, rowID) => (
                                <ListItemStudentCollectMoney
                                    name={item.name}
                                    avatar={item.avatar_url}
                                    email={item.email}
                                    phone={item.phone}
                                    registers={item.registers}
                                    student={item}
                                    onPress={self.openModal}
                                />
                            )
                        }
                    >
                    </List>
                )
            }
        }
    }


    render() {
        return (
            <View style={{flex: 1}}>
                {this.renderSearch()}
                {this.renderContent()}
                <Modal
                    style={(!this.state.isKeyboardShow) ? styles.modalFull : styles.modal}
                    ref={(modal) => {
                        this._modal = modal
                    }}
                    position={!this.state.isKeyboardShow ? 'center' : 'top'}
                    backdropPressToClose={!this.props.isUpdatingMoneyStudent}
                    swipeToClose={!this.props.isUpdatingMoneyStudent}
                >
                    <View style={styles.containerModal}>
                        {(!this.state.isKeyboardShow) ?
                            (
                                <View style={styles.containerInfoStudent}>
                                    <Thumbnail large source={{uri: this.state.student.avatar_url}}/>
                                    <View style={styles.contentInfoStudent}>
                                        <Text
                                            style={styles.nameStudent}
                                            maxLength={4}
                                        >{(this.state.student.name.length > 14) ?
                                            (this.state.student.name.substring(0, 14).trim().toUpperCase() + '...') :
                                            this.state.student.name.trim().toUpperCase()}</Text>
                                        <Text style={styles.nameClass}>{(this.state.register.class.length > 17) ?
                                            (this.state.register.class.substring(0, 18).trim() + '...') :
                                            this.state.register.class.trim()}</Text>
                                        <Call
                                            url={'tel:' + this.state.student.phone}
                                            phone={(this.state.student.phone.length > 17) ?
                                                (this.state.student.phone.substring(0, 17).trim() + '...') :
                                                this.state.student.phone.trim()}
                                        />
                                        <Text style={styles.email}>{(this.state.student.email.length > 17) ?
                                            (this.state.student.email.substring(0, 17).trim() + '...') :
                                            this.state.student.email.trim()}</Text>
                                    </View>
                                </View>
                            ) :
                            (
                                <View></View>
                            )
                        }
                        <View style={{flex: 1}}>
                            <View style={styles.containerCodeModal}>
                                <View style={styles.contentCodeModal}>
                                    <Text style={styles.titleCodeModal}>Mã học viên tiếp theo: </Text>
                                    <Text style={styles.codeModal}>{this.props.nextCode}</Text>
                                </View>
                                <View style={styles.contentCodeModal}>
                                    <Text style={styles.titleCodeModal}>Mã học viên chờ tiếp theo: </Text>
                                    <Text style={styles.codeModal}>{this.props.nextWaitingCode}</Text>
                                </View>
                            </View>
                            <InputGroup>
                                <Input
                                    onChangeText={(data) => this.props.updateFormData('code', data)}
                                    style={styles.textInput}
                                    value={this.props.formInfoMoney.code}
                                    returnKeyType={'next'}
                                    placeholder='Mã học viên'
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => {
                                        this.refs.money._root.focus();
                                    }}
                                    editable={!this.props.isUpdatingMoneyStudent && !Boolean(this.state.register.is_paid)}
                                />
                            </InputGroup>
                            <View style={styles.containerIsReceivedCard}>
                                <Text style={styles.textIsReceivedCard}>Đã nhận thẻ</Text>
                                <CheckBox
                                    checked={Boolean(this.props.formInfoMoney.isReceivedCard)}
                                    onPress={() => {
                                        if (!this.props.isUpdatingMoneyStudent && !Boolean(this.state.register.is_paid)) {
                                            this.props.updateFormData('isReceivedCard', !this.props.formInfoMoney.isReceivedCard)
                                        }
                                    }}
                                />

                            </View>
                            <InputGroup style={styles.inputGroup}>
                                <Input
                                    value={this.props.formInfoMoney.money.toString()}
                                    onChangeText={(data) => this.props.updateFormData('money', data)}
                                    style={styles.textInput}
                                    ref='money'
                                    returnKeyType={'next'}
                                    placeholder='Tổng số tiền'
                                    keyboardType='number-pad'
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => {
                                        this.refs.note._root.focus();
                                    }}
                                    editable={!this.props.isUpdatingMoneyStudent && !Boolean(this.state.register.is_paid)}
                                />
                            </InputGroup>
                            <InputGroup>
                                <Input
                                    value={this.props.formInfoMoney.note}
                                    onChangeText={(data) => this.props.updateFormData('note', data)}
                                    style={styles.textInput}
                                    ref='note'
                                    returnKeyType={'done'}
                                    placeholder='Ghi chú'
                                    editable={!this.props.isUpdatingMoneyStudent && !Boolean(this.state.register.is_paid)}
                                    onSubmitEditing={() => {
                                        this.updateMoneyStudent();
                                        Keyboard.dismiss();
                                    }}
                                />
                            </InputGroup>
                            {
                                (!Boolean(this.state.register.is_paid)) ?
                                    (
                                        <Button
                                            disabled={this.props.isUpdatingMoneyStudent}
                                            block
                                            rounded
                                            style={(this.props.isUpdatingMoneyStudent) ? styles.disableButton : styles.button}
                                            onPress={this.updateMoneyStudent}
                                        >
                                            {(this.props.isUpdatingMoneyStudent) ?
                                                (
                                                    <Text>Đang cập nhật dữ liệu...</Text>
                                                )
                                                :
                                                (
                                                    <Text>NỘP TIỀN</Text>
                                                )
                                            }
                                        </Button>
                                    )
                                    :
                                    (
                                        <View></View>
                                    )
                            }
                        </View>
                    </View>
                </Modal>
            </View>
        )

    }
}

const styles = ({
    list: {},
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textError: {
        color: '#d9534f',
        textAlign: 'center'
    },
    modal: {
        height: height / 2,
        width: width - 40,
        borderRadius: 10,
    },

    modalFull: {
        height: height - 200,
        width: width - 40,
        borderRadius: 10,
    },
    wrapper: {},
    dotStyle: {
        opacity: 0.4,
        width: 5,
        height: 5
    },
    titleList: {
        paddingTop: 10,
        width: width,
        textAlign: 'center',
        color: theme.colorTitle,
        fontWeight: '900'
    },
    loading: {
        height: 95
    },
    containerModal: {
        position: 'relative',
        padding: 15,
        flex: 1
    },
    nameStudent: {
        fontSize: 15,
        fontWeight: '500'
    },
    nameClass: {
        fontSize: 13,
        color: theme.colorSubTitle,
    },
    email: {
        fontSize: 13,
        color: theme.colorSubTitle,
    },
    button: {
        backgroundColor: theme.mainColor,
        position: 'absolute',
        bottom: 0,
        width: width - 80,
    },
    disableButton: {
        backgroundColor: theme.mainColor + 'AF',
        position: 'absolute',
        bottom: 0,
        width: width - 80,
    },
    containerIsReceivedCard: {
        width: width - 80,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5
    },
    textIsReceivedCard: {
        fontSize: 15,
        color: theme.colorSubTitle,

    },
    titleCodeModal: {
        color: theme.colorSubTitle,
        fontSize: 12
    },
    codeModal: {
        fontSize: 13,
        color: theme.colorSubTitle,
    },
    containerCodeModal: {
        width: width - 80,
        paddingLeft: 5,
    },
    contentCodeModal: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    textInput: {
        width: width - 80,
        fontSize: 15,
        color: theme.colorSubTitle,
        lineHeight: 20,
        height: 35
    },
    containerInfoStudent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10
    },
    contentInfoStudent: {
        paddingLeft: 15,
        flex: 1,
        justifyContent: 'center'
    }
});

export default CollectMoneyComponent;