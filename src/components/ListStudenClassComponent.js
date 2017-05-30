import React from'react';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import {
    Container,
    Button,
    View,
    List,
    Text,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper'
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import * as alert from '../constants/alert';
import ListItemStudent from './common/ListItemStudent';

var {height, width} = Dimensions.get('window');

class ListStudenClassComponent extends React.Component {
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
            if (this.props.error || this.props.listStudentClass.length <= 0) {
                return (
                    <Container>
                        <View style={styles.container}>
                            <Text
                                style={styles.textError}>{(this.props.error) ? alert.LOAD_DATA_ERROR : alert.NO_DATA_LIST_STUDENT_CLASS}</Text>
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
                    <Swiper
                        height={(Platform.OS === 'ios') ? height - 114 : height - 125}
                        style={styles.wrapper}
                        dotColor={theme.secondColor}
                        dotStyle={styles.dotStyle}
                        activeDotColor={theme.secondColor}
                        index={1}
                        paginationStyle={{
                            top: (Platform.OS === 'ios') ? -(height - 200) : -(height - 210)
                        }}
                    >

                        <View><Text>dsadsa</Text>
                            <Text>dsadsa</Text><
                                Text>dsadsa</Text>
                            <Text>dsadsa</Text>
                            <Text>dsadsa</Text>
                            <Text>dsadsa</Text></View>
                        <View>
                            <Text>Đã đóng tiền</Text>
                            <List
                                style={styles.list}
                                dataArray={this.props.listStudentClass}
                                renderRow={
                                    (item, sectionID, rowID) => (
                                        <ListItemStudent
                                            name={item.name}
                                            avatar={item.avatar_url}
                                            code={item.code}
                                            attendances={item.attendances}
                                        />
                                    )
                                }
                            >
                            </List>
                        </View>

                        <View><Text>dsadsa</Text></View>
                        <View><Text>dsadsa</Text></View>
                        <View><Text>dsadsa</Text></View>
                    </Swiper>
                )
            }
        }
    }
}

const styles = ({
    list: {
        marginTop: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textError: {
        color: '#d9534f'
    },
    wrapper: {},
    dotStyle: {
        opacity: 0.4,
        width: 5,
        height: 5
    },
});

export default ListStudenClassComponent;