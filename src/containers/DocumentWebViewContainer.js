import React from 'react';
import DocumentWebViewComponent from '../components/DocumentWebViewComponent';

class DocumentWebViewContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return <DocumentWebViewComponent {...this.props} />;
  }
}

export default DocumentWebViewContainer;
