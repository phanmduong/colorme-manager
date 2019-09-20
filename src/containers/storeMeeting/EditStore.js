import {observable, action, computed} from 'mobx';
import {
  loadFilterMeeting,
  storeMeeting,
  loadMeetingDetail,
} from '../../apis/meetingApi';
import moment from 'moment';
import {FORMAT_TIME_MYSQL} from '../../constants/constant';
import {Alert} from 'react-native';

class Store {
  @observable token = '';
  @observable meeting = {
    date: moment(),
  };
  @observable filter = {};
  @observable isLoading = false;
  @observable error = false;
  @observable isStoring = false;
  @observable errorStore = false;
  @observable ignoreUsers = [];
  @observable selectedMeetingId = 0;

  constructor(token, meetingId) {
    this.token = token;
    this.selectedMeetingId = meetingId;
  }

  @action
  getFilterMeeting = () => {
    this.isLoading = true;
    this.error = false;
    loadFilterMeeting(this.token)
      .then(res => {
        this.filter = res.data.data.filter;
        console.log(this.filter);
      })
      .catch(error => {
        console.log(error);
        this.error = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  };

  @action
  loadMeetingDetail = () => {
    this.isLoading = true;
    this.error = false;
    console.log(this.selectedMeetingId);
    loadMeetingDetail(this.token, this.selectedMeetingId)
      .then(res => {
        this.meeting.name = res.data.data.meeting.name;
        this.meeting.description = res.data.data.meeting.description;
        let meetingDate = res.data.data.meeting.date.replace(' ', 'T');
        meetingDate = new Date(meetingDate);
        this.meeting.date.set({
          year: meetingDate.getFullYear(),
          month: meetingDate.getMonth(),
          date: meetingDate.getDate(),
        });
        this.meeting.date.set({
          hour: meetingDate.getHours(),
          minute: meetingDate.getMinutes(),
        });
        this.meeting.room_id = res.data.data.meeting.room_id;
        let filterObject = JSON.parse(res.data.data.meeting.filter);
        this.meeting.provinces = filterObject.provinces;
        this.meeting.departments = filterObject.departments;
        this.meeting.ignore_users = filterObject.ignore_users;
        this.ignoreUsers = filterObject.ignore_users;
      })
      .catch(error => {
        console.log(error);
        this.error = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  };

  @action
  storeMeeting = goBack => {
    this.isStoring = true;
    this.errorStore = false;
    const filter = this.filter;
    const provinceIDs = filter.provinces
      ? filter.provinces
          .filter(province =>
            this.meeting.provinces.includes(province.provinceid),
          )
          .map(province => province.provinceid)
      : [];

    const departmentIds = filter.departments
      ? filter.departments
          .filter(department =>
            this.meeting.departments.includes(department.id),
          )
          .map(department => department.id)
      : [];

    const filterJSON = {
      provinces: provinceIDs,
      departments: departmentIds,
      ignore_users: this.ignoreUsers,
    };

    const filterString = JSON.stringify(filterJSON);

    const dateString = this.meeting.date.format(FORMAT_TIME_MYSQL);

    storeMeeting(
      this.token,
      this.meeting.name,
      this.meeting.room_id,
      dateString,
      this.meeting.description,
      'available',
      filterString,
      this.selectedMeetingId,
    )
      .then(res => {
        const meeting = res.data.data.meeting;
        console.log(meeting);
        Alert.alert('Thông báo', 'Tạo cuộc họp thành công', [
          {
            text: 'OK',
            onPress: () => {
              goBack();
            },
          },
        ]);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        this.errorStore = true;
      })
      .finally(() => {
        this.isStoring = false;
      });
  };
}

export default Store;
