/**
 * Created by phanmduong on 4/5/17.
 */
export default {
    drawer: {
        drawerOpen: false,
        drawerDisable: true,
    },
    autoLogin: {
        isAutoLogin: true
    },
    login: {
        login: {},
        isLoading: false,
        error: false,
        token: '',
        isSettingData: false,
        isSetDataError: false,
        isGettingData: true,
        isGetDataError: false,
        user:{}
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
    currentClassStudy: {
        classData: [],
        isLoading: false,
        error: false,
        selectedCurrentClassStudy:{}
    },
    qrcode: {
        isScanned: false,
    },
    attendanceStudent: {
        isLoadingInfoStudent: false,
        isUpdatingAttendanceStudent: false,
        student: {
            attendances: [{}]
        },
        classStudent: {},
        attendance: [],
        message: '',
        errorLoad: false,
        errorUpdate: false,
        statusRequestUpdated: -1
    },
    shiftRegister: {
        isLoading: false,
        error: false,
        shiftRegisterData: {},
        selectedBaseId: -1,
        selectedGenId: -1,
    },
    dashboard: {
        isLoading: false,
        error: false,
        dashboardData: {},
        selectedBaseId: -1,
        selectedGenId: -1,
    },

}