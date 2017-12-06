/**
 * Created by phanmduong on 4/5/17.
 */
export default {
    statusBar: {
        color: 'light-content'
    },
    autoLogin: {
        isAutoLogin: true
    },
    login: {
        login: {},
        isLoading: false,
        error: false,
        token: undefined,
        user: {},
        isGetDataLocalSuccessful: false,
        isCheckIn: false,
        deviceUser: {},
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
        selectedGenId: -1,
        currentGen: 0,
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
        selectedCurrentClassStudy: {}
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
        statusRequestUpdated: -1,
        messageError: undefined
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
    listStudentClass: {
        listStudentClassData: [],
        isLoading: false,
        error: false,
    },
    registerList: {
        registerListDataAll: [],
        isLoadingAll: false,
        errorAll: false,
        currentPageAll: 0,
        totalPageAll: 1,
        searchAll: '',
        registerListDataMy: [],
        isLoadingMy: false,
        errorMy: false,
        currentPageMy: 0,
        totalPageMy: 1,
        searchMy: '',
        segment: 1
    },
    collectMoney: {
        studentListData: [],
        isLoading: false,
        error: false,
        isUpdatingData: false,
        errorUpdate: false,
        messageErrorUpdate: false,
        search: '',
        nextCode: '',
        nextWaitingCode: '',
        formInfoMoney: {
            code: '',
            money: '',
            note: '',
            isReceivedCard: false
        }
    },
    moneyTransfer: {
        segment: 1,
        staffListData: [],
        isLoadingStaffList: false,
        errorStaffList: false,
        currentPageStaffList: 0,
        totalPageStaffList: 1,
        searchStaff: '',
        transactionListData: [],
        isLoadingHistoryTransaction: false,
        errorHistoryTransaction: false,
        currentPageHistoryTransaction: 0,
        totalPageHistoryTransaction: 1,
        isLoadingTransaction: false,
        errorTransaction: false,
        currentMoney: 0,
        openTabMoneyTransfer: false
    },
    listStudentPaid: {
        listStudentPaidData: [],
        isLoading: false,
        error: false,
    },

    listStudentZero: {
        listStudentZeroData: [],
        isLoading: false,
        error: false,
    },
    checkInCheckOut: {
        isLoadingCheckIn: false,
        errorCheckIn: false,
        isLoadingCheckOut: false,
        errorCheckOut: false,
        message: '',
        checkIn: {}
    }
}