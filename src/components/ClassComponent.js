import React from'react';
import {Dimensions} from 'react-native';
import {
    Content,
    List,
} from 'native-base';
var {height, width} = Dimensions.get('window');
import ListItemClass from './common/ListItemClass';

class ClassComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            (
                <List
                    dataArray={this.props.classData}
                    renderRow={
                        (item, sectionID, rowID) => (
                            <ListItemClass
                                nameClass={item.name}
                                avatar={item.avatar_url}
                                studyTime={item.study_time}
                                totalPaid={item.total_paid}
                                totalRegisters={item.total_registers}
                                paidTarget={item.paid_target}
                                registerTarget={item.register_target}
                                status={item.status}
                            />
                        )
                    }
                >
                </List>
            )
        );
    }
}

const styles = ({
    list: {},
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textError: {
        color: '#d9534f'
    }
});

export default ClassComponent;