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
import Loading from '../common/Loading';
var {width, height} = Dimensions.get('window');
import theme from '../../styles';
import {convertVietText} from '../../helper';
import Search from '../common/Search';

class FilterClassModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
      selectedCourseId: this.props.selectedCourseId,
      selectedBaseId: this.props.selectedBaseId,
      selectedProvinceId: this.props.selectedProvinceId,
      selectedGenId: this.props.selectedGenId,
    };
  }

  renderPickerField = settings => {
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

  renderPickerOption = settings => {
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
        <Search
          placeholder="Tìm kiếm"
          onChangeText={search => {
            this.setState({search});
          }}
          value={this.state.search}
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

  getData = array => {
    let defaultOption = {
      id: -1,
      name: 'Tất cả',
    };
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

  getDefaultGen = gens => {
    for (let gen of gens) {
      if (gen.id === this.state.selectedGenId) {
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

  getGenData = () => {
    let defaultGen = {id: -2, name: 'Tất cả'};
    let genData = [];
    genData.push(defaultGen);
    for (let gen of this.props.genData) {
      let pushedGen = {id: gen.id, name: 'Khóa ' + gen.name};
      genData.push(pushedGen);
    }
    return genData;
  };

  getSearchedResults = array => {
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

  applyFilter = () => {
    this.props.onSelectCourseId(this.state.selectedCourseId);
    this.props.onSelectProvinceId(this.state.selectedProvinceId);
    this.props.onSelectBaseId(this.state.selectedBaseId);
    this.props.onSelectGenId(this.state.selectedGenId);
  };

  filterProvinces = bases => {
    let baseData = [];
    if (this.state.selectedProvinceId !== -1) {
      for (let base of bases) {
        if (base.id !== -1) {
          if (base.district.province.id === this.state.selectedProvinceId) {
            baseData.push(base);
          }
        } else {
          baseData.push(base);
        }
      }
      return baseData;
    } else {
      return bases;
    }
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
          {!this.props.isLoadingGen &&
          !this.props.isLoadingBase &&
          !this.props.isLoadingCourse &&
          !this.props.isLoadingProvinces ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Lọc đăng ký</Text>
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Môn học</Text>
                <CustomPicker
                  options={this.getSearchedResults(
                    this.getData(this.props.courseData),
                  )}
                  defaultValue={this.getDefault(
                    this.getData(this.props.courseData),
                    this.state.selectedCourseId,
                  )}
                  getLabel={item => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn khóa học')
                  }
                  footerTemplate={this.renderPickerFooter}
                  onBlur={() => this.setState({search: ''})}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => {
                    this.setState({search: '', selectedCourseId: value.id});
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Tỉnh thành</Text>
                <CustomPicker
                  options={this.getSearchedResults(
                    this.getData(this.props.provinces),
                  )}
                  defaultValue={this.getDefault(
                    this.getData(this.props.provinces),
                    this.state.selectedProvinceId,
                  )}
                  getLabel={item => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn tình thành')
                  }
                  footerTemplate={this.renderPickerFooter}
                  onBlur={() => this.setState({search: ''})}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => {
                    this.setState({search: '', selectedProvinceId: value.id});
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Cơ sở</Text>
                <CustomPicker
                  options={this.getSearchedResults(
                    this.filterProvinces(this.getData(this.props.baseData)),
                  )}
                  defaultValue={this.getDefault(
                    this.getData(this.props.baseData),
                    this.state.selectedBaseId,
                  )}
                  getLabel={item =>
                    item.id === -1
                      ? item.name
                      : item.name + ' - ' + item.address
                  }
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderPickerField}
                  headerTemplate={() => this.renderPickerHeader('Chọn cơ sở')}
                  footerTemplate={this.renderPickerFooter}
                  onBlur={() => this.setState({search: ''})}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => {
                    this.setState({search: '', selectedBaseId: value.id});
                  }}
                />
              </View>
              <View style={styles.filterTitle}>
                <Text style={{fontSize: 16}}>Khóa học</Text>
                <CustomPicker
                  options={this.getSearchedResults(this.getGenData())}
                  defaultValue={this.getDefaultGen(this.getGenData())}
                  getLabel={item => item.name}
                  modalAnimationType={'fade'}
                  optionTemplate={this.renderPickerOption}
                  fieldTemplate={this.renderPickerField}
                  headerTemplate={() =>
                    this.renderPickerHeader('Chọn khóa học')
                  }
                  footerTemplate={this.renderPickerFooter}
                  onBlur={() => this.setState({search: ''})}
                  modalStyle={{
                    borderRadius: 6,
                  }}
                  onValueChange={value => {
                    this.setState({search: ''});
                    this.setState({selectedGenId: value.id});
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.applyFilter();
                  this.props.filter(
                    this.state.selectedBaseId,
                    this.state.selectedGenId,
                  );
                  this.props.closeModal();
                }}>
                <View style={styles.submit}>
                  <Text style={styles.submitTitle}>Áp dụng</Text>
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
    height: height - 370,
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
  cancelContainer: {
    marginTop: 25,
    alignItems: 'center',
    paddingBottom: 30,
  },
  cancelTitle: {
    fontSize: 16,
    color: theme.mainColor,
  },
  searchContainer: {
    marginTop: 10,
    backgroundColor: '#f6f6f6',
    height: 40,
    width: width - 70,
    borderRadius: 27,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  searchInput: {
    fontSize: 16,
    color: '#707070',
    marginLeft: 10,
  },
};

export default FilterClassModal;
