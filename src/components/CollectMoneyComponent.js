import React from'react';
import {Dimensions} from 'react-native';
import {
    Container,
    Button,
    View,
    List,
    Text,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import * as alert from '../constants/alert';
import Loading from './common/Loading';
import Search from './common/Search';
import ListItemStudentCollectMoney from "./listItem/ListItemStudentCollectMoney";

var {height, width} = Dimensions.get('window');
class RegisterListComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
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
                        <List
                            style={styles.list}
                            onEndReached={this.props.loadDataStudentList}
                            onEndReachedThreshold={height / 2}
                            dataArray={this.props.studentList}
                            renderRow={
                                (item, sectionID, rowID) => (
                                    <ListItemStudentCollectMoney
                                        name={item.name}
                                        avatar={item.avatar_url}
                                        email={item.email}
                                        phone={item.phone}
                                    />
                                )
                            }
                            renderFooter={() => {
                                if (this.props.isLoading) {
                                    return (
                                        <View style={styles.loading}>
                                            <Loading size={width / 12}/>
                                        </View>
                                    )
                                } else {
                                    <View/>
                                }
                            }}
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

});

export default RegisterListComponent;