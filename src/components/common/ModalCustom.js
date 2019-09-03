/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

var {width} = Dimensions.get('window');

class ModalCustom extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Modal {...this.props} style={style.modal}>
        <View style={style.content}>{this.props.children}</View>
        <TouchableWithoutFeedback onPress={() => this.props.closeModal()}>
          <View style={style.closeView}>
            <Image
              source={require('../../../assets/img/closeIcon.png')}
              style={style.closeIcon}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const style = {
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
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
};

ModalCustom.propTypes = {
  height: PropTypes.number,
  title: PropTypes.string.isRequired,
};

export default ModalCustom;
