import React from'react';
import {View, Text, Image, Dimensions, Platform} from 'react-native';
import {
    Thumbnail,
    List
} from 'native-base';
import ListItemRegisterStudentClass from './ListItemRegisterStudentClass';
import theme from '../../styles';
import Call from '../common/Call';
import Modal from 'react-native-modalbox';

let {height, width} = Dimensions.get('window');
let self;
class StudentRegisterClassComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openModal = this.openModal.bind(this);
        this.state = ({
            register: {},
            student: {}
        });
        self = this;
    }

    openModal(register, student) {
        this._modal.open();
        this.setState({
            register: register,
            student: student
        });
    }

    render() {
        const {name, avatar_url, phone, email} = this.props.student;
        return (
            <View style={{flex: 1}}>
                <View style={styles.containerInfoStudent}>
                    <Image
                        style={styles.image}
                        source={{uri: avatar_url}}
                    />
                    <View style={styles.content}>
                        <View style={styles.containerTitle}>
                            <Text style={styles.title}>{name.trim().toUpperCase()}</Text>
                            <Text style={styles.subTitle}>{email}</Text>
                            <Call
                                url={'tel:' + phone}
                                phone={phone}
                            />
                        </View>
                    </View>
                </View>
                <List
                    dataArray={this.props.student.registers}
                    renderRow={(item) => (
                        <ListItemRegisterStudentClass
                            className={item.class}
                            isPaid={item.is_paid}
                            money={item.money}
                            avatar={item.icon_url}
                            register={item}
                            student={self.props.student}
                            receivedIdCard={item.received_id_card}
                            onPress={self.openModal}
                        />
                    )}
                >
                </List>
                <Modal
                    style={styles.modal}
                    position={"center"}
                    ref={(modal) => {
                        this._modal = modal
                    }}
                >
                    <View style={styles.containerModal}>
                        <Thumbnail large source={{uri: this.state.student.avatar_url}}/>
                        <Text style={styles.nameStudent}>{this.state.student.name}</Text>
                        <Text style={styles.nameClass}>{this.state.register.class}</Text>
                        <Text style={styles.phone}>{this.state.student.phone}</Text>
                        <Text style={styles.email}>{this.state.student.email}</Text>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = ({
    containerInfoStudent: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginHorizontal: 10,
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    container: {
        flexDirection: 'row',
    },
    content: {
        marginLeft: 20,
    },
    containerTitle: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        color: '#555555',
        fontWeight: '500',
        fontSize: (Platform.isPad) ? 18 : 13
    },
    subTitle: {
        color: theme.colorSubTitle,
        fontSize: 12
    },
    modal: {
        height: height - 200,
        width: width - 50
    },

    containerModal: {
        padding: 15,
        alignItems: 'center',
        flex: 1
    }
});

export default StudentRegisterClassComponent;