/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react';
import Loading from '../../components/common/Loading';
import moment from 'moment';
import {FORMAT_TIME_MYSQL} from '../../constants/constant';
import Section from '../../components/common/Section';
import HeaderSection from '../../components/common/HeaderSection';
import withStyle from '../../components/HOC/withStyle';
import MeetingItem from './MeetingItem';
import _ from 'lodash';
import {getMeetingStatus} from '../../helper';
import Carousel from 'react-native-snap-carousel';
import MeetingDetailItem from './MeetingDetailItem';
import ModalMeetingParticipate from './ModalMeetingParticipate';

var {height, width} = Dimensions.get('window');

@observer
class MeetingDetailComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentIndex: 0,
    };
    this.indexDefault = -1;
  }

  openModalParticipate = participates => {
    this.props.store.isVisibleModalParticipate = true;
    participates = _.sortBy(participates, [
      function(participate) {
        const status = getMeetingStatus(participate.status);
        return status.order;
      },
    ]);
    this.props.store.participates = participates;
  };

  componentDidMount() {
    this.props.store.loadMeetingDetail();
  }

  refreshMeetingDetail = () => {
    this.props.store.refreshMeetingDetail();
  };

  render() {
    const {isLoading, meetings, meeting, isLoadingMeetings} = this.props.store;
    if (meetings.length > 0 && this.indexDefault == -1) {
      const meetingId = this.props.store.selectedMeetingId;
      console.log(meetings);
      this.indexDefault = _.findIndex(meetings, function(o) {
        return o.id == meetingId;
      });
      console.log(this.indexDefault);
    }

    const date = moment(meeting.date, FORMAT_TIME_MYSQL);

    const meetingDate = moment(meeting.date, FORMAT_TIME_MYSQL).format('X');
    const now = moment().unix();
    const isNow =
      meetingDate - 1800 <= now && now <= parseInt(meetingDate) + 3600;
    const history = now > parseInt(meetingDate) + 3600;

    const total_issues = meeting.issues ? meeting.issues.length : 0;

    const carouselProps = isLoadingMeetings ? (
      <Loading />
    ) : (
      <Section>
        <HeaderSection title={'Nội dung'} subtitle={'Buổi họp'} />
        <MeetingItem
          store={this.props.store}
          joined={meeting.joined}
          name={meeting.name}
          meetingId={meeting.id}
          total_issues={total_issues}
          participates={meeting.participates ? meeting.participates : []}
          date={date.format('D')}
          month={date.format('M')}
          hour={date.format('HH:mm')}
          isNow={isNow}
          history={history}
          datetime={meeting.date}
          openModalParticipate={this.openModalParticipate}
        />
      </Section>
    );

    const keyboardVerticalOffset =
      Platform.OS === 'ios' ? Dimensions.get('window').height * 0.11 : 0;

    return (
      <SafeAreaView style={{flexGrow: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'position' : null}
          enabled
          keyboardVerticalOffset={keyboardVerticalOffset}>
          {isLoading ? (
            <View style={{marginTop: Dimensions.get('window').height * 0.35}}>
              <Loading />
            </View>
          ) : (
            <MeetingDetailItem
              store={this.props.store}
              name={meeting.name}
              issues={meeting.issues}
              participates={meeting.participates ? meeting.participates : []}
              carouselProps={carouselProps}
              openModalParticipate={this.openModalParticipate}
              refreshMeetingDetail={this.refreshMeetingDetail}
            />
          )}
        </KeyboardAvoidingView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : null}
          enabled
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.createIssue}
              placeholder={'Thêm vấn đề'}
              value={this.props.store.nameIssue}
              editable={!this.props.store.isStoringIssue}
              onChangeText={text => {
                this.props.store.nameIssue = text;
              }}
              onSubmitEditing={() => {
                this.props.store.storeIssue();
              }}
            />
            {this.props.store.nameIssue !== '' ? (
              <TouchableOpacity
                onPress={() => this.props.store.storeIssue()}
                style={styles.sendPosition}>
                <Image
                  source={require('../../../assets/img/icons8-email-send-96-enabled.png')}
                  style={styles.sendButton}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.sendPosition}>
                <Image
                  source={require('../../../assets/img/icons8-email-send-96-disabled.png')}
                  style={styles.sendButton}
                />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
        <ModalMeetingParticipate store={this.props.store} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  containerInput: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: 44,
  },
  createIssue: {
    borderRadius: 20,
    height: 40,
    position: 'absolute',
    bottom: 0,
    flex: 1,
    backgroundColor: '#ececec',
    paddingHorizontal: 20,
    color: '#363636',
    width: width - 75,
    right: 75,
  },
  sendPosition: {
    position: 'absolute',
    right: 40,
    bottom: 6,
  },
  sendButton: {
    width: 28,
    height: 28,
  },
});

export default withStyle()(MeetingDetailComponent);
