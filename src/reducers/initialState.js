/**
 * Created by phanmduong on 4/5/17.
 */
export default {
    statusBar: {
        color: 'default'
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
        isGetDataLocalSuccessful: false
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
        classData: [
            {
                "id": 489,
                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg",
                "name": "PS 23.1",
                "study_time": "(15h-17h) Thứ 3 - Thứ 5",
                "activated": 1,
                "status": 1,
                "address": "Tầng 5 - 175 Chùa Láng - Đống Đa - Hà Nội",
                "paid_target": 20,
                "register_target": 25,
                "total_registers": 17,
                "total_paid": 16,
                "datestart": "11 Tháng Tư, 2017",
                "description": "Khai giảng ngày 11 tháng 4  năm 2017",
                "course": "Photoshop",
                "isEnrolled": false,
                "base": {
                    "id": 3,
                    "name": "Cơ sở 1",
                    "address": "175 Chùa Láng - Đống Đa - Hà Nội"
                },
                "lesson": [
                    {
                        "name": "Blend",
                        "order": 5,
                        "description": "Blend"
                    }
                ]
            },
            {
                "id": 507,
                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg",
                "name": "AI 23.7",
                "study_time": "(15h-17h) Thứ 3 - Thứ 5",
                "activated": 1,
                "status": 1,
                "address": "Tầng 5 - Số 162, Ngõ 83 Trường Chinh - Thanh Xuân - Hà Nội",
                "paid_target": 20,
                "register_target": 25,
                "total_registers": 6,
                "total_paid": 6,
                "datestart": "11 Tháng Tư, 2017",
                "description": "Khai giảng ngày 11 tháng 4 năm 2017",
                "course": "Illustrator",
                "isEnrolled": false,
                "base": {
                    "id": 4,
                    "name": "Cơ sở 2",
                    "address": "Số 162, Ngõ 83 Trường Chinh - Thanh Xuân - Hà Nội"
                },
                "lesson": [
                    {
                        "name": "Layout & quy trình sáng tạo logo",
                        "order": 5,
                        "description": "Thực hành làm logo theo quy trình sáng tạo Logo - Phân tích Case Study để tạo logo  - Design camp"
                    }
                ]
            },
            {
                "id": 516,
                "avatar_url": "https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1468283993EUvpBPDYpu8IkQ0.jpg",
                "name": "PT 23.1",
                "study_time": "(15h-17h) Thứ 3 - Thứ 5",
                "activated": 1,
                "status": 0,
                "address": "Studio Tầng 5 - 175 Chùa Láng - Đống Đa - Hà Nội",
                "paid_target": 10,
                "register_target": 18,
                "total_registers": 9,
                "total_paid": 9,
                "datestart": "11 Tháng Tư, 2017",
                "description": "Khai giảng ngày 11 tháng 4 năm 2017",
                "course": "Photography",
                "isEnrolled": false,
                "base": {
                    "id": 3,
                    "name": "Cơ sở 1",
                    "address": "175 Chùa Láng - Đống Đa - Hà Nội"
                },
                "lesson": [
                    {
                        "name": "Bố cục-Tạo dáng- Thực hành chụp Lookbook",
                        "order": 5,
                        "description": "Bố cục ảnh-Hiệu ứng thị giác-Tạo dáng cơ bản-Thực hành chụp ảnh lookbook"
                    }
                ]
            },
            {
                "id": 523,
                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1481009736PWVqDXlU8KoFwwJ.jpg",
                "name": "PR 23.2",
                "study_time": "(15h-17h) Thứ 3 - Thứ 5",
                "activated": 1,
                "status": 1,
                "address": "Tầng 2 - 175 Chùa Láng - Đống Đa - Hà Nội",
                "paid_target": 20,
                "register_target": 25,
                "total_registers": 11,
                "total_paid": 10,
                "datestart": "11 Tháng Tư, 2017",
                "description": "Khai giảng ngày 11 tháng 4 năm 2017",
                "course": "Premiere",
                "isEnrolled": false,
                "base": {
                    "id": 3,
                    "name": "Cơ sở 1",
                    "address": "175 Chùa Láng - Đống Đa - Hà Nội"
                },
                "lesson": [
                    {
                        "name": "Quy trình xây dựng video/clip",
                        "order": 5,
                        "description": "- Phân tích quy trình làm các thể loại clip và chọn đề tài cuối kỳ  - Hiệu ứng âm thanh  - Ghi âm - Thực hành lồng nhạc trên clip có sẵn (https://www.facebook.com/welaxvn/videos/361286324252871/?hc_ref=SEARCH)"
                    }
                ]
            },
            {
                "id": 531,
                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg",
                "name": "PS 23.12 (Sài Gòn)",
                "study_time": "(15h-17h) Thứ 3 - Thứ 5",
                "activated": 1,
                "status": 0,
                "address": "Tầng 4 - Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn",
                "paid_target": 15,
                "register_target": 20,
                "total_registers": 12,
                "total_paid": 12,
                "datestart": "04 Tháng Tư, 2017",
                "description": "Khai giảng ngày 4 tháng 4 năm 2017",
                "course": "Photoshop",
                "isEnrolled": false,
                "base": {
                    "id": 6,
                    "name": "Cơ sở 3",
                    "address": "Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn"
                },
                "lesson": [
                    {
                        "name": "CV",
                        "order": 7,
                        "description": "CV"
                    }
                ]
            },
            {
                "id": 531,
                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg",
                "name": "PS 23.12 (Sài Gòn)",
                "study_time": "(15h-17h) Thứ 3 - Thứ 5",
                "activated": 1,
                "status": 0,
                "address": "Tầng 4 - Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn",
                "paid_target": 15,
                "register_target": 20,
                "total_registers": 12,
                "total_paid": 12,
                "datestart": "04 Tháng Tư, 2017",
                "description": "Khai giảng ngày 4 tháng 4 năm 2017",
                "course": "Photoshop",
                "isEnrolled": false,
                "base": {
                    "id": 6,
                    "name": "Cơ sở 3",
                    "address": "Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn"
                },
                "lesson": [
                    {
                        "name": "CV",
                        "order": 7,
                        "description": "CV"
                    }
                ]
            }, {
                "id": 531,
                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg",
                "name": "PS 23.12 (Sài Gòn)",
                "study_time": "(15h-17h) Thứ 3 - Thứ 5",
                "activated": 1,
                "status": 0,
                "address": "Tầng 4 - Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn",
                "paid_target": 15,
                "register_target": 20,
                "total_registers": 12,
                "total_paid": 12,
                "datestart": "04 Tháng Tư, 2017",
                "description": "Khai giảng ngày 4 tháng 4 năm 2017",
                "course": "Photoshop",
                "isEnrolled": false,
                "base": {
                    "id": 6,
                    "name": "Cơ sở 3",
                    "address": "Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn"
                },
                "lesson": [
                    {
                        "name": "CV",
                        "order": 7,
                        "description": "CV"
                    }
                ]
            },
            {
                "id": 531,
                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg",
                "name": "PS 23.12 (Sài Gòn)",
                "study_time": "(15h-17h) Thứ 3 - Thứ 5",
                "activated": 1,
                "status": 0,
                "address": "Tầng 4 - Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn",
                "paid_target": 15,
                "register_target": 20,
                "total_registers": 12,
                "total_paid": 12,
                "datestart": "04 Tháng Tư, 2017",
                "description": "Khai giảng ngày 4 tháng 4 năm 2017",
                "course": "Photoshop",
                "isEnrolled": false,
                "base": {
                    "id": 6,
                    "name": "Cơ sở 3",
                    "address": "Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn"
                },
                "lesson": [
                    {
                        "name": "CV",
                        "order": 7,
                        "description": "CV"
                    }
                ]
            },
            {
                "id": 531,
                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg",
                "name": "PS 23.12 (Sài Gòn)",
                "study_time": "(15h-17h) Thứ 3 - Thứ 5",
                "activated": 1,
                "status": 0,
                "address": "Tầng 4 - Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn",
                "paid_target": 15,
                "register_target": 20,
                "total_registers": 12,
                "total_paid": 12,
                "datestart": "04 Tháng Tư, 2017",
                "description": "Khai giảng ngày 4 tháng 4 năm 2017",
                "course": "Photoshop",
                "isEnrolled": false,
                "base": {
                    "id": 6,
                    "name": "Cơ sở 3",
                    "address": "Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn"
                },
                "lesson": [
                    {
                        "name": "CV",
                        "order": 7,
                        "description": "CV"
                    }
                ]
            },
            {
                "id": 531,
                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg",
                "name": "PS 23.12 (Sài Gòn)",
                "study_time": "(15h-17h) Thứ 3 - Thứ 5",
                "activated": 1,
                "status": 0,
                "address": "Tầng 4 - Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn",
                "paid_target": 15,
                "register_target": 20,
                "total_registers": 12,
                "total_paid": 12,
                "datestart": "04 Tháng Tư, 2017",
                "description": "Khai giảng ngày 4 tháng 4 năm 2017",
                "course": "Photoshop",
                "isEnrolled": false,
                "base": {
                    "id": 6,
                    "name": "Cơ sở 3",
                    "address": "Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn"
                },
                "lesson": [
                    {
                        "name": "CV",
                        "order": 7,
                        "description": "CV"
                    }
                ]
            },
            {
                "id": 531,
                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg",
                "name": "PS 23.12 (Sài Gòn)",
                "study_time": "(15h-17h) Thứ 3 - Thứ 5",
                "activated": 1,
                "status": 0,
                "address": "Tầng 4 - Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn",
                "paid_target": 15,
                "register_target": 20,
                "total_registers": 12,
                "total_paid": 12,
                "datestart": "04 Tháng Tư, 2017",
                "description": "Khai giảng ngày 4 tháng 4 năm 2017",
                "course": "Photoshop",
                "isEnrolled": false,
                "base": {
                    "id": 6,
                    "name": "Cơ sở 3",
                    "address": "Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn"
                },
                "lesson": [
                    {
                        "name": "CV",
                        "order": 7,
                        "description": "CV"
                    }
                ]
            },
            {
                "id": 531,
                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg",
                "name": "PS 23.12 (Sài Gòn)",
                "study_time": "(15h-17h) Thứ 3 - Thứ 5",
                "activated": 1,
                "status": 0,
                "address": "Tầng 4 - Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn",
                "paid_target": 15,
                "register_target": 20,
                "total_registers": 12,
                "total_paid": 12,
                "datestart": "04 Tháng Tư, 2017",
                "description": "Khai giảng ngày 4 tháng 4 năm 2017",
                "course": "Photoshop",
                "isEnrolled": false,
                "base": {
                    "id": 6,
                    "name": "Cơ sở 3",
                    "address": "Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài Gòn"
                },
                "lesson": [
                    {
                        "name": "CV",
                        "order": 7,
                        "description": "CV"
                    }
                ]
            }
        ],
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
        registerListData: [],
        isLoading: false,
        error: false,
        isSearchLoading: false,
        errorSearch: false,
        page: 0,
        pageSearch: 0,
        search: '',
        segment: 1
    },



}