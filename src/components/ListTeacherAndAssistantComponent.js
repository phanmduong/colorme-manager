import React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import {CustomPicker} from 'react-native-custom-picker';
import LinearGradient from 'react-native-linear-gradient';
var {height, width} = Dimensions.get('window');

class ListTeacherAndAssistantComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
      role: 'Giảng viên',
    };
  }

  processAuthorName = name => {
    let processed = name.trim().replace('\t\t', '');
    processed = processed
      .split(' ')
      .splice(-2)
      .join(' ');
    return processed;
  };

  roundRating = rating => {
    return Math.round(rating * 10) / 10;
  };

  getDefaultValueIndex = (value, array) => {
    for (let i = 0; i < array.length; i++) {
      if (value.id === array[i].id) {
        return i;
      }
    }
    return 0;
  };

  renderTeacherTeam = search => {
    let arrays = [],
      size = 3;

    let deepCopiedTeacherList = this.props.teacherList.slice(0);
    let duplicateTeacherList = [];

    for (let teacher of deepCopiedTeacherList) {
      if (search === '') {
        duplicateTeacherList.push(teacher);
      } else {
        let normalizedName = teacher.user.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        if (normalizedName.toLowerCase().includes(search.toLowerCase())) {
          duplicateTeacherList.push(teacher);
        }
      }
    }

    while (duplicateTeacherList.length > 0) {
      arrays.push(duplicateTeacherList.splice(0, size));
    }

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
                    teacher.user.avatar_url
                      ? teacher.user.avatar_url.includes('http')
                        ? {uri: teacher.user.avatar_url}
                        : {uri: 'https://' + teacher.user.avatar_url}
                      : require('../../assets/img/icons8-male-user-96.png')
                  }
                  style={styles.avatar}
                />
                <View style={styles.ratingTag}>
                  <Text style={{color: 'white'}}>
                    {teacher.ratio_rating
                      ? this.roundRating(teacher.ratio_rating)
                      : 'N/A'}
                    ★
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

  renderAssistantTeam = search => {
    let anotherArrays = [],
      anotherSize = 3;

    let deepCopiedAssistantList = this.props.assistantList.slice(0);
    let duplicateAssistantList = [];

    for (let assistant of deepCopiedAssistantList) {
      if (search === '') {
        duplicateAssistantList.push(assistant);
      } else {
        let normalizedName = assistant.user.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        if (normalizedName.toLowerCase().includes(search.toLowerCase())) {
          duplicateAssistantList.push(assistant);
        }
      }
    }

    while (duplicateAssistantList.length > 0) {
      anotherArrays.push(duplicateAssistantList.splice(0, anotherSize));
    }

    return anotherArrays.map(assistantSubArray => (
      <View style={{flexDirection: 'row', marginVertical: 20}}>
        {assistantSubArray.map(assistant => (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('TeachingRatingDuplicate', {
                userId: assistant.user.id,
              })
            }>
            <View style={{width: width / 3, alignItems: 'center'}}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={
                    assistant.user.avatar_url
                      ? assistant.user.avatar_url.includes('http')
                        ? {uri: assistant.user.avatar_url}
                        : {uri: 'https://' + assistant.user.avatar_url}
                      : require('../../assets/img/icons8-male-user-96.png')
                  }
                  style={styles.avatar}
                />
                <View style={styles.ratingTag}>
                  <Text style={{color: 'white'}}>
                    {assistant.ratio_rating
                      ? this.roundRating(assistant.ratio_rating)
                      : 'N/A'}
                    ★
                  </Text>
                </View>
              </View>
              <Text style={styles.name}>
                {this.processAuthorName(assistant.user.name)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  renderRolePickerField = settings => {
    const {selectedItem, defaultText} = settings;
    return (
      <LinearGradient
        colors={['white', 'white']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <Text style={{color: 'black', fontSize: 16}}>{defaultText} ▼</Text>
        )}
        {selectedItem && (
          <Text style={{color: 'black', fontSize: 16}}>{selectedItem} ▼</Text>
        )}
      </LinearGradient>
    );
  };

  renderRolePickerOption = settings => {
    const {item} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{item}</Text>
      </View>
    );
  };

  renderRolePickerHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>Chọn chức vụ</Text>
      </View>
    );
  };

  renderRolePickerFooter(action) {
    return (
      <TouchableOpacity
        style={styles.headerFooterContainer}
        onPress={action.close.bind(this)}>
        <Text style={{color: '#C50000', fontSize: 19}}>Hủy</Text>
      </TouchableOpacity>
    );
  }

  renderCoursePickerField = settings => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <LinearGradient
        colors={['white', 'white']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <Text style={{color: 'black', fontSize: 16}}>
            Khóa {getLabel(defaultText)} ▼
          </Text>
        )}
        {selectedItem && (
          <Text style={{color: 'black', fontSize: 16}}>
            Khóa {getLabel(selectedItem)} ▼
          </Text>
        )}
      </LinearGradient>
    );
  };

  renderCoursePickerOption = settings => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>Khóa {getLabel(item)}</Text>
      </View>
    );
  };

  renderCoursePickerHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>Chọn khóa học</Text>
      </View>
    );
  };

  renderCoursePickerFooter(action) {
    return (
      <TouchableOpacity
        style={styles.headerFooterContainer}
        onPress={action.close.bind(this)}>
        <Text style={{color: '#C50000', fontSize: 19}}>Hủy</Text>
      </TouchableOpacity>
    );
  }

  render() {
    let roles = ['Giảng viên', 'Trợ giảng'];
    let courseOptions = [];
    for (let i = 0; i < this.props.genData.length; i++) {
      courseOptions.push(this.props.genData[i]);
    }
    let defaultIndex = this.getDefaultValueIndex(
      this.props.teachingGen,
      courseOptions,
    );

    return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.containerPicker}>
          <CustomPicker
            options={courseOptions}
            defaultValue={courseOptions[defaultIndex]}
            getLabel={item => item.name}
            modalAnimationType={'fade'}
            optionTemplate={this.renderCoursePickerOption}
            fieldTemplate={this.renderCoursePickerField}
            headerTemplate={this.renderCoursePickerHeader}
            footerTemplate={this.renderCoursePickerFooter}
            modalStyle={{
              borderRadius: 6,
            }}
            onValueChange={value => {
              this.props.onSelectGenId(value.id);
            }}
          />
          <CustomPicker
            options={roles}
            defaultValue={roles[0]}
            modalAnimationType={'fade'}
            optionTemplate={this.renderRolePickerOption}
            fieldTemplate={this.renderRolePickerField}
            headerTemplate={this.renderRolePickerHeader}
            footerTemplate={this.renderRolePickerFooter}
            modalStyle={{
              borderRadius: 6,
            }}
            onValueChange={value => {
              this.setState({role: value});
            }}
          />
        </View>
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
        {!this.props.isLoadingTeacherList &&
        !this.props.isLoadingAssistantList ? (
          this.state.role === 'Giảng viên' ? (
            this.renderTeacherTeam(this.state.search)
          ) : (
            this.renderAssistantTeam(this.state.search)
          )
        ) : (
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
        )}
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerPicker: {
    flexDirection: 'row',
  },
  searchContainer: {
    marginTop: 20,
    backgroundColor: '#f6f6f6',
    height: 40,
    width: Dimensions.get('window').width - 20,
    borderRadius: 27,
    justifyContent: 'center',
    marginLeft: 10,
  },
  searchInput: {
    fontSize: 16,
    color: '#707070',
    marginLeft: 10,
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
  options: {
    marginVertical: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginHorizontal: 20,
  },
  headerFooterContainer: {
    padding: 10,
    alignItems: 'center',
  },
  headerFooterText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
  },
  gradientSize: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginLeft: 10,
  },
};

export default ListTeacherAndAssistantComponent;
