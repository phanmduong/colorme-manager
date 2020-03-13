import React from 'react';
import {
  StyleSheet,
  Dimensions,
  RefreshControl,
  ScrollView,
  Animated,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Button,
  View,
  Text,
  Picker,
  Item,
  List,
  Content,
} from 'native-base';
import Swiper from 'react-native-swiper';
import theme from '../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as alert from '../constants/alert';
import SlideBarchartRegister from './dashboard/SlideBarchartRegister';
import SlideTarget from './dashboard/SlideTarget';
import SlideBarchartMoney from './dashboard/SlideBarchartMoney';
import ListItem from './dashboard/ListItem';
import Loading from './common/Loading';
import {dotNumber} from '../helper';
import {CustomPicker} from 'react-native-custom-picker';
import LinearGradient from 'react-native-linear-gradient';

var {height, width} = Dimensions.get('window');
class AnalyticsComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.loadDataDashboard = this.loadDataDashboard.bind(this);
  }

  loadDataDashboard() {
    this.props.loadDataDashboard(
      this.props.selectedBaseId,
      this.props.selectedGenId,
    );
  }

  errorData() {
    return (
      <View style={styles.container}>
        <Text style={styles.textError}>
          {this.props.errorDashboard
            ? alert.LOAD_DATA_ERROR
            : alert.NO_DATA_SHIFT_REGISTER}
        </Text>
        <Button
          iconLeft
          danger
          small
          onPress={this.loadDataDashboard}
          style={{marginTop: 10, alignSelf: null}}>
          <MaterialCommunityIcons name="reload" color="white" size={20} />
          <Text>Thử lại</Text>
        </Button>
      </View>
    );
  }

  showDashboard() {
    var {dashboardData} = this.props;
    return (
      <ScrollView>
        <Swiper
          style={styles.wrapper}
          height={Platform.isPad ? height / 2.8 : height / 2}
          dotColor={theme.secondColor}
          dotStyle={styles.dotStyle}
          activeDotColor={theme.secondColor}
          index={1}
          loop={false}>
          {dashboardData && dashboardData.date_array ? (
            <SlideBarchartRegister
              dateArray={dashboardData.date_array}
              registersByDate={dashboardData.registers_by_date}
              paidByDate={dashboardData.paid_by_date}
              registerNumber={dashboardData.register_number}
              paidNumber={dashboardData.paid_number}
            />
          ) : (
            <Loading size={width / 12} />
          )}
          {dashboardData && dashboardData.date_array ? (
            <SlideTarget
              totalMoney={dashboardData.total_money}
              countPaid={dashboardData.count_paid}
              countTotal={dashboardData.count_total}
              bonus={dashboardData.bonus}
              targetRevenue={dashboardData.target_revenue}
            />
          ) : (
            <Loading size={width / 12} />
          )}
          {dashboardData && dashboardData.date_array ? (
            <SlideBarchartMoney
              dateArray={dashboardData.date_array}
              moneyByDate={dashboardData.money_by_date}
              moneyToday={dashboardData.money_today}
            />
          ) : (
            <Loading size={width / 12} />
          )}
        </Swiper>
        {dashboardData && dashboardData.total_classes ? (
          <List style={styles.containerList}>
            <ListItem
              nameIcon="material|attach-money"
              title={'Tổng số tiền đã thu'}
              subTitle={'Chỉ tiêu của bạn'}
              number={dotNumber(parseInt(dashboardData.total_money)) + 'đ'}
            />
            <ListItem
              nameIcon="material|class"
              title={'Tổng số lớp'}
              subTitle={'Chỉ tiêu của bạn'}
              onPress={this.props.onClickClass}
              number={dotNumber(dashboardData.total_classes)}
            />
            <ListItem
              nameIcon="fontawesome|registered"
              title={'Tổng số đăng kí'}
              subTitle={'Chỉ tiêu của bạn'}
              number={dotNumber(dashboardData.register_number)}
              onPress={this.props.onClickRegisterList}
            />
            <ListItem
              nameIcon="material|attach-money"
              title={'Số học viên đã đóng tiền'}
              subTitle={'Chỉ tiêu của bạn'}
              number={dotNumber(parseInt(dashboardData.paid_number))}
              onPress={this.props.onClickListStudentPaid}
            />
            <ListItem
              nameIcon="material|money-off"
              title={'Số học viên nộp 0 đồng'}
              subTitle={'Chỉ tiêu của bạn'}
              number={dotNumber(parseInt(dashboardData.zero_paid_num))}
              onPress={this.props.onClickListStudentZero}
            />
            <ListItem
              nameIcon="material|phonelink-erase"
              title={'Số học viên chưa gọi điện'}
              subTitle={'Chỉ tiêu của bạn'}
              number={dotNumber(parseInt(dashboardData.uncalled_number))}
            />
            <ListItem
              nameIcon="material|update"
              title={'Số ngày còn lại'}
              number={
                dashboardData.remain_days < 0
                  ? 'Đã hết'
                  : dashboardData.remain_days
              }
            />
          </List>
        ) : (
          <View />
        )}
      </ScrollView>
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
        colors={['white', 'white']}
        style={styles.gradientSize}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <Text style={{color: 'black', fontSize: 16}}>
            {getLabel(defaultText)} ▼
          </Text>
        )}
        {selectedItem && (
          <Text style={{color: 'black', fontSize: 16}}>
            {getLabel(selectedItem)} ▼
          </Text>
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

  getDefault = (array, comparedId) => {
    for (let item of array) {
      if (item.id === comparedId) {
        return item;
      }
    }
    return array[0];
  };

  getDefaultGen = gens => {
    for (let gen of gens) {
      if (gen.id === this.props.selectedGenId) {
        return gen;
      }
    }
    for (let gen of gens) {
      if (gen.id === this.props.currentGen.id) {
        return gen;
      }
    }
    return gens[0];
  };

  render() {
    if (this.props.isLoading) {
      return <Loading size={width / 8} />;
    } else {
      let genOptions = [];
      for (let i = 0; i < this.props.genData.length; i++) {
        genOptions.push(this.props.genData[i]);
      }

      let baseOptions = [];
      for (let i = 0; i < this.props.baseData.length; i++) {
        baseOptions.push(this.props.baseData[i]);
      }

      return (
        <Container>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.props.isLoadingDashboard}
                onRefresh={this.loadDataDashboard}
              />
            }>
            <View style={styles.containerPicker}>
              <CustomPicker
                options={genOptions}
                defaultValue={this.getDefaultGen(genOptions)}
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
                defaultValue={this.getDefault(
                  baseOptions,
                  this.props.selectedBaseId,
                )}
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
            {!this.props.isLoadingDashboard && this.props.errorDashboard
              ? this.errorData()
              : this.showDashboard()}
          </ScrollView>
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
  dotStyle: {
    opacity: 0.4,
    width: 5,
    height: 5,
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  containerPicker: {
    flexDirection: 'row',
  },
  containerList: {},
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

export default AnalyticsComponent;
