import React from'react';
import {
    List
} from 'native-base';
import ListItemClass from './listItem/ListItemClass';

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
                                onPress={this.props.onSelectedItem}
                                classId={item.id}
                            />
                        )
                    }
                >
                </List>
            )
        );
    }
}

export default ClassComponent;