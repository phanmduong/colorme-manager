/**
 * Created by phanmduong on 4/6/17.
 */
import React from'react';
import {StyleSheet, TouchableNativeFeedback, View, Text} from 'react-native'

const ListItem = ({rowData, onPress, rowID}) => {

    return (
        <TouchableNativeFeedback
            onPress = {() => onPress(rowData.id, rowID)}
            background={TouchableNativeFeedback.SelectableBackground()}
        >
            <View style={styles.item}>
                <Text>{rowData.name}</Text>
            </View>
        </TouchableNativeFeedback>
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