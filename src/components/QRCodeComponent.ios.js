import React from'react';
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
import Camera from 'react-native-camera';

class QRCodeComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Container>
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
                    <Camera
                        onBarCodeRead={(result) => this.props.onScannerQRCode(result.data)}
                        barCodeTypes={['org.iso.QRCode']}
                        orientation="portrait"
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}>
                    </Camera>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

export default QRCodeComponent;