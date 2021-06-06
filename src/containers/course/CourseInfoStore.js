import {observable, action, computed} from 'mobx';
import * as courseApi from '../../apis/courseApi';
import {Alert} from 'react-native';

class CourseInfoStore {
  @observable lessons = [];
  @observable isLoadingLessons = false;
  @observable errorLessons = false;
  @observable refreshingLessons = false;
  @observable currentPageLessons = 0;
  @observable totalPageLessons = 1;
  @observable changingEvent = false;

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

  @action
  changeLessonEvent = (id, type, token, domain) => {
    this.changingEvent = true;
    courseApi
      .changeLessonEvent(id, type, token, domain)
      .then((res) => {
        this.lessons = this.lessons.map((lesson) => {
          if (lesson.id === id) {
            return {
              ...lesson,
              lesson_events: [...lesson.lesson_events, res.data.lesson_event],
            };
          }
          return {...lesson};
        });
        Alert.alert('Thông báo', 'Thay đổi sự kiện thành công');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      })
      .finally(() => {
        this.changingEvent = false;
      });
  };
}

export default CourseInfoStore;
