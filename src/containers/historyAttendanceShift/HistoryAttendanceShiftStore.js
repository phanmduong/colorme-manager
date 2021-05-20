import {observable, action, computed} from 'mobx';
import {groupBy} from '../../helper';
import {historyShiftsApi} from '../../apis/checkInCheckOutApi';
import moment from 'moment';

class HistoryAttendanceShiftStore {
  @observable isLoading = false;
  @observable shifts = [];
  @observable error = false;
  @observable startTime = moment().startOf('week').unix();
  @observable endTime = moment().endOf('week').unix();

  @action
  loadHistoryShift = (
    type,
    employee_id,
    start_time,
    end_time,
    token,
    domain,
  ) => {
    this.isLoading = true;
    this.error = false;

    historyShiftsApi(type, employee_id, start_time, end_time, token, domain)
      .then((res) => {
        this.shifts = res.data.history;
      })
      .catch(() => {
        this.error = true;
      })
      .finally(() => {
        this.isLoading = false;
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
  get listWorkShift() {
    return groupBy(this.shifts, (shift) => shift.work_shift.date, [
      'date',
      'shifts',
    ]);
  }

  @computed
  get listShift() {
    return groupBy(this.shifts, (shift) => shift.date, [
      'date',
      'shifts',
    ]);
  }
}

export default HistoryAttendanceShiftStore;
