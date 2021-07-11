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
  @observable addingLesson = false;
  @observable editingLesson = false;

  @observable exams = [];
  @observable isLoadingExams = false;
  @observable errorExams = false;
  @observable refreshingExams = false;
  @observable groupExams = [];
  @observable isLoadingGroupExams = false;
  @observable errorGroupExams = false;
  @observable refreshingGroupExams = false;
  @observable creatingExam = false;

  @observable links = [];
  @observable isLoadingLinks = false;
  @observable errorLinks = false;
  @observable refreshingLinks = false;
  @observable currentPageLinks = 0;
  @observable totalPageLinks = 1;
  @observable creatingLink = false;
  @observable deletingLink = false;

  @action
  loadLessons = (refreshing, course_id, token, domain) => {
    if (!refreshing) {
      this.isLoadingLessons = true;
    } else {
      this.lessons = [];
      this.currentPageLessons = 0;
      this.totalPageLessons = 1;
      this.refreshingLessons = true;
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
    } else {
      this.isLoadingLessons = false;
      this.refreshingLessons = false;
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

  @action
  addLesson = (payload, token, domain, callback) => {
    this.addingLesson = true;
    courseApi
      .createLesson(payload, token, domain)
      .then((res) => {
        this.lessons.unshift(res.data.lesson);
        Alert.alert('Thông báo', 'Thêm buổi học thành công', [
          {
            text: 'Ok',
            onPress: () => {
              if (callback) {
                callback();
              }
            },
          },
        ]);
      })
      .catch((error) => Alert.alert('Thông báo', 'Có lỗi xảy ra'))
      .finally(() => (this.addingLesson = false));
  };

  @action
  editLesson = (payload, token, domain, callback) => {
    this.editingLesson = true;
    courseApi
      .editLesson(payload, token, domain)
      .then((res) => {
        const lessonIdx = this.lessons.findIndex(
          (lesson) => lesson.id === payload.id,
        );
        if (lessonIdx > -1) {
          this.lessons.splice(lessonIdx, 1, res.data.lesson);
        }
        Alert.alert('Thông báo', 'Sửa buổi học thành công', [
          {
            text: 'Ok',
            onPress: () => {
              if (callback) {
                callback();
              }
            },
          },
        ]);
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      })
      .finally(() => (this.editingLesson = false));
  };

  @action
  loadExams = (refreshing, courseId, token, domain) => {
    if (!refreshing) {
      this.isLoadingExams = true;
    } else {
      this.refreshingExams = true;
      this.exams = [];
    }
    courseApi
      .loadExams(courseId, token, domain)
      .then((res) => {
        this.exams = res.data.exam_templates;
      })
      .catch((error) => {
        this.errorExams = true;
      })
      .finally(() => {
        this.isLoadingExams = false;
        this.refreshingExams = false;
      });
  };

  @action
  loadGroupExams = (refreshing, courseId, token, domain) => {
    if (!refreshing) {
      this.isLoadingGroupExams = true;
    } else {
      this.refreshingGroupExams = true;
      this.groupExams = [];
    }
    courseApi
      .loadGroupExams(courseId, token, domain)
      .then((res) => {
        this.groupExams = [
          ...res.data.group_exams,
          {id: -1, name: 'Không có nhóm'},
        ];
      })
      .catch((error) => {
        this.errorGroupExams = true;
      })
      .finally(() => {
        this.isLoadingGroupExams = false;
        this.refreshingGroupExams = false;
      });
  };

  @action
  createExam = (payload, token, domain, callback) => {
    this.creatingExam = true;
    courseApi
      .createExam(payload, token, domain)
      .then((res) => {
        this.exams.unshift(res.data.exam_template);
        Alert.alert('Thông báo', 'Tạo bài kiểm tra thành công', [
          {
            text: 'Ok',
            onPress: () => {
              if (callback) {
                callback();
              }
            },
          },
        ]);
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      })
      .finally(() => {
        this.creatingExam = false;
      });
  };

  @action
  loadLinks = (refreshing, courseId, token, domain) => {
    if (!refreshing) {
      this.isLoadingLinks = true;
    } else {
      this.refreshingLinks = true;
      this.links = [];
      this.currentPageLinks = 0;
      this.totalPageLinks = 1;
    }
    this.errorLinks = false;
    if (this.currentPageLinks < this.totalPageLinks) {
      courseApi
        .loadLinks(courseId, this.currentPageLinks + 1, token, domain)
        .then((res) => {
          this.links = [...this.links, ...res.data.links.items];
          this.currentPageLinks = res.data.links.meta.current_page;
          this.totalPageLinks = res.data.links.meta.total_pages;
        })
        .catch((error) => {
          this.errorLinks = true;
        })
        .finally(() => {
          this.isLoadingLinks = false;
          this.refreshingLinks = false;
        });
    } else {
      this.isLoadingLinks = false;
      this.refreshingLinks = false;
    }
  };

  @action
  createLink = (payload, token, domain, callback) => {
    this.creatingLink = true;
    courseApi
      .createLink(payload, token, domain)
      .then((res) => {
        this.links.unshift(res.data.link);
        Alert.alert('Thông báo', 'Tạo tài liệu thành công', [
          {
            text: 'Ok',
            onPress: () => {
              if (callback) {
                callback();
              }
            },
          },
        ]);
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      })
      .finally(() => {
        this.creatingLink = false;
      });
  };

  @action
  deleteLink = (id, token, domain) => {
    this.deletingLink = true;
    courseApi
      .deleteLink(id, token, domain)
      .then((res) => {
        const linkIdx = this.links.findIndex((link) => link.id === id);
        if (linkIdx > -1) {
          this.links.splice(linkIdx, 1);
        }
        Alert.alert('Thông báo', 'Xóa tài liệu thành công');
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      })
      .finally(() => {
        this.deletingLink = false;
      });
  };
}

export default CourseInfoStore;
