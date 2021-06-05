import {observable, action, computed} from 'mobx';
import * as courseApi from '../../apis/courseApi';

class CourseInfoStore {
  @observable lessons = [];
  @observable isLoadingLessons = false;
  @observable errorLessons = false;
  @observable refreshingLessons = false;
  @observable currentPageLessons = 0;
  @observable totalPageLessons = 1;

  @action
  loadLessons = (refreshing, course_id, token, domain) => {
    if (!refreshing) {
      this.isLoadingLessons = true;
      this.refreshingLessons = false;
    } else {
      this.lessons = [];
      this.currentPageLessons = 0;
      this.totalPageLessons = 1;
      this.refreshingLessons = true;
      this.isLoadingLessons = false;
    }
    this.errorLessons = false;
    if (this.currentPageLessons < this.totalPageLessons) {
      courseApi
        .loadLessons('', this.currentPageLessons + 1, course_id, token, domain)
        .then((res) => {
          this.lessons = [...this.lessons, ...res.data.lessons.items];
          this.currentPageLessons = res.data.lessons.meta.current_page;
          this.totalPageLessons = res.data.lessons.meta.total_pages;
        })
        .catch((error) => {
          this.errorLessons = true;
        })
        .finally(() => {
          this.isLoadingLessons = false;
          this.refreshingLessons = false;
        });
    }
  };
}

export default CourseInfoStore;
