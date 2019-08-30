import React from 'react';
import {Dimensions, Platform, RefreshControl} from 'react-native';
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
import ListItemStudent from './listItem/ListItemStudent';
import _ from 'lodash';

var {height, width} = Dimensions.get('window');
const heightSwiper = (Platform.OS === 'ios') ? height - 165 : height - 125;

class ListStudentAttendanceComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        if (this.props.isLoading && this.props.listStudentClass.length <= 0) {
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
            if (this.props.error || this.props.listStudentClass.length <= 0) {
                return (
                    <Container>
                        <View style={styles.container}>
                            <Text
                                style={styles.textError}>{(this.props.error) ? alert.LOAD_DATA_ERROR : alert.NO_DATA_LIST_STUDENT_CLASS}</Text>
                            <Button iconLeft danger small onPress={this.props.onLoad}
                                    style={{marginTop: 10, alignSelf: null}}>
                                <MaterialCommunityIcons name='reload' color='white' size={20}/>
                                <Text>Thử lại</Text>
                            </Button>
                        </View>
                    </Container>
                )
            } else {
                return (
                    <Swiper
                        height={heightSwiper}
                        style={styles.wrapper}
                        dotColor={theme.secondColor}
                        dotStyle={styles.dotStyle}
                        activeDotColor={theme.secondColor}
                        index={0}
                        paginationStyle={{
                            top: (Platform.OS === 'ios') ? -(height - 220) : -(height - 230)
                        }}
                    >
                        <View style={styles.slide}>
                            <Text style={styles.titleList}>ĐÃ ĐIỂM DANH</Text>
                            <List
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.props.isLoading}
                                        onRefresh={this.props.onLoad}
                                        titleColor={theme.mainColor}
                                        title="Đang tải..."
                                        tintColor='#d9534f'
                                        colors={['#d9534f']}
                                    />
                                }
                                style={styles.list}
                                dataArray={_.filter(this.props.listStudentClass, {'attendance_lesson_status': 1})}
                                renderRow={
                                    (item, sectionID, rowID) => (
                                        <ListItemStudent
                                            name={item.name}
                                            avatar={item.avatar_url}
                                            code={item.code}
                                            attendances={item.attendances}
                                            phone={item.phone}
                                            email={item.email}
                                            money={item.money}
                                            receivedIdCard={item.received_id_card}
                                            status={item.status}
                                        />
                                    )
                                }
                            >
                            </List>
                        </View>
                        <View style={styles.slide}>
                            <Text style={styles.titleList}>CHƯA ĐIỂM DANH</Text>
                            <List
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.props.isLoading}
                                        onRefresh={this.props.onLoad}
                                        titleColor={theme.mainColor}
                                        title="Đang tải..."
                                        tintColor='#d9534f'
                                        colors={['#d9534f']}
                                    />
                                }
                                style={styles.list}
                                dataArray={_.filter(this.props.listStudentClass, {'attendance_lesson_status': 0})}
                                renderRow={
                                    (item, sectionID, rowID) => (
                                        <ListItemStudent
                                            name={item.name}
                                            avatar={item.avatar_url}
                                            code={item.code}
                                            attendances={item.attendances}
                                            phone={item.phone}
                                            email={item.email}
                                            money={item.money}
                                            receivedIdCard={item.received_id_card}
                                            status={item.status}
                                        />
                                    )
                                }
                            >
                            </List>
                        </View>
                    </Swiper>
                )
            }
        }
    }
}

const styles = ({
    list: {
        marginTop: 30
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

export default ListStudentAttendanceComponent;
