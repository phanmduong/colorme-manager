import React from'react';
import {Dimensions, Platform} from 'react-native';
import {
    Container,
    Button,
    View,
    List,
    Text,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import * as alert from '../constants/alert';
import ListItemStudentPaid from './listItem/ListItemStudentPaid';
import _ from 'lodash';

var {height, width} = Dimensions.get('window');
const heightSwiper = (Platform.OS === 'ios') ? height - 114 : height - 125;
class ListStudenPaidComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        if (this.props.isLoading) {
            return (
                <Container>
                    <View style={styles.container}>
                        <Spinkit
                            isVisible
                            color={theme.mainColor}
                            type='Wave'
                            size={width / 8}
                        />
                    </View>
                </Container>
            )
        } else {
            if (this.props.error || this.props.listStudentPaid.length <= 0) {
                return (
                    <Container>
                        <View style={styles.container}>
                            <Text
                                style={styles.textError}>{(this.props.error) ? alert.LOAD_DATA_ERROR : alert.NO_DATA_LIST_STUDENT_PAID}</Text>
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
                    <List

                        style={styles.list}
                        dataArray={this.props.listStudentPaid}
                        renderRow={
                            (item, sectionID, rowID) => (
                                <ListItemStudentPaid
                                    name={item.name}
                                    avatar={item.avatar_url}
                                    code={item.code}
                                    phone={item.phone}
                                    email={item.email}
                                    money={item.money}
                                    receivedIdCard={item.received_id_card}
                                />
                            )
                        }
                    >
                    </List>
                        
                )
            }
        }
    }
}

const styles = ({
    list: {
    },
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
    slide: {
        height: heightSwiper
    }
});

export default ListStudenPaidComponent;