import React from 'react';
import {View, Dimensions, Image, Text} from 'react-native';
import Loading from '../common/Loading';
import theme from '../../styles';
var {width, height} = Dimensions.get('window');

class InfoStudentProgressComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  totalAttend = attendances => {
    let total = 0;
    for (let attendance of attendances) {
      if (attendance.status.status === 1) {
        total += 1;
      }
    }
    return total;
  };

  renderTopics = topics => {
    return topics.map(topic => (
      <View style={styles.classInfoContainer}>
        <Text>
          • {topic.title}:{' '}
          {topic.isSubmitted ? (
            <Text style={{color: '#2ACC4C'}}>Đã nộp bài</Text>
          ) : (
            <Text style={{color: '#C50000'}}>Chưa nộp</Text>
          )}
        </Text>
      </View>
    ));
  };

  renderProgress = () => {
    return this.props.progress.map(item => (
      <View style={styles.listItemContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: item.icon_url}} style={styles.classAva} />
          <Text numberOfLines={1} style={styles.className}>
            {item.name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 8}}>
          <View style={styles.classAva} />
          <View style={styles.infoContainer}>
            {item.study_time ? (
              <Text style={[styles.classInfoContainer, {fontWeight: '600'}]}>
                {item.study_time}
              </Text>
            ) : null}
            {item.description ? (
              <Text style={styles.classInfoContainer}>{item.description}</Text>
            ) : null}
            {item.time ? (
              <Text style={styles.classInfoContainer}>Học lần {item.time}</Text>
            ) : null}
            {item.teach && item.teach.name ? (
              <Text style={styles.classInfoContainer}>
                Giảng viên: {item.teach.name}
              </Text>
            ) : null}
            {item.assist && item.assist.name ? (
              <Text style={styles.classInfoContainer}>
                Trợ giảng: {item.assist.name}
              </Text>
            ) : null}
            <Text style={styles.classInfoContainer}>
              Điểm danh: {this.totalAttend(item.attendances)}/
              {item.attendances.length}
            </Text>
            <Text style={styles.classInfoContainer}>Bài tập</Text>
            {this.renderTopics(item.topics)}
          </View>
        </View>
      </View>
    ));
  };

  render() {
    if (this.props.isLoadingProgress) {
      return (
        <View style={{flex: 1}}>
          <Loading size={width / 8} />
        </View>
      );
    } else {
      return <View style={{flex: 1}}>{this.renderProgress()}</View>;
    }
  }
}

const styles = {
  listItemContainer: {
    marginHorizontal: theme.mainHorizontal,
    marginVertical: 10,
  },
  classAva: theme.mainAvatar,
  className: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  classInfoContainer: {
    paddingTop: 2,
    flex: 1,
    flexWrap: 'wrap',
  },
};

export default InfoStudentProgressComponent;
