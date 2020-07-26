import {observable, action, computed} from 'mobx';
import {historyAttendanceTeacherApi} from '../../apis/checkInCheckOutApi';
import {groupBy} from '../../helper';
import {loadGenApi} from '../../apis/genApi';

class HistoryAttendanceTeachingStore {
  @observable isLoading = false;
  @observable attendances = [];
  @observable error = false;
  @observable isLoadingGen = false;
  @observable gens = [];
  @observable errorGen = false;
  @observable selectedGenId = '';

  @action
  loadHistoryTeaching = (token, domain) => {
    this.isLoading = true;
    this.error = false;

    historyAttendanceTeacherApi(this.selectedGenId, token, domain)
      .then((res) => {
        this.attendances = res.data.data.teaching;
      })
      .catch(() => {
        this.error = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  };

  @action
  loadGens = (token, domain) => {
    this.isLoadingGen = true;
    this.errorGen = false;

    loadGenApi(token, domain)
      .then((res) => {
        this.gens = res.data.data.gens;
        this.selectedGenId = res.data.data.teaching_gen.id;
        // this.selectedGenId = 33;
      })
      .catch(() => {
        this.errorGen = true;
      })
      .finally(() => {
        this.isLoadingGen = false;
      });
  };

  @computed
  get listAttendance() {
    return groupBy(this.attendances, (attendance) => attendance.class_id, [
      'class',
      'lessons',
    ]);
  }
}

export default HistoryAttendanceTeachingStore;
