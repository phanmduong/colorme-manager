import React from'react';
import {StyleSheet, ListView, ActivityIndicator} from 'react-native';
import {Container, Header, Content, Footer, Button, Left, Right, Title, Body, Icon, View} from 'native-base';
import ListItem from './common/ListItem';
import _ from 'lodash';

class BaseComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderListRow = this.renderListRow.bind(this);
    }

    componentWillMount() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows([])
        });
    }

    componentWillReceiveProps(nextProps) {
        let baseData = nextProps.baseData;
        _.reverse(baseData);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(baseData)
        });
    }

    render() {
        return (
            (<Container>
                <Header>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Left/>
                        <Body>
                        <Title>Header</Title>
                        </Body>
                        <Right style={{paddingRight: 6}}>
                            <Button
                                transparent
                                style={{paddingLeft: 0, paddingRight: 0}}
                            >
                                <Icon name='menu' style={{color: '#fff'}} />
                            </Button>
                        </Right>
                    </View>
                </Header>
                <Content>
                    {(this.props.isLoading) ?
                        (
                            <ActivityIndicator
                                animating = {this.props.isLoading}
                                style = {styles.indicator}
                                size = "large"
                            />
                        ) :
                        (
                            <ListView
                                style = {styles.list}
                                enableEmptySections
                                dataSource = {this.state.dataSource}
                                renderRow = {this.renderListRow}
                            />
                        )}
                </Content>
            </Container>)
        );
    }

    renderListRow(rowData) {
        return (
            <ListItem
                rowData={rowData}
                onPress={this.props.onSelectedItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 37
    },
    list: {}
});

export default BaseComponent;