import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Clipboard,
  Dimensions,
  FlatList,
  RefreshControl,
  Alert,
  ScrollView,
} from 'react-native';
import {Thumbnail} from 'native-base';
import theme from '../styles';
import Spinkit from 'react-native-spinkit';
import Search from './common/Search';
import {getShortName, convertVietText} from '../helper';
import LinearGradient from 'react-native-linear-gradient';
var {width, height} = Dimensions.get('window');

class DocumentComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
      departmentId: -1,
    };
  }

  headerComponent = () => {
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Search
            placeholder="Tìm kiếm tài liệu"
            onChangeText={search => this.setState({search})}
            value={this.state.search}
            autoFocus={false}
          />
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.containerTag}>{this.renderTabs()}</View>
        </ScrollView>
      </View>
    );
  };

  renderTabs = () => {
    let defaultDepartment = {id: -1, name: 'Tất cả'};
    let departmentLst = [defaultDepartment].concat(this.props.departments);
    return departmentLst.map(department => (
      <TouchableOpacity
        onPress={() => this.setState({departmentId: department.id})}>
        <LinearGradient
          colors={
            this.state.departmentId === department.id
              ? ['#F6F6F6', '#F6F6F6']
              : ['white', 'white']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.tag}>
          <Text style={{color: 'black'}}>
            {department.name} ({this.getDocLst(department.id).length})
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    ));
  };

  renderDoc = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('DocumentWebView', {
            url: item.url,
          })
        }>
        <View style={styles.containerAll}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{position: 'relative'}}>
                <Thumbnail small source={{uri: item.creator.avatar_url}} />
              </View>
              <Text numberOfLines={2} style={styles.className}>
                {item.name}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.classAva} />
            <View style={styles.infoContainer}>
              <View style={styles.containerSubTitle}>
                {item.department ? (
                  <View
                    style={{
                      ...styles.card,
                      ...{
                        backgroundColor:
                          !item.department.color || item.department.color === ''
                            ? theme.processColor1
                            : '#' + item.department.color,
                        marginRight: 5,
                      },
                    }}>
                    <Text style={styles.saler}>
                      {getShortName(item.department.name)}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
              </View>
              <View style={{flex: 1}}>
                {item.description ? (
                  <Text
                    numberOfLines={1}
                    style={[styles.classInfoContainer, {paddingTop: 0}]}>
                    {item.description}
                  </Text>
                ) : null}
                {item.creator && item.creator.name ? (
                  <Text numberOfLines={1} style={styles.classInfoContainer}>
                    Được tạo bởi{' '}
                    <Text style={{fontWeight: '600', color: 'black'}}>
                      {item.creator.name}
                    </Text>
                  </Text>
                ) : null}
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('DocumentWebView', {
                      url: item.url,
                    })
                  }>
                  <View style={styles.button}>
                    <Text style={{fontSize: 16}}>Xem tài liệu</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setString(item.url);
                    Alert.alert('Thông báo', 'Copy URL thành công');
                  }}>
                  <View style={[{marginLeft: 10}, styles.button]}>
                    <Text style={{fontSize: 16}}>Copy URL</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  getDocLst = departmentId => {
    if (departmentId === -1) {
      return this.props.documents;
    } else {
      return this.props.documents.filter(
        doc => doc.department && doc.department.id === departmentId,
      );
    }
  };

  searchDocuments = docLst => {
    if (this.state.search === '') {
      return docLst;
    } else {
      let searchDocLst = [];
      for (let doc of docLst) {
        if (
          convertVietText(doc.name).includes(convertVietText(this.state.search))
        ) {
          searchDocLst.push(doc);
        }
      }
      return searchDocLst;
    }
  };

  render() {
    if (!this.props.isLoadingDoc && !this.props.isLoadingDepartments) {
      return (
        <FlatList
          data={this.searchDocuments(this.getDocLst(this.state.departmentId))}
          renderItem={this.renderDoc}
          ListHeaderComponent={this.headerComponent}
          refreshControl={
            <RefreshControl
              refreshing={this.props.refreshingDoc}
              onRefresh={() => this.props.refreshDocuments('')}
              titleColor={theme.mainColor}
              title="Đang tải..."
              tintColor="#d9534f"
              colors={['#d9534f']}
            />
          }
          style={{flex: 1}}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Spinkit
            isVisible
            color={theme.mainColor}
            type="Wave"
            size={width / 8}
          />
        </View>
      );
    }
  }
}

export default DocumentComponent;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerAll: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  containerExpand: {
    marginLeft: 55,
    paddingTop: 5,
  },
  content: {
    flex: 1,
    marginLeft: 20,
  },
  containerTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    fontWeight: '900',
    fontSize: Platform.isPad ? 18 : 13,
    marginRight: 5,
  },
  subTitle: {
    color: '#7d7d7d',
    fontSize: 12,
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
  email: {
    color: theme.colorSubTitle,
    marginTop: 5,
    fontSize: Platform.isPad ? 18 : 13,
  },
  contentTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotCall: {
    position: 'absolute',
    top: 25,
    left: 25,
    height: 12,
    width: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'white',
  },

  listItemContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  classAva: {
    width: 37,
    height: 37,
    borderRadius: 19,
  },
  className: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 15,
    marginRight: 5,
    flex: 1,
  },
  containerSubTitle: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  card: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saler: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  campaign: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#F6F6F6',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  collectedButton: {
    backgroundColor: '#C50000',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  classInfoContainer: {
    paddingTop: 5,
    flex: 1,
    flexWrap: 'wrap',
    color: '#707070',
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  fitlerContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
  tag: {
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 5,
    marginHorizontal: 16,
  },
};
