import React, {
    PropTypes,
} from 'react';
import {Button, FooterTab}from 'native-base';
import Icon from './Icon';
import {Actions} from 'react-native-router-flux';
const propTypes = {
    selected: PropTypes.bool,
    title: PropTypes.string,
};

const TabIcon = (props) => (
   <FooterTab>
        <Button active={props.selected} onPress={Actions[props.name]}>
            <Icon
                name={props.nameIcon}
                size={26}
                color={'white'}
                style={{
                    opacity: props.selected ? 1 : 0.7
                }}
            />
        </Button>
    </FooterTab>
);

TabIcon.propTypes = propTypes;

export default TabIcon;
