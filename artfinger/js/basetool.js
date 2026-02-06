$(function () {

    $(window).ready(function () {
        $(".progress_line").delay(600).fadeOut("slow");
        $(".progress_line2").delay(200).fadeOut("slow");
    });
    $(window).resize(function () {
        $(".progress_line").delay(600).fadeOut("slow");
        $(".progress_line2").delay(200).fadeOut("slow");
    });


    //header search    
    $("#header .search ").click(function () {
        $("#header #searchBarForm").slideToggle(300);
        $(this).toggleClass("open");
    });

    //header multilanguage togle 
    $("button.toggle2").click(function () {
        $(".tool_multi").slideToggle(300);
    });


    setTimeout(function () {
        var swiper = new Swiper('.swiper-container-main', {
            speed: 2000,
            spaceBetween: 0,
            effect: 'fade',
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination-main',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next-main',
                prevEl: '.swiper-button-prev-main',
            },
        });
    }, 200);


    var galleryTop = new Swiper('.gallery-top', {
        slidesPerView: 1,
        spaceBetween: 0,

        navigation: {
            nextEl: '.swiper-button-next-detail',
            prevEl: '.swiper-button-prev-detail',
        },
        pagination: {
            el: ".swiper-pagination-detail",
            type: "fraction",
        }
    });

    var galleryTop2 = new Swiper('.gallery-top2', {
        slidesPerView: 1,
        spaceBetween: 0,
        threshold: 15,
        touchReleaseOnEdges: true,
        pagination: {
            el: ".swiper-pagination-detail2",
            type: "fraction",
        },
        navigation: {
            nextEl: '.swiper-button-next-detail2',
            prevEl: '.swiper-button-prev-detail2',
        },
    });

    var swiper = new Swiper('.swiper-container2', {
        slidesPerView: 3,
        spaceBetween: 0,
        // init: false,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 1000,
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        breakpoints: {
            300: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            900: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            1100: {
                slidesPerView: 2,
                spaceBetween: 0,
            },

        }
    });

    var swiper = new Swiper('.swiper-container4', {
        slidesPerView: 5,
        spaceBetween: 10,
        // init: false,
        navigation: {
            nextEl: '.swiper-button-next4',
            prevEl: '.swiper-button-prev4',
        },
        pagination: {
            el: '.swiper-pagination4',
            type: "progressbar",
        },
        /*autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },*/
        speed: 1400,

        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            900: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            1100: {
                slidesPerView: 4,
                spaceBetween: 10,
            },

        }
    });


    var swiper = new Swiper('.swiper-container-recommend', {
        slidesPerView: 4,
        spaceBetween: 25,
        // init: false,
        navigation: {
            nextEl: '.swiper-button-next-recommend',
            prevEl: '.swiper-button-prev-recommend',
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        speed: 1400,

        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        breakpoints: {
            300: {
                slidesPerView: 3,
                spaceBetween: 2,
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 2,
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 2,
            },
            1100: {
                slidesPerView: 3,
                spaceBetween: 2,
            },

        }
    });


    $('.accordion_more > li > a').click(function (j) {
        var dropDown = $(this).closest('li').find('.tab_wrap');

        $(this).closest('.accordion_more').find('.tab_wrap').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion_more').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });

    $('.accordion_purchase > li > a').click(function (j) {
        var dropDown = $(this).closest('li').find('.tab_wrap_purchase');

        $(this).closest('.accordion_purchase').find('.tab_wrap_purchase').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion_purchase').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });

    $('.accordion_more_footer > li > a').click(function (j) {
        var dropDown = $(this).closest('li').find('.tab_wrap');

        $(this).closest('.accordion_more_footer').find('.tab_wrap').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion_more_footer').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });


    $('.accordion_agree > li > a').click(function (j) {
        var dropDown = $(this).closest('li').find('.tab_wrap_agree');

        $(this).closest('.accordion_agree').find('.tab_wrap_agree').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion_agree').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });


    $('.accordion_notice a.subject').click(function (j) {
        var dropDown = $(this).closest('li').find('.tab_wrap');

        $(this).closest('.accordion_notice').find('.tab_wrap').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion_notice').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });



    $(".prd_price_sale > span").each(function () {
        $(this).closest("li.prd_price_sale").prev(".product_price ").addClass("price_throu")
    });


    $('.sold_icore').each(function () {
        if ($(this).find('img').size() === 1) {
            $(this).html('<div class="sold_me">SOLD OUT</div>');
        };
    });

    $('.xans-product-listnormal').bind("DOMNodeInserted", function () {
        $('.sold_icore').each(function () {
            if ($(this).find('img').size() === 1) {
                $(this).html('<span class="sold_me">SOLD OUT</span>');
            };
        });
    });

    $(".scroll_detailview").click(function (event) {
        event.preventDefault();
        $('html,body').animate({ scrollTop: $(this.hash).offset().top - 0 }, 400);
    });

    //prd option select title
    $('.prdDescription .xans-product-option select[option_style="select"]').each(function () {
        $(this).children('option:first-child').text($(this).attr('option_title'));
        $(this).closest('td').attr("colspan", 2);
        var ofaddopt = $(this).closest('td').prev('th').addClass('rofer');
        $(ofaddopt).remove();
    });




    var modalLayer = $("#modalLayer");
    var modalLink = $(".modalLink");
    var modalCont = $(".modalContent");
    var marginLeft = modalCont.outerWidth() / 2;
    var marginTop = modalCont.outerHeight() / 2;

    modalLink.click(function () {
        modalLayer.fadeIn(500);

        $(this).blur();
        $(".modalContent > a").focus();
        return false;
    });

    $(".modalContent > .close-btn").click(function () {
        modalLayer.fadeOut(500);
        modalLink.focus();
    });




});


