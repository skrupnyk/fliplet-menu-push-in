var $menuElement = $('[data-name="Push in"]');
var menuInstanceId = $menuElement.data('id');

if (menuInstanceId) {
  init();
}

function init() {
  var data = Fliplet.Widget.getData(menuInstanceId) || {};
  var lastScrollTop = 0;

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

  $('[data-fl-toggle-menu]').on('click', function() {
    $('body').addClass('has-push-menu');
    $('html').addClass('has-push-menu');
  });

  $('.fl-menu-overlay').click(function() {
    $(this).closest('.fl-menu').removeClass('active');
    $('body').removeClass('has-push-menu');
    $('html').removeClass('has-push-menu');
  });

  $('.fl-menu .fl-close-menu').on('click', function() {
    $(this).parents('.fl-menu').removeClass('active');
    $('body').removeClass('has-push-menu');
    $('html').removeClass('has-push-menu');
  });

  $('[open-about-overlay]').on('click', function() {
    Fliplet.Navigate.to({
      action: 'about-overlay'
    });
  });

  if (data.swipeBack) {
    $('body').hammer().bind('swiperight', function() {
      Fliplet.Navigate.back();
    });
  }
}
