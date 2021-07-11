import React from 'react';
import theme from '../../styles';
import {Thumbnail} from 'native-base';

function ImagePlaceholder({avatarStyle}) {
  return (
    <Thumbnail
      small
      source={require('../../../assets/img/placeholderAvatar.png')}
      style={avatarStyle ? avatarStyle : theme.mainAvatar}
    />
  );
}

export default ImagePlaceholder;
