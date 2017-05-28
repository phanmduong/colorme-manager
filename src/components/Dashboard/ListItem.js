import React from'react';
import {Dimensions, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import Icon from '../common/Icon';
import theme from '../../styles';

class ListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    content() {
        var {title, subTitle, number, nameIcon} = this.props;
        return (
            <View style={styles.container}>
                <Icon
                    name={nameIcon}
                    size={23}
                    color='#7d7d7d'
                />
                <View style={styles.content}>
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>{title.toUpperCase()}</Text>
                        <Text style={styles.numberTitle}>{number}</Text>
                    </View>
                    <Text style={styles.subTitle}>{subTitle}</Text>
                </View>
            </View>
        )
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <TouchableOpacity onPress={this.props.onPress}>
                    {this.content()}
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableNativeFeedback onPress={this.props.onPress}>
                    {this.content()}
                </TouchableNativeFeedback>
            );
        }

    }
}

const styles = ({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        paddingTop: 20
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

export default ListItem;