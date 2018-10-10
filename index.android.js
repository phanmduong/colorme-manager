import applyDecoratedDescriptor from '@babel/runtime/helpers/esm/applyDecoratedDescriptor'
import initializerDefineProperty from '@babel/runtime/helpers/esm/initializerDefineProperty'
// import 'es6-symbol/implement'
// import 'core-js/es6/symbol';
//
// import 'core-js/fn/symbol/iterator';
//
// import "core-js/es6/set";

Object.assign(babelHelpers, {
    applyDecoratedDescriptor,
    initializerDefineProperty,
});

require('./codepush');