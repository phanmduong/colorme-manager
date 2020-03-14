import React from 'react';
import {View, Dimensions, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
var {height, width} = Dimensions.get('window');
import WebView from 'react-native-autoheight-webview';
import {getBottomSpace} from 'react-native-iphone-x-helper';
const RESET_URL = 'https://colorme.vn/password/reset';

export default class ResetPasswordModal extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderLoading = () => {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size={'small'} />
      </View>
    );
  };

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onSwipeComplete={this.props.onSwipeComplete}
        onBackdropPress={this.props.onSwipeComplete}
        onBackButtonPress={this.props.onSwipeComplete}
        style={styles.bottomModal}
        swipeDirection="down"
        avoidKeyboard={false}>
        <View style={styles.slideBarView}>
          <View style={{height: 70}} />
          <View style={styles.slideBar} />
        </View>
        <View style={styles.resetView}>
          <WebView
            source={{uri: RESET_URL}}
            style={styles.resetWebView}
            scrollEnabled={false}
            startInLoadingState={true}
            renderLoading={this.renderLoading}
          />
        </View>
      </Modal>
    );
  }
}

const styles = {
  slideBarView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideBar: {
    height: 7,
    width: 107,
    marginBottom: 6,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  resetView: {
    backgroundColor: 'white',
    height: height * 0.8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  resetWebView: {
    marginTop: 20,
    marginBottom: getBottomSpace(),
  },
  loadingView: {
    flex: 1,
    marginBottom: 70,
  },
};
