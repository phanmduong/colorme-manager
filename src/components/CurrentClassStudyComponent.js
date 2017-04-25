import React from'react';
import {StyleSheet, Dimensions} from 'react-native';
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
    View,
    ListItem,
    List,
    Text,
    Thumbnail
} from 'native-base';
var {height, width} = Dimensions.get('window');
import Spinkit from 'react-native-spinkit';
import _ from 'lodash';
import theme from '../styles';

class ClassComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            (<Container>
                {(this.props.isLoading) ?
                    (
                        <View style={styles.container}>
                            <Spinkit
                                isVisible
                                color={theme.mainColor}
                                type='Wave'
                                size={width/8}
                            />
                        </View>
                    ) :
                    (
                        <Content>
                            <List
                                dataArray={this.props.classData}
                                renderRow={
                                    (item, sectionID, rowID) => (
                                        <ListItem
                                            onPress={() => this.props.onSelectedItem(item.id, item.lesson[0].order, rowID)}
                                            onLongPress={() => {}}
                                            button
                                        >
                                            <Thumbnail small source={{uri: item.avatar_url}}/>
                                            <Body>
                                            <Text>{item.name}</Text>
                                            <Text note>{item.study_time}</Text>

                                            </Body>
                                            <Right>
                                                <Icon name="arrow-forward"/>
                                            </Right>
                                        </ListItem>
                                    )
                                }
                            >
                            </List>
                        </Content>
                    )}
            </Container>)
        );
    }
}

const styles = ({
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 37
    },
    list: {
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ClassComponent;