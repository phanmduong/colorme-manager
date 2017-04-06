import React from'react';
import {StyleSheet, Text, ListView, ActivityIndicator} from 'react-native';
import ListItem from '../components/common/ListItem';
import _ from 'lodash';

class CourseComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderRow = this.renderRow.bind(this);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([])
        };
    }

    componentWillReceiveProps(nextProps) {
        let courseData = nextProps.courseData;
        _.reverse(courseData);
        console.log(courseData);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(courseData)
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
                        renderRow = {this.renderRow}
                    />

                )
        );
    }

    renderRow(rowData){
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

export default CourseComponent;