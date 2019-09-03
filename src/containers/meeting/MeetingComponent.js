/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {
  SafeAreaView,
  RefreshControl,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {observer} from 'mobx-react';
import Loading from '../../components/common/Loading';
import moment from 'moment';
import {FORMAT_TIME_MYSQL} from '../../constants/constant';
import ModalMeetingParticipate from './ModalMeetingParticipate';
import Section from '../../components/common/Section';
import HeaderSection from '../../components/common/HeaderSection';
import withStyle from '../../components/HOC/withStyle';
import MeetingItem from './MeetingItem';
import _ from 'lodash';
import {getMeetingStatus} from '../../helper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../../components/common/Icon';
import theme from '../../styles';

@observer
class MeetingComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
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

  onClickDetail = meetingId => {
    this.props.navigation.navigate('MeetingDetail', {meetingId});
  };

  handleRefresh = () => {
    this.props.store.refreshMeetingDetail();
  };

  render() {
    const {isLoading, meetingsNow, meetingsSoon, refreshing} = this.props.store;
    return (
      <SafeAreaView style={{flex: 1}}>
        {isLoading ? (
          <Loading />
        ) : (
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.handleRefresh}
                titleColor={theme.mainColor}
                title="Đang tải..."
                tintColor="#d9534f"
                colors={['#d9534f']}
              />
            }>
            {meetingsNow.length > 0 && (
              <Section>
                <HeaderSection title={'Cuộc họp'} subtitle={'Đang diễn ra'} />
                {meetingsNow.map((meeting, index) => {
                  const date = moment(meeting.date, FORMAT_TIME_MYSQL);
                  return (
                    <MeetingItem
                      key={index}
                      store={this.props.store}
                      joined={meeting.joined}
                      name={meeting.name}
                      meetingId={meeting.id}
                      total_issues={meeting.total_issues}
                      participates={meeting.participates}
                      date={date.format('D')}
                      month={date.format('M')}
                      hour={date.format('HH:mm')}
                      isNow={true}
                      datetime={meeting.date}
                      openModalParticipate={this.openModalParticipate}
                      onClickDetail={this.onClickDetail}
                    />
                  );
                })}
              </Section>
            )}
            {meetingsSoon.length > 0 && (
              <Section>
                <HeaderSection title={'Cuộc họp'} subtitle={'Sắp tới'} />
                {meetingsSoon.map((meeting, index) => {
                  const date = moment(meeting.date, FORMAT_TIME_MYSQL);
                  return (
                    <MeetingItem
                      key={index}
                      store={this.props.store}
                      joined={meeting.joined}
                      name={meeting.name}
                      meetingId={meeting.id}
                      total_issues={meeting.total_issues}
                      participates={meeting.participates}
                      date={date.format('D')}
                      month={date.format('M')}
                      hour={date.format('HH:mm')}
                      datetime={meeting.date}
                      openModalParticipate={this.openModalParticipate}
                      onClickDetail={this.onClickDetail}
                    />
                  );
                })}
              </Section>
            )}
          </ScrollView>
        )}
        <ModalMeetingParticipate store={this.props.store} />
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  containerContent: {
    flex: 2,
    flexDirection: 'column',
  },
  containerAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  title: {color: 'white', fontSize: 17, fontWeight: 'bold'},
};

export default withStyle()(MeetingComponent);
