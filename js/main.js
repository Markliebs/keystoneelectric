'use strict';

(function() {
  // Avoid `console` errors in browsers that lack a console.
  var method;
  var noop = function() {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Init plugins
$(document).ready(function() {
  // [Table of Contents]
  // ¬ Form
  // ¬ Validation form
  // ¬ Select2
  // ¬ noUiSlider
  // ¬ This button will increment the value
  // ¬ Grid gallery
  // ¬ Counter-Up
  // ¬ Parallax
  // ¬ CarouselOwl
  // ¬ Blueimp lightbox
  // ¬ Sly navigation
  // ¬ equalHeights
  // ¬ preloader start
  // ¬ Youtube Player
  // ¬ Youtube video

  // Detect IE.
  // Feature detection of "transform-style: preserve-3d" doesn't work, so this
  // is the only way how to fall back to a 2D front page example in IE that
  // doesn't have a full support of 3D transforms across the board.
  document.documentElement.setAttribute("data-agent", navigator.userAgent);
  document.getElementsByTagName('html')[0].className += ' ' +
  (~window.navigator.userAgent.indexOf('MSIE') ? 'ie' : 'no-ie');

  // events
  var clickEvent = 'click';

  // Functions
  $.fn.extend({
    animateCss: function(animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $(this).addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
      });
    }
  });

  $('[data-toggle="tooltip"]').tooltip();

  $('.navbar-nav-user .dropdown-menu').on(clickEvent, function(e) {
    e.stopPropagation();
  });

  // Add slideDown animation to dropdown
  $('.dropdown').on('show.bs.dropdown', function(e) {
    $(this).find('.dropdown-menu').slideDown();
  });

  // Add slideUp animation to dropdown
  $('.dropdown').on('hide.bs.dropdown', function(e) {
    $(this).find('.dropdown-menu').slideUp();
  });

  // keyup bind
  var closeEsc = $('.navbar-nav-user .dropdown-menu').parent();

  // bind keyup
  $(document).on('keyup', function(e) {
    if (e.keyCode === 27) {
      if (closeEsc.hasClass('open')) {
        $(closeEsc).removeClass('open');
      }
    }
  });

  $('.btn-logout').on(clickEvent, function() {
    $('.dropdown-menu-account').parent().removeClass('actived');
  });

  // Forms
  // Bootstrap-datepicker provides a flexible datepicker widget in the Bootstrap style
  // https://bootstrap-datepicker.readthedocs.io/en/latest/
  $('.pick-date').datepicker({
    maxViewMode: 0,
    autoclose: true,
    format: "mm/dd/yyyy"
  });

  // http://jonthornton.github.io/jquery-timepicker/
  // A lightweight, customizable javascript timepicker plugin for jQuery inspired by Google Calendar.
  $('.time-pick').timepicker({
    showDuration: true,
    timeFormat: 'H:i',
    disableTextInput: true
  });

  // Select2
  // To get started, checkout examples and documentation at https://select2.github.io/
  if ($(".select2").length) {
    $(".select2").select2({
      width: '100%'
    });
  }

  // Validation form
  // https://github.com/1000hz/bootstrap-validator
  // A user-friendly HTML5 form validation jQuery plugin for Bootstrap
  $.fn.validator.Constructor.INPUT_SELECTOR = ':input:not([type="submit"], button):enabled';
  var formsValid = $('form[data-toggle="validator"]');
  formsValid.validator({
    focus: false
  }).on('submit', function(e) {
    if (e.isDefaultPrevented()) {
      // handle the invalid form...
    } else {
      // everything looks good!
    }
  });

  // https://github.com/leongersen/noUiSlider
  if ($('#sliderRange').length) {
    var sliderRange = document.getElementById('sliderRange');

    noUiSlider.create(sliderRange, {
      start: [15, 2451],
      connect: true,
      range: {
        min: 1,
        max: 5000
      },
      format: wNumb({
        decimals: 3,
        thousand: '.',
        prefix: '$ '
      })
    });

    var inputNumbMin = document.getElementById('inputNumbMin');
    var inputNumbMax = document.getElementById('inputNumbMax');

    sliderRange.noUiSlider.on('update', function(values, handle) {
      var value = values[handle];

      if (handle) {
        inputNumbMax.value = value;
      } else {
        inputNumbMin.value = value;
      }
    });

    inputNumbMin.addEventListener('change', function() {
      sliderRange.noUiSlider.set([this.value, null]);
    });
    inputNumbMax.addEventListener('change', function() {
      sliderRange.noUiSlider.set([null, this.value]);
    });
  }

  // This button will increment the value
  $.fn.bpmNumber = function(options) {
    return this.each(function() {
      var btnMinus = '<button type="button" class="btn-count btn-count--minus">-<span></span></button>';
      var btnPlus = '<button type="button" class="btn-count btn-count--plus">+<span></span><span></span></button>';
      var $input = $(this);
      var $parent = $input.parent();

      $parent.prepend(btnPlus);
      $parent.prepend(btnMinus);
    });
  };
  $('[data-number]').bpmNumber();

  $(".btn-count").on("click", function() {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();

    if ($button.text() === "+") {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      if (oldValue > 1) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 1;
      }
    }
    $button.parent().find("input").val(newVal);
  });

  // Grid gallery
  // http://masonry.desandro.com/
  // Cascading grid layout library
  var gridRow = $('.grid-row, .grid-gallery');
  var gridSort = $('[data-grid-sort]');
  var gridItem = $('.grid-gallery').find('.grid-item');
  gridItem.hide();

  gridRow.imagesLoaded(function() {
    gridItem.fadeIn();

    gridRow.masonry({
      columnWidth: '.grid-sizer',
      itemSelector: '.grid-item',
      percentPosition: true
    });

    var grid = gridSort.isotope({
      itemSelector: '.grid-item',
      resizable: false,
      percentPosition: true,
      masonry: {
        columnWidth: '.grid-sizer'
      }
    });

    $('.gallery-filter').on(clickEvent, 'a', function(event) {
      event.preventDefault();
      var filterValue = $(this).attr('data-filter');

      grid.isotope({filter: filterValue});
    });
  });

  // https://github.com/bfintal/Counter-Up
  // http://bfintal.github.io/Counter-Up/demo/demo.html
  $("[data-counter]").counterUp({
    delay: 10,
    time: 2000
  });

  $(window).resize().imagesLoaded().always(function(instance) {
    // JavaScript parallax scrolling
    // https://github.com/nk-o/jarallax
    $('.parallax').jarallax({
      speed: 0.74,
      type: 'scroll'
    });

    // Parallax function for pattern
    $('.parallax-repeat').each(function() {
      var $el = $(this);
      $(window).scroll(function() {
        updateBackground($el);
      });
      updateBackground($el);
    });

    var speed = 0.074;
    function updateBackground($el) {

      var diff = $(window).scrollTop() - $el.offset().top;
      var yPos = -(diff * speed);
      var coords = '50% ' + yPos + 'px';

      $el.css({
        backgroundPosition: coords
      });
    }

    // carouselOwl
    // jQuery Responsive Carousel.
    // http://owlcarousel2.github.io/OwlCarousel2/
    var carouselOwl = $('.owl-carousel');

    // Carousels
    var catalogCarousel = $(".main-product__carousel");
    var testimonials = $('.testimonials-carousel');
    var brandsCarousel = $(".brands-carousel");
    var aboutGallery = $(".section-about__carousel");

    catalogCarousel.owlCarousel({
      loop: true,
      items: 1,
      slideSpeed: 150,
      paginationSpeed: 150,
      mouseDrag: true,
      touchDrag: true,
      nav: false,
      dots: false
    });

    // Testimonials
    testimonials.owlCarousel({
      loop: true,
      slideSpeed: 300,
      paginationSpeed: 300,
      margin: 30,
      autoHeight: true,
      mouseDrag: true,
      touchDrag: true,
      nav: false,
      dots: true,
      dotsContainer: '[data-control-dots]',
      responsive: {
        0: {
          items: 1
        },
        680: {
          items: 2
        },
        992: {
          items: 3
        }
      }
    });

    // Brands
    brandsCarousel.owlCarousel({
      loop: true,
      items: 2,
      autoHeight: false,
      margin: 2,
      slideSpeed: 300,
      paginationSpeed: 300,
      mouseDrag: true,
      touchDrag: true,
      nav: false,
      dots: false,
      lazyLoad: true,
      responsive: {
        480: {
          items: 3
        },
        767: {
          items: 4
        }
      }
    });

    // About gallery
    var flag = false;
    var duration = 300;
    var carouselTrack = $(".carousel-track");
    aboutGallery.owlCarousel({
      loop: true,
      items: 1,
      autoHeight: false,
      mouseDrag: true,
      touchDrag: true,
      nav: false,
      dots: false,
      lazyLoad: true
    })
    .on('changed.owl.carousel', function(e) {
      if (!flag) {
        flag = true;
        carouselTrack.trigger('to.owl.carousel', [e.item.index, duration, true]);
        flag = false;
      }
    });

    // track sync
    carouselTrack.owlCarousel({
      loop: true,
      center: true,
      items: 3,
      margin: 10,
      nav: false,
      dots: false,
      responsive: {
        480: {
          items: 4,
          margin: 10
        },
        768: {
          items: 5,
          margin: 10
        },
        992: {
          items: 6,
          margin: 30
        }
      }
    })

    .on('mousewheel', '.owl-stage', function(e) {
      if (e.deltaY > 0) {
        carouselTrack.trigger('next.owl');
      } else {
        carouselTrack.trigger('prev.owl');
      }
      e.preventDefault();
    })

    .on(clickEvent, '.owl-item', function() {
      aboutGallery.trigger('to.owl.carousel', [$(this).index(), duration, true]);
    })

    .on('changed.owl.carousel', function(e) {
      if (!flag) {
        flag = true;
        aboutGallery.trigger('to.owl.carousel', [e.item.index, duration, true]);
        flag = false;
      }
    });

    carouselOwl.each(function() {
      var $this = $(this);

      $this.parent().find('.next').on(clickEvent, function() {
        $this.trigger('next.owl.carousel');
      });

      $this.parent().find('.prev').on(clickEvent, function() {
        $this.trigger('prev.owl.carousel');
      });
    });

    // Blueimp lightbox
    // https://github.com/blueimp/Gallery
    // Add the following JavaScript code after including the Gallery script, to display the images in the Gallery lightbox on click of the links
    var galleryLinks = $(".grid-gallery .grid-gallery-link");
    galleryLinks.on(clickEvent, function(event) {
      event.preventDefault();
      var currentLink = galleryLinks.index(this);
      var galleryOptions = {
        index: currentLink,
        event: event,
        indicatorContainer: '.indicator',
        fullscreen: true,
        stretchImages: true,
        hidePageScrollbars: true,
        disableScroll: true,
        startSlideshow: true,
        slideshowInterval: 6000
      };

      blueimp.Gallery(galleryLinks, galleryOptions);
    });
  });

  // Sly navigation
  // http://darsa.in/sly/
  // JavaScript library for one-directional scrolling with item based navigation support
  var $galleryBox = $('#blueimp-gallery');
  var $slyTrack = $galleryBox.find('.gallery-controls__track');
  var $slyOptions = {
    horizontal: 1,
    itemNav: 'centered',
    smart: 1,
    activateOn: 'click',
    mouseDragging: 1,
    touchDragging: 1,
    releaseSwing: 1,
    startAt: 1,
    scrollBar: $galleryBox.find('.scrollbar'),
    scrollBy: 1,
    speed: 600,
    elasticBounds: 1,
    easing: 'easeOutExpo',
    dragHandle: 1,
    dynamicHandle: 1,
    clickBar: 1,
    activeClass: 'center',

    // Buttons
    prev: $galleryBox.find('.prev'),
    next: $galleryBox.find('.next'),
    prevPage: $galleryBox.find('.prevPage'),
    nextPage: $galleryBox.find('.nextPage')
  };

  $('.grid-gallery .grid-item').on(clickEvent, function() {
    if ($('#blueimp-gallery').hasClass('blueimp-gallery-display')) {
      $slyTrack.sly($slyOptions).init();
    }
  });

  // Panels horizontal scrolling
  var $slyPanels = $("[data-slide-panel]");
  var $slyPanelsTrack = $("[data-slide-track]");
  var $slyPanelsOptions = {
    horizontal: 1,
    itemNav: 'centered',
    smart: 3,
    activateOn: 'click',
    mouseDragging: 1,
    touchDragging: 1,
    releaseSwing: 1,
    speed: 600,
    elasticBounds: 1,
    easing: 'easeOutExpo',
    dragHandle: 1,
    dynamicHandle: 1,

    // Buttons
    prev: $slyPanels.find('.prev'),
    next: $slyPanels.find('.next')
  };
  $slyPanelsTrack.sly($slyPanelsOptions).init();

  // window load start
  $(window).on('load resize', function(e) {
    $slyTrack.sly('reload');
    $slyPanelsTrack.sly('reload');

    // Simple jQuery plugin to equalize heights of multiple elements on a page.
    // https://github.com/mattbanks/jQuery.equalHeights
    $('[data-eq-height]').equalHeights();
  });

  if (window.jQuery) {
    // preloader start
    $('#preloader').delay(1000).fadeOut(500);
  }

  // Youtube Player
  // use a custom yuotube player for a video as background on jQuery framework
  //
  // bind buttons
  var btnPlay = $('[data-play]');
  var videoContain = $('.video-contain');

  btnPlay.on({
    mouseenter: function() {
      videoContain.addClass('hover');
    },
    mouseleave: function() {
      videoContain.removeClass('hover');
    },
    click: function() {
      videoContain.addClass('active');
    }
  });

  // Youtube video
  var videoTour = '3ET1wM5qUpM'; // example

  $('#videoTourPlay').on(clickEvent, function() {
    $('#videoTour').html('<iframe id="video" class="embed-responsive-item" width="100%" height="640" src="https://www.youtube.com/embed/' + videoTour + '?&autoplay=1&loop=1&controls=0&rel=0&wmode=transparent" frameborder="0" allowfullscreen></iframe>');
  });
});

