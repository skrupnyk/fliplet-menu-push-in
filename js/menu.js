var $menuElement = $('[data-name="Push in"]');
var menuInstanceId = $menuElement.data('id');

if (menuInstanceId) {
  init();
}

function init() {
  var data = Fliplet.Widget.getData(menuInstanceId) || {};
  var lastScrollTop = 0;

  Fliplet.Hooks.on('addExitAppMenuLink', function () {
    var $exitButton = $([
      '<li class="linked with-icon" data-fl-exit-app>',
        '<div class="fl-menu-icon">',
          '<i class="fa fa-fw fa-sign-out"></i>',
        '</div>',
        '<i class="fa fa-angle-right linked-icon" aria-hidden="true"></i>',
        '<span class="internal-link buttonControl">Exit</span>',
      '</li>'
    ].join(''));

    $exitButton.on('click', function onExitClick() {
      Fliplet.Navigate.exitApp();
    });

    $menuElement.find('ul').append($exitButton);

    // Prevent default "Exit" link from being added
    return Promise.reject();
  });

  if ($('li.with-icon').length) {
    $('.main-menu').addClass('with-icons');
  }

  if (Modernizr.backdropfilter) {
    $('.body').addClass('backdropfilter');
  }

  if (data.hide) {
    $(window).scroll(function(){
      var st = $(this).scrollTop();
      if (st > lastScrollTop){
        // downscroll code
        $('body').addClass('fl-top-menu-hidden');
      } else {
        // upscroll code
        $('body').removeClass('fl-top-menu-hidden');
      }
      lastScrollTop = st;
    });
  }

  if ($('.fl-viewport-header').hasClass('fl-viewport-header-left')) {
    $('body').addClass('has-menu-left');
  } else {
    $('body').addClass('has-menu-right');
  }

  $('.fl-menu-overlay').click(function() {
    $(this).closest('.fl-menu').removeClass('active');
    $('body').removeClass('has-push-menu');
    $('html').removeClass('has-push-menu');
  });

  $('.fl-menu .fl-close-menu').on('click keydown', function(event) {
    if (event.type !== 'click' && event.which !== 32 && event.which !== 13) {
      return;
    }

    $(this).parents('.fl-menu').removeClass('active');
    $('body').removeClass('has-push-menu');
    $('html').removeClass('has-push-menu');

    if (event.type === 'keydown') {
      $('.fl-viewport-header .hamburger').toggleClass('is-active');
    }
  });

  $('[open-about-overlay]').on('click', function() {
    Fliplet.Navigate.to({
      action: 'about-overlay'
    });
  });

  $('[data-fl-toggle-menu]').on('click keydown', function(event) {
    if (event.type !== 'click' && event.which !== 32 && event.which !== 13) {
      return;
    }
    
    $('body').addClass('has-push-menu');
    $('html').addClass('has-push-menu');

    if (event.type === 'keydown') {
      $('body').find('.fl-menu').toggleClass('active');
      $('.fl-viewport-header .hamburger').toggleClass('is-active');
    }
  });
}
