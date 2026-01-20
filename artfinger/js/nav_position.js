

$(document).ready(function () {
    var navOffset = $(".header").offset().top;

    $(".header").wrap('<div class="header-placeholder"></div>');
    $(".header-placeholder").height($(".header").outerHeight());   /* 높이값을 미리구하기위해 생성함 */

    $(window).scroll(function () {
        var scrollPos = $(window).scrollTop();

        if (scrollPos > navOffset) {       /* = 등호는 fixed가 사라지지않는 문제로 지움 */
            $(".header").addClass("fixed");
        } else {
            $(".header").removeClass("fixed");
        }
    });
});