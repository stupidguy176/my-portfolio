(function ($) {
  "use strict";
  $(window).on("load", function () { // makes sure the whole site is loaded
    //preloader
    $("#status").fadeOut(); // will first fade out the loading animation
    $("#preloader").delay(450).fadeOut("slow"); // will fade out the white DIV that covers the website.

    //masonry
    $('.grid').masonry({
      itemSelector: '.grid-item'

    });

    translate();
  });


  $(document).ready(function () {

    //active menu
    $(document).on("scroll", onScroll);

    $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $('a').each(function () {
        $(this).removeClass('active');
      })
      $(this).addClass('active');

      var target = this.hash;
      $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top + 2
      }, 500, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
      });
    });

    //Scroll Top
    jQuery('#scroll-top').scrollToTop();


    //scroll js
    smoothScroll.init({
      selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
      selectorHeader: '[data-scroll-header]', // Selector for fixed headers (must be a valid CSS selector)
      speed: 500, // Integer. How fast to complete the scroll in milliseconds
      easing: 'easeInOutCubic', // Easing pattern to use
      updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
      offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
      callback: function (toggle, anchor) { } // Function to run after scrolling
    });

    //menu
    var bodyEl = document.body,
      content = document.querySelector('.content-wrap'),
      openbtn = document.getElementById('open-button'),
      closebtn = document.getElementById('close-button'),
      isOpen = false;

    function inits() {
      initEvents();
    }

    function initEvents() {
      openbtn.addEventListener('click', toggleMenu);
      if (closebtn) {
        closebtn.addEventListener('click', toggleMenu);
      }

      // close the menu element if the target it´s not the menu element or one of its descendants..
      content.addEventListener('click', function (ev) {
        var target = ev.target;
        if (isOpen && target !== openbtn) {
          toggleMenu();
        }
      });
    }

    function toggleMenu() {
      if (isOpen) {
        classie.remove(bodyEl, 'show-menu');
      }
      else {
        classie.add(bodyEl, 'show-menu');
      }
      isOpen = !isOpen;
    }

    inits();


    //typed js
    $(".typed").typed({
      strings: ["My Name is M.Reza", "I'm a Web Designer", "Love Simplicity"],
      typeSpeed: 100,
      backDelay: 900,
      // loop
      loop: true
    });

    //owl carousel
    $('.owl-carousel').owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds

      items: 1,
      itemsDesktop: [1199, 1],
      itemsDesktopSmall: [979, 1],
      itemsTablet: [768, 1],
      itemsMobile: [479, 1],

      // CSS Styles
      baseClass: "owl-carousel",
      theme: "owl-theme"
    });

    $('.owl-carousel2').owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds

      items: 1,
      itemsDesktop: [1199, 1],
      itemsDesktopSmall: [979, 1],
      itemsTablet: [768, 1],
      itemsMobile: [479, 1],
      autoPlay: false,

      // CSS Styles
      baseClass: "owl-carousel",
      theme: "owl-theme"
    });

    //contact
    $('input').blur(function () {

      // check if the input has any value (if we've typed into it)
      if ($(this).val())
        $(this).addClass('used');
      else
        $(this).removeClass('used');
    });

    //pop up porfolio
    $('.portfolio-image li a').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
      // other options
    });

    //Skill
    jQuery('.skillbar').each(function () {
      jQuery(this).appear(function () {
        jQuery(this).find('.count-bar').animate({
          width: jQuery(this).attr('data-percent')
        }, 3000);
        var percent = jQuery(this).attr('data-percent');
        jQuery(this).find('.count').html('<span>' + percent + '</span>');
      });
    });


  });


  //header
  function inits() {
    window.addEventListener('scroll', function (e) {
      var distanceY = window.pageYOffset || document.documentElement.scrollTop,
        shrinkOn = 300,
        header = document.querySelector(".for-sticky");
      if (distanceY > shrinkOn) {
        classie.add(header, "opacity-nav");
      } else {
        if (classie.has(header, "opacity-nav")) {
          classie.remove(header, "opacity-nav");
        }
      }
    });
  }

  window.onload = inits();

  //nav-active
  function onScroll(event) {
    var scrollPosition = $(document).scrollTop();
    $('.menu-list a').each(function () {
      var currentLink = $(this);
      var refElement = $(currentLink.attr("href"));
      if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
        $('.menu-list a').removeClass("active");
        currentLink.addClass("active");
      }
      else {
        currentLink.removeClass("active");
      }
    });
  }

  var dictionary = {};
  var langs = ['vi', 'en'];
  var current_lang_index = 0;
  var current_lang = langs[current_lang_index];

  $.getJSON("file/language.json", function (json) {
    dictionary = json;
  });

  // window.change_lang = function (index) {
  // current_lang_index = ++current_lang_index % 2;
  //   current_lang = langs[index];
  //   translate();
  // }

  function change_lang(index) {
    current_lang = langs[index];
    translate();
  }

  $("#lang_en").on('click', function (index) {
    current_lang = langs[1];
    $("#show_note").addClass('is_show');
    translate();
  });

  $("#lang_vi").on('click', function (index) {
    current_lang = langs[0];
    $("#show_note").removeClass('is_show');
    translate();
  });

  $("#show_note").on('click', function (index) {
    $(".modal-meme").addClass("show-modal-meme");
  });

  var closeButton = document.querySelector(".close-button-meme");
  closeButton.addEventListener("click", function () {
    $(".modal-meme").removeClass("show-modal-meme");
  });

  function translate() {
    $("[data-translate]").each(function () {
      var key = $(this).data('translate');
      $(this).html(dictionary[key][current_lang] || "N/A");
      if (current_lang == 'vi') {
        $("#lang_vi").addClass('active');
        $("#lang_en").removeClass('active');
      } else {
        $("#lang_en").addClass('active');
        $("#lang_vi").removeClass('active');
      }
    });
  }

  //Scroll Top 
  $.fn.scrollToTop = function () {
    // jQuery(this).hide().removeAttr('href');

    // way 1 use jquery

    // if (jQuery(window).scrollTop() != '0') {
    //   jQuery(this).fadeIn('slow')
    // }
    // var scrollDiv = jQuery(this);
    // jQuery(window).scroll(function () {
    //   if (jQuery(window).scrollTop() == '0') {
    //     jQuery(scrollDiv).fadeOut('slow')
    //   } else {
    //     jQuery(scrollDiv).fadeIn('slow')
    //   }
    // });

    // way 2 add remove class
    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
      //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
      offset_opacity = 1200,
      //duration of the top scrolling animation (in ms)
      scroll_top_duration = 700,
      //grab the "back to top" link
      $back_to_top = $('.cd-top, .top');

    //hide or show the "back to top" link
    $(window).scroll(function () {
      ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
      if ($(this).scrollTop() > offset_opacity) {
        $back_to_top.addClass('cd-fade-out');
      }
    });


    jQuery(this).on('click', function () {
      jQuery('html, body').animate({
        scrollTop: 0
      }, 'slow')
    })
  };

})(jQuery);