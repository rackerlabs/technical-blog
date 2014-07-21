(function (window, document, $) {
  var app = window.devsite;

  app.pages.home = function () {
    if (window.location.hash) {
      switch (window.location.hash) {
        case '#php':
          window.location = '/sdks/php';
          break;
        case '#nodejs':
          window.location = '/sdks/node-js';
          break;
        case '#dotnet':
          window.location = '/sdks/dot-net';
          break;
        case '#java':
          window.location = '/sdks/java';
          break;
        case '#python':
          window.location = '/sdks/python';
          break;
        case '#ruby':
          window.location = '/sdks/ruby';
          break;
      }
    }
  };
}(window, document, jQuery));
