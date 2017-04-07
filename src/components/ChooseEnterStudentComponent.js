import React from'react';
import {StyleSheet, ListView} from 'react-native';
import ListItem from './common/ListItem';
import _ from 'lodash';

class ChooseEnterStudentComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderRow = this.renderRow.bind(this);
    }

    componentWillMount(){
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(this.props.dataList)
        });
    }

    render() {
        return (
            <ListView
                style = {styles.list}
                enableEmptySections
                dataSource = {this.state.dataSource}
                renderRow = {this.renderRow}
            />
        );
    }

    renderRow(rowData){
        return (
            <ListItem
                rowData = {rowData}
                onPress = {this.props.onSelectEnterStudent}
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

export default ChooseEnterStudentComponent;