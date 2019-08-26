/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {Dimensions, Image, Text, View, ScrollView} from 'react-native';
import ModalCustom from "../../components/common/ModalCustom";
import {observer} from "mobx-react";
import {getMeetingStatus} from "../../helper";

var {width} = Dimensions.get('window');

@observer
class ModalMeetingParticipate extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            scrollOffset: 0
        }
    }

    handleOnScroll = event => {
        this.setState({
            scrollOffset: event.nativeEvent.contentOffset.y,
        });
    };

    handleScrollTo = p => {
        if (this.scrollViewRef) {
            this.scrollViewRef.scrollTo(p);
        }
    };

    render() {
        const {isVisibleModalParticipate, participates} = this.props.store;
        return (
            <ModalCustom title={"Thành phần tham gia (" + participates.length + ")"} height={1000}
                         isVisible={isVisibleModalParticipate}
                         onSwipeComplete={() =>
                             this.props.store.isVisibleModalParticipate = false}
                         scrollTo={this.handleScrollTo}
                         scrollOffset={this.state.scrollOffset}
                         scrollOffsetMax={1000} // content height - ScrollView height

            >
                <ScrollView
                    ref={ref => (this.scrollViewRef = ref)}
                    onScroll={this.handleOnScroll}
                    scrollEventThrottle={16}
                >
                    {
                        participates.map((participate, index) => {
                            const status = getMeetingStatus(participate.status);
                            console.log(status)
                            return (
                                <View style={styles.containerItem} key={index}>
                                    <View style={styles.containerPerson}>
                                        <Image source={{uri: participate.user.avatar_url}}
                                               style={styles.avatar}/>
                                        <View>
                                            <Text style={styles.name}>{participate.user.name}</Text>
                                            { (participate.note !== "" && participate.note !== null) ?
                                                <Text numberOfLines={2} style={styles.titleStatus}>{participate.note}</Text>
                                                :
                                                <Text style={styles.titleStatus}>{status.text}</Text>
                                            }
                                        </View>
                                    </View>
                                    <View style={styles.status}>
                                        <Image style={styles.iconStatus} source={status.icon}/>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </ModalCustom>
        );
    }
}

const styles = {
    containerItem: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: width,
        marginVertical: 15,
        paddingHorizontal: 20
    },
    containerPerson: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    person: {},
    avatar: {
        height: 36,
        width: 36,
        borderRadius: 18,
        marginRight: 10
    },
    name: {
        fontWeight: 'bold',
    },
    titleStatus: {
        fontSize: 12,
        color: '#858585',
        marginTop: 2,
        marginRight: 60
    },
    status: {
        position: 'absolute',
        right: 20
    },
    iconStatus: {
        width: 36,
        height: 36,
    },
}

export default (ModalMeetingParticipate);
