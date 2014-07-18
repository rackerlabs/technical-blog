(function (window, document, $) {
  var app = window.devsite;

  app.pages.signup = function () {
    var $btn = $('.notify-btn');

    $btn.on('click', function() {
      $btn.addClass('disabled');
      $.post('/api/developer-plus/coming-soon', {
        email: $('input[name="email"]').val().trim()
      }, function(data, status, xhr) {
        $btn.addClass('btn-success')
          .removeClass('btn-primary')
          .text('Success!');

        setTimeout(function () {
          $('input[name="email"]').val('');
          $btn.addClass('btn-primary')
            .removeClass('btn-success disabled')
            .text('Notify Me!');
        }, 2500);
      })
        .fail(function(e) {
          $btn.addClass('btn-danger')
            .removeClass('btn-primary')
            .text('Error');

          setTimeout(function() {
            $btn.addClass('btn-primary')
              .removeClass('btn-danger disabled')
              .text('Notify Me!');
          }, 2500);
        });
    });
  };
}(window, document, jQuery));
