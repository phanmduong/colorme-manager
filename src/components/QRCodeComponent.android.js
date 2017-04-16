import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
    Container,
    Header,
    Content,
    Button,
    Left,
    Right,
    Title,
    Body,
    Icon,
    View
} from 'native-base';

import BarcodeScanner from 'react-native-barcodescanner';

class QRCodeComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            torchMode: 'off',
            cameraType: 'back',
        };
    }

    render() {
        return (
            (<Container>
                <Header>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Left>
                            <Button
                                transparent
                                onPress={this.props.popRouter}
                                style={{paddingLeft: 0, paddingRight: 0}}
                            >
                                <Icon
                                    name="arrow-back"
                                    style={{color: '#fff'}}
                                />
                            </Button>
                        </Left>
                        <Body>
                        <Title>Điểm danh</Title>
                        </Body>
                        <Right style={{paddingRight: 6}}>
                            <Button
                                transparent
                                style={{paddingLeft: 0, paddingRight: 0}}
                            >
                                <Icon name='menu' style={{color: '#fff'}}/>
                            </Button>
                        </Right>
                    </View>
                </Header>
                    <BarcodeScanner
                        onBarCodeRead={(result) => this.props.onScannerQRCode(result.data)}
                        style={{flex: 1}}
                        torchMode={this.state.torchMode}
                        cameraType={this.state.cameraType}
                    />
            </Container>)
        );
    }
}

const styles = StyleSheet.create({});

export default QRCodeComponent;