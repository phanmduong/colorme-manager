/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import HeaderSection from "./common/HeaderSection";
import withStyle from "./HOC/withStyle";
import MeetingItem from "./meeting/MeetingItem";
import Section from "./common/Section";
import {observer} from "mobx-react";
import Loading from "./common/Loading";
import moment from "moment";
import {FORMAT_TIME_MYSQL} from "../constants/constant";

@observer
class MeetingComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {isLoading, meetingsNow, meetingsSoon} = this.props.store;
        return (
            <SafeAreaView style={{flex: 1}}>
                {isLoading ? <Loading/> :
                    <View>
                        {meetingsNow.length > 0 &&
                        <Section>
                            <HeaderSection title={"Cuộc họp"} subtitle={"Đang diễn ra"}/>
                            {meetingsNow.map((meeting) => {
                                const date = moment(meeting.date, FORMAT_TIME_MYSQL);
                                return <MeetingItem
                                    store={this.props.store}
                                    joined={meeting.joined}
                                    name={meeting.name}
                                    meetingId={meeting.id}
                                    total_issues={meeting.total_issues}
                                    participates={meeting.participates}
                                    date={date.format("D")}
                                    month={date.format("M")}
                                    hour={date.format("HH:mm")}
                                    isNow={true}
                                    datetime={meeting.date}
                                />
                            })}
                        </Section>
                        }
                        {meetingsSoon.length > 0 &&
                        <Section>
                            <HeaderSection title={"Cuộc họp"} subtitle={"Sắp tới"}/>
                            {meetingsSoon.map((meeting) => {
                                const date = moment(meeting.date, FORMAT_TIME_MYSQL);
                                return <MeetingItem
                                    store={this.props.store}
                                    joined={meeting.joined}
                                    name={meeting.name}
                                    meetingId={meeting.id}
                                    total_issues={meeting.total_issues}
                                    participates={meeting.participates}
                                    date={date.format("D")}
                                    month={date.format("M")}
                                    hour={date.format("HH:mm")}
                                    datetime={meeting.date}
                                />
                            })}
                        </Section>
                        }
                    </View>
                }
            </SafeAreaView>

        );
    }
}

export default withStyle()(MeetingComponent);