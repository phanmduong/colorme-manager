import {observable, action, computed} from 'mobx';
import {checkInMeeting, joinMeeting, loadMeetings} from '../../apis/meetingApi';
import moment from 'moment';
import {FORMAT_TIME_MYSQL} from '../../constants/constant';

class MeetingStore {
  @observable isLoading = false;
  @observable error = false;
  @observable isJoining = false;
  @observable errorJoin = false;
  @observable isChecking = false;
  @observable errorCheckIn = false;
  @observable meetings = [];
  @observable token = '';
  @observable isVisibleModalParticipate = false;
  @observable participates = [];
  @observable refreshing = false;
  @observable reason = '';
  @observable domain = '';

  constructor(token, domain) {
    this.token = token;
    this.domain = domain;
  }

  @action
  loadList = () => {
    this.isLoading = true;
    this.error = false;

    loadMeetings(this.token, this.domain)
      .then((res) => {
        this.meetings = res.data.data.meetings;
        console.log(this.meetings);
      })
      .catch((error) => {
        console.log(error);
        this.error = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  };

  @action
  loadHistoryList = () => {
    this.isLoading = true;
    this.error = false;

    loadMeetings(this.token, this.domain, 'closed')
      .then((res) => {
        this.meetings = res.data.data.meetings;
        console.log(this.meetings);
      })
      .catch((error) => {
        console.log(error);
        this.error = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  };

  @action
  refreshMeetingDetail = () => {
    this.refreshing = true;
    this.error = false;

    loadMeetings(this.token, this.domain)
      .then((res) => {
        this.meetings = res.data.data.meetings;
        console.log(this.meetings);
      })
      .catch((error) => {
        console.log(error);
        this.error = true;
      })
      .finally(() => {
        this.refreshing = false;
      });
  };

  @action
  refreshHistoryMeetingDetail = () => {
    this.refreshing = true;
    this.error = false;

    loadMeetings(this.token, this.domain, 'closed')
      .then((res) => {
        this.meetings = res.data.data.meetings;
        console.log(this.meetings);
      })
      .catch((error) => {
        console.log(error);
        this.error = true;
      })
      .finally(() => {
        this.refreshing = false;
      });
  };

  @action
  joinMeeting = (meetingId, status, note) => {
    this.isJoining = true;
    this.errorJoin = false;

    console.log('ok');
    joinMeeting(this.token, meetingId, status, note, this.domain)
      .then((res) => {
        console.log(res.data);
        this.meetings = this.meetings.map((meeting) => {
          if (meeting.id == meetingId) {
            return {
              ...meeting,
              joined: res.data.data.meeting_participate,
            };
          }
          return meeting;
        });
      })
      .catch((error) => {
        console.log(error);
        this.errorJoin = true;
      })
      .finally(() => {
        this.isJoining = false;
      });
  };

  @action
  checkInMeeting = (meetingId) => {
    this.isChecking = true;
    this.errorCheckIn = false;

    checkInMeeting(this.token, meetingId, this.domain)
      .then((res) => {
        console.log(res.data);
        this.meetings = this.meetings.map((meeting) => {
          if (meeting.id == meetingId) {
            return {
              ...meeting,
              joined: res.data.data.meeting_participate,
            };
          }
          return meeting;
        });
      })
      .catch((error) => {
        console.log(error);
        this.errorCheckIn = true;
      })
      .finally(() => {
        this.isChecking = false;
      });
  };

  @computed
  get meetingsNow() {
    return this.meetings.filter((meeting) => {
      const date = moment(meeting.date, FORMAT_TIME_MYSQL).format('X');
      const now = moment().unix();
      return date - 1800 <= now && now <= parseInt(date) + 3600;
    });
  }

  @computed
  get meetingsSoon() {
    return this.meetings.filter((meeting) => {
      const date = moment(meeting.date, FORMAT_TIME_MYSQL).format('X');
      const now = moment().unix();
      return now < date - 1800;
    });
  }

  @computed
  get meetingsHistory() {
    return this.meetings;
  }
}

export default MeetingStore;
