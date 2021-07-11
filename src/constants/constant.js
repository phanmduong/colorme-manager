export const FORMAT_TIME_MYSQL = 'YYYY-MM-DD HH:mm:ss';

export const MEETING_STATUS = {
  accept: {
    text: 'Sẽ tham gia',
    icon: require('../../assets/meeting/like.png'),
    order: 1,
  },
  reject: {
    text: 'Không tham gia',
    icon: require('../../assets/meeting/sad.png'),
    order: 2,
  },
  check_in: {
    text: 'Đã check in',
    icon: require('../../assets/meeting/heart.png'),
    order: 0,
  },
  pending: {
    text: 'Chưa trả lời',
    order: 3,
  },
};

export const MONEY_FILTER = [
  {id: -1, name: 'Tất cả'},
  {id: 1, name: 'Đã nộp'},
  {id: 0, name: 'Chưa nộp'},
];

export const CLASS_STATUS_FILTER = [
  {value: '', name: 'Tất cả'},
  {value: 'active', name: 'Hoạt động'},
  {value: 'waiting', name: 'Chờ'},
];

export const CLASS_STATUS_FILTER_NEW = [
  {id: 'active', name: 'Lớp thường'},
  {id: 'waiting', name: 'Lớp chờ'},
  {id: 'solo', name: 'Lớp 1-1'},
  {id: 'business', name: 'Lớp doanh nghiệp'},
];

export const TELE_CALL_STATUS = [
  {id: -1, name: 'Tất cả̉'},
  {id: 0, name: 'Chưa gọi'},
  {id: 1, name: 'Thành công'},
  {id: 2, name: 'Thất bại'},
];

export const BOOKMARK_FILTER = [
  {id: -1, name: 'Tất cả'},
  {id: 1, name: 'Đã đánh dấu'},
  {id: 0, name: 'Chưa đánh dấu'},
];

export const RATE = [
  {id: 0, name: '0 sao'},
  {id: 1, name: '1 sao'},
  {id: 2, name: '2 sao'},
  {id: 3, name: '3 sao'},
  {id: 4, name: '4 sao'},
  {id: 5, name: '5 sao'},
];

export const CITY = [
  {id: '0', name: 'Không có'},
  {id: '01', name: 'Hà Nội'},
  {id: '79', name: 'Hồ Chí Minh'},
];

export const GENDER = [
  {
    name: 'Nam',
    id: '1',
    label: 'Nam',
    value: '1',
  },
  {
    name: 'Nữ',
    id: '2',
    label: 'Nữ',
    value: '2',
  },

  {
    name: 'Khác',
    id: '0',
    label: 'Khác',
    value: '0',
  },
];

export const TEACHER_ROLE = 'TEACHER_ROLE';
export const TEACHER_ASSISTANT_ROLE = 'TEACHER_ASSISTANT_ROLE';

export const DAILY = 'DAILY';
export const WEEK = 'WEEK';
export const MONTH = 'MONTH';
export const QUARTER = 'QUARTER';
export const YEAR = 'YEAR';

export const ENROLLING = 'ENROLLING';
export const STUDYING = 'STUDYING';

export const FILTER_KPI_TYPE = [
  {
    id: 'revenue',
    name: 'KPI doanh thu',
    color: 'rgb(76, 77, 195)',
    unit: 'VNĐ',
  },
  {
    id: 'lead',
    name: 'KPI số lượng lead',
    color: 'rgb(68, 150, 236)',
    unit: 'Lead',
  },
  {
    id: 'enrollment',
    name: 'KPI số lượng học viên',
    color: 'rgb(255, 123, 66)',
    unit: 'Lượt',
  },
];

export const FILTER_KPI_CALCULATE_BY = [
  {
    id: 'employee',
    name: 'Theo nhân viên',
    color: 'rgb(238, 66, 140)',
    unit: 'nhân viên',
    type: ['revenue', 'lead'],
  },
  {
    id: 'campaign',
    name: 'Theo chiến dịch',
    color: 'rgb(68, 150, 236)',
    unit: 'chiến dịch',
    type: ['revenue', 'lead'],
  },
  {
    id: 'source',
    name: 'Theo nguồn',
    color: 'rgb(255, 123, 66)',
    unit: 'nguồn',
    type: ['revenue', 'lead'],
  },
  {
    id: 'course',
    name: 'Theo môn học',
    color: 'rgb(50, 202, 65)',
    unit: 'môn học',
    type: ['revenue', 'enrollment'],
  },
  {
    id: 'program',
    name: 'Theo chương trình học',
    color: 'rgb(255, 123, 66)',
    unit: 'chương trình học',
    type: ['revenue', 'enrollment'],
  },
];

export const DUPLICATE_FILTER = [
  {id: '', name: 'Tất cả'},
  {id: 'email', name: 'Trùng email'},
  {id: 'phone', name: 'Trùng phone'},
];

export const LEAD_TAG_FILTER = [
  {id: '', name: 'Tất cả'},
  {id: 'first_lead', name: 'First Lead'},
  {id: 'old_lead', name: 'Old Lead'},
  {id: 'new_lead', name: 'New Lead'},
];

export const STATUS_FILTER = [
  {id: 1, name: 'Đang tuyển sinh'},
  {id: 0, name: 'Đang học'},
];

export const REGISTER_CALL_STATUS = [
  {id: 12, name: 'Báo hủy lớp'},
  {id: 13, name: 'Xác nhận đăng ký'},
];

export const PAYMENT_METHOD = [
  {id: 'internet_banking', name: 'Chuyển khoản'},
  {id: 'cash', name: 'Tiền mặt'},
  {id: 'swipe', name: 'Quẹt thẻ'},
];

export const ADDRESS = [
  {id: 'Hà Nội', name: 'Hà Nội'},
  {id: 'Hồ Chí Minh', name: 'Hồ Chí Minh'},
];

export const DAYS = [
  {id: 'monday', name: 'Thứ hai'},
  {id: 'tuesday', name: 'Thứ ba'},
  {id: 'wednesday', name: 'Thứ tư'},
  {id: 'thursday', name: 'Thứ năm'},
  {id: 'friday', name: 'Thứ sáu'},
  {id: 'saturday', name: 'Thứ bảy'},
  {id: 'sunday', name: 'Chủ nhật'},
];

export const COLORS = [
  {id: '#1FBC9C', name: 'Xanh lam', color: '#1FBC9C'},
  {id: '#1CA085', name: 'Xanh lam đậm', color: '#1CA085'},
  {id: '#2ECC70', name: 'Xanh lá cây', color: '#2ECC70'},
  {id: '#27AF60', name: 'Xanh lá cây đậm', color: '#27AF60'},
  {id: '#3398DB', name: 'Xanh dương', color: '#3398DB'},
  {id: '#2980B9', name: 'Xanh dương đậm', color: '#2980B9'},
  {id: '#A463BF', name: 'Tím', color: '#A463BF'},
  {id: '#8E43AD', name: 'Tím đậm', color: '#8E43AD'},
  {id: '#3D556E', name: 'Xanh đen', color: '#3D556E'},
  {id: '#222F3D', name: 'Đen', color: '#222F3D'},
  {id: '#222F3D', name: 'Vàng', color: '#222F3D'},
  {id: '#F39C19', name: 'Cam', color: '#F39C19'},
  {id: '#E84B3C', name: 'Đỏ', color: '#E84B3C'},
  {id: '#C0382B', name: 'Đỏ đậm', color: '#C0382B'},
  {id: '#DDE6E8', name: 'Trắng', color: '#DDE6E8'},
  {id: '#BDC3C8', name: 'Xám', color: '#BDC3C8'},
];

export const NOTIFICATION_ID = 'NULL';
