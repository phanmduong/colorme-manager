import React from'react';
import {StyleSheet, Dimensions, RefreshControl, ScrollView} from 'react-native';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as alert from '../constants/alert';

class DashboardComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadDataDashboard = this.loadDataDashboard.bind(this);
    }

    loadDataDashboard() {
        this.props.loadDataDashboard(this.props.selectedBaseId, this.props.selectedGenId);
    }

    errorData() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.textError}>{(this.props.errorDashboard) ? alert.LOAD_DATA_ERROR : alert.NO_DATA_SHIFT_REGISTER}</Text>
                <Button iconLeft danger small onPress={this.loadDataDashboard}
                        style={{marginTop: 10, alignSelf: null}}>
                    <MaterialCommunityIcons name='reload' color='white' size={20}/>
                    <Text>Thử lại</Text>
                </Button>
            </View>
        )
    }

    showDashboard() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.isLoadingDashboard}
                        onRefresh={this.loadDataDashboard}
                        titleColor={theme.mainColor}
                        title="Đang tải..."
                        tintColor='#d9534f'
                        colors={['#d9534f']}
                    />
                }>
                <Text>
                    Data
                </Text>
            </ScrollView>
        )
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
                    {(!this.props.isLoadingDashboard && (this.props.errorDashboard)) ?
                        this.errorData() :
                        this.showDashboard()
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
        color: '#d9534f'
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
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1,
        padding: 1,
        marginBottom: 4,
        shadowColor: '#b4b4b4',
        shadowOffset: {
            width: 0,
            height: 0
        },
        elevation: 0.5,
        shadowOpacity: 0.5
    }
});

export default DashboardComponent;