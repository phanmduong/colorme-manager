import React from 'react';
import HistoryComponent from '../components/HistoryComponent';
import {} from 'react-native';

class HistoryContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Lịch sử'
    });

    render() {
        return (
            <HistoryComponent {...this.props}/>
        )
    }
}

export default (HistoryContainer);
