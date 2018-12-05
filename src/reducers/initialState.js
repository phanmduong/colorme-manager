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
        courseData: [],
        isLoadingCourse: false,
        error: false,
        selectedClassId: -1
    },
    currentClassStudy: {
        // classData: [
        //     {
        //         id: 1707,
        //         avatar_url: "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg",
        //         name: "PS 39.3",
        //         study_time: "(19h-21h) Thứ 3 - Thứ 5",
        //         activated: 1,
        //         status: 0,
        //         address: "Tầng 5 - Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
        //         paid_target: 20,
        //         register_target: 20,
        //         total_registers: 21,
        //         total_paid: 16,
        //         datestart: "04 Tháng Chín, 2018",
        //         description: "Khai giảng ngày 4 tháng 9 năm 2018",
        //         course: "Photoshop",
        //         isEnrolled: false,
        //         base: {
        //             id: 3,
        //             name: "Cơ sở 1",
        //             address: " Số 175 phố Chùa Láng - Đống Đa - Hà Nội"
        //         },
        //         lesson: [
        //             {
        //                 class_lesson_id: 13142,
        //                 name: "Ấn phẩm truyền thông",
        //                 order: 6,
        //                 description: "Xây dựng ấn phẩm truyền thông ",
        //                 number_student_attendance: 0
        //             }
        //         ]
        //     },
        //     {
        //         id: 1711,
        //         avatar_url: "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg",
        //         name: "PS 39.7 (Cơ sở 2)",
        //         study_time: "(19h-21h) Thứ 3 - Thứ 5",
        //         activated: 1,
        //         status: 1,
        //         address: "Tầng 5 - Số 162 phố Phương Liệt ( số 83 Trường Chinh rẽ vào) - Thanh Xuân - Hà Nội",
        //         paid_target: 15,
        //         register_target: 15,
        //         total_registers: 15,
        //         total_paid: 15,
        //         datestart: "04 Tháng Chín, 2018",
        //         description: "Khai giảng ngày 4 tháng 9 năm 2018",
        //         course: "Photoshop",
        //         isEnrolled: false,
        //         base: {
        //             id: 4,
        //             name: "Cơ sở 2",
        //             address: "Số 162 phố Phương Liệt ( số 83 Trường Chinh rẽ vào) - Thanh Xuân - Hà Nội"
        //         },
        //         lesson: [
        //             {
        //                 class_lesson_id: 13174,
        //                 name: "Ấn phẩm truyền thông",
        //                 order: 6,
        //                 description: "Xây dựng ấn phẩm truyền thông ",
        //                 number_student_attendance: 0
        //             }
        //         ]
        //     },
        //     {
        //         id: 1715,
        //         avatar_url: "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg",
        //         name: "AI 39.2",
        //         study_time: "(19h-21h) Thứ 3 - Thứ 5",
        //         activated: 1,
        //         status: 0,
        //         address: "Tầng 2 - Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
        //         paid_target: 20,
        //         register_target: 20,
        //         total_registers: 20,
        //         total_paid: 15,
        //         datestart: "04 Tháng Chín, 2018",
        //         description: "Khai giảng ngày 4 tháng 9 năm 2018",
        //         course: "Illustrator",
        //         isEnrolled: false,
        //         base: {
        //             id: 3,
        //             name: "Cơ sở 1",
        //             address: " Số 175 phố Chùa Láng - Đống Đa - Hà Nội"
        //         },
        //         lesson: [
        //             {
        //                 class_lesson_id: 13206,
        //                 name: "Infographic",
        //                 order: 6,
        //                 description: "Infographic",
        //                 number_student_attendance: 1
        //             }
        //         ]
        //     },
        //     {
        //         id: 1722,
        //         avatar_url: "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg",
        //         name: "AI 39.9 (Cơ sở 5)",
        //         study_time: "(19h-21h) Thứ 3 - Thứ 5",
        //         activated: 1,
        //         status: 0,
        //         address: "Phòng học 3 - Tầng 2, Toà nhà Trung Yên 1, 58A Trung Kính, Cầu Giấy, Hà Nội",
        //         paid_target: 20,
        //         register_target: 20,
        //         total_registers: 22,
        //         total_paid: 16,
        //         datestart: "04 Tháng Chín, 2018",
        //         description: "Khai giảng ngày 4 tháng 9 năm 2018",
        //         course: "Illustrator",
        //         isEnrolled: false,
        //         base: {
        //             id: 9,
        //             name: "Cơ sở 5",
        //             address: "Tầng 2, Toà nhà Trung Yên 1, 58A Trung Kính, Cầu Giấy, Hà Nội"
        //         },
        //         lesson: [
        //             {
        //                 class_lesson_id: 13262,
        //                 name: "Infographic",
        //                 order: 6,
        //                 description: "Infographic",
        //                 number_student_attendance: 0
        //             }
        //         ]
        //     },
        //     {
        //         id: 1723,
        //         avatar_url: "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1455035399GURqJY2y45AZIAp.png",
        //         name: "AE 39.1",
        //         study_time: "(19h-21h) Thứ 3 - Thứ 5",
        //         activated: 1,
        //         status: 0,
        //         address: "Tầng 4 - Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
        //         paid_target: 20,
        //         register_target: 20,
        //         total_registers: 24,
        //         total_paid: 19,
        //         datestart: "04 Tháng Chín, 2018",
        //         description: "Khai giảng ngày 4 tháng 9 năm 2018",
        //         course: "After Effects",
        //         isEnrolled: false,
        //         base: {
        //             id: 3,
        //             name: "Cơ sở 1",
        //             address: " Số 175 phố Chùa Láng - Đống Đa - Hà Nội"
        //         },
        //         lesson: [
        //             {
        //                 class_lesson_id: 13270,
        //                 name: "Animation",
        //                 order: 6,
        //                 description: "Animation",
        //                 number_student_attendance: 0
        //             }
        //         ]
        //     },
        //     {
        //         id: 1725,
        //         avatar_url: "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1468283993EUvpBPDYpu8IkQ0.jpg",
        //         name: "PT 39.2",
        //         study_time: "(19h-21h) Thứ 3 - Thứ 5",
        //         activated: 1,
        //         status: 0,
        //         address: "Studio Tầng 5 - Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
        //         paid_target: 10,
        //         register_target: 10,
        //         total_registers: 12,
        //         total_paid: 12,
        //         datestart: "04 Tháng Chín, 2018",
        //         description: "Khai giảng ngày 4 tháng 9 năm 2018",
        //         course: "Photography",
        //         isEnrolled: false,
        //         base: {
        //             id: 3,
        //             name: "Cơ sở 1",
        //             address: " Số 175 phố Chùa Láng - Đống Đa - Hà Nội"
        //         },
        //         lesson: [
        //             {
        //                 class_lesson_id: 13286,
        //                 name: "Lightroom Buổi 2",
        //                 order: 6,
        //                 description: "Lý thuyết về màu sắc- Các cách phối màu cho bức ảnh",
        //                 number_student_attendance: 0
        //             }
        //         ]
        //     },
        //     {
        //         id: 1731,
        //         avatar_url: "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg",
        //         name: "PS 39.14 (Sài Gòn)",
        //         study_time: "(19h - 21h) Thứ 3 - Thứ 5",
        //         activated: 1,
        //         status: 0,
        //         address: "Tầng 4 - Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
        //         paid_target: 20,
        //         register_target: 20,
        //         total_registers: 23,
        //         total_paid: 15,
        //         datestart: "04 Tháng Chín, 2018",
        //         description: "Khai giảng ngày 4 tháng 9 năm 2018",
        //         course: "Photoshop",
        //         isEnrolled: false,
        //         base: {
        //             id: 6,
        //             name: "Cơ sở 3",
        //             address: "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM"
        //         },
        //         lesson: [
        //             {
        //                 class_lesson_id: 13334,
        //                 name: "Ấn phẩm truyền thông",
        //                 order: 6,
        //                 description: "Xây dựng ấn phẩm truyền thông ",
        //                 number_student_attendance: 0
        //             }
        //         ]
        //     },
        //     {
        //         id: 1736,
        //         avatar_url: "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg",
        //         name: "AI 39.13 (Sài Gòn)",
        //         study_time: "(19h - 21h) Thứ 3 - Thứ 5",
        //         activated: 1,
        //         status: 0,
        //         address: "Tầng 4 - Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
        //         paid_target: 20,
        //         register_target: 20,
        //         total_registers: 21,
        //         total_paid: 19,
        //         datestart: "04 Tháng Chín, 2018",
        //         description: "Khai giảng ngày 4 tháng 9 năm 2018",
        //         course: "Illustrator",
        //         isEnrolled: false,
        //         base: {
        //             id: 6,
        //             name: "Cơ sở 3",
        //             address: "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM"
        //         },
        //         lesson: [
        //             {
        //                 class_lesson_id: 13374,
        //                 name: "Infographic",
        //                 order: 6,
        //                 description: "Infographic",
        //                 number_student_attendance: 0
        //             }
        //         ]
        //     },
        //     {
        //         id: 1540,
        //         avatar_url: "http://d1j8r0kxyu9tj8.cloudfront.net/images/1494575688odFkdXzweOeXMpO.jpg",
        //         name: "Thiết kế chuyên sâu 5.1",
        //         study_time: "(19h-21h) Thứ 3 - Thứ 5 - Thứ 7",
        //         activated: 1,
        //         status: 0,
        //         address: "Phòng học 3 - Tầng 2, Toà nhà Trung Yên 1, 58A Trung Kính, Cầu Giấy, Hà Nội",
        //         paid_target: 18,
        //         register_target: 30,
        //         total_registers: 26,
        //         total_paid: 17,
        //         datestart: "31 Tháng Bảy, 2018",
        //         description: "Khai giảng ngày 31 tháng 7 năm 2018",
        //         course: "Thiết Kế Chuyên Sâu",
        //         isEnrolled: false,
        //         base: {
        //             id: 9,
        //             name: "Cơ sở 5",
        //             address: "Tầng 2, Toà nhà Trung Yên 1, 58A Trung Kính, Cầu Giấy, Hà Nội"
        //         },
        //         lesson: [
        //             {
        //                 class_lesson_id: 11576,
        //                 name: "buổi 13",
        //                 order: 14,
        //                 description: ".",
        //                 number_student_attendance: 0
        //             }
        //         ]
        //     }
        // ],
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
    listStudentAttendance: {
        listStudentAttendanceData: [],
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