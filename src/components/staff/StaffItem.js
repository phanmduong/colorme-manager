import React from 'react';
import {Dimensions, Platform} from 'react-native';
import {View, Text, Thumbnail} from 'native-base';
import theme from '../../styles';
import Call from '../../components/common/Call';
import {getValidUrl, isValidUrl} from '../../helper';
import ImagePlaceholder from '../common/ImagePlaceholder';

const {width} = Dimensions.get('window');
const maxWidthProcess = width / 2;

class StaffItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  content() {
    const {name, avatar, email, phone, department} = this.props;
    return (
      <View style={styles.container}>
        {isValidUrl(avatar) ? (
          <Thumbnail
            small
            source={{uri: getValidUrl(avatar)}}
            style={theme.mainAvatar}
          />
        ) : (
          <ImagePlaceholder />
        )}
        <View style={styles.content}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>{name.trim()}</Text>
          </View>
          <View style={styles.containerSubTitle}>
            <Text style={styles.subTitle}>{email}</Text>
            {department ? (
              <Text style={styles.subTitle}>{department.name}</Text>
            ) : null}
            <Call
              url={'tel:' + phone}
              phone={phone}
              extraPadding={{paddingTop: 5}}
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    if (Platform.OS === 'ios') {
      return <View style={styles.containerAll}>{this.content()}</View>;
    } else {
      return <View style={styles.containerAll}>{this.content()}</View>;
    }
  }
}

const styles = {
  containerAll: {
    paddingHorizontal: theme.mainHorizontal,
    paddingVertical: 16,
  },
  container: {
    flexDirection: 'row',
  },
  containerExpand: {
    marginLeft: 55,
  },
  content: {
    flex: 1,
    marginLeft: 20,
  },
  containerTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontWeight: '900',
    fontSize: Platform.isPad ? 18 : 13,
  },
  subTitle: {
    color: theme.colorSubTitle,
    fontSize: 13,
    paddingTop: 5,
  },
  icon: {
    fontSize: 20,
    color: theme.colorTitle,
  },
  line: {
    height: 1,
    backgroundColor: theme.borderColor,
    marginRight: 20,

    marginLeft: 75,
  },
  containerContentProcess: {
    paddingTop: 5,
  },
  containerProcess: {
    marginVertical: 5,
    backgroundColor: theme.secondColorOpacity,
    width: maxWidthProcess,
  },
  bar: {},
  process: {
    borderRadius: 5,
    height: 5,
    backgroundColor: theme.secondColor,
  },
  processAndText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textProcess: {
    color: theme.colorTitle,
    fontSize: 12,
  },
  containerSubTitle: {
    flexDirection: 'column',
  },
  email: {
    color: theme.colorSubTitle,
    marginTop: 5,
    fontSize: Platform.isPad ? 18 : 13,
  },
  card: {
    paddingHorizontal: 10,
    marginLeft: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 15,
  },
  money: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  isReceivedCard: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  starIcon: {
    width: 10,
    height: 10,
    marginLeft: 5,
  },
};

export default StaffItem;
