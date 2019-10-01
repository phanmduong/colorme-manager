import React from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import LinearGradient from 'react-native-linear-gradient';
import {CustomPicker} from 'react-native-custom-picker';
var {height, width} = Dimensions.get('window');

class TeachingRatingComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      role: 'Giảng viên',
      teacherIndex: -1,
      assistantIndex: -1,
      checkedData: false,
    };
  }

  renderStars = number => {
    switch (number) {
      case 1:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
          </View>
        );
      case 4:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
          </View>
        );
      case 5:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-filled.png')}
              style={styles.rateIcon}
            />
          </View>
        );
      default:
        return (
          <View style={styles.rateRow}>
            <Image
              source={require('../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
            <Image
              source={require('../../assets/img/icons8-star-100-blank.png')}
              style={styles.rateIcon}
            />
          </View>
        );
    }
  };

  renderFeedback = () => {
    return this.props.feedback.ratings.map(rating => (
      <View style={styles.feedbackContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: rating.student.avatar_url}}
            style={styles.studentAva}
          />
          <View style={{marginLeft: 15}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              {rating.student.name}
            </Text>
            <Text style={{color: '#a4a4a4', fontSize: 13}}>
              {rating.time} - {rating.class_name}
            </Text>
            {this.renderStars(rating.rating)}
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <Text style={{fontSize: 16}}>{rating.comment}</Text>
        </View>
      </View>
    ));
  };

  renderRolePickerField = settings => {
    const {selectedItem, defaultText} = settings;
    return (
      <LinearGradient
        colors={['#E26800', '#E00000']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && <Text style={{color: 'white'}}>{defaultText}</Text>}
        {selectedItem && <Text style={{color: 'white'}}>{selectedItem}</Text>}
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
        colors={['#E26800', '#E00000']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <Text style={{color: 'white'}}>Khóa {getLabel(defaultText)}</Text>
        )}
        {selectedItem && (
          <Text style={{color: 'white'}}>Khóa {getLabel(selectedItem)}</Text>
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

  setRatingIndex = (value, props) => {
    let isTeacherGenAvailable = false;
    let prevTeacherIndex = this.state.teacherIndex;

    for (let i = 0; i < props.teacherRatingData.length; i++) {
      if (value.id === props.teacherRatingData[i].gen.id) {
        isTeacherGenAvailable = true;
        this.setState({teacherIndex: i});
      }
    }

    if (
      prevTeacherIndex === this.state.teacherIndex &&
      !isTeacherGenAvailable
    ) {
      this.setState({teacherIndex: -1});
    }

    let isAssistantGenAvailable = false;
    let prevAssistantIndex = this.state.assistantIndex;

    for (let j = 0; j < props.assistantRatingData.length; j++) {
      if (value.id === props.assistantRatingData[j].gen.id) {
        isAssistantGenAvailable = true;
        this.setState({assistantIndex: j});
      }
    }

    if (
      prevAssistantIndex === this.state.assistantIndex &&
      !isAssistantGenAvailable
    ) {
      this.setState({assistantIndex: -1});
    }
  };

  roundRating = rating => {
    return Math.round(rating * 100) / 100;
  };

  componentWillReceiveProps(props) {
    if (
      props.assistantRatingData.length > 0 &&
      props.teacherRatingData.length > 0 &&
      props.genData.length > 0 &&
      !this.state.checkedData
    ) {
      this.setState({checkedData: true});
      let courseOptions = [];
      for (let i = 0; i < props.genData.length; i++) {
        courseOptions.push(props.genData[i]);
      }
      let defaultIndex = this.getDefaultValueIndex(
        this.props.teachingGen,
        courseOptions,
      );
      this.setRatingIndex(courseOptions[defaultIndex], props);
    }
  }

  getDefaultValueIndex = (value, array) => {
    for (let i = 0; i < array.length; i++) {
      if (value.id === array[i].id) {
        return i;
      }
    }
    return 0;
  };

  render() {
    if (
      this.props.feedback &&
      this.props.feedback.ratings &&
      !this.props.isLoadingGen
    ) {
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
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={
                this.props.isLoadingTeacherRating &&
                this.props.isLoadingAssistantRating &&
                this.props.isLoadingFeedback
              }
              onRefresh={this.props.onRefresh}
              titleColor={theme.mainColor}
              title="Đang tải..."
              tintColor="#d9534f"
              colors={['#d9534f']}
            />
          }>
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
                this.setRatingIndex(value, this.props);
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

          {!this.props.isLoadingTeacherRating &&
          !this.props.isLoadingAssistantRating ? (
            this.state.role === 'Giảng viên' ? (
              <View style={styles.quickRateContainer}>
                <View style={styles.leftItemContainer}>
                  <LinearGradient
                    colors={['#1049CB', '#F200FC']}
                    style={styles.itemPadding}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text style={styles.title}>Rating</Text>
                    <View style={styles.feedbackInfoContainer}>
                      <Text style={styles.ratioRatingText}>
                        {this.props.teacherRatingData[
                          this.state.teacherIndex
                        ] &&
                        this.props.teacherRatingData[this.state.teacherIndex]
                          .ratio_rating
                          ? this.roundRating(
                              this.props.teacherRatingData[
                                this.state.teacherIndex
                              ].ratio_rating,
                            )
                          : 'N/A'}
                      </Text>
                      <Text style={styles.ratioRatingStar}>★</Text>
                    </View>
                    <Image
                      source={require('../../assets/img/icons8-star-90.png')}
                      style={styles.starIcon}
                    />
                  </LinearGradient>
                </View>
                <View style={styles.rightItemContainer}>
                  <LinearGradient
                    colors={['#10CBAE', '#3C35E6']}
                    style={styles.itemPadding}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text style={styles.title}>Số lượt rate</Text>
                    <Text style={styles.totalRatedText}>
                      {this.props.teacherRatingData[this.state.teacherIndex] &&
                      this.props.teacherRatingData[this.state.teacherIndex]
                        .total_rated_person
                        ? this.props.teacherRatingData[this.state.teacherIndex]
                            .total_rated_person
                        : 'N/A'}
                    </Text>
                    <Image
                      source={require('../../assets/img/icons8-checked-96.png')}
                      style={styles.tickIcon}
                    />
                  </LinearGradient>
                </View>
              </View>
            ) : (
              <View style={styles.quickRateContainer}>
                <View style={styles.leftItemContainer}>
                  <LinearGradient
                    colors={['#1049CB', '#F200FC']}
                    style={styles.itemPadding}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text style={styles.title}>Rating</Text>
                    <View style={styles.feedbackInfoContainer}>
                      <Text style={styles.ratioRatingText}>
                        {this.props.assistantRatingData[
                          this.state.assistantIndex
                        ]
                          ? this.roundRating(
                              this.props.assistantRatingData[
                                this.state.assistantIndex
                              ].ratio_rating,
                            )
                          : 'N/A'}
                      </Text>
                      <Text style={styles.ratioRatingStar}>★</Text>
                    </View>
                    <Image
                      source={require('../../assets/img/icons8-star-90.png')}
                      style={styles.starIcon}
                    />
                  </LinearGradient>
                </View>
                <View style={styles.rightItemContainer}>
                  <LinearGradient
                    colors={['#10CBAE', '#3C35E6']}
                    style={styles.itemPadding}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text style={styles.title}>Số lượt rate</Text>
                    <Text style={styles.totalRatedText}>
                      {this.props.assistantRatingData[this.state.assistantIndex]
                        ? this.props.assistantRatingData[
                            this.state.assistantIndex
                          ].total_rated_person
                        : 'N/A'}
                    </Text>
                    <Image
                      source={require('../../assets/img/icons8-checked-96.png')}
                      style={styles.tickIcon}
                    />
                  </LinearGradient>
                </View>
              </View>
            )
          ) : (
            <View style={styles.container}>
              <Spinkit
                isVisible
                color={theme.mainColor}
                type="Wave"
                size={width / 8}
              />
            </View>
          )}
          {!this.props.isLoadingFeedback ? (
            <View>{this.renderFeedback()}</View>
          ) : (
            <View style={styles.container}>
              <Spinkit
                isVisible
                color={theme.mainColor}
                type="Wave"
                size={width / 8}
              />
            </View>
          )}
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
  quickRateContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  leftItemContainer: {
    width: width / 2,
    paddingLeft: 10,
    paddingRight: 5,
  },
  rightItemContainer: {
    width: width / 2,
    paddingRight: 10,
    paddingLeft: 5,
  },
  itemPadding: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 15,
    borderRadius: 7,
  },
  starIcon: {
    position: 'absolute',
    opacity: 0.3,
    right: -10,
    bottom: -10,
  },
  tickIcon: {
    position: 'absolute',
    opacity: 0.3,
    right: -27,
    bottom: -10,
  },
  title: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  rateIcon: {
    width: 10,
    height: 10,
    marginRight: 2,
  },
  rateRow: {
    flexDirection: 'row',
    marginTop: 3,
  },
  studentAva: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  feedbackContainer: {
    padding: 15,
    backgroundColor: '#F7F7F7',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 6,
  },
  feedbackInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratioRatingText: {
    fontSize: 32,
    color: 'white',
    marginRight: 8,
  },
  ratioRatingStar: {
    fontSize: 18,
    color: 'white',
  },
  totalRatedText: {
    fontSize: 32,
    color: 'white',
  },
  containerPicker: {
    flexDirection: 'row',
  },
  gradientSize: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginLeft: 10,
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
};

export default TeachingRatingComponent;
