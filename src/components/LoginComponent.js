/**
 * Created by phanmduong on 4/5/17.
 */
import React from'react';
import {Image, Dimensions, Keyboard}from'react-native';
import {
    Container,
    Form,
    InputGroup,
    Icon,
    Input,
    View,
    Button,
    Text
} from 'native-base';
var {height, width} = Dimensions.get('window');
import Spinkit from 'react-native-spinkit';

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
            <Container>
                <View style={styles.container_image}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/img/colorme.jpg')}
                    />
                </View>
                <View style={styles.container_form}>
                    {(this.props.isLoading) ?
                        (
                            <Spinkit
                                isVisible
                                color='#C50000'
                                type='CircleFlip'
                                size={width/6}
                            />
                        )
                        :
                        (
                            <Form>
                                <InputGroup style={{width: width-50}}>
                                    <Icon
                                        name='ios-person'
                                        style={{color: '#3e3d44'}}
                                    />
                                    <Input
                                        value={this.props.username }
                                        onChangeText={(data) => this.props.updateFormData('username', data)}
                                        returnKeyType={'next'}
                                        placeholder='Tên đăng nhập'
                                        blurOnSubmit={false}
                                        keyboardType={'email-address'}
                                        onSubmitEditing={() => {
                                            this.refs.password._root.focus()
                                        }}
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Icon
                                        name='md-key'
                                        style={{color: '#3e3d44'}}
                                    />
                                    <Input
                                        ref='password'
                                        secureTextEntry
                                        onChangeText={(data) => this.props.updateFormData('password', data)}
                                        value={this.props.password}
                                        returnKeyType={'done'}
                                        placeholder='Mật khẩu'
                                        onSubmitEditing={this.props.onClickLogin}
                                    />
                                </InputGroup>
                                <Button
                                    block
                                    rounded
                                    style={styles.button}
                                    onPress={this.onPressLogin}
                                >
                                    <Text>Đăng nhập</Text>
                                </Button>
                            </Form>
                        )
                    }
                </View>
            </Container>
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
        backgroundColor: '#C50000',
        marginTop: 16
    }
};

export default (LoginComponent);