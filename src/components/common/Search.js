import React from'react';
import {TouchableOpacity, TextInput, Dimensions} from 'react-native'
import {
    View,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'

const Search = ({onChangeText, placeholder, value}) => {

    return (
        <View style={styles.searchContainer}>
            <Icon name="ios-search" size={20} style={styles.searchIcon}/>
            <TextInput placeholder={placeholder}
                       autoCapitalize="none"
                       onChangeText={(data) => onChangeText(data)}
                       value={value}
                       style={styles.searchInput}
                       clearButtonMode={"while-editing"}
                       returnKeyType={"search"}
            />
        </View>
    );

}

const styles = ({
    searchContainer: {
        backgroundColor: '#f6f6f6',
        height: 40,
        width: Dimensions.get('window').width - 38,
        borderRadius: 27,
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 19
    },
    searchIcon: {
        marginLeft: 14
    },
    searchInput: {
        fontSize: 16,
        color: 'black',
        marginLeft: 9,
        width: Dimensions.get('window').width - 38 - 45,
    },
});

export default Search;
