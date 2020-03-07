import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import WebView from 'react-native-webview';
import Orientation from 'react-native-orientation';
import {getStatusBarHeight, ifIphoneX} from 'react-native-iphone-x-helper';

class DocumentWebViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      landscape: false,
      loading: true,
    };
  }

  componentDidMount = () => {
    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(this._orientationDidChange);
  };

  componentWillUnmount = () => {
    Orientation.lockToPortrait();
    Orientation.removeOrientationListener(this._orientationDidChange);
  };

  _orientationDidChange = orientation => {
    if (orientation === 'LANDSCAPE') {
      this.setState({landscape: true});
    } else {
      this.setState({landscape: false});
    }
  };

  processHTML = () => {
    const {navigation} = this.props;
    let url = navigation.getParam('url');
    return url;
  };

  render() {
    return (
      <SafeAreaView style={styles.fullView}>
        <View style={{flex: 1}}>
          <WebView
            source={{uri: this.processHTML()}}
            onLoadEnd={() => this.setState({loading: false})}
            scrollEnabled={false}
          />
        </View>
        {!this.state.landscape ? (
          <TouchableOpacity
            style={{
              position: 'absolute',
              ...ifIphoneX({top: 40}, {top: getStatusBarHeight()}),
            }}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../../assets/img/icons8-collapse_arrow.png')}
              style={{
                width: 35,
                height: 35,
              }}
            />
          </TouchableOpacity>
        ) : null}
      </SafeAreaView>
    );
  }
}

const styles = {
  fullView: {
    flex: 1,
    backgroundColor: 'black',
  },
  closeView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C0C0C0',
    borderRadius: 40,
    width: 30,
    height: 30,
    position: 'absolute',
    top: 44,
    right: 29,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  loadingView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionView: {
    marginTop: 30,
  },
  instructionText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
  },
};

export default DocumentWebViewComponent;
