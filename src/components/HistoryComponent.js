import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class HistoryComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  tabTeaching = () => {
    this.props.tabTeaching();
  };

  tabWork = () => {
    this.props.tabWork();
  };

  tabDuty = () => {
    this.props.tabDuty();
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.tabContainer}>
          <LinearGradient
            colors={this.props.teachingShiftGradient}
            style={styles.gradientSize}>
            <TouchableOpacity onPress={this.tabTeaching}>
              <Text style={[styles.tabText, this.props.teachingShiftTextColor]}>
                Giảng dạy
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={this.props.workShiftGradient}
            style={styles.gradientSize}>
            <TouchableOpacity onPress={this.tabWork}>
              <Text style={[styles.tabText, this.props.workShiftTextColor]}>
                Làm việc
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={this.props.dutyShiftGradient}
            style={styles.gradientSize}>
            <TouchableOpacity onPress={this.tabDuty}>
              <Text style={[styles.tabText, this.props.dutyShiftTextColor]}>
                Trực
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={{flex: 1}}>{this.props.tabComponent}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  gradientSize: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 104,
    height: 42,
    borderRadius: 24,
  },
  tabText: {
    fontSize: 16,
  },
});

export default HistoryComponent;
