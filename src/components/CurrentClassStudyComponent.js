import React from'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
    Container,
    Content,
    Button,
    Right,
    Body,
    Icon,
    View,
    ListItem,
    List,
    Text,
    Thumbnail,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
var {height, width} = Dimensions.get('window');
import Spinkit from 'react-native-spinkit';
import _ from 'lodash';
import theme from '../styles';
import * as alert from '../constants/alert';

class ClassComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        if (this.props.isLoading) {
            return (
                <Container>
                    <View style={styles.container}>
                        <Spinkit
                            isVisible
                            color={theme.mainColor}
                            type='Wave'
                            size={width / 8}
                        />
                    </View>
                </Container>
            )
        } else {
            if (this.props.error || this.props.classData.length <= 0) {
                return (
                    <Container>
                        <View style={styles.container}>
                            <Text
                                style={styles.textError}>{(this.props.error) ? alert.LOAD_DATA_ERROR : alert.NO_CURRENT_CLASS_STUDY}</Text>
                            <Button iconLeft danger small onPress={this.props.onReload}
                                    style={{marginTop: 10, alignSelf: null}}>
                                <MaterialCommunityIcons name='reload' color='white' size={20}/>
                                <Text>Thử lại</Text>
                            </Button>
                        </View>
                    </Container>
                )
            } else {
                return (
                    <Content>
                        <List
                            dataArray={this.props.classData}
                            renderRow={
                                (item, sectionID, rowID) => (
                                    <ListItem
                                        onPress={() => this.props.onSelectedItem(item.id, item.lesson[0].order, rowID)}
                                        onLongPress={() => {
                                        }}
                                        button
                                    >
                                        <Thumbnail small source={{uri: item.avatar_url}}/>
                                        <Body>
                                        <Text>{item.name}</Text>
                                        <Text note>{item.study_time}</Text>
                                        </Body>
                                        <Right>
                                            <Icon android="md-arrow-forward" ios="ios-arrow-forward"/>
                                        </Right>
                                    </ListItem>
                                )
                            }
                        >
                        </List>
                    </Content>
                )
            }
        }
    }
}

const styles = ({
    list: {},
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textError: {
        color: '#d9534f',
        textAlign: 'center'
    }
});

export default ClassComponent;