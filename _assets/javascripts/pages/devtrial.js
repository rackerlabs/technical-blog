(function (window, document, $) {
  var app = window.devsite;

  app.pages.devtrial = function () {
    var $location = $('#location');

    $location.change(function () {
      $('.tos').hide();
      $('#' + $location.val()).show();
      if ($location.val() == "UK") {
        $("#MAINURL").hide();
        $("#UKURL").show();
      } else {
        $("#UKURL").hide();
        $("#MAINURL").show();
      }
    });
  };
}(window, document, jQuery));
