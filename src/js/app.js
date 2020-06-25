var angular = require("angular")

var moduleName = "drc.app"
module.exports = moduleName

angular.module(moduleName, [
  require("angular-sanitize"),
  require("./controllers/blog-sidebar"),
  require("./services/filter"),
])

angular.bootstrap(document, [moduleName])
