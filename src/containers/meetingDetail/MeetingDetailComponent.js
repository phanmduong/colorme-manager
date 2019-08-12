/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {Dimensions, FlatList, SafeAreaView, View} from 'react-native';
import {observer} from "mobx-react";
import Loading from "../../components/common/Loading";
import moment from "moment";
import {FORMAT_TIME_MYSQL} from "../../constants/constant";
import ModalMeetingParticipate from "./ModalMeetingParticipate";
import Section from "../../components/common/Section";
import HeaderSection from "../../components/common/HeaderSection";
import withStyle from "../../components/HOC/withStyle";
import MeetingItem from "./MeetingItem";
import _ from 'lodash';
import {getMeetingStatus} from "../../helper";
import Carousel from 'react-native-snap-carousel';
import MeetingDetailItem from "./MeetingDetailItem";

var {height, width} = Dimensions.get('window');

@observer
class MeetingDetailComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentIndex: 0
        }
    }

    openModalParticipate = (participates) => {
        this.props.store.isVisibleModalParticipate = true;
        participates = _.sortBy(participates, [function (participate) {
            const status = getMeetingStatus(participate.status);
            return status.order;
        }]);
        this.props.store.participates = participates;
    }

    onClickItem = (data, index) => {
        this._carousel.snapToItem(index);
    }

    render() {
        const {isLoading, meetings} = this.props.store;
        const meeting = meetings[0] ? meetings[0] : {};
        return (
            <SafeAreaView style={{flex: 1}}>
                {isLoading ? <Loading/> :
                    <View>
                        <Section>
                            <HeaderSection title={"Nội dung"} subtitle={"Buổi họp"}/>
                            <Carousel
                                ref={(c) => {
                                    this._carousel = c;
                                }}
                                enableMomentum={true}
                                activeAnimationType={"decay"}
                                activeSlideAlignment={this.state.currentIndex == 0 ? "start" : (this.state.currentIndex == 5 ? "end" : "center")}
                                inactiveSlideScale={0.8}
                                data={[...meetings, ...meetings, ...meetings]}
                                onBeforeSnapToItem={(slideIndex) => this.setState({currentIndex: slideIndex})}
                                renderItem={({item, index}) => {
                                    const date = moment(item.date, FORMAT_TIME_MYSQL);
                                    return (
                                        <MeetingItem
                                            index={index}
                                            store={this.props.store}
                                            name={item.name}
                                            meetingId={item.id}
                                            total_issues={item.total_issues}
                                            date={date.format("D")}
                                            month={date.format("M")}
                                            hour={date.format("HH:mm")}
                                            datetime={item.date}
                                            onClick={this.onClickItem}
                                        />
                                    )
                                }
                                }
                                sliderWidth={this.state.currentIndex == 5 ? width - 40 : width}
                                itemWidth={width / 3}
                            />
                        </Section>
                        <MeetingDetailItem
                            store={this.props.store}
                            name={meeting.name}
                            meetingId={meeting.id}
                            total_issues={meeting.total_issues}
                            datetime={meeting.date}
                            participates={meeting.participates ? meeting.participates : 0}
                            joined={meeting.joined}
                        />
                    </View>
                }
            </SafeAreaView>

        );
    }
}

export default withStyle()(MeetingDetailComponent);