$(document).ready(function () {

    //아래 소스는 오토슬라이드, 페이드효과  
    var swiper = new Swiper('.swiper-container-main', {
        speed: 2000,
        /*페이드의 duration*/
        spaceBetween: 0,
        effect: 'fade', //메인 화면의 전환 효과설정입니다. fade와 scroll 둘중에 선택해주세요

        loop: true,
        autoplay: {
            delay: 5000, //메인 화면의 fadein되는 초입니다. 1000 = 1초입니다.
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

    //아래 소스는 오토슬라이드, 페이드효과  
    var swiper = new Swiper('.swiper-container-topbanner', {
        speed: 1400,
        /*페이드의 duration*/
        spaceBetween: 0,
        effect: 'slide', //메인 화면의 전환 효과설정입니다. fade와 scroll 둘중에 선택해주세요
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 4000, //메인 화면의 fadein되는 초입니다. 1000 = 1초입니다.
            disableOnInteraction: false,
        }
    });


    var galleryTop = new Swiper('.gallery-top', {
        slidesPerView: 2,
        spaceBetween: 10,
        // init: false,
        navigation: {
            nextEl: '.swiper-button-next-detail',
            prevEl: '.swiper-button-prev-detail',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 10,
            },

        }
    });



    var swiper = new Swiper('.swiper-container2', {
        slidesPerView: 5,
        spaceBetween: 0,
        // init: false,
        navigation: {
            nextEl: '.swiper-button-next2',
            prevEl: '.swiper-button-prev2',
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
                slidesPerView: 2,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1100: {
                slidesPerView: 5,
                spaceBetween: 10,
            },

        }
    });


    var swiper = new Swiper('.swiper-container4', {
        slidesPerView: 4,
        spaceBetween: 10,
        // init: false,
        navigation: {
            nextEl: '.swiper-button-next4',
            prevEl: '.swiper-button-prev4',
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
        slidesPerView: 5,
        spaceBetween: 0,
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
                slidesPerView: 2,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1100: {
                slidesPerView: 5,
                spaceBetween: 10,
            },

        }
    });


});