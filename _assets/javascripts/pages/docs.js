(function (window, document, $) {
  var app = window.devsite;

  var docsDict = {
    '/docs/cloud-servers': [ 'java', '.net', 'node.js', 'php','python','ruby','shell' ],
    '/docs/cloud-load-balancers': [ 'java', '.net', 'node.js', 'php','python','ruby','shell' ],
    '/docs/cloud-files': [ 'java', '.net', 'node.js', 'php','python','ruby','shell' ],
    '/docs/cloud-dns': [ 'java', '.net', 'node.js', 'php','python','ruby','shell' ],
    '/docs/cloud-block-storage': [ 'java', '.net', 'node.js', 'php','python','ruby','shell' ],
    '/docs/cloud-databases': [ 'java', '.net', 'node.js', 'php','python','ruby','shell' ],
    '/docs/auto-scale': [ 'java', '.net', 'php','python','ruby','shell' ],
    '/docs/cloud-images': [ 'java', '.net', 'php','python','ruby','shell' ],
    '/docs/cloud-queues': [ 'java', '.net', 'php','python','ruby','shell' ],
    '/docs/cloud-monitoring': [ 'java', '.net', 'php','python','ruby','shell' ]
  };

  var cookieName = 'devsite-language';

  var showLanguage = function (language, ignoreSave) {
    hideAll();

    var $btn = $('.lang-btn[data-query="' + language + '"]');

    $btn.toggleClass('active');

    $('.' + $btn.data('class')).show();

    if (!ignoreSave) {
      $.cookie(cookieName, language, { path: '/' });
    }
  };

  var hideAll = function () {
    // hide all of the code blocks
    $($(".lang-btn").map(function () {
      return '.' + $(this).data('class')
    }).toArray().join(',')).hide();

    // hide the selected btn
    $('.lang-btn').removeClass('active');
  };

  app.pages.docs = function () {

    var currentPage = '/docs',
      match = false;

    Object.keys(docsDict).forEach(function(page) {
      if (!match && window.location.pathname.indexOf(page) === 0) {
        match = true;
        currentPage = page;
        docsDict[page].forEach(function(item) {
          $('.language-bar .lang-btn[data-query="' + item + '"]').css('display','inline-block');
        });
      }
    });

    if (match) {
      $('.language-list').show();
    }

    if (app.getParameter('lang') && docsDict[currentPage].indexOf(app.getParameter('lang')) >= 0) {
      showLanguage(app.getParameter('lang'));
    }
    else if ($.cookie(cookieName) && docsDict[currentPage].indexOf($.cookie(cookieName)) >= 0) {
      showLanguage($.cookie(cookieName));
    }
    else {
      showLanguage('shell', true);
    }

    $('.lang-btn').on('click', function () {
      showLanguage($(this).data('query'));
    });

  };

}(window, document, jQuery));