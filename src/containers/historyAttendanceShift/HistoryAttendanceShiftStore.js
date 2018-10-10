import {observable, action, computed} from "mobx";
import {historyAttendanceShiftApi, historyAttendanceWorkShiftApi} from "../../apis/checkInCheckOutApi";
import {groupBy} from "../../helper";
import {loadBaseApi} from "../../apis/baseApi";
import {loadGenApi} from "../../apis/genApi";

class HistoryAttendanceShiftStore {
    @observable isLoading = false;
    @observable shifts = [];
    @observable error = false;
    @observable isLoadingBase = false;
    @observable bases = [];
    @observable errorBase = false;
    @observable isLoadingGen = false;
    @observable gens = [];
    @observable errorGen = false;
    @observable selectedGenId = '';
    @observable selectedBaseId = '';

    @action
    loadHistoryShift = (token) => {
        this.isLoading = true;
        this.error = false;

        historyAttendanceShiftApi(this.selectedBaseId, this.selectedGenId, token)
            .then((res) => {
                this.shifts = res.data.data.shifts;
            })
            .catch(() => {
                this.error = true;
            })
            .finally(() => {
                this.isLoading = false;
            })
    }

    @action
    loadHistoryWorkShift = (token) => {
        this.isLoading = true;
        this.error = false;

        historyAttendanceWorkShiftApi(this.selectedBaseId, this.selectedGenId, token)
            .then((res) => {
                this.shifts = res.data.data.work_shifts;
            })
            .catch(() => {
                this.error = true;
            })
            .finally(() => {
                this.isLoading = false;
            })
    }

    @action
    loadBases = (token) => {
        this.isLoadingBase = true;
        this.errorBase = false;

        loadBaseApi(token)
            .then((res) => {
                this.bases = res.data.bases.reverse();
                this.selectedBaseId = this.bases[0].id;
            })
            .catch(() => {
                this.errorBase = false
            })
            .finally(() => {
                this.isLoadingBase = false;
            })
    }

    @action
    loadGens = (token) => {
        this.isLoadingGen = true;
        this.errorGen = false;

        loadGenApi(token)
            .then((res) => {
                this.gens = res.data.data.gens;
                this.selectedGenId = res.data.data.current_gen.id;
            })
            .catch(() => {
                this.errorGen = false
            })
            .finally(() => {
                this.isLoadingGen = false;
            })
    }

    @computed
    get listShift() {
        return groupBy(this.shifts, shift => shift.week, ["week", "shifts"]);

    }

};

export default HistoryAttendanceShiftStore;
