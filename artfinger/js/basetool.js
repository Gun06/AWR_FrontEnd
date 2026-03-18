$(function () {

    $(window).ready(function () {
        $(".progress_line").delay(600).fadeOut("slow");
        var layoutDelay = document.body.id === 'layout' ? 1000 : 200;
        $(".progress_line2").delay(layoutDelay).fadeOut("slow");
    });
    $(window).resize(function () {
        $(".progress_line").delay(600).fadeOut("slow");
        var layoutDelay = document.body.id === 'layout' ? 1000 : 200;
        $(".progress_line2").delay(layoutDelay).fadeOut("slow");
    });


    //header search (inline menu style)
    $("#header .search .search-toggle").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var $searchItem = $(this).closest(".search");
        var willOpen = !$searchItem.hasClass("open");

        $("#header .search").removeClass("open");
        if (willOpen) {
            $searchItem.addClass("open");
            setTimeout(function () {
                $searchItem.find("input[name='keyword']").first().focus();
            }, 10);
        }
    });

    $(document).click(function (e) {
        if (!$(e.target).closest("#header .search").length) {
            $("#header .search").removeClass("open");
        }
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

    // 상세 이미지 페이지 번호를 실제 이미지 우측 끝에 맞춰 자동 정렬
    function bindDetailPaginationToImage(swiperInstance) {
        if (!swiperInstance || !swiperInstance.el) return;

        var paginationEl = swiperInstance.pagination && swiperInstance.pagination.el
            ? swiperInstance.pagination.el
            : swiperInstance.el.querySelector('.swiper-pagination-detail, .swiper-pagination-detail2');
        if (!paginationEl) return;

        var updatePaginationPosition = function () {
            var activeSlide = swiperInstance.el.querySelector('.swiper-slide-active') || swiperInstance.el.querySelector('.swiper-slide');
            if (!activeSlide) return;

            var imageEl = activeSlide.querySelector('img');
            if (!imageEl) return;

            var containerRect = swiperInstance.el.getBoundingClientRect();
            var imageRect = imageEl.getBoundingClientRect();
            if (!imageRect.width) return;

            var gapFromContainerRight = containerRect.right - imageRect.right;
            var rightPx = Math.max(20, Math.round(gapFromContainerRight + 20));

            paginationEl.style.right = rightPx + 'px';
            paginationEl.style.left = 'auto';
        };

        swiperInstance.on('slideChangeTransitionEnd', updatePaginationPosition);
        swiperInstance.on('resize', updatePaginationPosition);
        swiperInstance.on('imagesReady', updatePaginationPosition);

        var images = swiperInstance.el.querySelectorAll('img');
        for (var i = 0; i < images.length; i++) {
            if (!images[i].complete) {
                images[i].addEventListener('load', updatePaginationPosition);
            }
        }

        updatePaginationPosition();
        setTimeout(updatePaginationPosition, 80);
        setTimeout(updatePaginationPosition, 250);
        window.addEventListener('resize', updatePaginationPosition);
    }

    bindDetailPaginationToImage(galleryTop);
    bindDetailPaginationToImage(galleryTop2);

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

    // 상품 상세 내 Review / Q&A 등으로 부드럽게 스크롤시키던 기능
    // 자동 스크롤 이슈가 있어 비활성화
    // $(".scroll_detailview").click(function (event) {
    //     event.preventDefault();
    //     $('html,body').animate({ scrollTop: $(this.hash).offset().top - 0 }, 400);
    // });

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




    // 상품 상세 아코디언: 한 번에 하나만 열리도록 처리
    (function () {
        var accordions = document.querySelectorAll('.product-accordion');
        if (!accordions || !accordions.length) return;

        accordions.forEach(function (accordion) {
            var items = accordion.querySelectorAll('.accordion-item');
            if (!items || !items.length) return;

            items.forEach(function (item) {
                item.addEventListener('toggle', function () {
                    // 현재 클릭한 details가 열릴 때만 나머지를 닫음
                    if (!item.open) return;
                    items.forEach(function (other) {
                        if (other !== item && other.open) {
                            other.removeAttribute('open');
                        }
                    });
                });
            });
        });
    })();


});


