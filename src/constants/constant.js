export const FORMAT_TIME_MYSQL = "YYYY-MM-DD HH:mm:ss";

export const MEETING_STATUS = {
    "accept": {
        text: "Sẽ tham gia",
        icon: require('../../assets/meeting/like.png'),
        order: 1
    },
    "reject": {
        text: "Không tham gia",
        icon: require('../../assets/meeting/sad.png'),
        order: 2,
    },
    "check_in": {
        text: "Đã check in",
        icon: require('../../assets/meeting/heart.png'),
        order: 0
    },
};