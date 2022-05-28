//   all ------------------
function initHomeradar() {
    "use strict";
	$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');
    //   loader ------------------
    $(".loader-wrap").fadeOut(300, function () {
        $("#main").animate({
            opacity: "1"
        }, 600);
    });
    //   Background image ------------------
    var a = $(".bg");
    a.each(function () {
        if ($(this).attr("data-bg")) $(this).css("background-image", "url(" + $(this).data("bg") + ")");
    });
    //   clone ------------------
    $.fn.duplicate = function (a, b) {
        var c = [];
        for (var d = 0; d < a; d++) $.merge(c, this.clone(b).get());
        return this.pushStack(c);
    };
    //   Star Raiting ------------------
    function cardRaining() {
        var cr = $(".card-popup-raining");
        cr.each(function () {
            var starcount = $(this).attr("data-starrating");
            $("<i class='fas fa-star'></i>").duplicate(starcount).prependTo(this);
        });
    }
    cardRaining();
    function cardRaining2() {
        var cr2 = $(".card-popup-rainingvis"),
            sts = $(".price-level-item");
        cr2.each(function () {
            var starcount2 = $(this).attr("data-starrating2");
            $("<i class='fas fa-star'></i>").duplicate(starcount2).prependTo(this);
        });
        sts.each(function () {
            var pricecount = $(this).attr("data-pricerating");
            $("<strong>$</strong>").duplicate(pricecount).prependTo(this);
        });
        $("<div class='card-popup-rainingvis_bg'><div>").appendTo(".card-popup-rainingvis");
        $("<span class='card-popup-rainingvis_bg_item'></span>").duplicate(5).prependTo(".card-popup-rainingvis_bg");
    }
    cardRaining2();
    $(".eye").on("click touchstart", function () {
        var epi = $(this).parent(".pass-input-wrap").find("input");
        if (epi.attr("type") === "password") {
            epi.attr("type", "text");
        } else {
            epi.attr("type", "password");
        }
    });
    //   Slick ------------------
    var sbp = $('.swiper-button-prev'),
        sbn = $('.swiper-button-next');
    $('.single-slider').slick({
        slidesToShow: 1,
        arrows: false,
        fade: false,
        dots: true,
        adaptiveHeight: true,
    });
    $('.single-carousel').slick({
        infinite: true,
        slidesToShow: 4,
        dots: true,
         autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        centerMode: true,
        variableWidth: true,
        responsive: [{
                breakpoint: 1224,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                }
            }
        ]

    });
    $('.half-carousel').slick({
        infinite: true,
        slidesToShow: 4,
         autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
        centerMode: false,
        variableWidth: false,
        responsive: [{
                breakpoint: 1224,
                settings: {
                    slidesToShow: 2,
                    centerMode: false,
                }
            },
            {
                breakpoint: 564,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                }
            }
        ]

    });
    $('.testimonials-slider').slick({
        infinite: true,
        slidesToShow: 3,
        dots: true,
        arrows: false,
         autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        variableWidth: false,
        responsive: [{
                breakpoint: 1224,
                settings: {
                    slidesToShow: 2,
                    centerMode: false,
                }
            },

            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                }
            }
        ]

    });
    $('.compare-slider').slick({
        infinite: false,
        slidesToShow: 1,
         autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: false,
        centerMode: false,
        variableWidth: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            }
        }]
    });
    $('.listing-carousel').slick({
        infinite: true,
        slidesToShow: 3,
        dots: true,
        arrows: false,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                }
            }
        ]
    });
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        dots: true,
        adaptiveHeight: true,
        asNavFor: '.slider-nav'

    });
    $('.slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true
    });
    sbp.on("click", function () {
        $(this).closest(".carousel-wrap").find('.carousel').slick('slickPrev');
    });
    sbn.on("click", function () {
        $(this).closest(".carousel-wrap").find('.carousel').slick('slickNext');
    });
    var $slick = $('.slideshow-container');
    $slick.slick({
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        fade: true,
        cssEase: 'ease-in',
        infinite: true,
        speed: 1000,
        dots: true,
        pauseOnHover: false,
        pauseOnFocus: false
    });
    $(".slider-progress-bar").addClass("act-slider");
    $slick.on("beforeChange", function (event, slick) {
        $(".slider-progress-bar").removeClass("act-slider");
    });
    $slick.on("afterChange", function (event, slick) {
        $(".slider-progress-bar").addClass("act-slider");
    });
    $('.hero-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        dots: false,
        arrows: false,
    });
    //   Checkboxes ------------------
    var myDiv = $(".geodir-category-content p");
    myDiv.text(myDiv.text().substring(0, 90) + '...');
    var $checkboxes = $('.leave-rating input:radio');
    $checkboxes.change(function () {
        var countCheckedCheckboxes = $checkboxes.filter(':checked').attr("data-ratingtext");
        $('#count-checked-radio').text(countCheckedCheckboxes);
    });
    //   lightGallery------------------
    $(".image-popup").lightGallery({
        selector: "this",
        cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
        download: false,
        counter: false
    });
    var o = $(".lightgallery");
    o.lightGallery({
        selector: ".lightgallery a.popup-image",
        cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
        download: false,
        loop: false,
        counter: false
    });
    $(".dynamic-gal").on('click', function () {
        var dynamicgal = eval($(this).attr("data-dynamicPath"));
        $(this).lightGallery({
            dynamic: true,
            dynamicEl: dynamicgal,
            download: false,
            loop: true,
            counter: false
        });
    });
    //   Appear------------------
    $(".stats").appear(function () {
        $(".num").countTo();
    });
    //  Scroll nav ------------------
    $(".scroll-init").singlePageNav({
        filter: ":not(.external)",
        updateHash: false,
        offset: 70,
        threshold: 120,
        speed: 1200,
        currentClass: "act-scrlink"
    });
    $(".scroll-init2").singlePageNav({
        filter: ":not(.external)",
        updateHash: false,
        offset: 140,
        threshold: 100,
        speed: 1200,
        currentClass: "act-scrlink"
    });
    // Share   ------------------
    $(".sfcs").on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("vis-butsh");
        $(".share-container").toggleClass("visshare");
    });
    $(".share-container").share({
        networks: ['facebook', 'pinterest', 'tumblr', 'twitter', 'linkedin', 'digg']
    });
    //   accordion ------------------
    $(".accordion a.toggle").on("click", function (a) {
        a.preventDefault();
        $(".accordion a.toggle").removeClass("act-accordion");
        $(this).addClass("act-accordion");
        if ($(this).next('div.accordion-inner').is(':visible')) {
            $(this).next('div.accordion-inner').slideUp();
        } else {
            $(".accordion a.toggle").next('div.accordion-inner').slideUp();
            $(this).next('div.accordion-inner').slideToggle();
        }
    });
    $(".accordion-lite-header").on("click", function () {
        $(this).parent(".accordion-lite-container").find(".accordion-lite_content").slideToggle(400);
        $(this).toggleClass("acc_open");
    });
    $('.faq-nav li a').on("click", function () {
        $('.faq-nav li a').removeClass("act-faq-link");
        $(this).addClass("act-faq-link");
    });
    //   tabs------------------
    $(".tabs-menu a").on("click", function (a) {
        a.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var b = $(this).attr("href");
        $(this).parents(".tabs-act").find(".tab-content").not(b).css("display", "none");
        $(b).fadeIn();
    });
    //   ionRangeSlider------------------	
    var sliders_init = $(".price-range");
    sliders_init.ionRangeSlider({
        type: "single",
    });
    var sliders_init2 = $(".price-range-double");
    sliders_init2.ionRangeSlider({
        type: "double",
    });
    var sliders = $(".reset-action").find(".price-range");
    $(".reset-btn").on("click", function () {
        $(sliders).each(function (index, sliders_init) {
            var slider_instance = $(sliders_init).data("ionRangeSlider");
            slider_instance.reset();
        });
        $(".reset-action").find("input[type=text], textarea").val("");
        $(".monterage-title-item span").text("0");
    });
    //   Contact form------------------
    // $(document).on('submit', '#contactform', function () {
    //     var a = $(this).attr("action");
    //     $("#message").slideUp(750, function () {
    //         $("#message").hide();
    //         $("#submit").attr("disabled", "disabled");
    //         $.post(a, {
    //             name: $("#name").val(),
    //             email: $("#email").val(),
    //             comments: $("#comments").val()
    //         }, function (a) {
    //             document.getElementById("message").innerHTML = a;
    //             $("#message").slideDown("slow");
    //             $("#submit").removeAttr("disabled");
    //             if (null != a.match("success")) $("#contactform").slideDown("slow");
    //         });
    //     });
    //     return false;
    // });
    $(document).on('keyup', '#contactform input, #contactform textarea', function () {
        $("#message").slideUp(1500);
    });
    $('.cf_btn').on("click", function (e) {
        e.preventDefault();
        $('.contact-form-wrap').fadeIn(400);
        $("html, body").addClass("hid-body");
        $("#message").slideUp(100);
        $(".custom-form").find("input[type=text], textarea").val("");
    });
    $('.contact-form-overlay , .close-contact-form').on("click", function () {
        $('.contact-form-wrap').hide();
        $("html, body").removeClass("hid-body");
    });
    //   mailchimp------------------
  
    // scroll animation ------------------
    var progressBar = $(".js-progress-bar");
    var $window = $(window);
    $(window).on("scroll", function () {
        var a = $(document).height();
        var b = $(window).height();
        var c = $(window).scrollTop();
        var d = c / (a - b) * 100;
        progressBar.css("stroke-dashoffset", 100 - (d));
        if ($(this).scrollTop() > 150) {
            $(".to-top").fadeIn(500);
            $(".secondary-nav").addClass("vis_secnav");
        } else {
            $(".to-top").fadeOut(500);

            $(".secondary-nav").removeClass("vis_secnav");
        }
    });
    //   scroll to------------------
    $(".custom-scroll-link").on("click", function () {
        if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") || location.hostname === this.hostname) {
            var b = $(this.hash);
            b = b.length ? b : $("[name=" + this.hash.slice(1) + "]");
            if (b.length) {
                $("html,body").animate({
                    scrollTop: b.offset().top - 70 + "px"
                }, {
                    queue: false,
                    duration: 1200,
                    easing: "easeInOutExpo"
                });
                return false;
            }
        }
    });
    $(".to-top , .dash-to-top").on("click", function (a) {
        a.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    $(".cat-list li a").on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("act-category");
    });
    //   Isotope------------------
 
        function initIsotope() {
    if ($(".gallery-items").length) {
            var agf = $(".gallery-items").isotope({
                singleMode: true,
                columnWidth: ".grid-sizer, .grid-sizer-second, .grid-sizer-three",
                itemSelector: ".gallery-item, .gallery-item-second, .gallery-item-three",
                transformsEnabled: true,
                transitionDuration: "700ms",
                resizable: true
            });
            agf.imagesLoaded(function () {
                agf.isotope("layout");
            });
            $(".gallery-filters").on("click", "a.gallery-filter", function (af) {
                af.preventDefault();
                var brec = $(this).attr("data-filter");
                agf.isotope({
                    filter: brec
                });
                $(".gallery-filters a").removeClass("gallery-filter-active");
                $(this).addClass("gallery-filter-active");
            });
        }   
    }
initIsotope();
    // modal ------------------
    var wlwrp = $(".header-modal"),
        wllink = $(".show-header-modal"),
        hopbtn = $(".header-opt_btn"),
        hmodopt = $(".header-opt-modal");
    function showWishlist() {
        wlwrp.fadeIn(1).addClass("vis-wishlist").removeClass("novis_wishlist");
        wllink.addClass("scwllink");
        hideMobileMenu();
        hideSearch();
    }
    function hideWishlist() {
        wlwrp.fadeOut(1).removeClass("vis-wishlist").addClass("novis_wishlist");
        wllink.removeClass("scwllink");
    }
    wllink.on("click", function () {
        hideHeaderopt();
        if (wlwrp.hasClass("novis_wishlist")) showWishlist();
        else hideWishlist();
    });
    $(".close-header-modal").on("click", function () {
        hideWishlist();
    });
    function showHeaderopt() {
        hmodopt.fadeIn(1).addClass("vis-head-mod").removeClass("novis_header-mod");
        hopbtn.addClass("scwheader-opt-btn");
        hideWishlist();
    }
    function hideHeaderopt() {
        hmodopt.fadeOut(1).removeClass("vis-head-mod").addClass("novis_header-mod");
        hopbtn.removeClass("scwheader-opt-btn");
    }
    hopbtn.on("click", function () {
        if (hmodopt.hasClass("novis_header-mod")) showHeaderopt();
        else hideHeaderopt();
    });
    var hsb = $(".header-search-button"),
        hsw = $(".header-search-wrapper"),
        hmsw = $(".more-search-opt-wrap");
    function showSearch() {
        hsw.fadeIn(1).addClass("vis-search").removeClass("novis_search");
        hsb.addClass("hsbclose");
        hideMobileMenu();
        hideWishlist();
    }
    function hideSearch() {
        hsw.fadeOut(1).removeClass("vis-search").addClass("novis_search");
        hsb.removeClass("hsbclose");
    }
    hsb.on("click", function () {
        if (hsw.hasClass("novis_search")) showSearch();
        else hideSearch();
    });
    $(".smact").on("click", function (e) {
        e.preventDefault();
        $(this).parents(".smpar").find(".show-more-snopt-tooltip").toggleClass("show-more-snopt-tooltip_vis");
    });
    function showAdwSearch() {
        hmsw.addClass("vis-more-search").removeClass("more-hidden_wrap");
    }
    function hideAdwSearch() {
        hmsw.removeClass("vis-more-search").addClass("more-hidden_wrap");
    }
    $(".mor-opt-btn_act").on("click", function () {
        if (hmsw.hasClass("more-hidden_wrap")) showAdwSearch();
        else hideAdwSearch();
    });
    $(".close_msotw").on("click", function () {
        hideAdwSearch();
    });
    var modal = {};
    modal.hide = function () {
        $('.modal , .reg-overlay').fadeOut(200);
        $("html, body").removeClass("hid-body");
        $(".modal_main").removeClass("vis_mr");
    };
    $('.modal-open').on("click", function (e) {
        e.preventDefault();
        $('.modal , .reg-overlay').fadeIn(200);
        $(".modal_main").addClass("vis_mr");
        $("html, body").addClass("hid-body");
    });
    $('.close-reg , .reg-overlay').on("click", function () {
        modal.hide();
    });
    function csselem() {
        $(".map-container.column-map").css({
            height: $(window).outerHeight(true) - 150 + "px"
        });
        $(".map-container.column-map.no-top_search").css({
            height: $(window).outerHeight(true) - 70 + "px"
        });
        $(".slideshow-container .slideshow-item").css({
            height: $(".slideshow-container").outerHeight(true)
        });
        $(".hero-slider-item").css({
            height: $(".hero-slider").outerHeight(true)
        });
        var ww2 = $(window).width();
        if (ww2 > 1084) {
            $(".lws_mobile , .list-searh-input-wrap").css({
                display: "block"
            });
        } else {
            $(".lws_mobile , .list-searh-input-wrap").css({
                display: "none"
            });
        }
    }
    csselem();
    // Mob Menu------------------
    function headerModalOpt() {
        $(".lang-item .header-opt-modal-list li a").on('click', function (e) {
            e.preventDefault();
            var thdatlantext = $(this).data("lantext");
            $(".lang-item li a").removeClass("current-lan");
            $(this).addClass("current-lan");
            $(".lang-item h4 span  ").text(thdatlantext);
        });
        $(".currency-item .header-opt-modal-list li a").on('click', function (e) {
            e.preventDefault();
            var thdatlantext = $(this).data("lantext");
            $(".currency-item li a").removeClass("current-lan");
            $(this).addClass("current-lan");
            $(".currency-item h4 span  ").text(thdatlantext);
        });
        $(".header-opt-modal-item h4").on("click", function () {
            $(this).toggleClass("lang-cur-act");
            $(this).parents(".header-opt-modal-item").find(".header-opt-modal-list").toggleClass("vis_homd");
        });
    }
    headerModalOpt();
    function showMobileMenu() {
        $(".main-menu").addClass("vismobmenu");
        $(".nav-button-wrap").addClass("vismobmenu_btn").removeClass("nvminit");
        hideWishlist();
        hideSearch();
    }
    function hideMobileMenu() {
        $(".main-menu").removeClass("vismobmenu");
        $(".nav-button-wrap").removeClass("vismobmenu_btn").addClass("nvminit");
    }
    $(".nav-button-wrap").on("click", function () {
        if ($(this).hasClass("nvminit")) {
            showMobileMenu();
        } else {
            hideMobileMenu();
        }
    });
    function mobMenuInit() {
        var ww = $(window).width();
        if (ww < 1054) {
            $(".menusb , .add-list_mob , .header-opt-modal-container_mob").remove();
            $(".main-menu").removeClass("nav-holder");
            $(".main-menu nav").clone().addClass("menusb").appendTo(".main-menu");
            $(".menusb").menu();
            $(".map-container.fw-map.big_map.hid-mob-map").css({
                height: $(window).outerHeight(true) - 110 + "px"
            });
            $(".novis_header-mod").removeClass("header-opt-modal");
            $(".novis_header-mod .hopmc_init").clone().addClass("header-opt-modal-container_mob").appendTo(".main-menu");
            $(".add-list_wrap a").removeClass("add-list");
            $(".add-list_wrap a").clone().addClass("add-list_mob").appendTo(".main-menu");
            headerModalOpt();
            hideHeaderopt();
        } else {
            $(".menusb , .add-list_mob , .header-opt-modal-container_mob").remove();
            $(".main-menu").addClass("nav-holder");
            $(".add-list_wrap a").removeClass("add-list_mob").addClass("add-list");
            $(".hopmc_init").removeClass("header-opt-modal-container_mob");
            $(".novis_header-mod").addClass("header-opt-modal");
        }
    }
    mobMenuInit();
    //   css ------------------
    var $windowres = $(window);
    $windowres.on("resize", function () {
        csselem();
        mobMenuInit();

    });
    $('.tariff-toggle').on("click", function () {
        if ($('#yearly-1').is(':checked')) {
            $('.price-item').addClass('year-mont');
        }
        if ($('#monthly-1').is(':checked')) {
            $('.price-item').removeClass('year-mont');
        }
    });
    $('.chosen-select').niceSelect();
    // date picker------------------
    $('input[name="datepicker-here"]').daterangepicker({
        autoUpdateInput: false,
        parentEl: $(".date-container"),
        singleDatePicker: true,
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="datepicker-here-time"]').daterangepicker({
        autoUpdateInput: false,
        parentEl: $(".date-container2"),
        singleDatePicker: true,
        timePicker: true,
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="datepicker-here-time"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY hh:mm A'));
    });
    $('input[name="datepicker-here-time"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
    $('input[name="datepicker-here"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY'));
    });
    $('input[name="datepicker-here"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
    $('input[name="dates"]').daterangepicker({
        autoUpdateInput: false,
        parentEl: $(".date-container3"),
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="dates"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });
    $('input[name="dates"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
    $(".show-list-wrap-search").on("click", function (e) {
        $(".lws_mobile").slideToggle(400);
        $(this).toggleClass("slsw_vis");
    });
    $(".listing-item").matchHeight({});
    $(".one-column-grid-wrap .listing-item").addClass("has_one_column");
    $(".grid-opt li span").on("click", function () {
        $(".listing-item").matchHeight({
            remove: true
        });
        setTimeout(function () {
            $(".listing-item").matchHeight();
        }, 50);
        $(".grid-opt li span").removeClass("act-grid-opt");
        $(this).addClass("act-grid-opt");
        if ($(this).hasClass("two-col-grid")) {
            $(".listing-item").removeClass("has_one_column");
            $(".listing-item").addClass("has_two_column");
        } else if ($(this).hasClass("one-col-grid")) {
            $(".listing-item").addClass("has_one_column");
        } else {
            $(".listing-item").removeClass("has_one_column").removeClass("has_two_column");
        }
    });
    $(".notification-close").on("click", function (e) {
        e.preventDefault();
        $(this).parent(".notification").slideUp(500);
    });
    $(".more-filter-option").on("click", function () {
        $(".hidden-listing-filter").slideToggle(500);
        $(this).toggleClass("mfilopact");
    });
    var ztxt = new Ztextify(".hero-text-big", {
        depth: "110px",
        layers: 33,
        fade: true,
        direction: "forwards",
        event: "pointer",
        eventRotation: "15deg"
    });
    $(".tfp-btn").on("click", function () {
        $(this).toggleClass("rot_tfp-btn");
        $(".tfp-det").toggleClass("vis_tfp-det ");
    });
    $(".submenu-link").on("click", function (ef) {
        ef.preventDefault();
        $(this).toggleClass("sl_tog");
        $(this).parent("li").find("ul").slideToggle(300);
    });
    //   Video------------------
    var v = $(".background-youtube-wrapper").data("vid");
    var f = $(".background-youtube-wrapper").data("mv");
    $(".background-youtube-wrapper").YTPlayer({
        fitToBackground: true,
        videoId: v,
        pauseOnScroll: true,
        mute: f,
        callback: function () {
            var acds = $(".background-youtube-wrapper").data("ytPlayer").player;
        }
    });
    var w = $(".background-vimeo").data("vim"),
        bvc = $(".background-vimeo"),
        bvmc = $(".media-container"),
        bvfc = $(".background-vimeo iframe "),
        vch = $(".video-container");
    bvc.append('<iframe src="//player.vimeo.com/video/' + w + '?background=1"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen ></iframe>');
    $(".video-holder").height(bvmc.height());
    if ($(window).width() > 1024) {
        if ($(".video-holder").length > 0)
            if (bvmc.height() / 9 * 16 > bvmc.width()) {
                bvfc.height(bvmc.height()).width(bvmc.height() / 9 * 16);
                bvfc.css({
                    "margin-left": -1 * $("iframe").width() / 2 + "px",
                    top: "-75px",
                    "margin-top": "0px"
                });
            } else {
                bvfc.width($(window).width()).height($(window).width() / 16 * 9);
                bvfc.css({
                    "margin-left": -1 * $("iframe").width() / 2 + "px",
                    "margin-top": -1 * $("iframe").height() / 2 + "px",
                    top: "50%"
                });
            }
    } else if ($(window).width() < 760) {
        $(".video-holder").height(bvmc.height());
        bvfc.height(bvmc.height());
    } else {
        $(".video-holder").height(bvmc.height());
        bvfc.height(bvmc.height());
    }
    vch.css("width", $(window).width() + "px");
    vch.css("height", 720 / 1280 * $(window).width()) + "px";
    if (vch.height() < $(window).height()) {
        vch.css("height", $(window).height() + "px");
        vch.css("width", 1280 / 720 * $(window).height()) + "px";
    }
    //   scrollToFixed------------------
    $(".fixed-column_menu-init").scrollToFixed({
        minWidth: 1064,
        marginTop: 120,
        removeOffsets: true,
        dontSetWidth: false,
        limit: function () {
            var a = $(".limit-box").offset().top - $(".fixed-column_menu-init").outerHeight() - 1;
            return a;
        }
    });
    $(".box-widget-fixed-init").scrollToFixed({
        minWidth: 1064,
        marginTop: 90,
        removeOffsets: true,
        dontSetWidth: false,
        limit: function () {
            var a = $(".limit-box").offset().top - $(".box-widget-fixed-init").outerHeight() - 1;
            return a;
        }
    });
    $(".scroll-to-fixed-fixed").scrollToFixed({
        minWidth: 1064,
        marginTop: 90,
        removeOffsets: true,
        limit: function () {
            var a = $(".limit-box").offset().top - $(".scroll-to-fixed-fixed").outerHeight() - 1;
            return a;
        }
    });
    if ($(".fixed-bar").outerHeight(true) < $(".post-container").outerHeight(true)) {
        $(".fixed-bar").addClass("fixbar-action");
        $(".fixbar-action").scrollToFixed({
            minWidth: 1064,
            zIndex: 12,
            marginTop: function () {
                var a = $(window).height() - $(".fixed-bar").outerHeight(true) - 100;
                if (a >= 0) return 20;
                return a;
            },
            removeOffsets: true,
            limit: function () {
                var a = $(".limit-box").offset().top - $(".fixed-bar").outerHeight() - 50;
                return a;
            }
        });
    } else $(".fixed-bar").removeClass("fixbar-action");
    $(".show-hidden-filter").on('click', function () {
        $(".top-search-content").toggleClass("vis-hiddenfilter");
        $(this).toggleClass("vishf");
    });
    $(".close_sb-filter").on('click', function () {
        $(".top-search-content").removeClass("vis-hiddenfilter");
        $(".show-hidden-filter").removeClass("vishf");
    });
    $(".show-hidden-map").on('click', function () {
        $(".hid-mob-map").toggleClass("vis-hiddenmap");
    });
    $(".map-close").on('click', function () {
        $(".hid-mob-map").removeClass("vis-hiddenmap");
    });
    $(".show-hidden-filter2").on('click', function () {
        $(this).toggleClass("vis-hiddenfilter2");
        $(".list-searh-input-wrap").slideToggle(300);
    });
    $(".dasbdord-submenu-open").on('click', function () {

        $(this).toggleClass("db_submenu_open-init_vis");
        $(".dashboard-submenu").toggleClass("db_submenu_open-init");
    });
}
//   Uplaod ------------------
$('.fuzone input').each(function () {
    $(this).on('change', function () {
        var pufzone = $(this).parents(".fuzone").find('.photoUpload-files');
        pufzone.empty();
        var files = $(this)[0].files;
        for (var i = 0; i < files.length; i++) {
            $("<span></span>").text(files[i].name).appendTo(pufzone);
        }
    });
});
//   Dashboard ------------------
$('.add-room-item').on('click', function (e) {
    e.preventDefault();
    var newElem = $(this).parents(".add_room-item-wrap").find('.add_room-item').first().clone(),
        parclone = $(this).parents(".add_room-item-wrap").find(".add_room-container");
    newElem.find('input').val('');
    newElem.appendTo(parclone);
    $('.fuzone input').each(function () {

        $(this).on('change', function () {

            var pufzone = $(this).parents(".fuzone").find('.photoUpload-files');
            pufzone.empty();
            var files = $(this)[0].files;
            for (var i = 0; i < files.length; i++) {

                $("<span></span>").text(files[i].name).appendTo(pufzone);

            }

        });
    });
    $(".remove-rp").on('click', function () {
        $(this).parents(".add_room-item:not(:first-child)").remove();
    });
});
$(".remove-rp").on('click', function () {
    $(this).parents(".add_room-item").remove();
});

$(".show-popup-form").on('click', function (ex) {
    ex.preventDefault();
    $(".popup-form").toggleClass("vis-pf");
});
//   Calculator ------------------
var term;
var apr;
var amt;
var mPmt;
function getValues() {
    term = document.getElementById("trm").value;
    apr = document.getElementById("apr").value;
    amt = document.getElementById("amt").value;
    apr /= 1200;
    term *= 12;
    mPmt = calculatePayment();
    document.getElementById("pmt").value = mPmt.toFixed(2);
}
function calculatePayment() {
    var payment = amt * (apr * Math.pow((1 + apr), term)) / (Math.pow((1 + apr), term) - 1);
    return payment;
}
$(".monterage-title-item span").text($("#pmt").val());
$("#sbt").on("click", function () {
    getValues();
    $(".monterage-title-item span").text($("#pmt").val());
});
$(".use-current-price").on("click", function () {
    var curproppr = $(".list-single-header-price").attr("data-propertyprise");
    $("#amt").val(curproppr);
});
//   Parallax ------------------
function initparallax() {
    var a = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return a.Android() || a.BlackBerry() || a.iOS() || a.Opera() || a.Windows();
        }
    };
    trueMobile = a.any();
    if (null === trueMobile) {
        var b = new Scrollax();
        b.reload();
        b.init();
    }
    if (trueMobile) {
		$(".background-vimeo , .background-youtube-wrapper ").remove();
        $("html, body").animate({
            scrollTop: 0
        }, 1);	
	}
}
//   Init All ------------------
$(document).ready(function () {
    initHomeradar();
    initparallax();
});