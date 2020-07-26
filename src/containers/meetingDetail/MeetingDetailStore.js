import {observable, action, computed} from 'mobx';
import {
  checkInMeeting,
  deleteMeetingIssue,
  joinMeeting,
  loadMeetingDetail,
  loadMeetings,
  storeIssue,
} from '../../apis/meetingApi';
import moment from 'moment';
import {FORMAT_TIME_MYSQL} from '../../constants/constant';
import {Alert} from 'react-native';

class MeetingDetailStore {
  @observable isLoading = false;
  @observable errorMeetings = false;
  @observable isLoadingMeetings = false;
  @observable error = false;
  @observable isJoining = false;
  @observable errorJoin = false;
  @observable isChecking = false;
  @observable errorCheckIn = false;
  @observable meetings = [];
  @observable token = '';
  @observable isVisibleModalParticipate = false;
  @observable participates = [];
  @observable meeting = {};
  @observable selectedMeetingId = 0;
  @observable nameIssue = '';
  @observable isStoringIssue = false;
  @observable errorStoringIssue = false;
  @observable refreshing = false;
  @observable reason = '';
  @observable isDeletingIssue = false;
  @observable errorDeletingIssue = false;
  @observable domain = '';

  constructor(token, meetingId, domain) {
    this.token = token;
    this.selectedMeetingId = meetingId;
    this.domain = domain;
  }

  @action
  loadList = () => {
    this.isLoadingMeetings = true;
    this.errorMeetings = false;

    loadMeetings(this.token, this.domain)
      .then((res) => {
        this.meetings = res.data.data.meetings;
        console.log(this.meetings);
      })
      .catch((error) => {
        console.log(error);
        this.errorMeetings = true;
      })
      .finally(() => {
        this.isLoadingMeetings = false;
      });
  };

  @action
  refreshMeetingDetail = () => {
    this.refreshing = true;
    this.error = false;
    console.log(this.selectedMeetingId);
    loadMeetingDetail(this.token, this.selectedMeetingId, this.domain)
      .then((res) => {
        this.meeting = res.data.data.meeting;
        console.log(this.meeting);
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
  loadMeetingDetail = () => {
    this.isLoading = true;
    this.error = false;
    console.log(this.selectedMeetingId);
    loadMeetingDetail(this.token, this.selectedMeetingId, this.domain)
      .then((res) => {
        this.meeting = res.data.data.meeting;
        console.log(this.meeting);
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
  storeIssue = () => {
    this.isStoringIssue = true;
    this.errorStoringIssue = false;
    console.log(this.nameIssue);

    storeIssue(this.token, this.selectedMeetingId, this.nameIssue, this.domain)
      .then((res) => {
        this.meeting.issues = [...this.meeting.issues, res.data.data.issue];
        this.nameIssue = '';
      })
      .catch((error) => {
        console.log(error);
        this.errorStoringIssue = true;
      })
      .finally(() => {
        this.isStoringIssue = false;
      });
  };

  @action
  deleteMeetingIssue = (issueId) => {
    this.isDeletingIssue = true;
    this.errorDeletingIssue = false;
    deleteMeetingIssue(this.token, issueId, this.domain)
      .then((res) => {
        if (res.data.status === 0) {
          Alert.alert('Thông báo', res.data.message);
        } else {
          let array = [...this.meeting.issues];
          let index = array.findIndex((x) => x.id === issueId);
          if (index !== -1) {
            array.splice(index, 1);
            this.meeting.issues = array;
          }
        }
      })
      .catch((error) => {
        this.errorDeletingIssue = true;
      })
      .finally(() => {
        this.isDeletingIssue = false;
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
        this.meeting = {
          ...this.meeting,
          joined: res.data.data.meeting_participate,
        };
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
        this.meeting = {
          ...this.meeting,
          joined: res.data.data.meeting_participate,
        };
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
}

export default MeetingDetailStore;
