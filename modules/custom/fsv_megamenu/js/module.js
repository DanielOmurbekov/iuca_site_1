"use strict";
(function ($) {
  ///////////////
  //
  // nav desktop
  //
  ///////////////

  function navDesktop() {
    let eventOpen = 'click';
    let eventClose = 'click';
    if ($('.nav__container.container').hasClass('jq_hover')) {
      eventOpen = 'mouseenter';
      eventClose = 'mouseover';
    }

    // disable default display on hover behaviour
    $('.jq_megamenu').hide();
    $('body, html').removeClass('no-scroll');
    $('.nav__link').removeClass('nav__link--active');

    $('.jq_nav-link').click((e) => {
      e.preventDefault();
    });
    // open on click
    $('.jq_nav-link').on(eventOpen, function(e) {
      if (eventOpen === 'click') {
        $('.nav__link').removeClass('nav__link--active');
      }

      const display = $(this).next('.jq_megamenu').css('display');
      if (display === 'none') {
        // close all previously opened megamenus
        $('.jq_megamenu').hide();
        // open current one
        $(this).next('.jq_megamenu').css('display', 'block');
        $(this).addClass('nav__link--active');
      } else if (eventOpen === 'click') {
        $(this).next('.jq_megamenu').css('display', 'none');
        $(this).removeClass('nav__link--active');
      }
    });

    // close
    $('.jq_megamenu-close').click(function(e) {
      $('.jq_nav-link').removeClass('nav__link--active');
      $(this).parent('.jq_megamenu').hide();
    });

    $('body').on(eventClose, function(e) {
      if (
        !$(e.target).hasClass('jq_megamenu') &&
        $(e.target).closest('.jq_megamenu').length === 0 &&
        $(e.target).parents('.nav__list').length === 0
      ) {
        $('.jq_megamenu').each(function(){
          if ( $(this).css('display') == 'block' ) {
            $(this).hide();
            $('.jq_nav-link').removeClass('nav__link--active');
          }
        });
      }
    });

  }

  function navMobile() {
    // remove display none from desktop
    $('.jq_megamenu').removeAttr('style');
    $('.jq_nav-link').removeClass('nav__link--open');

    // hamburger and nav toggle
    function toggleNav(menu) {
      menu.toggleClass('menu-is-open');
      $('#jq_nav').toggleClass('header__inner-wrap--open');
      $('body, html').toggleClass('no-scroll');
    }

    $('#jq_hamburger').on('click', function(){
      toggleNav($(this));
      if ($(this).hasClass('menu-is-open')) {
        $('#jq_header').addClass('header--open');
      }
      else {
        setTimeout(function(){
          $('#jq_header').removeClass('header--open');
        }, 0)
      }
    });

    // megamenu
    $('.jq_nav-link').click(function(e) {
      e.preventDefault();
      $(this).toggleClass('nav__link--open');
      $(this).next('.jq_megamenu').slideToggle();
    });
  }

  function removeEvents($el) {
    $el.each(function() {
      $(this).off();
    })
  }

  function initNav() {
    if(isDesktop) {
      removeEvents( $('body, .jq_megamenu-close, .jq_nav-link, #jq_hamburger') );
      navDesktop()
    } else {
      removeEvents( $('body, .jq_megamenu-close, .jq_nav-link, #jq_hamburger') );
      navMobile()
    }
  }

  // init nav after load
  var isDesktop = window.matchMedia("(min-width: 62.5em)").matches;
  initNav();

  // check nav state on resize
  window.addEventListener('resize', function(){
    if (isDesktop !== window.matchMedia("(min-width: 62.5em)").matches) {
      isDesktop = window.matchMedia("(min-width: 62.5em)").matches;
      initNav();
    }
  });

  ///////////////
  //
  // footer nav on mobile
  //
  ///////////////

  function navMobileFooter() {
    $('.footer__nav__item').click(function(e) {
      $(this).toggleClass('footer__nav__item--open');
      $(this).find('.footer__nav__sublist').slideToggle();
    });
  }

  function initFooterNav() {
    if(isDesktopFooter) {
      removeEvents( $('.footer__nav__item') );
    } else {
      navMobileFooter();
    }
  }

  // init nav after load
  var isDesktopFooter = window.matchMedia("(min-width: 40.625em)").matches;
  initFooterNav();

  // check nav state on resize
  window.addEventListener('resize', function(){
    if (isDesktopFooter !== window.matchMedia("(min-width: 40.625em)").matches) {
      isDesktopFooter = window.matchMedia("(min-width: 40.625em)").matches;
      initFooterNav();
    }
  });
})(jQuery);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lZ2FtZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uICgkKSB7XG4gIC8vLy8vLy8vLy8vLy8vL1xuICAvL1xuICAvLyBuYXYgZGVza3RvcFxuICAvL1xuICAvLy8vLy8vLy8vLy8vLy9cblxuICBmdW5jdGlvbiBuYXZEZXNrdG9wKCkge1xuICAgIGxldCBldmVudE9wZW4gPSAnY2xpY2snO1xuICAgIGxldCBldmVudENsb3NlID0gJ2NsaWNrJztcbiAgICBpZiAoJCgnLm5hdl9fY29udGFpbmVyLmNvbnRhaW5lcicpLmhhc0NsYXNzKCdqcV9ob3ZlcicpKSB7XG4gICAgICBldmVudE9wZW4gPSAnbW91c2VlbnRlcic7XG4gICAgICBldmVudENsb3NlID0gJ21vdXNlb3Zlcic7XG4gICAgfVxuXG4gICAgLy8gZGlzYWJsZSBkZWZhdWx0IGRpc3BsYXkgb24gaG92ZXIgYmVoYXZpb3VyXG4gICAgJCgnLmpxX21lZ2FtZW51JykuaGlkZSgpO1xuICAgICQoJ2JvZHksIGh0bWwnKS5yZW1vdmVDbGFzcygnbm8tc2Nyb2xsJyk7XG4gICAgJCgnLm5hdl9fbGluaycpLnJlbW92ZUNsYXNzKCduYXZfX2xpbmstLWFjdGl2ZScpO1xuXG4gICAgJCgnLmpxX25hdi1saW5rJykuY2xpY2soKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICAvLyBvcGVuIG9uIGNsaWNrXG4gICAgJCgnLmpxX25hdi1saW5rJykub24oZXZlbnRPcGVuLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZXZlbnRPcGVuID09PSAnY2xpY2snKSB7XG4gICAgICAgICQoJy5uYXZfX2xpbmsnKS5yZW1vdmVDbGFzcygnbmF2X19saW5rLS1hY3RpdmUnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGlzcGxheSA9ICQodGhpcykubmV4dCgnLmpxX21lZ2FtZW51JykuY3NzKCdkaXNwbGF5Jyk7XG4gICAgICBpZiAoZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICAgIC8vIGNsb3NlIGFsbCBwcmV2aW91c2x5IG9wZW5lZCBtZWdhbWVudXNcbiAgICAgICAgJCgnLmpxX21lZ2FtZW51JykuaGlkZSgpO1xuICAgICAgICAvLyBvcGVuIGN1cnJlbnQgb25lXG4gICAgICAgICQodGhpcykubmV4dCgnLmpxX21lZ2FtZW51JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ25hdl9fbGluay0tYWN0aXZlJyk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3BlbiA9PT0gJ2NsaWNrJykge1xuICAgICAgICAkKHRoaXMpLm5leHQoJy5qcV9tZWdhbWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ25hdl9fbGluay0tYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBjbG9zZVxuICAgICQoJy5qcV9tZWdhbWVudS1jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICQoJy5qcV9uYXYtbGluaycpLnJlbW92ZUNsYXNzKCduYXZfX2xpbmstLWFjdGl2ZScpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoJy5qcV9tZWdhbWVudScpLmhpZGUoKTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbihldmVudENsb3NlLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoXG4gICAgICAgICEkKGUudGFyZ2V0KS5oYXNDbGFzcygnanFfbWVnYW1lbnUnKSAmJlxuICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanFfbWVnYW1lbnUnKS5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgJChlLnRhcmdldCkucGFyZW50cygnLm5hdl9fbGlzdCcpLmxlbmd0aCA9PT0gMFxuICAgICAgKSB7XG4gICAgICAgICQoJy5qcV9tZWdhbWVudScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICBpZiAoICQodGhpcykuY3NzKCdkaXNwbGF5JykgPT0gJ2Jsb2NrJyApIHtcbiAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmpxX25hdi1saW5rJykucmVtb3ZlQ2xhc3MoJ25hdl9fbGluay0tYWN0aXZlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gbmF2TW9iaWxlKCkge1xuICAgIC8vIHJlbW92ZSBkaXNwbGF5IG5vbmUgZnJvbSBkZXNrdG9wXG4gICAgJCgnLmpxX21lZ2FtZW51JykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAkKCcuanFfbmF2LWxpbmsnKS5yZW1vdmVDbGFzcygnbmF2X19saW5rLS1vcGVuJyk7XG5cbiAgICAvLyBoYW1idXJnZXIgYW5kIG5hdiB0b2dnbGVcbiAgICBmdW5jdGlvbiB0b2dnbGVOYXYobWVudSkge1xuICAgICAgbWVudS50b2dnbGVDbGFzcygnbWVudS1pcy1vcGVuJyk7XG4gICAgICAkKCcjanFfbmF2JykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9faW5uZXItd3JhcC0tb3BlbicpO1xuICAgICAgJCgnYm9keSwgaHRtbCcpLnRvZ2dsZUNsYXNzKCduby1zY3JvbGwnKTtcbiAgICB9XG5cbiAgICAkKCcjanFfaGFtYnVyZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIHRvZ2dsZU5hdigkKHRoaXMpKTtcbiAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdtZW51LWlzLW9wZW4nKSkge1xuICAgICAgICAkKCcjanFfaGVhZGVyJykuYWRkQ2xhc3MoJ2hlYWRlci0tb3BlbicpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKCcjanFfaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2hlYWRlci0tb3BlbicpO1xuICAgICAgICB9LCAwKVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gbWVnYW1lbnVcbiAgICAkKCcuanFfbmF2LWxpbmsnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCduYXZfX2xpbmstLW9wZW4nKTtcbiAgICAgICQodGhpcykubmV4dCgnLmpxX21lZ2FtZW51Jykuc2xpZGVUb2dnbGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUV2ZW50cygkZWwpIHtcbiAgICAkZWwuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykub2ZmKCk7XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXROYXYoKSB7XG4gICAgaWYoaXNEZXNrdG9wKSB7XG4gICAgICByZW1vdmVFdmVudHMoICQoJ2JvZHksIC5qcV9tZWdhbWVudS1jbG9zZSwgLmpxX25hdi1saW5rLCAjanFfaGFtYnVyZ2VyJykgKTtcbiAgICAgIG5hdkRlc2t0b3AoKVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVFdmVudHMoICQoJ2JvZHksIC5qcV9tZWdhbWVudS1jbG9zZSwgLmpxX25hdi1saW5rLCAjanFfaGFtYnVyZ2VyJykgKTtcbiAgICAgIG5hdk1vYmlsZSgpXG4gICAgfVxuICB9XG5cbiAgLy8gaW5pdCBuYXYgYWZ0ZXIgbG9hZFxuICB2YXIgaXNEZXNrdG9wID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiA2Mi41ZW0pXCIpLm1hdGNoZXM7XG4gIGluaXROYXYoKTtcblxuICAvLyBjaGVjayBuYXYgc3RhdGUgb24gcmVzaXplXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpe1xuICAgIGlmIChpc0Rlc2t0b3AgIT09IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogNjIuNWVtKVwiKS5tYXRjaGVzKSB7XG4gICAgICBpc0Rlc2t0b3AgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDYyLjVlbSlcIikubWF0Y2hlcztcbiAgICAgIGluaXROYXYoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vLy8vLy8vLy8vLy8vL1xuICAvL1xuICAvLyBmb290ZXIgbmF2IG9uIG1vYmlsZVxuICAvL1xuICAvLy8vLy8vLy8vLy8vLy9cblxuICBmdW5jdGlvbiBuYXZNb2JpbGVGb290ZXIoKSB7XG4gICAgJCgnLmZvb3Rlcl9fbmF2X19pdGVtJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnZm9vdGVyX19uYXZfX2l0ZW0tLW9wZW4nKTtcbiAgICAgICQodGhpcykuZmluZCgnLmZvb3Rlcl9fbmF2X19zdWJsaXN0Jykuc2xpZGVUb2dnbGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRGb290ZXJOYXYoKSB7XG4gICAgaWYoaXNEZXNrdG9wRm9vdGVyKSB7XG4gICAgICByZW1vdmVFdmVudHMoICQoJy5mb290ZXJfX25hdl9faXRlbScpICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hdk1vYmlsZUZvb3RlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGluaXQgbmF2IGFmdGVyIGxvYWRcbiAgdmFyIGlzRGVza3RvcEZvb3RlciA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogNDAuNjI1ZW0pXCIpLm1hdGNoZXM7XG4gIGluaXRGb290ZXJOYXYoKTtcblxuICAvLyBjaGVjayBuYXYgc3RhdGUgb24gcmVzaXplXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpe1xuICAgIGlmIChpc0Rlc2t0b3BGb290ZXIgIT09IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogNDAuNjI1ZW0pXCIpLm1hdGNoZXMpIHtcbiAgICAgIGlzRGVza3RvcEZvb3RlciA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogNDAuNjI1ZW0pXCIpLm1hdGNoZXM7XG4gICAgICBpbml0Rm9vdGVyTmF2KCk7XG4gICAgfVxuICB9KTtcbn0pKGpRdWVyeSk7XG4iXX0=
