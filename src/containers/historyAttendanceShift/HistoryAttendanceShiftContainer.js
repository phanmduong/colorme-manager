/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Dimensions} from 'react-native';
import {observer} from "mobx-react";
import HistoryAttendanceShiftStore from "./HistoryAttendanceShiftStore";
import Spinkit from "react-native-spinkit";
import theme from "../../styles";
import {Container} from "native-base";
import ListHistoryAttendanceShift from "./ListHistoryAttendanceShift";

var {height, width} = Dimensions.get('window');

@observer
class HistoryAttendanceShiftContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new HistoryAttendanceShiftStore();
    }


    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title
    });

    componentWillMount() {
        this.store.loadHistory('', this.props.token)
    }

    render() {
        const {isLoading, error,} = this.store;
        if (isLoading) {
            return (
                <Container>
                    <View style={styles.container}>
                        <Spinkit
                            isVisible
                            color={theme.mainColor}
                            type='Wave'
                            size={width / 8}
                        />
                    </View>
                </Container>
            )
        } else {
            return (
                <Container>
                    {!isLoading && error ?
                        this.errorData() :
                        <ListHistoryAttendanceShift store={this.store}/>
                    }
                </Container>
            )
        }
    }
}

const styles = ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textError: {
        color: '#d9534f',
        textAlign: 'center'
    },
});


function mapStateToProps(state) {
    return {
        token: state.login.token,
        user: state.login.user
    };
}


export default connect(mapStateToProps)(HistoryAttendanceShiftContainer);