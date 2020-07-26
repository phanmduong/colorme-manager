import {observable, action, computed} from 'mobx';
import {searchStudentRegisterApi, uploadImage} from '../../apis/studentApi';

class AccurateStudentStore {
  @observable isLoading = false;
  @observable error = false;
  @observable isShowModal = false;
  @observable studentSelected = {};
  @observable search = '';
  @observable students = [];
  @observable refreshing = false;

  @action
  searchStudent = (token, domain) => {
    this.isLoading = true;
    this.error = false;
    this.studentSelected = {};
    this.students = [];

    searchStudentRegisterApi({}, this.search, token, domain)
      .then((res) => {
        this.students = res.data.data.users;
        console.log(this.students);
      })
      .catch(() => {
        this.error = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  };

  @action
  refresh = (token, domain) => {
    this.refreshing = true;
    this.error = false;
    this.studentSelected = {};
    this.students = [];

    searchStudentRegisterApi({}, this.search, token, domain)
      .then((res) => {
        this.students = res.data.data.users;
        console.log(this.students);
      })
      .catch(() => {
        this.error = true;
      })
      .finally(() => {
        this.refreshing = false;
      });
  };

  @action uploadImage = (file, imageField, token, domain) => {
    this.studentSelected = {
      ...this.studentSelected,
      ['isUploading_' + imageField]: true,
    };
    uploadImage(
      file,
      (event) => {
        let data = JSON.parse(event.currentTarget.response);
        this.studentSelected = {
          ...this.studentSelected,
          ['isUploading_' + imageField]: false,
          [imageField]: data.image_url,
        };
        this.students = this.students.map((student) => {
          if (student.id == this.studentSelected.id) {
            return this.studentSelected;
          }
          return student;
        });
      },
      this.studentSelected.id,
      imageField,
      token,
      domain,
    );
  };
}

export default AccurateStudentStore;
