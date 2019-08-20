import {observable, action, computed} from "mobx";
import {loadFilterMeeting, storeMeeting} from "../../apis/meetingApi";
import moment from "moment";
import {FORMAT_TIME_MYSQL} from "../../constants/constant";
import {Alert} from "react-native";

class Store {
    @observable token = "";
    @observable meeting = {
        date: moment()
    };
    @observable filter = {};
    @observable isLoading = false;
    @observable error = false;
    @observable isStoring = false;
    @observable errorStore = false;
    @observable ignoreUsers = [];

    constructor(token) {
        this.token = token;
    }

    @action
    getFilterMeeting = () => {
        this.isLoading = true;
        this.error = false;
        loadFilterMeeting(this.token)
            .then((res) => {
                this.filter = res.data.data.filter;
                console.log(this.filter)
            })
            .catch((error) => {
                console.log(error);
                this.error = true;
            })
            .finally(() => {
                this.isLoading = false;
            })
    }

    @action
    storeMeeting = (goBack) => {
        this.isStoring = true;
        this.errorStore = false;
        const filter = this.filter;
        const provinceIDs = filter.provinces ? filter.provinces.filter((province) => province.selected)
            .map((province) => province.provinceid) : [];

        const departmentIds = filter.departments ? filter.departments.filter((department) => department.selected)
            .map((department) => department.id) : [];

        const filterJSON = {
            provinces: provinceIDs,
            departments: departmentIds,
            ignore_users: this.ignoreUsers
        };

        const filterString = JSON.stringify(filterJSON);

        const dateString = this.meeting.date.format(FORMAT_TIME_MYSQL);

        storeMeeting(this.token, this.meeting.name, this.meeting.room_id, dateString, this.meeting.description, "available", filterString)
            .then((res) => {
                const meeting = res.data.data.meeting;
                console.log(meeting);
                Alert.alert('Thông báo', "Tạo cuộc họp thành công", [{
                    text: 'OK', onPress: () => {
                        goBack()
                    }
                }]);
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('Thông báo', "Có lỗi xảy ra");
                this.errorStore = true;
            })
            .finally(() => {
                this.isStoring = false;
            })
    }

};

export default Store;
