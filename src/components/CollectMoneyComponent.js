import React from'react';
import {Dimensions, FlatList} from 'react-native';
import {
    Container,
    Button,
    View,
    List,
    Text,
    Thumbnail
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import * as alert from '../constants/alert';
import Loading from './common/Loading';
import Search from './common/Search';
import ListItemStudentCollectMoney from "./listItem/ListItemStudentCollectMoney";
import Modal from 'react-native-modalbox';

var {height, width} = Dimensions.get('window');
class RegisterListComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openModal = this.openModal.bind(this);
        this.state = ({
            student: {
                registers: {}
            }
        });
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

    openModal(student) {
        this._modal.open();
        this.setState({
            student: student
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
                    <View style={{flex: 1}}>
                        <View style={styles.containerCode}>
                            <View style={styles.contentCode}>
                                <Text style={styles.titleCode}>Mã học viên tiếp theo: </Text>
                                <Text style={styles.code}>{this.props.nextCode}</Text>
                            </View>
                            <View style={styles.contentCode}>
                                <Text style={styles.titleCode}>Mã học viên chờ tiếp theo: </Text>
                                <Text style={styles.code}>{this.props.nextWaitingCode}</Text>
                            </View>
                        </View>
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
                                        onPress={this.openModal}
                                        student={item}
                                    />
                                )
                            }
                        >
                        </List>
                    </View>
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
                    style={styles.modal}
                    position={"center"}
                    ref={(modal) => {
                        this._modal = modal
                    }}
                >
                    <View style={styles.containerInfoStudent}>
                        <Thumbnail small source={{uri: this.state.student.avatar_url}}/>
                        <Text>{this.state.student.name}</Text>
                    </View>
                    <FlatList
                        data={[{key: 'a'}, {key: 'b'}]}
                        renderItem={({item}) => <Text>{item.key}</Text>}
                    />
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
    contentCode: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'flex-end',

    },
    titleCode: {
        color: theme.colorSubTitle,
        fontSize: 12
    },
    code: {
        fontSize: 14
    },
    containerCode: {
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        paddingBottom: 5
    },
    modal: {
        height: height - 200,
        width: width - 50
    },
    containerInfoStudent: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        marginHorizontal: 10,
        alignItems: 'center',
        paddingVertical: 10
    }

});

export default RegisterListComponent;