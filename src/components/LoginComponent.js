/**
 * Created by phanmduong on 4/5/17.
 */
import React from'react';
import {Dimensions, Keyboard, Text, View, Platform}from'react-native';
import {
    Container,
    Form,
    InputGroup,
    Icon,
    Input,
    Button
} from 'native-base';
var {height, width} = Dimensions.get('window');
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import LinearGradient from 'react-native-linear-gradient';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onPressLogin = this.onPressLogin.bind(this);
    }

    onPressLogin() {
        this.props.onClickLogin();
        Keyboard.dismiss();
    }

    render() {
        return (
            <View style={{flex: 2, position: 'relative', backgroundColor: '#fff',}}>
                <LinearGradient colors={['#ff0064', '#c51600']} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={{color: 'white', fontSize: 35, fontWeight: (Platform.OS === 'ios') ? '900' : 'normal',
                            fontFamily: (Platform.OS === 'ios') ? 'Segoe UI' : 'SegoeUI-Blank',
                            backgroundColor: 'transparent',
                        }}>
                            color
                        </Text>
                        <Text style={{color: 'white', fontSize: 100, fontWeight: (Platform.OS === 'ios') ? '900' : 'normal',
                            fontFamily: (Platform.OS === 'ios') ? 'Segoe UI' : 'SegoeUI-Blank',
                            backgroundColor: 'transparent',
                            lineHeight: (Platform.OS === 'ios') ? 100 : 70
                        }}>
                            ME
                        </Text>
                    </View>
                </LinearGradient>
                <View style={{flex: 1, backgroundColor: '#fff',}}/>
                <View style={{position: 'absolute', top: height/2 - 25, height: 2* height /5 , width: width, paddingBottom: 25 }}>
                    <View style={{flex: 1
                    ,position: 'relative',}}>

                    <View style={{backgroundColor: '#fff', flex: 1, marginHorizontal: width / 10,
                        borderRadius: 10,
                        elevation: 10,
                        shadowColor: '#666666',
                        shadowOffset: {
                            width: 0,
                            height: 3
                        },
                        shadowRadius: 10,
                        shadowOpacity: 0.4,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Form>
                            <Text style={{
                                color: '#ff0038',
                                fontWeight: (Platform.OS === 'ios') ? 'bold' : 'normal',
                                fontFamily: (Platform.OS === 'ios') ? 'Segoe UI' : 'SegoeUI-Bold',
                            }}>EMAIL</Text>
                            <InputGroup style={{width: width-width*0.3}}>
                                <Input
                                    value={this.props.username }
                                    onChangeText={(data) => this.props.updateFormData('username', data)}
                                    returnKeyType={'next'}
                                    placeholder='Email'
                                    blurOnSubmit={false}
                                    keyboardType={'email-address'}
                                    onSubmitEditing={() => {
                                        this.refs.password._root.focus()
                                    }}
                                />
                            </InputGroup>
                            <Text style={{paddingTop: 15,
                                color: '#ff0038',
                                fontWeight: (Platform.OS === 'ios') ? 'bold' : 'normal',
                                fontFamily: (Platform.OS === 'ios') ? 'Segoe UI' : 'SegoeUI-Bold',
                            }}>PASSWORD</Text>
                            <InputGroup>
                                <Input
                                    ref='password'
                                    secureTextEntry
                                    onChangeText={(data) => this.props.updateFormData('password', data)}
                                    value={this.props.password}
                                    returnKeyType={'done'}
                                    placeholder='Password'
                                    onSubmitEditing={this.props.onClickLogin}
                                />
                            </InputGroup>
                        </Form>

                    </View>
                        <Button
                            block
                            rounded
                            style={styles.button}
                            onPress={this.onPressLogin}
                        >
                            <Text style={{color: '#FFF', fontSize: 15, fontWeight: 'bold'}}>ĐĂNG NHẬP</Text>
                        </Button>
                    </View>
                </View>
                <View style={{position: 'absolute', bottom: 0, width: width, justifyContent: 'center', alignItems: 'center', height: height / 10}}>
                    <Text style={{color: '#797979', fontWeight: 'bold'}}>QUÊN MẬT KHẨU?</Text>
                </View>
            </View>
        );
    }

}

const styles = {
    container_image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 100,
        width: 100,
    },
    container_form: {
        flex: 3,
        marginHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#ff0038',
        position: 'absolute',
        height: 45,
        bottom: -23,
        elevation: 11,
        shadowColor: '#666666',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.5,
        marginHorizontal: width / 5,
        width: width - 2* width/5
    }
};

export default (LoginComponent);