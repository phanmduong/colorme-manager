import React from'react';
import {Platform, Dimensions} from 'react-native';
import {
    Container,
    Button,
    View,
    Text,
    Picker,
    Item
} from 'native-base';
var {height, width} = Dimensions.get('window');
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ShiftRegisterWeek from './shiftRegister/ShiftRegisterWeek';
import * as alert from '../constants/alert';

const heightSwiper = (Platform.OS === 'ios') ? height - 165 : height - 180;
let self;
class ShiftRegisterComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadDataShiftRegister = this.loadDataShiftRegister.bind(this);
        self = this;
    }

    componentWillMount() {
        this.state = ({
            sizeShiftRegister: 0
        })
    }

    loadDataShiftRegister() {
        this.props.loadDataShiftRegister(this.props.selectedBaseId, this.props.selectedGenId);
    }


    errorData() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.textError}>{(this.props.errorShiftRegister) ? alert.LOAD_DATA_ERROR : alert.NO_DATA_SHIFT_REGISTER}</Text>
                <Button iconLeft danger small onPress={this.loadDataShiftRegister}
                        style={{marginTop: 10, alignSelf: null}}>
                    <MaterialCommunityIcons name='reload' color='white' size={20}/>
                    <Text>Thử lại</Text>
                </Button>
            </View>
        )
    }

    renderShiftRegister() {
        return (
            this.props.shiftRegisterData.weeks.map((week, index) => {
                return (
                    <ShiftRegisterWeek
                        loadDataShiftRegister={self.loadDataShiftRegister}
                        isLoadingShiftRegister={self.props.isLoadingShiftRegister}
                        key={index}
                        weekData={week}
                        user={self.props.user}
                        onRegister={self.props.onRegister}
                        onUnRegister={self.props.onUnRegister}
                    />);
            })
        )
    }

    showShiftRegister() {
        if (this.props.shiftRegisterData.weeks) {
            if (Platform.OS === 'ios') {
                return (
                    <Swiper
                        height={heightSwiper}
                        loop={false}
                        showsPagination={false}
                    >
                        {this.renderShiftRegister()}
                    </Swiper>

                )
            }

            if (this.state.sizeShiftRegister !== this.props.shiftRegisterData.weeks.length) {
                this.setState({
                    sizeShiftRegister: this.props.shiftRegisterData.weeks.length
                })
                return <View/>
            }

            return (
                <Swiper
                    height={height - 180}
                    loop={false}
                    showsPagination={false}
                >
                    {this.renderShiftRegister()}
                </Swiper>
            )
        }
        return (<View/>);
    }


    render() {
        if (this.props.isLoading || (this.props.isLoadingShiftRegister && !this.props.shiftRegisterData.weeks)) {
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
            return (
                <Container>
                    <View style={styles.containerPicker}>
                        <Picker
                            style={{width: width / 2, padding: 0, margin: 0}}
                            iosHeader="Chọn khóa học"
                            mode="dialog"
                            defaultLabel={"Chọn khóa"}
                            selectedValue={this.props.selectedGenId}
                            onValueChange={this.props.onSelectGenId}>
                            {this.props.genData.map(function (gen, index) {
                                return (<Item label={"Khóa " + gen.name} value={gen.id} key={index}/>)
                            })}
                        </Picker>
                        <Picker
                            style={{width: width / 2, padding: 0, margin: 0}}
                            iosHeader="Chọn cơ sở"
                            mode="dialog"
                            defaultLabel={"Chọn cơ sở"}
                            selectedValue={this.props.selectedBaseId}
                            onValueChange={this.props.onSelectBaseId}>
                            {this.props.baseData.map(function (base, index) {
                                return (<Item label={base.name} value={base.id} key={index}/>)
                            })}
                        </Picker>
                    </View>
                    {(!this.props.isLoadingShiftRegister && (this.props.errorShiftRegister ||
                    (this.props.shiftRegisterData.weeks && this.props.shiftRegisterData.weeks.length <= 0))) ?
                        this.errorData() :
                        this.showShiftRegister()
                    }
                </Container>
            );
        }

    }
}

const styles = ({
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
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    containerPicker: {
        flexDirection: 'row',
        borderBottomColor: theme.borderColor,
        borderBottomWidth: 1,
        shadowColor: '#b4b4b4',
        shadowOffset: {
            width: 0,
            height: 0
        },
        elevation: 0.5,
        shadowOpacity: 0.5
    },
    containerList: {
        borderTopColor: theme.borderColor,
        borderTopWidth: 1
    }
});

export default ShiftRegisterComponent;