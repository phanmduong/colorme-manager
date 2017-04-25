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
import theme from '../styles';

class QRCodeComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Container>
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