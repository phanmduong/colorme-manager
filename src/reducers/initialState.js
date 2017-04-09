/**
 * Created by phanmduong on 4/5/17.
 */
export default {
    login: {
        login: {
            username: '',
            password: ''
        },
        isLoading: false,
        error: false,
        token: ''
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
    chooseEnterStudent: {
        dataListChooseEnterStudent: [
            {
                id: 0,
                name: 'Quét QR Code'
            },
            {
                id: 1,
                name: 'Nhập mã học viên'
            },
            {
                id: 2,
                name: 'Xem danh sách lớp'
            }
        ],
        selectedEnterStudentId: -1
    },
    enterStudentCode: {
        studentCodeForm: '',
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