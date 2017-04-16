import React from'react';
import { Dimensions} from 'react-native';
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

class CourseComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        let courseData = nextProps.courseData;
        _.reverse(courseData);
    }

    render() {
        return (
            (<Container>
                <Header>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Left>
                            <Button
                                transparent
                                onPress={this.props.popRouter}
                                style={{paddingLeft: 0, paddingRight: 0}}
                            >
                                <Icon
                                    name="arrow-back"
                                    style={{color: '#fff'}}
                                />
                            </Button>
                        </Left>
                        <Body>
                        <Title>Môn học</Title>
                        </Body>
                        <Right style={{paddingRight: 6}}>
                            <Button
                                transparent
                                style={{paddingLeft: 0, paddingRight: 0}}
                            >
                                <Icon name='menu' style={{color: '#fff'}}/>
                            </Button>
                        </Right>
                    </View>
                </Header>

                {(this.props.isLoading) ?
                    (
                        <View style={styles.container}>
                            <Spinkit
                                isVisible
                                color='#C50000'
                                type='Wave'
                                size={width/8}
                            />
                        </View>
                    ) :
                    (
                        <Content>
                            <List
                                dataArray={this.props.courseData}
                                renderRow={
                                    (item) => (
                                        <ListItem
                                            onPress={() => this.props.onSelectedItem(item.id)}
                                            onLongPress={() => {
                                            }}
                                            button
                                        >
                                            <Thumbnail small source={{uri: item.icon_url}}/>
                                            <Body>
                                            <Text>{item.name}</Text>
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
    list: {},
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CourseComponent;