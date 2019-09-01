/**
 * Created by phanmduong on 4/5/17.
 */
import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';
import {StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

// import {composeWithDevTools} from 'remote-redux-devtools';

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

console.disableYellowBox = true;

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(material)}>
          <AppWithNavigationState />
        </StyleProvider>
      </Provider>
    );
  }
}

export default App;
