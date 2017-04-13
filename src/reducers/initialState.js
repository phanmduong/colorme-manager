/**
 * Created by phanmduong on 4/5/17.
 */
export default {
    login: {
        login: {},
        isLoading: false,
        error: false,
        token: '',
        isSettingData: false,
        isSetDataError: false,
        isGettingData: true,
        isGetDataError: false,
    },
    base: {
        baseData: [],
        isLoading: false,
        error: false,
        selectedBaseId: -1
    },
    course: {
        courseData: [],
        isLoading: false,
        error: false,
        selectedCourseId: -1
    },
    gen: {
        genData: [],
        isLoading: false,
        error: false,
        selectedGenId: -1
    },
    lessonCourse: {
        lessonCourseData: [],
        isLoading: false,
        error: false,
        selectedLessonCourseId: -1
    },
    class: {
        classData: [],
        isLoading: false,
        error: false,
        selectedClassId: -1
    },
    qrcode: {
        isScanned: false,
    },
    attendanceStudent: {
        isLoadingInfoStudent: false,
        isUpdatingAttendanceStudent: false,
        student: {
            attendances:[{}]
        },
        attendance: [],
        message: '',
        errorLoad: false,
        errorUpdate: false,
    }
}