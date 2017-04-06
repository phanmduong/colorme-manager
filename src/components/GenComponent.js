import React from'react';
import {StyleSheet, Text, ListView, ActivityIndicator} from 'react-native';
import ListItem from './common/ListItem';
import _ from 'lodash';

class GenComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderListRow = this.renderListRow.bind(this);
    }

    componentWillMount(){
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows([])
        });
    }

    componentWillReceiveProps(nextProps) {
        let genData = nextProps.genData;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(genData)
        });
    }

    render() {
        return (
            (this.props.isLoading) ?
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

                )
        );
    }

    renderListRow(rowData) {
        rowData['name'] = 'Khóa ' + rowData['name'];
        return (
            <ListItem
                rowData = {rowData}
                onPress = {this.props.onSelectedItem}
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
    list: {
    }
});

export default GenComponent;