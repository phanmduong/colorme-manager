import React from'react';
import {Dimensions} from 'react-native';
import {
    Content,
    Container,
    View,
    Text,
    Footer,
    Button,
    FooterTab,
    Thumbnail
} from 'native-base';
import { DrawerItems } from 'react-navigation';
import theme from '../styles';

var {height, width} = Dimensions.get('window');
class SidebarComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content
                    bounces={false}
                    style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
                >
                    <View style={styles.header}>
                        <Thumbnail size={55} source={{uri: this.props.user.avatar_url}}/>
                        <Text style={styles.headerTitle}>{this.props.user.name}</Text>
                        <Text style={styles.subTitle}>Chỉnh sửa thông tin</Text>
                    </View>
                    <DrawerItems {...this.props} />
                </Content>
                <Footer>
                    <FooterTab>
                        <Button
                            full
                            onPress={this.props.logout}
                            style={{backgroundColor: theme.mainColor}}
                        >
                            <Text style={styles.logout}>{'Đăng xuất'.toUpperCase()}</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>

        );
    }
}

const styles = {
    container: {
    },
    header: {
        backgroundColor: theme.mainColor,
        height: height / 4,
        padding: 16
    },
    headerTitle: {
        color: 'white',
        marginTop: 16,
        fontSize: 16
    },
    subTitle: {
        fontSize: 12,
        color: '#cccccc'
    },
    logout: {
        color: 'white',
        fontSize: 16,
        lineHeight: 30
    }
};

export default SidebarComponent;