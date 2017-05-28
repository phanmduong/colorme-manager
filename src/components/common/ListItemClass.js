import React from'react';
import {Dimensions, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {
    View,
    Text,
    Thumbnail
} from 'native-base';
import theme from '../../styles';
import Icon from "./Icon";

class ListItemClass extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            onPressed: false
        };
    }

    onChangePress() {
        this.setState({
            onPressed: !this.state.onPressed
        });
    }

    content() {
        var {nameClass, studyTime, avatar} = this.props;
        return (
            <View style={styles.container}>
                <Thumbnail small source={{uri: avatar}}/>
                <View style={styles.content}>
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>{nameClass.toUpperCase()}</Text>
                        {(this.state.onPressed) ?
                            (
                                <Icon style={{marginRight: 5}} name='ion|ios-arrow-up' android="ion|md-arrow-dropup"
                                      size={20}/>
                            )
                            :
                            (
                                <Icon style={{marginRight: 5}} name='ion|ios-arrow-down' android="ion|md-arrow-dropdown"
                                      size={20}/>
                            )
                        }

                    </View>
                    <Text style={styles.subTitle}>{studyTime}</Text>
                </View>
            </View>
        )
    }

    renderExpand() {
        if (this.state.onPressed) {
            return (
                <View style={styles.containerExpand}>
                    <Text>Text</Text>
                </View>
            );
        }
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.onChangePress()}>
                        {this.content()}
                    </TouchableOpacity>
                    {this.renderExpand()}
                </View>
            );
        } else {
            return (
                <View>
                    <TouchableNativeFeedback onPress={() => this.onChangePress()}>
                        {this.content()}
                    </TouchableNativeFeedback>
                    {this.renderExpand()}
                </View>
            );
        }

    }
}

const styles = ({
    containerExpand: {
        paddingHorizontal: 20
    },
    container: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingHorizontal: 20
    },
    content: {
        flex: 1,
        marginLeft: 20,
        borderBottomColor: theme.borderColor,
        paddingBottom: 20,
        borderBottomWidth: 1
    },
    containerTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: '#555555',
        fontWeight: '900',
        fontSize: (Platform.isPad) ? 18 : 13
    },
    subTitle: {
        color: '#7d7d7d',
        fontSize: 12
    },
    numberTitle: {
        color: theme.secondColor,
        fontWeight: 'bold',
        fontSize: (Platform.isPad) ? 18 : 13
    }
});

export default ListItemClass;