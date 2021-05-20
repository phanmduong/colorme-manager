import {observable, action, computed} from 'mobx';
import {groupBy} from '../../helper';
import {historyShiftsApi} from '../../apis/clockManageApi';

class HistoryAttendanceShiftStore {
  @observable isLoading = false;
  @observable shifts = [];
  @observable error = false;

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

    historyShiftsApi('', type, employee_id, start_time, end_time, token, domain)
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

  @computed
  get listShift() {
    return groupBy(this.shifts, (shift) => shift.work_shift.date, [
      'date',
      'shifts',
    ]);
  }
}

export default HistoryAttendanceShiftStore;
