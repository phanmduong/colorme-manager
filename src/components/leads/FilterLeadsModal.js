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
import theme from '../../styles';
import {convertVietText} from '../../helper';
import {
  DUPLICATE_FILTER,
  LEAD_TAG_FILTER,
  RATE,
} from '../../constants/constant';
import Search from '../common/Search';
import FilterRowDate from '../common/FilterRowDate';

class FilterLeadsModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isStartDateVisible: false,
      isEndDateVisible: false,
      isCallBackTimeVisible: false,
      isMockExamTimeVisible: false,
      search: '',
    };
  }

  renderPickerField = (settings) => {
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

  renderPickerOption = (settings) => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.options}>
        <Text style={{fontSize: 16}}>{getLabel(item)}</Text>
      </View>
    );
  };

  renderPickerHeader = (title) => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>{title}</Text>
        <Search
          placeholder="Tìm kiếm"
          onChangeText={(search) => {
            this.setState({search});
          }}
          value={this.state.search}
          extraStyle={{width: width - 70, marginLeft: 0}}
          extraInputStyle={{width: width - 38 - 80}}
        />
      </View>
    );
  };

  renderStaffPickerHeader = (title) => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>{title}</Text>
        <Search
          placeholder="Tìm kiếm"
          onChangeText={(search) => {
            this.props.loadStaff(search, this.props.token);
          }}
          extraStyle={{width: width - 70, marginLeft: 0}}
          extraInputStyle={{width: width - 38 - 80}}
        />
      </View>
    );
  };

  renderPickerFooter(action) {
    return (
      <TouchableOpacity
        style={styles.headerFooterContainer}
        onPress={action.close.bind(this)}>
        <Text style={{color: '#C50000', fontSize: 19}}>Hủy</Text>
      </TouchableOpacity>
    );
  }

  getData = (array) => {
    let defaultOption = {id: -1, name: 'Tất cả'};
    let data = [defaultOption].concat(array);
    return data;
  };

  getDefault = (array, comparedId) => {
    for (let item of array) {
      if (item.id === comparedId) {
        return item;
      }
    }
    return array[0];
  };

  getSearchedResults = (array) => {
    let list = [];
    if (this.state.search === '') {
      return array;
    } else {
      for (let item of array) {
        let normalizedName = item.name;
        if (
          convertVietText(normalizedName).includes(
            convertVietText(this.state.search),
          )
        ) {
          list.push(item);
        }
      }
      return list;
    }
  };

  handleStartDatePicked = (date) => {
    this.props.onSelectStartTime(moment(date).format('YYYY-MM-DD'));
    this.setState({
      isStartDateVisible: false,
    });
  };

  handleEndDatePicked = (date) => {
    this.props.onSelectEndTime(moment(date).format('YYYY-MM-DD'));
    this.setState({
      isEndDateVisible: false,
    });
  };

  handleCallBackTimePicked = (date) => {
    this.props.onSelectCallBackTime(moment(date).format('YYYY-MM-DD'));
    this.setState({
      isCallBackTimeVisible: false,
    });
  };

  handleMockExamTimePicked = (date) => {
    this.props.onSelectMockExamTime(moment(date).format('YYYY-MM-DD'));
    this.setState({
      isMockExamTimeVisible: false,
    });
  };

  openStartDatePicker = () => {
    this.setState({isStartDateVisible: true});
  };

  openEndDatePicker = () => {
    this.setState({isEndDateVisible: true});
  };

  openCallBackTimePicker = () => {
    this.setState({isCallBackTimeVisible: true});
  };

  openMockExamTimePicker = () => {
    this.setState({isMockExamTimeVisible: true});
  };

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        avoidKeyboard={true}
        onBackdropPress={this.props.closeModal}
        onBackButtonPress={this.props.closeModal}
        style={styles.modalContainer}>
        <View style={styles.modal}>
          {!this.props.isLoadingCampaigns &&
          !this.props.isLoadingSources &&
          !this.props.isLoadingStatuses ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Lọc</Text>
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
              <FilterRowDate
                title={'Ngày nhập'}
                isFormatted={true}
                onSelectDate={this.props.onSelectImportedAt}
                selectedDate={this.props.importedAt}
              />
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Hẹn gọi lại</Text>
                <TouchableOpacity
                  style={styles.filterContainer}
                  onPress={() => this.openCallBackTimePicker()}>
                  <Text
                    style={{
                      fontSize: 16,
                    }}>
                    {this.props.callBackTime !== ''
                      ? this.props.callBackTime
                      : 'YYYY-MM-DD'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Ngày thi xếp lớp</Text>
                <TouchableOpacity
                  style={styles.filterContainer}
                  onPress={() => this.openMockExamTimePicker()}>
                  <Text
                    style={{
                      fontSize: 16,
                    }}>
                    {this.props.mockExamTime !== ''
                      ? this.props.mockExamTime
                      : 'YYYY-MM-DD'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Nhân viên</Text>
                <CustomPicker
                  options={this.getData(this.props.staff)}
                  defaultValue={this.getDefault(
                    this.getData(this.props.staff),
                    this.props.carer_id,
                  )}
                  getLabel={(item) => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderPickerField}
                  headerTemplate={() =>
                    this.renderStaffPickerHeader('Chọn nhân viên')
                  }
                  footerTemplate={this.renderPickerFooter}
                  onBlur={() => this.setState({search: ''})}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={(value) => {
                    this.setState({search: ''});
                    this.props.onSelectCarer(value.id);
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Đánh giá</Text>
                <CustomPicker
                  options={this.getSearchedResults(this.getData(RATE))}
                  defaultValue={this.getDefault(
                    this.getData(RATE),
                    this.props.rate,
                  )}
                  getLabel={(item) => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn đánh giá')
                  }
                  footerTemplate={this.renderPickerFooter}
                  onBlur={() => this.setState({search: ''})}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={(value) => {
                    this.setState({search: ''});
                    this.props.onSelectRate(value.id);
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Trạng thái</Text>
                <CustomPicker
                  options={this.getSearchedResults(
                    this.getData(this.props.statuses),
                  )}
                  defaultValue={this.getDefault(
                    this.getData(this.props.statuses),
                    this.props.leadStatusId,
                  )}
                  getLabel={(item) => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn trạng thái')
                  }
                  footerTemplate={this.renderPickerFooter}
                  onBlur={() => this.setState({search: ''})}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={(value) => {
                    this.setState({search: ''});
                    this.props.onSelectStatus(value.id);
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Nguồn</Text>
                <CustomPicker
                  options={this.getSearchedResults(
                    this.getData(this.props.sources),
                  )}
                  defaultValue={this.getDefault(
                    this.getData(this.props.sources),
                    this.props.source_id,
                  )}
                  getLabel={(item) => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderPickerField}
                  headerTemplate={() => this.renderPickerHeader('Chọn nguồn')}
                  footerTemplate={this.renderPickerFooter}
                  onBlur={() => this.setState({search: ''})}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={(value) => {
                    this.setState({search: ''});
                    this.props.onSelectSource(value.id);
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Chiến dịch</Text>
                <CustomPicker
                  options={this.getSearchedResults(
                    this.getData(this.props.campaigns),
                  )}
                  defaultValue={this.getDefault(
                    this.getData(this.props.campaigns),
                    this.props.campaign_id,
                  )}
                  getLabel={(item) => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn chiến dịch')
                  }
                  footerTemplate={this.renderPickerFooter}
                  onBlur={() => this.setState({search: ''})}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={(value) => {
                    this.setState({search: ''});
                    this.props.onSelectCampaignId(value.id);
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Lead trùng lặp</Text>
                <CustomPicker
                  options={this.getSearchedResults(DUPLICATE_FILTER)}
                  defaultValue={this.getDefault(
                    DUPLICATE_FILTER,
                    this.props.duplicate,
                  )}
                  getLabel={(item) => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn lead trùng lặp')
                  }
                  footerTemplate={this.renderPickerFooter}
                  onBlur={() => this.setState({search: ''})}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={(value) => {
                    this.setState({search: ''});
                    this.props.onSelectDuplicate(value.id);
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Lead tag</Text>
                <CustomPicker
                  options={this.getSearchedResults(LEAD_TAG_FILTER)}
                  defaultValue={this.getDefault(
                    LEAD_TAG_FILTER,
                    this.props.leadTag,
                  )}
                  getLabel={(item) => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn lead tag')
                  }
                  footerTemplate={this.renderPickerFooter}
                  onBlur={() => this.setState({search: ''})}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={(value) => {
                    this.setState({search: ''});
                    this.props.onSelectLeadTag(value.id);
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Tỉnh/thành phố</Text>
                <View style={styles.filterContainer}>
                  <TextInput
                    placeholder={'Tỉnh/thành phố'}
                    autoCapitalize={false}
                    onChangeText={this.props.onSelectAddress}
                    value={this.props.address}
                    clearButtonMode={true}
                    style={{width: 120, fontSize: 16}}
                  />
                </View>
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Cơ sở</Text>
                <CustomPicker
                  options={this.getSearchedResults(
                    this.getData(this.props.baseData),
                  )}
                  defaultValue={this.getDefault(
                    this.getData(this.props.baseData),
                    this.props.baseId,
                  )}
                  getLabel={(item) => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderPickerField}
                  headerTemplate={() => this.renderPickerHeader('Chọn cơ sở')}
                  footerTemplate={this.renderPickerFooter}
                  onBlur={() => this.setState({search: ''})}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={(value) => {
                    this.setState({search: ''});
                    this.props.onSelectBaseId(value.id);
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.onRefresh(this.props.searchLeads);
                  this.props.closeModal();
                }}>
                <View style={styles.submit}>
                  <Text style={styles.submitTitle}>Áp dụng</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.reset();
                  this.props.resetModal();
                }}>
                <View style={styles.reset}>
                  <Text style={styles.resetTitle}>Đặt lại</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.closeModal();
                }}>
                <View style={styles.cancelContainer}>
                  <Text style={styles.cancelTitle}>Hủy</Text>
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
                isVisible={this.state.isCallBackTimeVisible}
                onConfirm={this.handleCallBackTimePicked}
                onCancel={() => this.setState({isCallBackTimeVisible: false})}
              />
              <DateTimePicker
                isVisible={this.state.isMockExamTimeVisible}
                onConfirm={this.handleMockExamTimePicked}
                onCancel={() => this.setState({isMockExamTimeVisible: false})}
              />
            </ScrollView>
          ) : (
            <View style={{flex: 1}}>
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
    paddingHorizontal: theme.mainHorizontal,
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
  reset: {
    height: 45,
    borderRadius: 24,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
  resetTitle: {
    color: 'black',
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
  cancelContainer: {
    marginTop: 25,
    alignItems: 'center',
    paddingBottom: 30,
  },
  cancelTitle: {
    fontSize: 16,
    color: theme.mainColor,
  },
};

export default FilterLeadsModal;
