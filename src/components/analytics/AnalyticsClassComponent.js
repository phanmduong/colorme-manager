import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import Loading from '../common/Loading';
import AnalyticsClassItem from './AnalyticsClassItem';
import theme from '../../styles';
import {ENROLLING, STUDYING} from '../../constants/constant';
const {height, width} = Dimensions.get('window');

class AnalyticsClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIdx: 0,
    };
  }

  renderClasses = () => {
    return this.props.analyticsClasses.map((item) => (
      <AnalyticsClassItem
        {...this.props}
        key={item.id}
        nameClass={item.name}
        avatar={item.course ? item.course.icon_url : null}
        studyTime={item.study_time}
        address={
          item.room && item.base
            ? `${item.room.name} - ${item.base.address}`
            : null
        }
        totalPaid={item.target ? item.target.current_target : null}
        totalRegisters={
          item.register_target ? item.register_target.current_target : null
        }
        paidTarget={item.target ? item.target.target : null}
        registerTarget={
          item.register_target ? item.register_target.target : null
        }
        onPress={this.props.onSelectedItem}
        classId={item.id}
        teach={item.teacher}
        assist={item.teacher_assistant}
        changeClassStatus={this.props.changeClassStatus}
        classStatus={item.status}
        user={this.props.user}
        start_date={item.start_date}
      />
    ));
  };

  toggleTab = (idx) => {
    this.setState({tabIdx: idx});
    if (idx === 0) {
      this.props.changeClassType(ENROLLING);
    }
    if (idx === 1) {
      this.props.changeClassType(STUDYING);
    }
  };

  render() {
    return (
      <View>
        <View style={styles.containerTag}>
          <TouchableOpacity onPress={() => this.toggleTab(0)}>
            <View
              style={[
                styles.tag,
                {
                  backgroundColor:
                    this.state.tabIdx === 0 ? '#F6F6F6' : 'white',
                },
              ]}>
              <Text style={{color: 'black'}}>Đang tuyển sinh</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toggleTab(1)}>
            <View
              style={[
                styles.tag,
                {
                  backgroundColor:
                    this.state.tabIdx === 1 ? '#F6F6F6' : 'white',
                },
              ]}>
              <Text style={{color: 'black'}}>Đang học</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.props.isLoadingAnalyticsClasses ? (
          <Loading size={width / 8} />
        ) : (
          this.renderClasses()
        )}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tag: {
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTag: {
    marginTop: 15,
    flexDirection: 'row',
    paddingHorizontal: theme.mainHorizontal,
  },
};

export default AnalyticsClassComponent;
