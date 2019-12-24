import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {CustomPicker} from 'react-native-custom-picker';
import LinearGradient from 'react-native-linear-gradient';
var {width, height} = Dimensions.get('window');

const segments = [{name: 'Tất cả', value: 1}, {name: 'Của bạn', value: 2}];

class FilterModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      segment: 1,
    };
  }

  renderCoursePickerField = settings => {
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

  renderCoursePickerHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>Chọn đơn</Text>
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
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.closeModal}
        style={styles.modalContainer}>
        <View style={styles.modal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Lọc đăng ký</Text>
            </View>
            <View style={styles.filterTitle}>
              <Text style={{fontSize: 16}}>Đơn của</Text>
              <CustomPicker
                options={segments}
                defaultValue={segments[0]}
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
                  this.setState({
                    segment: value.value,
                  });
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.changeSegmentRegisterList(this.state.segment);
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
          </ScrollView>
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
