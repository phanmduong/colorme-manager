import HistoryAttendanceTeachingContainer from '../containers/historyAttendanceTeaching/HistoryAttendanceTeachingContainer';
import React from 'react';
import InfoStudentRegistersContainer from '../containers/infoStudent/InfoStudentRegistersContainer';
import moment from 'moment';
import {ENROLLING} from '../constants/constant';
/**
 * Created by phanmduong on 4/5/17.
 */
export default {
  statusBar: {
    color: 'light-content',
  },
  autoLogin: {
    isAutoLogin: true,
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
    domain: 'alibaba',
  },
  tab: {
    tabs: [],
    loading: false,
    error: false,
  },
  base: {
    baseData: [],
    isLoading: false,
    error: false,
    selectedBaseId: -1,
  },
  course: {
    courseData: [],
    isLoading: false,
    error: false,
    selectedCourseId: -1,
    currentPage: 0,
    totalPage: 1,
    search: '',
    refreshing: false,
    statusChanging: false,
    parentCourses: [],
    loadingParentCourses: false,
    errorParentCourses: false,
    creating: false,
    loadingCourseDetails: false,
    errorCourseDetails: false,
    courseDetails: {},
    refreshingCourseDetails: false,
  },
  gen: {
    genData: [],
    isLoading: false,
    error: false,
    selectedGenId: -1,
    currentGen: 0,
    teachingGen: 0,
    genDataV2: [],
  },
  lessonCourse: {
    lessonCourseData: [],
    isLoading: false,
    error: false,
    selectedLessonCourseId: -1,
  },
  class: {
    classData: [],
    isLoading: false,
    courseData: [],
    isLoadingCourse: false,
    error: false,
    selectedClassId: -1,
    isRefreshing: false,
    baseData: [],
    isLoadingBase: false,
    errorLoadingBase: false,
    schedules: [],
    isLoadingSchedules: false,
    errorSchedules: false,
    rooms: [],
    isLoadingRooms: false,
    errorRooms: false,
    courses: [],
    loadingInfoCreateClass: false,
    errorInfoCreateClass: false,
    isUpdatingClass: false,
    errorUpdatingClass: false,
    classInfo: {},
    loadingClassInfo: false,
    errorClassInfo: false,
    changingClassStatus: false,
    errorClassStatus: false,
    currentPage: 0,
    totalPage: 1,
    search: '',
    selectedBaseId: '',
    selectedGenId: '',
    selectedCourseId: '',
    provinceId: '',
    courseId: '',
    enrollStartTime: '',
    enrollEndTime: '',
    lessonStartTime: '',
    lessonEndTime: '',
    startTime: '',
    endTime: '',
    teacherId: '',
    type: '',
    status: '',
    class_status: '',
    statuses: [],
    isLoadingStatuses: false,
    errorStatuses: false,
    creatingClassSchedule: false,
    roomId: '',
  },
  currentClassStudy: {
    classData: [],
    isLoading: false,
    refreshing: false,
    error: false,
    selectedCurrentClassStudy: {},
    selectedDate: moment(new Date()).format('YYYY-MM-DD'),
  },
  qrcode: {
    isScanned: false,
  },
  attendanceStudent: {
    isLoadingInfoStudent: false,
    isUpdatingAttendanceStudent: false,
    student: {
      attendances: [{}],
    },
    classStudent: {},
    attendance: [],
    message: '',
    errorLoad: false,
    errorUpdate: false,
    statusRequestUpdated: -1,
    messageError: undefined,
    isChangeStatusBlocking: false,
    isChangingClassAttendance: false,
    errorClassAttendance: false,
  },
  shiftRegister: {
    isLoading: false,
    error: false,
    shiftRegisterData: {},
    selectedBaseId: -1,
    selectedGenId: -1,
  },
  analytics: {
    isLoadingAnalyticsRegister: false,
    errorAnalyticsRegister: false,
    refreshingAnalyticsRegister: false,
    analyticsRegister: {},
    selectedProvinceId: -1,
    selectedBaseId: -1,
    selectedGenId: -1,
    selectedStaffId: -1,
    startDate: moment().startOf('month'),
    endDate: moment(),
    analyticsRevenue: {},
    isLoadingAnalyticsRevenue: false,
    errorAnalyticsRevenue: false,
    refreshingAnalyticsRevenue: false,
    selectedCourseId: -1,
    selectedSourceId: -1,
    selectedCampaignId: -1,
    analyticsClasses: [],
    isLoadingAnalyticsClasses: false,
    errorAnalyticsClasses: false,
    enrollStart: moment().startOf('month'),
    enrollEnd: moment(),
    classType: ENROLLING,
  },
  listStudentClass: {
    listStudentClassData: [],
    isLoading: false,
    refreshing: false,
    error: false,
    lessons: [],
    isLoadingLessons: false,
    currentPageLessons: 0,
    totalPageLessons: 1,
    errorLessons: false,
    refreshingLessons: false,
    changingClassLessons: false,
    errorChangeClassLessons: false,
    changingClassLesson: false,
    errorChangeClassLesson: false,
    changingClassTeach: false,
    errorChangeClassTeach: false,
    changingClassAssist: false,
    errorChangeClassAssist: false,
    previews: [],
    previewingClassLessons: false,
    errorPreviewClassLessons: false,
  },
  listStudentAttendance: {
    listStudentAttendanceData: [],
    isLoading: false,
    error: false,
  },
  registerList: {
    registerListDataMy: [],
    isLoadingMy: false,
    errorMy: false,
    currentPageMy: 0,
    totalPageMy: 1,
    searchMy: '',
    refreshingMy: false,
    salerId: '',
    campaignId: '',
    paidStatus: '',
    classStatus: '',
    callStatus: '',
    bookmark: '',
    start_time: '',
    end_time: '',
    appointmentPaymentStartTime: '',
    appointmentPaymentEndTime: '',
    source_id: '',
    status_id: '',
    classId: '',
    courseId: '',
    note: '',
    callBackStartTime: '',
    callBackEndTime: '',
    autoFocusRegisterListSearch: false,
    classes: [],
    isLoadingClasses: false,
    errorClasses: false,
    changeClassStatus: null,
    changingClass: false,
    errorChangeClass: false,
    provinceId: '',
    couponId: '',
    baseId: '',
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
      isReceivedCard: false,
    },
    refreshing: false,
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
    openTabMoneyTransfer: false,
    refreshingStaffList: false,
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
    checkIn: {},
  },
  historyTab: {
    teachingShift: {
      gradient: ['#E26800', '#E00000'],
      textColor: {
        color: 'white',
      },
    },
    workShift: {
      gradient: ['#FFFFFF', '#FFFFFF'],
      textColor: {
        color: 'black',
      },
    },
    dutyShift: {
      gradient: ['#FFFFFF', '#FFFFFF'],
      textColor: {
        color: 'black',
      },
    },
    tabComponent: <HistoryAttendanceTeachingContainer />,
  },
  workShiftRegister: {
    isLoading: false,
    error: false,
    refreshing: false,
    workShiftRegisterData: [],
    selectedBaseId: '',
    startTime: moment().startOf('week').day('Monday').unix(),
    endTime: moment().endOf('week').unix(),
    selectedStaffId: '',
    statistics: [],
    isLoadingStatistics: false,
    errorStatistics: false,
    refreshingStatistics: false,
  },
  teachingRating: {
    isLoadingTeacherRating: false,
    errorTeacherRating: false,
    teacherRatingData: [],
    isLoadingAssistantRating: false,
    errorAssistantRating: false,
    assistantRatingData: [],
    selectedGenId: -1,
    teacherFeedback: {},
    isLoadingTeacherFeedback: false,
    errorLoadingTeacherFeedback: false,
    assistantFeedback: {},
    isLoadingAssistantFeedback: false,
    errorLoadingAssistantFeedback: false,
  },
  teachingTeam: {
    teacherList: [],
    assistantList: [],
    isLoadingTeacherList: false,
    isLoadingAssistantList: false,
    errorLoadingTeacherList: false,
    errorLoadingAssistantList: false,
    selectedGenId: -1,
  },
  teachingRatingDuplicate: {
    isLoadingTeacherRating: false,
    errorTeacherRating: false,
    teacherRatingData: [],
    isLoadingAssistantRating: false,
    errorAssistantRating: false,
    assistantRatingData: [],
    selectedGenId: -1,
    teacherFeedback: {},
    isLoadingTeacherFeedback: false,
    errorLoadingTeacherFeedback: false,
    assistantFeedback: {},
    isLoadingAssistantFeedback: false,
    errorLoadingAssistantFeedback: false,
  },
  detailShifts: {
    isLoading: false,
    error: false,
    detailShifts: [],
  },
  makeupClasses: {
    isLoadingScheduleClasses: false,
    errorScheduleClasses: false,
    schedule: [],
    isLoadingAllCourses: false,
    errorLoadingAllCourses: false,
    courses: [],
  },
  saveRegister: {
    isLoadingCourses: false,
    errorLoadingCourses: false,
    courses: [],
    isLoadingClasses: false,
    errorLoadingClasses: false,
    classes: [],
    isLoadingRegister: false,
    errorLoadingRegister: false,
    isLoadingCampaigns: false,
    errorLoadingCampaigns: false,
    campaigns: [],
    isLoadingProvinces: false,
    errorLoadingProvinces: false,
    provinces: [],
    isLoadingSources: false,
    errorLoadingSources: false,
    sources: [],
    isLoadingStatuses: false,
    errorLoadingStatuses: false,
    statuses: [],
    isLoadingSalers: false,
    errorLoadingSalers: false,
    salers: [],
    isLoadingFilterClasses: false,
    errorLoadingFilterClasses: false,
    filterClasses: [],
    isLoadingCoupons: false,
    errorCoupons: false,
    coupons: [],
    createdRegister: null,
  },
  infoStudent: {
    isLoadingRegisters: false,
    errorRegisters: false,
    refreshingRegisters: false,
    registers: [],
    studentId: -1,
    isLoadingChangeCallStatus: false,
    errorChangeCallStatus: false,
    isLoadingSubmitMoney: false,
    errorSubmitMoney: false,
    student: {},
    isLoadingStudent: false,
    errorStudent: false,
    isUploadingImage: false,
    errorUploadingImage: false,
    isUpdatingProfile: false,
    errorUpdatingProfile: false,
    historyCalls: [],
    isLoadingHistoryCalls: false,
    errorLoadingHistoryCalls: false,
    refreshingHistoryCalls: false,
    historyCollect: [],
    isLoadingHistoryCollect: false,
    errorLoadingHistoryCollect: false,
    refreshingHistoryCollect: false,
    progress: [],
    isLoadingProgress: false,
    errorLoadingProgress: false,
    refreshingProgress: false,
    isChangingPassword: false,
    errorPassword: false,
  },
  infoStudentTab: {
    registers: {
      gradient: ['#F6F6F6', '#F6F6F6'],
      textColor: {
        color: 'black',
        fontWeight: '600',
      },
    },
    historyCalls: {
      gradient: ['#FFFFFF', '#FFFFFF'],
      textColor: {
        color: 'black',
      },
    },
    progress: {
      gradient: ['#FFFFFF', '#FFFFFF'],
      textColor: {
        color: 'black',
      },
    },
    historyCollectMoney: {
      gradient: ['#FFFFFF', '#FFFFFF'],
      textColor: {
        color: 'black',
      },
    },
    tabComponent: <InfoStudentRegistersContainer />,
  },
  task: {
    selectedDate: moment(new Date()).format('YYYY-MM-DD'),
    taskAnalytics: [],
    isLoadingTaskAnalytics: false,
    errorLoadingTaskAnalytics: false,
    taskView: [],
    isLoadingTaskView: false,
    errorLoadingTaskView: false,
    employees: [],
    isLoadingTaskEmployees: false,
    errorLoadingTaskEmployees: false,
  },
  notification: {
    notifications: [],
    isLoadingNotifications: false,
    errorLoadingNotifications: false,
    unread: -1,
    isLoadingMoreNotifications: false,
    errorLoadingMoreNotifications: false,
    isRefreshingNotifications: false,
    errorRefreshingNotifications: false,
    isReadingNotifications: false,
    errorReadingNotifications: false,
  },
  profile: {
    user: {},
    isLoadingProfile: false,
    errorLoadingProfile: false,
    avatar_url: null,
    isChangingAvatar: false,
    errorChangingAvatar: false,
    isUpdatingProfile: false,
    errorUpdatingProfile: false,
  },
  document: {
    isLoadingDoc: false,
    refreshingDoc: false,
    errorDoc: false,
    documents: [],
    departments: [],
    isLoadingDepartments: false,
    errorDepartments: false,
  },
  leads: {
    isLoadingLeads: false,
    errorLeads: false,
    leads: [],
    refreshingLeads: false,
    staff: [],
    isLoadingStaff: false,
    errorStaff: false,
    isSavingLead: false,
    errorSaveLead: false,
    isChangingCampaignTag: false,
    errorChangeCampaignTag: false,
    isChangingSourceTag: false,
    errorChangeSourceTag: false,
    isChangingStatusTag: false,
    errorChangeStatusTag: false,
    isChangingPICTag: false,
    errorChangePICTag: false,
    isChangingRate: false,
    errorChangeRate: false,
    courses: [],
    isLoadingCourses: false,
    errorCourses: false,
    currentPageLeads: 0,
    totalPageLeads: 1,
    searchLeads: '',
    start_time: '',
    end_time: '',
    rate: '',
    address: '',
    orderBy: 'created_at',
    source_id: '',
    campaign_id: '',
    callBackStartTime: '',
    callBackEndTime: '',
    mockExamStartTime: '',
    mockExamEndTime: '',
    duplicate: '',
    baseId: '',
    leadTag: '',
    sortedBy: 'desc',
    picId: '',
    status_id: '',
  },
  staff: {
    staff: [],
    isLoadingStaff: false,
    errorStaff: false,
    totalPage: 1,
    currentPage: 0,
    search: '',
    refreshingStaff: false,
    departments: [],
    isLoadingDepartments: false,
    errorDepartments: false,
    roles: [],
    isLoadingRoles: false,
    errorRoles: false,
  },
  clockManage: {
    selectedDate: moment(new Date()).unix(),
    shifts: [],
    isLoadingShifts: false,
    errorShifts: false,
    classes: [],
    isLoadingClasses: false,
    errorClasses: false,
    workShiftData: [],
    isLoadingWorkShiftData: false,
    errorWorkShiftData: false,
    selectedEmployee: null,
    employeeSelectedDate: null,
  },
  kpi: {
    kpis: [],
    loading: false,
    error: false,
    refreshing: false,
    currentPage: 0,
    totalPage: 1,
    search: '',
    type: '',
    calculateBy: '',
    startTime: moment().startOf('month'),
    endTime: moment().endOf('month'),
    settings: [],
    loadingSettings: false,
    errorSettings: false,
    employees: [],
    loadingEmployees: false,
    errorEmployees: false,
    addingKpis: false,
    errorAddKpis: false,
    campaigns: [],
    loadingCampaigns: false,
    errorCampaigns: false,
    sources: [],
    loadingSources: false,
    errorSources: false,
    courses: [],
    loadingCourses: false,
    errorCourses: false,
  },
  teachingSchedule: {
    classes: [],
    loading: false,
    error: false,
    teacherId: '',
    baseId: '',
    courseId: '',
    provinceId: '',
    type: '',
    startTime: moment().startOf('month').unix(),
    endTime: moment().endOf('month').unix(),
    roomId: '',
    genId: '',
    enrollStartDate: '',
    enrollEndDate: '',
  },
  form: {
    forms: [],
    loading: false,
    error: false,
    refreshing: false,
    currentPage: 0,
    totalPage: 1,
    search: '',
    creating: false,
    updating: false,
    duplicating: false,
    deleting: false,
  },
};
