/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import PropTypes from "prop-types"
import Modal from 'react-native-modal';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'

var {width} = Dimensions.get('window');

class ModalCustom extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {height} = this.props;
        if (!height) {
            height = Dimensions.get('window').height / 2;
        }
        if (height >= Dimensions.get('window').height - getStatusBarHeight() - 30) {
            height = Dimensions.get('window').height - getStatusBarHeight() - 30;
        }

        return (
            <Modal {...this.props} style={style.modal}
                   swipeDirection="down"
            >
                <View style={style.line}/>
                <View style={{...style.content, height}}>
                    <Text style={style.title}>{this.props.title}</Text>
                    {this.props.children}
                </View>
            </Modal>
        );
    }
}

const style = {
    modal: {
        justifyContent: 'flex-end',
        alignItems: "center",
        margin: 0,

    },
    line: {
        width: width / 3,
        height: 8,
        borderRadius: 4,
        backgroundColor: "white",
        marginBottom: 8
    },
    content: {
        backgroundColor: "white",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        width: width,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10
    }
}

ModalCustom.propTypes = {
    height: PropTypes.number,
    title: PropTypes.string.isRequired,
}

export default (ModalCustom);