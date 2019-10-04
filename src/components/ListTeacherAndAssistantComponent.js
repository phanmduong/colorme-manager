import React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
var {height, width} = Dimensions.get('window');

class ListTeacherAndAssistantComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
    };
  }

  processAuthorName = name => {
    let processed = name.replace('\t\t', '');
    processed = processed
      .split(' ')
      .splice(-2)
      .join(' ');
    return processed;
  };

  roundRating = rating => {
    return Math.round(rating * 10) / 10;
  };

  renderTeachingTeam = arrays => {
    return arrays.map(teacherSubArray => (
      <View style={{flexDirection: 'row', marginVertical: 20}}>
        {teacherSubArray.map(teacher => (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('TeachingRatingDuplicate', {
                userId: teacher.user.id,
              })
            }>
            <View style={{width: width / 3, alignItems: 'center'}}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={
                    teacher.user.avatar_url.includes('http')
                      ? {uri: teacher.user.avatar_url}
                      : {uri: 'https://' + teacher.user.avatar_url}
                  }
                  style={styles.avatar}
                />
                <View style={styles.ratingTag}>
                  <Text style={{color: 'white'}}>
                    {this.roundRating(teacher.ratio_rating)}★
                  </Text>
                </View>
              </View>
              <Text style={styles.name}>
                {this.processAuthorName(teacher.user.name)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  render() {
    if (
      !this.props.isLoadingTeacherList &&
      !this.props.isLoadingAssistantList
    ) {
      let arrays = [],
        size = 3;

      while (this.props.teacherList.length > 0) {
        arrays.push(this.props.teacherList.splice(0, size));
      }

      return (
        <ScrollView>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Tìm kiếm"
              autoCapitalize="none"
              onChangeText={search => {
                this.setState({search});
              }}
              value={this.state.search.value}
              style={styles.searchInput}
              clearButtonMode={'while-editing'}
            />
          </View>
          {this.renderTeachingTeam(arrays)}
        </ScrollView>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <Spinkit
              isVisible
              color={theme.mainColor}
              type="Wave"
              size={width / 8}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: '#f6f6f6',
    height: 40,
    width: Dimensions.get('window').width - 30,
    borderRadius: 27,
    justifyContent: 'center',
    marginLeft: 15,
  },
  searchInput: {
    fontSize: 16,
    color: '#707070',
    marginLeft: 14,
  },
  ratingTag: {
    backgroundColor: '#FED700',
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 20,
    position: 'absolute',
    bottom: -10,
    borderWidth: 4,
    borderColor: 'white',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
  },
};

export default ListTeacherAndAssistantComponent;
