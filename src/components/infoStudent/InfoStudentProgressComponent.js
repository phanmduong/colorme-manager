import React from 'react';
import {View, Dimensions} from 'react-native';
import Loading from '../common/Loading';
import InfoStudentProgressItem from './InfoStudentProgressItem';
var {width} = Dimensions.get('window');

class InfoStudentProgressComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderProgress = () => {
    return this.props.progress.map((item) => (
      <InfoStudentProgressItem item={item} />
    ));
  };

  render() {
    if (this.props.isLoadingProgress) {
      return (
        <View style={styles.container}>
          <Loading size={width / 8} />
        </View>
      );
    } else {
      return <View style={styles.container}>{this.renderProgress()}</View>;
    }
  }
}

const styles = {
  container: {
    flex: 1,
  },
};

export default InfoStudentProgressComponent;
