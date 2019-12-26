import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import {CustomPicker} from 'react-native-custom-picker';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Loading from '../common/Loading';
var {width, height} = Dimensions.get('window');

class FilterModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search_coupon: '',
      isStartDateVisible: false,
      isEndDateVisible: false,
      isAppointmentPaymentVisible: false,
    };
  }

  renderSegmentPickerField = settings => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <LinearGradient
        colors={['#F6F6F6', '#F6F6F6']}
        style={styles.filterContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {!selectedItem && (
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{color: 'black', fontSize: 16}}>
              {getLabel(defaultText)}
            </Text>
            <Text>▼</Text>
          </View>
        )}
        {selectedItem && (
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{color: 'black', fontSize: 16}}>
              {getLabel(selectedItem)}
            </Text>
            <Text>▼</Text>
          </View>
        )}
      </LinearGradient>
    );
  };

  renderCoursePickerOption = settings => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{getLabel(item)}</Text>
      </View>
    );
  };

  renderPickerHeader = title => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>{title}</Text>
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

  getDefaultBase = bases => {
    for (let base of bases) {
      if (base.id === this.props.selectedBaseId) {
        return base;
      }
    }
    return bases[0];
  };

  getDefaultSegment = array => {
    for (let segment of array) {
      if (segment.id === this.props.salerId) {
        return segment;
      }
    }
    return array[0];
  };

  getBaseData = () => {
    let defaultBase = {id: -1, name: 'Tất cả'};
    let baseData = [defaultBase].concat(this.props.baseData);
    return baseData;
  };

  getCampaigns = () => {
    let defaultCampaign = {id: -1, name: 'Tất cả'};
    let campaigns = [defaultCampaign].concat(this.props.campaigns);
    return campaigns;
  };

  getDefaultCampaign = array => {
    for (let campaign of array) {
      if (campaign.id === this.props.campaignId) {
        return campaign;
      }
    }
    return array[0];
  };

  getDefaultPaidStatus = array => {
    for (let moneyFilter of array) {
      if (moneyFilter.id === this.props.paidStatus) {
        return moneyFilter;
      }
    }
    return array[0];
  };

  getDefaultClassStatus = array => {
    for (let classStatus of array) {
      if (classStatus.value === this.props.classStatus) {
        return classStatus;
      }
    }
    return array[0];
  };

  getDefaultCallStatus = array => {
    for (let callStatus of array) {
      if (callStatus.id === this.props.callStatus) {
        return callStatus;
      }
    }
    return array[0];
  };

  getDefaultBookmark = array => {
    for (let bookmark of array) {
      if (bookmark.id === this.props.bookmark) {
        return bookmark;
      }
    }
    return array[0];
  };

  getStatuses = () => {
    let defaultStatus = {id: -1, name: 'Tất cả'};
    let statuses = [defaultStatus].concat(this.props.statuses);
    return statuses;
  };

  getDefaultStatus = array => {
    for (let status of array) {
      if (status.id === this.props.statusId) {
        return status;
      }
    }
    return array[0];
  };

  getSources = () => {
    let defaultSource = {id: -1, name: 'Tất cả'};
    let sources = [defaultSource].concat(this.props.sources);
    return sources;
  };

  getDefaultSource = array => {
    for (let source of array) {
      if (source.id === this.props.sourceId) {
        return source;
      }
    }
    return array[0];
  };

  handleStartDatePicked = date => {
    this.props.onSelectStartTime(moment(date).format('YYYY-MM-DD'));
    this.setState({
      isStartDateVisible: false,
    });
  };

  handleEndDatePicked = date => {
    this.props.onSelectEndTime(moment(date).format('YYYY-MM-DD'));
    this.setState({
      isEndDateVisible: false,
    });
  };

  handleAppointmentPaymentPicked = date => {
    this.props.onSelectAppointmentPayment(moment(date).format('YYYY-MM-DD'));
    this.setState({
      isAppointmentPaymentVisible: false,
    });
  };

  openStartDatePicker = () => {
    this.setState({isStartDateVisible: true});
  };

  openEndDatePicker = () => {
    this.setState({isEndDateVisible: true});
  };

  openAppointmentPaymentPicker = () => {
    this.setState({isAppointmentPaymentVisible: true});
  };

  render() {
    const segments = [
      {name: 'Tất cả', id: -1},
      {name: 'Của bạn', id: this.props.user.id},
    ];
    const moneyFilter = [
      {id: -1, name: 'Tất cả'},
      {id: 1, name: 'Đã nộp'},
      {id: 0, name: 'Chưa nộp'},
    ];
    const classStatusFilter = [
      {value: '', name: 'Tất cả'},
      {value: 'active', name: 'Hoạt động'},
      {value: 'waiting', name: 'Chờ'},
    ];
    const teleCallStatus = [
      {id: -1, name: 'Tất cả̉'},
      {id: 0, name: 'Chưa gọi'},
      {id: 1, name: 'Thành công'},
      {id: 2, name: 'Thất bại'},
    ];
    const bookmarkFilter = [
      {id: -1, name: 'Tất cả'},
      {id: 1, name: 'Đã đánh dấu'},
      {id: 0, name: 'Chưa đánh dấu'},
    ];
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.closeModal}
        style={styles.modalContainer}>
        <View style={styles.modal}>
          {!this.props.isLoadingBase &&
          !this.props.isLoadingCampaigns &&
          !this.props.isLoadingSources &&
          !this.props.isLoadingStatuses ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Lọc đăng ký</Text>
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Đơn của</Text>
                <CustomPicker
                  options={segments}
                  defaultValue={this.getDefaultSegment(segments)}
                  getLabel={item => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderCoursePickerOption}
                  fieldTemplate={this.renderSegmentPickerField}
                  headerTemplate={() => this.renderPickerHeader('Chọn đơn')}
                  footerTemplate={this.renderCoursePickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => {
                    this.props.onSelectSalerId(value.id);
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Theo cơ sở</Text>
                <CustomPicker
                  options={this.getBaseData()}
                  defaultValue={this.getDefaultBase(this.getBaseData())}
                  getLabel={item => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderCoursePickerOption}
                  fieldTemplate={this.renderSegmentPickerField}
                  headerTemplate={() => this.renderPickerHeader('Chọn cơ sở')}
                  footerTemplate={this.renderCoursePickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => {
                    this.props.onSelectBaseId(value.id);
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Theo chiến dịch</Text>
                <CustomPicker
                  options={this.getCampaigns()}
                  defaultValue={this.getDefaultCampaign(this.getCampaigns())}
                  getLabel={item => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderCoursePickerOption}
                  fieldTemplate={this.renderSegmentPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn chiến dịch')
                  }
                  footerTemplate={this.renderCoursePickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => {
                    this.props.onSelectCampaignId(value.id);
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Học phí</Text>
                <CustomPicker
                  options={moneyFilter}
                  defaultValue={this.getDefaultPaidStatus(moneyFilter)}
                  getLabel={item => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderCoursePickerOption}
                  fieldTemplate={this.renderSegmentPickerField}
                  headerTemplate={() => this.renderPickerHeader('Chọn học phí')}
                  footerTemplate={this.renderCoursePickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => {
                    this.props.onSelectPaidStatus(value.id);
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Từ ngày</Text>
                <TouchableOpacity
                  style={styles.filterContainer}
                  onPress={() => this.openStartDatePicker()}>
                  <Text
                    style={{
                      fontSize: 16,
                    }}>
                    {this.props.start_time !== ''
                      ? this.props.start_time
                      : 'YYYY-MM-DD'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Đến ngày</Text>
                <TouchableOpacity
                  style={styles.filterContainer}
                  onPress={() => this.openEndDatePicker()}>
                  <Text
                    style={{
                      fontSize: 16,
                    }}>
                    {this.props.end_time !== ''
                      ? this.props.end_time
                      : 'YYYY-MM-DD'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Trạng thái lớp</Text>
                <CustomPicker
                  options={classStatusFilter}
                  defaultValue={this.getDefaultClassStatus(classStatusFilter)}
                  getLabel={item => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderCoursePickerOption}
                  fieldTemplate={this.renderSegmentPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn trạng thái lớp')
                  }
                  footerTemplate={this.renderCoursePickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => {
                    this.props.onSelectClassStatus(value.value);
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Trạng thái cuộc gọi</Text>
                <CustomPicker
                  options={teleCallStatus}
                  defaultValue={this.getDefaultCallStatus(teleCallStatus)}
                  getLabel={item => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderCoursePickerOption}
                  fieldTemplate={this.renderSegmentPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn trạng thái cuộc gọi')
                  }
                  footerTemplate={this.renderCoursePickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => {
                    this.props.onSelectCallStatus(value.id);
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Hẹn ngày nộp tiền</Text>
                <TouchableOpacity
                  style={styles.filterContainer}
                  onPress={() => this.openAppointmentPaymentPicker()}>
                  <Text
                    style={{
                      fontSize: 16,
                    }}>
                    {this.props.appointmentPayment !== ''
                      ? this.props.appointmentPayment
                      : 'YYYY-MM-DD'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Coupon</Text>
                <View style={styles.filterContainer}>
                  <TextInput
                    placeholder={'Nhập coupon'}
                    autoCapitalize={false}
                    onChangeText={text => this.setState({search_coupon: text})}
                    value={this.state.search_coupon}
                    clearButtonMode={true}
                    style={{width: 120, fontSize: 16}}
                  />
                </View>
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Đánh dấu</Text>
                <CustomPicker
                  options={bookmarkFilter}
                  defaultValue={this.getDefaultBookmark(bookmarkFilter)}
                  getLabel={item => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderCoursePickerOption}
                  fieldTemplate={this.renderSegmentPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn đánh dấu')
                  }
                  footerTemplate={this.renderCoursePickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => {
                    this.props.onSelectBookmark(value.id);
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Trạng thái</Text>
                <CustomPicker
                  options={this.getStatuses()}
                  defaultValue={this.getDefaultStatus(this.getStatuses())}
                  getLabel={item => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderCoursePickerOption}
                  fieldTemplate={this.renderSegmentPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn trạng thái')
                  }
                  footerTemplate={this.renderCoursePickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => {
                    this.props.onSelectStatus(value.id);
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Nguồn</Text>
                <CustomPicker
                  options={this.getSources()}
                  defaultValue={this.getDefaultSource(this.getSources())}
                  getLabel={item => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderCoursePickerOption}
                  fieldTemplate={this.renderSegmentPickerField}
                  headerTemplate={() => this.renderPickerHeader('Chọn nguồn')}
                  footerTemplate={this.renderCoursePickerFooter}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => {
                    this.props.onSelectSource(value.id);
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.onRefresh(this.state.search_coupon);
                  this.props.closeModal();
                }}>
                <View style={styles.submit}>
                  <Text style={styles.submitTitle}>Hoàn tất</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.closeModal();
                }}>
                <View
                  style={{
                    marginTop: 25,
                    alignItems: 'center',
                    paddingBottom: 30,
                  }}>
                  <Text style={{fontSize: 16}}>Hủy</Text>
                </View>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isStartDateVisible}
                onConfirm={this.handleStartDatePicked}
                onCancel={() => this.setState({isStartDateVisible: false})}
              />
              <DateTimePicker
                isVisible={this.state.isEndDateVisible}
                onConfirm={this.handleEndDatePicked}
                onCancel={() => this.setState({isEndDateVisible: false})}
              />
              <DateTimePicker
                isVisible={this.state.isAppointmentPaymentVisible}
                onConfirm={this.handleAppointmentPaymentPicked}
                onCancel={() =>
                  this.setState({isAppointmentPaymentVisible: false})
                }
              />
            </ScrollView>
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Loading size={width / 8} />
            </View>
          )}
        </View>
      </Modal>
    );
  }
}

const styles = {
  modal: {
    backgroundColor: 'white',
    height: height - 140,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 16,
  },
  filterTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  filterContainer: {
    width: 150,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
  },
  submit: {
    height: 45,
    borderRadius: 24,
    backgroundColor: '#2ACC4C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  submitTitle: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
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

export default FilterModal;
