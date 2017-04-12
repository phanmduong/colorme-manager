/**
 * Created by phanmduong on 4/6/17.
 */
import React from'react';
import {StyleSheet, TouchableHighlight, Text} from 'react-native'

const ListItem = ({rowData, onPress, rowID}) => {
    return (
        <TouchableHighlight
            underlayColor = "#aca5ad"
            onPress = {() => onPress(rowData.id, rowID)}
            style={styles.item}
        >
            <Text>Buổi {rowData.order}</Text>
        </TouchableHighlight>
    );

};

const styles = StyleSheet.create({
    item:{
        flex: 1,
        justifyContent: 'center',
        height: 40,
        borderBottomColor: '#d3ccd4',
        borderBottomWidth: 1,
        borderRadius: 5,
        minWidth: 200,
        paddingLeft: 20,
        marginHorizontal: 10
    }
});

export default ListItem;