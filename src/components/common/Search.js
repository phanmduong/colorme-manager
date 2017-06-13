import React from'react';
import {TouchableOpacity} from 'react-native'
import {
    View,
    Item,
    Icon,
    Input,
} from 'native-base';

const Search = ({onChangeText, placeholder, value}) => {

    return (
        <View style={styles.search}>
            <Item>
                <Icon name="ios-search"/>
                <Input
                    value={value}
                    placeholder={placeholder}
                    onChangeText={(data) => onChangeText(data)}
                    returnKeyType='done'
                />
                {value.trim().length > 0 &&
                <TouchableOpacity onPress={() => onChangeText('')} style={styles.close}>
                    <Icon name="ios-close" ios="ios-close" android="md-close"/>
                </TouchableOpacity>}
            </Item>
        </View>
    );

}

const styles = ({
    search: {
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    close: {
        padding: 7
    }
});

export default Search;