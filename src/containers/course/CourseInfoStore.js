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
  @observable duplicatingLesson = false;
  @observable deletingLesson = false;

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
  addLessonEvent = (lessonId, type, token, domain) => {
    this.changingEvent = true;
    courseApi
      .addLessonEvent(lessonId, type, token, domain)
      .then((res) => {
        this.lessons = this.lessons.map((lesson) => {
          if (lesson.id === lessonId) {
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
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      })
      .finally(() => {
        this.changingEvent = false;
      });
  };

  @action
  deleteLessonEvent = (lessonId, eventId, token, domain) => {
    this.changingEvent = true;
    courseApi
      .deleteLessonEvent(eventId, token, domain)
      .then((res) => {
        this.lessons = this.lessons.map((lesson) => {
          if (lesson.id === lessonId) {
            const lessonIdx = lesson.lesson_events.findIndex(
              (lesson_event) => lesson_event.id === eventId,
            );
            if (lessonIdx > -1) {
              let updated_lesson_events = [...lesson.lesson_events];
              updated_lesson_events.splice(lessonIdx, 1);
              return {...lesson, lesson_events: updated_lesson_events};
            }
          }
          return {...lesson};
        });
        Alert.alert('Thông báo', 'Thay đổi sự kiện thành công');
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      })
      .finally(() => (this.changingEvent = false));
  };

  @action
  duplicateLesson = (id, token, domain) => {
    this.duplicatingLesson = true;
    courseApi
      .duplicateLesson(id, token, domain)
      .then((res) => {
        this.lessons.unshift(res.data.lesson);
        Alert.alert('Thông báo', 'Nhân bản thành công');
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      })
      .finally(() => {
        this.duplicatingLesson = false;
      });
  };

  @action
  deleteLesson = (id, token, domain) => {
    this.deletingLesson = true;
    courseApi
      .deleteLesson(id, token, domain)
      .then((res) => {
        const lessonIdx = this.lessons.findIndex((lesson) => lesson.id === id);
        if (lessonIdx > -1) {
          this.lessons.splice(lessonIdx, 1);
        }
        Alert.alert('Thông báo', 'Xóa buổi học thành công');
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      })
      .finally(() => {
        this.deletingLesson = false;
      });
  };
}

export default CourseInfoStore;
