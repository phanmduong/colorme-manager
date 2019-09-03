import React from 'react';
import {Platform, Dimensions, TouchableOpacity} from 'react-native';
import {Container, Button, View, Text, Picker, Item} from 'native-base';
var {height, width} = Dimensions.get('window');
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShiftRegisterWeek from './shiftRegister/ShiftRegisterWeek';
import * as alert from '../constants/alert';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {CustomPicker} from 'react-native-custom-picker';
import LinearGradient from 'react-native-linear-gradient';

const heightSwiper = Platform.OS === 'ios' ? height - 165 : height - 180;
let self;
class ShiftRegisterComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.loadDataShiftRegister = this.loadDataShiftRegister.bind(this);
    self = this;
  }

  componentWillMount() {
    this.state = {
      sizeShiftRegister: 0,
    };
  }

  loadDataShiftRegister() {
    this.props.loadDataShiftRegister(
      this.props.selectedBaseId,
      this.props.selectedGenId,
    );
  }

  errorData() {
    return (
      <View style={styles.container}>
        <Text style={styles.textError}>
          {this.props.errorShiftRegister
            ? alert.LOAD_DATA_ERROR
            : alert.NO_DATA_SHIFT_REGISTER}
        </Text>
        <Button
          iconLeft
          danger
          small
          onPress={this.loadDataShiftRegister}
          style={{marginTop: 10, alignSelf: null}}>
          <MaterialCommunityIcons name="reload" color="white" size={20} />
          <Text>Thử lại</Text>
        </Button>
      </View>
    );
  }

  renderShiftRegister() {
    return this.props.shiftRegisterData.weeks.map((week, index) => {
      return (
        <ShiftRegisterWeek
          loadDataShiftRegister={self.loadDataShiftRegister}
          isLoadingShiftRegister={self.props.isLoadingShiftRegister}
          key={index}
          weekData={week}
          user={self.props.user}
          onRegister={self.props.onRegister}
          onUnRegister={self.props.onUnRegister}
        />
      );
    });
  }

  showShiftRegister() {
    if (this.props.shiftRegisterData.weeks) {
      if (isIphoneX()) {
        return (
          <Swiper height={height - 250} loop={false} showsPagination={false}>
            {this.renderShiftRegister()}
          </Swiper>
        );
      }

      if (
        this.state.sizeShiftRegister !==
        this.props.shiftRegisterData.weeks.length
      ) {
        this.setState({
          sizeShiftRegister: this.props.shiftRegisterData.weeks.length,
        });
        return <View />;
      }

      return (
        <Swiper height={heightSwiper} loop={false} showsPagination={false}>
          {this.renderShiftRegister()}
        </Swiper>
      );
    }
    return <View />;
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

  renderBasePickerHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>Chọn cơ sở</Text>
      </View>
    );
  };

  renderBasePickerField = settings => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <LinearGradient
        colors={['#E26800', '#E00000']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <Text style={{color: 'white'}}>{getLabel(defaultText)}</Text>
        )}
        {selectedItem && (
          <Text style={{color: 'white'}}>{getLabel(selectedItem)}</Text>
        )}
      </LinearGradient>
    );
  };

  renderBasePickerOption = settings => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{getLabel(item)}</Text>
      </View>
    );
  };

  render() {
    if (
      this.props.isLoading ||
      (this.props.isLoadingShiftRegister && !this.props.shiftRegisterData.weeks)
    ) {
      return (
        <Container>
          <View style={styles.container}>
            <Spinkit
              isVisible
              color={theme.mainColor}
              type="Wave"
              size={width / 8}
            />
          </View>
        </Container>
      );
    } else {
      let courseOptions = [];
      for (let i = 0; i < this.props.genData.length; i++) {
        courseOptions.push(this.props.genData[i]);
      }

      let baseOptions = [];
      for (let i = 0; i < this.props.baseData.length; i++) {
        baseOptions.push(this.props.baseData[i]);
      }

      return (
        <Container>
          <View style={styles.containerPicker}>
            <CustomPicker
              options={courseOptions}
              defaultValue={courseOptions[0]}
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
              options={baseOptions}
              defaultValue={baseOptions[0]}
              getLabel={item => item.name}
              modalAnimationType={'fade'}
              optionTemplate={this.renderBasePickerOption}
              fieldTemplate={this.renderBasePickerField}
              headerTemplate={this.renderBasePickerHeader}
              footerTemplate={this.renderCoursePickerFooter}
              modalStyle={{
                borderRadius: 6,
              }}
              onValueChange={value => {
                this.props.onSelectBaseId(value.id);
              }}
            />
          </View>
          {!this.props.isLoadingShiftRegister &&
          (this.props.errorShiftRegister ||
            (this.props.shiftRegisterData.weeks &&
              this.props.shiftRegisterData.weeks.length <= 0))
            ? this.errorData()
            : this.showShiftRegister()}
        </Container>
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
  textError: {
    color: '#d9534f',
    textAlign: 'center',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  containerPicker: {
    flexDirection: 'row',
  },
  containerList: {
    borderTopColor: theme.borderColor,
    borderTopWidth: 1,
  },
  gradientSize: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginLeft: 10,
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
  options: {
    marginVertical: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginHorizontal: 20,
  },
};

export default ShiftRegisterComponent;
