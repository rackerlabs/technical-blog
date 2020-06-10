global.$ = global.jQuery = require('jquery');

import { module as _module, bootstrap } from 'angular';

var moduleName = 'drc.app';
export default moduleName;

_module(moduleName, [
    require('angular-sanitize'),
    require('./controllers/blog-sidebar').default
]);

bootstrap(document, [moduleName]);