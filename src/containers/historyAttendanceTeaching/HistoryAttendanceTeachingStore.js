import {observable, action, computed} from 'mobx';
import {groupBy} from '../../helper';
import {historyShiftsApi} from '../../apis/checkInCheckOutApi';
import moment from 'moment';

class HistoryAttendanceTeachingStore {
  @observable isLoading = false;
  @observable attendances = [];
  @observable refreshing = false;
  @observable error = false;
  @observable startTime = moment().startOf('week').unix();
  @observable endTime = moment().endOf('week').unix();

  @action
  loadHistoryTeaching = (
    refreshing,
    employee_id,
    start_time,
    end_time,
    token,
    domain,
  ) => {
    if (!refreshing) {
      this.isLoading = true;
    } else {
      this.refreshing = true;
    }
    this.error = false;

    historyShiftsApi('class', employee_id, start_time, end_time, token, domain)
      .then((res) => {
        this.attendances = res.data.history;
      })
      .catch(() => {
        this.error = true;
      })
      .finally(() => {
        this.isLoading = false;
        this.refreshing = false;
      });
  };

  @action
  onSelectStartTime = (startTime) => {
    this.startTime = startTime;
  };

  @action
  onSelectEndTime = (endTime) => {
    this.endTime = endTime;
  };

  @computed
  get listAttendance() {
    return groupBy(
      this.attendances,
      (attendance) => attendance.class_lesson.study_class.id,
      ['class', 'lessons'],
    );
  }
}

export default HistoryAttendanceTeachingStore;
