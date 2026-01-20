$(document).ready(function () {


    $(".category_ti1").html(category_ti1);
    $(".category_ti2").html(category_ti2);
    $(".category_ti3").html(category_ti3);
    $(".category_ti4").html(category_ti4);
    $(".category_ti5").html(category_ti5);

    var ct_cate = $('.title h2 span').text();
    $(".cate_big li").each(function (index) {
        var list_cate = $(this).attr("rel");
        if (ct_cate == list_cate) {
            $(this).addClass('active');
        }
    });


    $(window).resize(function () {
        if (window.innerWidth > 1000) {  // 다바이스 크기가 480이상일때 
            $("header").removeClass("mo_he");
            // $(".d1-wrap_m").removeClass("mo_menu_dr")                    
        } else {
            $("header").addClass("mo_he");
            // $(".d1-wrap_m").addClass("mo_menu_dr");
        }
    }).resize();


    switch (displaySetting) {
        case 1:
            $(".swiper-container-main .swiper-wrapper .swiper-slide:nth-child(n+2), .swiper-pagination-main").remove();

            break;
        case 2:
            $(".swiper-container-main .swiper-wrapper .swiper-slide:nth-child(n+3)").remove();
            break;
        case 3:
            $(".swiper-container-main .swiper-wrapper .swiper-slide:nth-child(n+4)").remove();
            break;
        case 4:
            $(".swiper-container-main .swiper-wrapper .swiper-slide:nth-child(n+5)").remove();
            break;
        case 5:
            $(".swiper-container-main .swiper-wrapper .swiper-slide:nth-child(n+6)").remove();
            break;
        case 6:
            $(".swiper-container-main .swiper-wrapper .swiper-slide:nth-child(n+7)").remove();
            break;
        case 7:
            $(".swiper-container-main .swiper-wrapper .swiper-slide:nth-child(n+8)").remove();
            break;
        case 8:
            $(".swiper-container-main .swiper-wrapper .swiper-slide:nth-child(n+9)").remove();
            break;
        case 9:
            $(".swiper-container-main .swiper-wrapper .swiper-slide:nth-child(n+10)").remove();
            break;
        default:
            $(".swiper-container-main .swiper-wrapper .swiper-slide:nth-child(100)").remove();
            break;
    }


    "undefined" !== typeof top_promotionBanner && "on" == top_promotionBanner ? $("#top_promotionBanner").addClass("use") :
        $("#top_promotionBanner").removeAttr("style");

    "undefined" !== typeof promotionbanner && "on" == promotionbanner ? $("#promotionBanner").addClass("use") :
        $("#promotionBanner").removeAttr("style");

    "undefined" !== typeof bottom_info_company && "off" == bottom_info_company ? $(".foot_area_inf").addClass("unuse") :
        $(".foot_area_inf").removeAttr("style");


    var main_01_01_im = $(".main_01_01_im").attr("src");
    var main_01_02_im = $(".main_01_02_im").attr("src");
    var main_01_03_im = $(".main_01_03_im").attr("src");
    var main_01_04_im = $(".main_01_04_im").attr("src");
    var main_01_05_im = $(".main_01_05_im").attr("src");
    var main_01_06_im = $(".main_01_06_im").attr("src");
    var main_01_07_im = $(".main_01_07_im").attr("src");
    var main_01_08_im = $(".main_01_08_im").attr("src");
    var main_01_09_im = $(".main_01_09_im").attr("src");
    var main_01_10_im = $(".main_01_10_im").attr("src");
    var main_02_01_im = $(".main_02_01_im").attr("src");
    var main_03_01_im = $(".main_03_01_im").attr("src");
    var m_main_01_01_im = $(".m_main_01_01_im").attr("src");
    var m_main_01_02_im = $(".m_main_01_02_im").attr("src");
    var m_main_01_03_im = $(".m_main_01_03_im").attr("src");
    var m_main_01_04_im = $(".m_main_01_04_im").attr("src");
    var m_main_01_05_im = $(".m_main_01_05_im").attr("src");
    var m_main_01_06_im = $(".m_main_01_06_im").attr("src");
    var m_main_01_07_im = $(".m_main_01_07_im").attr("src");
    var m_main_01_08_im = $(".m_main_01_08_im").attr("src");
    var m_main_01_09_im = $(".m_main_01_09_im").attr("src");
    var m_main_01_10_im = $(".m_main_01_10_im").attr("src");
    var m_main_02_01_im = $(".m_main_02_01_im").attr("src");
    var m_main_03_01_im = $(".m_main_03_01_im").attr("src");

    var main_01_01_lin = $(".main_01_01_lin").attr("href");
    var main_01_02_lin = $(".main_01_02_lin").attr("href");
    var main_01_03_lin = $(".main_01_03_lin").attr("href");
    var main_01_04_lin = $(".main_01_04_lin").attr("href");
    var main_01_05_lin = $(".main_01_05_lin").attr("href");
    var main_01_06_lin = $(".main_01_06_lin").attr("href");
    var main_01_07_lin = $(".main_01_07_lin").attr("href");
    var main_01_08_lin = $(".main_01_08_lin").attr("href");
    var main_01_09_lin = $(".main_01_09_lin").attr("href");
    var main_01_10_lin = $(".main_01_10_lin").attr("href");
    var main_02_01_lin = $(".main_02_01_lin").attr("href");
    var main_03_01_lin = $(".main_03_01_lin").attr("href");
    var m_main_01_01_lin = $(".m_main_01_01_lin").attr("href");
    var m_main_01_02_lin = $(".m_main_01_02_lin").attr("href");
    var m_main_01_03_lin = $(".m_main_01_03_lin").attr("href");
    var m_main_01_04_lin = $(".m_main_01_04_lin").attr("href");
    var m_main_01_05_lin = $(".m_main_01_05_lin").attr("href");
    var m_main_01_06_lin = $(".m_main_01_06_lin").attr("href");
    var m_main_01_07_lin = $(".m_main_01_07_lin").attr("href");
    var m_main_01_08_lin = $(".m_main_01_08_lin").attr("href");
    var m_main_01_09_lin = $(".m_main_01_09_lin").attr("href");
    var m_main_01_10_lin = $(".m_main_01_10_lin").attr("href");
    var m_main_02_01_lin = $(".m_main_02_01_lin").attr("href");
    var m_main_03_01_lin = $(".m_main_03_01_lin").attr("href");

    $(window).resize(function () {
        if (window.innerWidth > 480) {  // 다바이스 크기가 480이상일때 
            $(".sl1_ima").attr("src", main_01_01_im);
            $(".sl2_ima").attr("src", main_01_02_im);
            $(".sl3_ima").attr("src", main_01_03_im);
            $(".sl4_ima").attr("src", main_01_04_im);
            $(".sl5_ima").attr("src", main_01_05_im);
            $(".sl6_ima").attr("src", main_01_06_im);
            $(".sl7_ima").attr("src", main_01_07_im);
            $(".sl8_ima").attr("src", main_01_08_im);
            $(".sl9_ima").attr("src", main_01_09_im);
            $(".sl10_ima").attr("src", main_01_10_im);
            $(".sl1_link").attr("href", main_01_01_lin);
            $(".sl2_link").attr("href", main_01_02_lin);
            $(".sl3_link").attr("href", main_01_03_lin);
            $(".sl4_link").attr("href", main_01_04_lin);
            $(".sl5_link").attr("href", main_01_05_lin);
            $(".sl6_link").attr("href", main_01_06_lin);
            $(".sl7_link").attr("href", main_01_07_lin);
            $(".sl8_link").attr("href", main_01_08_lin);
            $(".sl9_link").attr("href", main_01_09_lin);
            $(".sl10_link").attr("href", main_01_10_lin);
        } else {
            $(".sl1_ima").attr("src", m_main_01_01_im);
            $(".sl2_ima").attr("src", m_main_01_02_im);
            $(".sl3_ima").attr("src", m_main_01_03_im);
            $(".sl4_ima").attr("src", m_main_01_04_im);
            $(".sl5_ima").attr("src", m_main_01_05_im);
            $(".sl6_ima").attr("src", m_main_01_06_im);
            $(".sl7_ima").attr("src", m_main_01_07_im);
            $(".sl8_ima").attr("src", m_main_01_08_im);
            $(".sl9_ima").attr("src", m_main_01_09_im);
            $(".sl10_ima").attr("src", m_main_01_10_im);
            $(".sl1_link").attr("href", m_main_01_01_lin);
            $(".sl2_link").attr("href", m_main_01_02_lin);
            $(".sl3_link").attr("href", m_main_01_03_lin);
            $(".sl4_link").attr("href", m_main_01_04_lin);
            $(".sl5_link").attr("href", m_main_01_05_lin);
            $(".sl6_link").attr("href", m_main_01_06_lin);
            $(".sl7_link").attr("href", m_main_01_07_lin);
            $(".sl8_link").attr("href", m_main_01_08_lin);
            $(".sl9_link").attr("href", m_main_01_09_lin);
            $(".sl10_link").attr("href", m_main_01_10_lin);
        }
    }).resize();

    $(".main_bannerlink").each(function () {
        3 < $(this).attr("href").length && $(this).addClass("show")
    });

    var snslin1 = $("#sns_01_lin").attr("href");
    var snslin2 = $("#sns_02_lin").attr("href");
    var snslin3 = $("#sns_03_lin").attr("href");
    var snslin4 = $("#sns_04_lin").attr("href");
    var snslin5 = $("#sns_05_lin").attr("href");

    $(".snsl1").attr("href", snslin1);
    $(".snsl2").attr("href", snslin2);
    $(".snsl3").attr("href", snslin3);
    $(".snsl4").attr("href", snslin4);
    $(".snsl5").attr("href", snslin5);
    $(".snscate a").each(function () {
        3 < $(this).attr("href").length && $(this).addClass("show")
    });


    var logo_1 = $(".topimage1").attr("src");
    var logo_2 = $(".topimage2").attr("src");
    $(".toplogo_image").attr("src", logo_2);
    $("#main .toplogo_image").attr("src", logo_1);



    //prd option select title
    $('.prdDescription .xans-product-option select[option_style="select"]').each(function () {
        $(this).children('option:first-child').text($(this).attr('option_title'));
        $(this).closest('td').attr("colspan", 2);
        var ofaddopt = $(this).closest('td').prev('th').addClass('rofer');
        $(ofaddopt).remove();
    });




});    