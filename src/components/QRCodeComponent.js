import React from 'react';
import {StyleSheet} from 'react-native';
import {Container} from 'native-base';
import {RNCamera} from 'react-native-camera';

class QRCodeComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Container>
        <RNCamera
          onBarCodeRead={result => this.props.onScannerQRCode(result.data)}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          orientation="portrait"
          style={styles.preview}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
        />
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
    alignItems: 'center',
  },
});

export default QRCodeComponent;
