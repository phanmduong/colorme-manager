/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {Dimensions, Platform, KeyboardAvoidingView, StyleSheet, SafeAreaView, TextInput, View} from 'react-native';
import {observer} from "mobx-react";
import Loading from "../../components/common/Loading";
import moment from "moment";
import {FORMAT_TIME_MYSQL} from "../../constants/constant";
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
            currentIndex: 0,
        }
        this.indexDefault = -1
    }

    openModalParticipate = (participates) => {
        this.props.store.isVisibleModalParticipate = true;
        participates = _.sortBy(participates, [function (participate) {
            const status = getMeetingStatus(participate.status);
            return status.order;
        }]);
        this.props.store.participates = participates;
    };

    componentDidMount() {
        this.props.store.loadMeetingDetail();
    }

    onClickItem = (meetingId, index) => {
        this._carousel.snapToItem(index);
        this.props.store.selectedMeetingId = meetingId;
        this.props.store.loadMeetingDetail();
    }

    render() {
        const {isLoading, meetings, meeting, isLoadingMeetings} = this.props.store;
        if (meetings.length > 0 && this.indexDefault == -1) {
            const meetingId = this.props.store.selectedMeetingId;
            console.log(meetings);
            this.indexDefault = _.findIndex(meetings, function (o) {
                return o.id == meetingId;
            });
            console.log(this.indexDefault);
        }

        const carouselProps = (
             isLoadingMeetings ?
                    <Loading/>
                    :
                    <Section>
                        <HeaderSection title={"Nội dung"} subtitle={"Buổi họp"}/>
                        <Carousel
                            ref={(c) => {
                                this._carousel = c;
                            }}
                            activeAnimationType={"decay"}
                            // activeSlideAlignment={this.state.currentIndex == 0 ? "start" : (this.state.currentIndex == meetings.length - 1 ? "end" : "center")}
                            activeSlideAlignment={"center"}
                            inactiveSlideScale={0.8}
                            data={meetings}
                            firstItem={this.indexDefault}
                            onBeforeSnapToItem={(slideIndex) => this.setState({currentIndex: slideIndex})}
                            renderItem={({item, index}) => {
                                const date = moment(item.date, FORMAT_TIME_MYSQL);
                                return (
                                    <MeetingItem
                                        keyIndex={index}
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
                            sliderWidth={this.state.currentIndex == meetings.length - 1 ? width - 40 : width}
                            itemWidth={width / 3}
                            keyExtractor={(item, index) => index.toString()}
                        />

                    </Section>
        );

        const keyboardVerticalOffset = Platform.OS === 'ios' ? Dimensions.get('window').height* 0.11 : 0;

        return (
            <SafeAreaView style={{flexGrow: 1}}>
                <KeyboardAvoidingView style={{flex: 1}}
                                      behavior={(Platform.OS === 'ios')? "position" : null}
                                      enabled
                                      keyboardVerticalOffset={keyboardVerticalOffset}>

                    {(isLoading ?
                            <View style={{marginTop: Dimensions.get('window').height* 0.35}}>
                                <Loading/>
                            </View>
                            :
                            <MeetingDetailItem
                                store={this.props.store}
                                name={meeting.name}
                                issues={meeting.issues}
                                meetingId={meeting.id}
                                datetime={meeting.date}
                                participates={meeting.participates ? meeting.participates : []}
                                joined={meeting.joined}
                                carouselProps={carouselProps}
                            />
                    )}
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior={(Platform.OS === 'ios')? "position" : null}
                                      enabled
                                      keyboardVerticalOffset={keyboardVerticalOffset}>
                    <View style={styles.containerInput}>
                        <TextInput style={styles.createIssue}
                                   placeholder={"Thêm vấn đề"}
                                   value={this.props.store.nameIssue}
                                   editable={!this.props.store.isStoringIssue}
                                   onChangeText={(text) => {
                                       this.props.store.nameIssue = text
                                   }}
                                   onSubmitEditing={() => {
                                       this.props.store.storeIssue();
                                   }}
                        />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    containerInput: {
        alignItems: 'center',
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        right: 20,
        height: 44
    },
    createIssue: {
        borderRadius: 20,
        height: 40,
        position: 'absolute',
        bottom: 0,
        flex: 1,
        backgroundColor: '#ececec',
        paddingHorizontal: 20,
        color: "#363636",
        width: width - 40,
    },
});

export default withStyle()(MeetingDetailComponent);
