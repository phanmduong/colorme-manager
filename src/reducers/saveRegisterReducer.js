import initialState from './initialState';
import * as type from '../constants/actionTypes';

export function saveRegisterReducer(state = initialState.saveRegister, action) {
  switch (action.type) {
    case type.BEGIN_LOAD_COURSES:
      return Object.assign({}, state, {
        isLoadingCourses: action.isLoadingCourses,
        errorLoadingCourses: action.errorLoadingCourses,
      });
    case type.LOAD_COURSES_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingCourses: action.isLoadingCourses,
        errorLoadingCourses: action.errorLoadingCourses,
        courses: action.courses,
      });
    case type.LOAD_COURSES_ERROR:
      return Object.assign({}, state, {
        isLoadingCourses: action.isLoadingCourses,
        errorLoadingCourses: action.errorLoadingCourses,
      });
    case type.BEGIN_LOAD_REGISTER_CLASSES:
      return Object.assign({}, state, {
        isLoadingClasses: action.isLoadingClasses,
        errorLoadingClasses: action.errorLoadingClasses,
      });
    case type.LOAD_REGISTER_CLASSES_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingClasses: action.isLoadingClasses,
        errorLoadingClasses: action.errorLoadingClasses,
        classes: action.classes,
      });
    case type.LOAD_REGISTER_CLASSES_ERROR:
      return Object.assign({}, state, {
        isLoadingClasses: action.isLoadingClasses,
        errorLoadingClasses: action.errorLoadingClasses,
      });
    case type.BEGIN_REGISTER_STUDENT:
      return Object.assign({}, state, {
        isLoadingRegister: action.isLoadingRegister,
        errorLoadingRegister: action.errorLoadingRegister,
      });
    case type.REGISTER_STUDENT_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingRegister: action.isLoadingRegister,
        errorLoadingRegister: action.errorLoadingRegister,
      });
    case type.REGISTER_STUDENT_ERROR:
      return Object.assign({}, state, {
        isLoadingRegister: action.isLoadingRegister,
        errorLoadingRegister: action.errorLoadingRegister,
      });
    case type.BEGIN_LOAD_CAMPAIGNS:
      return Object.assign({}, state, {
        isLoadingCampaigns: action.isLoadingCampaigns,
        errorLoadingCampaigns: action.errorLoadingCampaigns,
      });
    case type.LOAD_CAMPAIGNS_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingCampaigns: action.isLoadingCampaigns,
        errorLoadingCampaigns: action.errorLoadingCampaigns,
        campaigns: action.campaigns,
      });
    case type.LOAD_CAMPAIGNS_ERROR:
      return Object.assign({}, state, {
        isLoadingCampaigns: action.isLoadingCampaigns,
        errorLoadingCampaigns: action.errorLoadingCampaigns,
      });
    case type.BEGIN_LOAD_PROVINCES:
      return Object.assign({}, state, {
        isLoadingProvinces: action.isLoadingProvinces,
        errorLoadingProvinces: action.errorLoadingProvinces,
      });
    case type.LOAD_PROVINCES_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingProvinces: action.isLoadingProvinces,
        errorLoadingProvinces: action.errorLoadingProvinces,
        provinces: action.provinces,
      });
    case type.LOAD_PROVINCES_ERROR:
      return Object.assign({}, state, {
        isLoadingProvinces: action.isLoadingProvinces,
        errorLoadingProvinces: action.errorLoadingProvinces,
      });
    case type.BEGIN_LOAD_SOURCES:
      return Object.assign({}, state, {
        isLoadingSources: action.isLoadingSources,
        errorLoadingSources: action.errorLoadingSources,
      });
    case type.LOAD_SOURCES_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingSources: action.isLoadingSources,
        errorLoadingSources: action.errorLoadingSources,
        sources: action.sources,
      });
    case type.LOAD_SOURCES_ERROR:
      return Object.assign({}, state, {
        isLoadingSources: action.isLoadingSources,
        errorLoadingSources: action.errorLoadingSources,
      });
    case type.BEGIN_LOAD_STATUSES:
      return Object.assign({}, state, {
        isLoadingStatuses: action.isLoadingStatuses,
        errorLoadingStatuses: action.errorLoadingStatuses,
      });
    case type.LOAD_STATUSES_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingStatuses: action.isLoadingStatuses,
        errorLoadingStatuses: action.errorLoadingStatuses,
        statuses: action.statuses,
      });
    case type.LOAD_STATUSES_ERROR:
      return Object.assign({}, state, {
        isLoadingStatuses: action.isLoadingStatuses,
        errorLoadingStatuses: action.errorLoadingStatuses,
      });
    case type.BEGIN_LOAD_SALERS:
      return Object.assign({}, state, {
        isLoadingSalers: action.isLoadingSalers,
        errorLoadingSalers: action.errorLoadingSalers,
      });
    case type.LOAD_SALERS_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingSalers: action.isLoadingSalers,
        errorLoadingSalers: action.errorLoadingSalers,
        salers: action.salers,
      });
    case type.LOAD_SALERS_ERROR:
      return Object.assign({}, state, {
        isLoadingSalers: action.isLoadingSalers,
        errorLoadingSalers: action.errorLoadingSalers,
      });
    case type.BEGIN_LOAD_FILTER_CLASSES:
      return Object.assign({}, state, {
        isLoadingFilterClasses: action.isLoadingFilterClasses,
        errorLoadingFilterClasses: action.errorLoadingFilterClasses,
      });
    case type.LOAD_FILTER_CLASSES_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingFilterClasses: action.isLoadingFilterClasses,
        errorLoadingFilterClasses: action.errorLoadingFilterClasses,
        filterClasses: action.filterClasses,
      });
    case type.LOAD_FILTER_CLASSES_ERROR:
      return Object.assign({}, state, {
        isLoadingFilterClasses: action.isLoadingFilterClasses,
        errorLoadingFilterClasses: action.errorLoadingFilterClasses,
      });
    default:
      return state;
  }
}
