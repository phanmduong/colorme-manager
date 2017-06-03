import React from'react';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import {
    Container,
    Button,
    View,
    List,
    Text,
    Item,
    Icon,
    Input
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import * as alert from '../constants/alert';
import ListItemRegisterStudent from './common/ListItemRegisterStudent';
import Loading from './common/Loading';
import _ from 'lodash';

var {height, width} = Dimensions.get('window');
class RegisterListComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (this.props.isLoading && this.props.registerList.length <= 0) {
            return (
                <Loading size={width / 8}/>
            )
        } else {
            if ((this.props.error || this.props.registerList.length <= 0) && !this.props.isSearchLoading) {
                return (
                    <Container>
                        <View style={styles.container}>
                            <Text
                                style={styles.textError}>{(this.props.error) ? alert.LOAD_DATA_ERROR : alert.NO_DATA_REGISTER_LIST_CLASS}</Text>
                            <Button iconLeft danger small onPress={this.props.loadDataRegisterList}
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
                        <View style={styles.search}>
                            <Item>
                                <Icon name="ios-search"/>
                                <Input
                                    placeholder="Tìm kiếm (Email, tên, số điện thoại)"
                                    onChangeText={(data) => this.props.updateSearchFrom(data)}
                                    returnKeyType='search'
                                    onSubmitEditing={this.props.loadDataSearchRegisterList}
                                />
                                <Icon name="ios-close" ios="ios-close" android="md-close"/>
                            </Item>
                        </View>
                        {(this.props.isSearchLoading) ?
                            (
                                <Loading size={width / 8}/>
                            )
                            :
                            (
                                <List
                                    style={styles.list}
                                    onEndReached={this.props.loadDataRegisterList}
                                    onEndReachedThreshold={height / 2}
                                    dataArray={this.props.registerList}
                                    renderRow={
                                        (item, sectionID, rowID) => (
                                            <ListItemRegisterStudent
                                                nameClass={item.class.name}
                                                name={item.name}
                                                avatar={item.course_avatar_url}
                                                email={item.email}
                                                phone={item.phone}
                                                saler={item.saler}
                                                campaign={item.campaign}
                                                callStatus={item.call_status}
                                                paidStatus={item.paid_status}
                                                money={item.money}
                                            />
                                        )
                                    }
                                    renderFooter={() => {
                                        if (this.props.isLoading || this.props.isSearchLoading) {
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
                            )
                        }

                    </View>
                )
            }
        }
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
    search: {
        paddingHorizontal: 10
    }
});

export default RegisterListComponent;