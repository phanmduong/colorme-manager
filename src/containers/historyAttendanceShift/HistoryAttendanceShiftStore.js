import {observable, action, computed} from "mobx";
import {historyAttendanceShiftApi} from "../../apis/checkInCheckOutApi";
import {groupBy} from "../../helper";

class HistoryAttendanceShiftStore {
    @observable isLoading = false;
    @observable shifts = [];
    @observable error = false;

    @action
    loadHistory = (genID, token) => {
        this.isLoading = true;
        this.error = false;

        historyAttendanceShiftApi(genID, token)
            .then((res) => {
                this.shifts = res.data.data.shifts;
            })
            .catch(() => {
                this.error = false
            })
            .finally(() => {
                this.isLoading = false;
            })
    }

    @computed
    get listShift() {
        return groupBy(this.shifts, shift => shift.week, ["week", "shifts"]);

    }

};

export default HistoryAttendanceShiftStore;
