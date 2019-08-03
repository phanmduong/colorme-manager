/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Body, Card, CardItem} from "native-base";
import LinearGradient from "react-native-linear-gradient";
import Icon from "./common/Icon";

const CardMenu = ({icon, title, onPress}) => {
    return (

        <LinearGradient colors={['#E26800', '#E00000']}
                        style={styles.cardItemMenu}>
            <TouchableOpacity style={styles.containerItemMenu} onPress={onPress}>
                <Icon
                    name={icon}
                    size={40}
                    color={"white"}
                />
                <Text style={styles.cardItemTitle}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>


    )
}

class DashboardComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerMenu}>
                    <View style={styles.containerMenuLine}>
                        <CardMenu icon={"ant|barschart"} title={"Thống kê"}
                                  onPress={() => {
                                      this.props.navigation.navigate("Analytics")
                                  }
                                  }
                        />
                        <CardMenu icon={"ant|smileo"} title={"Check in"}
                                  onPress={() => {
                                      this.props.navigation.navigate("CheckIn", {
                                          title: 'Check in',
                                          type: 'checkin'
                                      })
                                  }}
                        />
                        <CardMenu icon={"ant|frowno"} title={"Check out"}
                                  onPress={() => {
                                      this.props.navigation.navigate("CheckOut", {
                                          title: 'Check out',
                                          type: 'checkout'
                                      })
                                  }}
                        />
                    </View>
                    <View style={styles.containerMenuLine}>
                        <CardMenu icon={"ant|calendar"} title={"Lịch sử lịch làm việc"}
                                  onPress={() => {
                                      this.props.navigation.navigate("HistoryAttendanceWorkShift", {
                                          title: 'Lịch sử lịch làm việc',
                                          type: 'work_shift'
                                      })
                                  }}

                        />
                        <CardMenu icon={"ant|carryout"} title={"Lịch sử lịch trực"}
                                  onPress={() => {
                                      this.props.navigation.navigate("HistoryAttendanceShift", {
                                          title: 'Lịch sử lịch trực',
                                          type: 'shift'
                                      })
                                  }}

                        />
                        <CardMenu icon={"ant|circledowno"} title={"Lịch sử giảng dạy"}
                                  onPress={() => {
                                      this.props.navigation.navigate("HistoryAttendanceTeaching")
                                  }}
                        />
                    </View>
                    <View style={styles.containerMenuLine}>
                        <CardMenu icon={"ant|circledowno"} title={"Xác thực"}
                                  onPress={() => {
                                      this.props.navigation.navigate("AccurateStudent")
                                  }}
                        />
                        <View style={styles.cardItemMenu}/>
                        <View style={styles.cardItemMenu}/>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = {
        container: {
            flex: 1,
        },
        containerMenu: {
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20
        },
        containerMenuLine: {
            flexDirection: "row"
        },
        cardItemMenu: {
            flex: 1,
            borderRadius: 10,
            margin: 10,
            padding: 10,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: 100
        },
        containerItemMenu: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        cardItemTitle: {
            color: "white",
            textAlign: "center"
        }
    }
;

export default (DashboardComponent);