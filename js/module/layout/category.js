


$(document).ready(function () {
    var $d1_wrap = $('.d1-wrap');
    var $ul;
    var hasClass;
    $.ajax({
        url: '/exec/front/Product/SubCategory',
        dataType: 'json',
        success: function (aData) {
            if (aData == null || aData == 'undefined') {
                return;
            }
            $.each(aData, function (index, key) {
                if (key.parent_cate_no == 1) {
                    return;
                }
                var $dd = $d1_wrap.find('li[data-param$="' + key.parent_cate_no + '"]');

                if ($dd.hasClass('d1')) {
                    hasClass = 'd1';
                } else if ($dd.hasClass('d2')) {
                    hasClass = 'd2';
                } else if ($dd.hasClass('d3')) {
                    hasClass = 'd3';
                } else {
                    hasClass = null;
                }
                switch (hasClass) {
                    case 'd1':
                        if ($dd.hasClass('be') === false) {
                            $dd.addClass('be');
                            $dd.append('<div class="d2-wrap"><ul></ul></div>');
                            $ul = $dd.find('>.d2-wrap >ul');
                        }
                        $ul.append('<li data-param="' + key.param + '" class="d2"><a href="/' + this.design_page_url + this.param + '">' + key.name + '</a></li>');
                        break;

                    case 'd2':
                        if ($dd.hasClass('be') === false) {
                            $dd.addClass('be fowd');
                            $dd.parent().addClass('cowd');
                            $dd.append('<ul class="d3-wrap"></ul>');
                            $ul = $dd.find('>.d3-wrap');
                        }
                        $ul.append('<li data-param="' + key.param + '" class="d3"><a href="/' + this.design_page_url + this.param + '">' + key.name + '</a></li>');
                        break;

                    case 'd3':
                        if ($dd.hasClass('be') === false) {
                            $dd.addClass('be');
                            $dd.append('<ul class="d4-wrap"></ul>');
                            $ul = $dd.find('>.d4-wrap')
                        }
                        $ul.append('<li data-param="' + key.param + '" class="d4"><a href="/' + this.design_page_url + this.param + '">' + key.name + '</a></li>');
                        break;

                    default:
                        //console.log('숨긴 분류:'+key.name);
                        break;
                }

            });

            $('.al').each(function () {
                var coflab = $('.al').parent('a');
                $(coflab).removeAttr('href');
                $(coflab).css({ "display": "none", "width": "0px", "height": "0px", "font-size": "0" });
            });

            $("#header .header_wrap").css("border-color", main_color_after);
            $("#top_promotionBanner").css("border-color", main_color_after);
            $("#header .header_wrap .account_area li svg, #header .header_wrap .hamber_momenu_account li svg, #header .header_wrap .hamber_momenu  li svg").css("fill", main_color_after);
            $("#header .header_wrap .account_area .d1-wrap li.search svg path").css("stroke", main_color_after);
            $("#header .header_wrap .hamber_momenu button > span").css("background-color", main_color_after);
            $("#header a, #main #header .topband_banner_wrap, #header .header_wrap  li.btn_cart a span.count, #header .header_wrap .gnb .artcate .d2-wrap li a").css("color", main_color_after);

            $("#main #header .header_wrap").css("border-color", main_color_before);
            $("#main #top_promotionBanner").css("border-color", main_color_before);
            $("#main #header .header_wrap .account_area li svg, #main #header .header_wrap .hamber_momenu_account li svg, #main #header .header_wrap .hamber_momenu  li svg").css("fill", main_color_before);
            $("#main #header .header_wrap .account_area .d1-wrap li.search svg path").css("stroke", main_color_before);
            $("#main #header .header_wrap .hamber_momenu button > span").css("background-color", main_color_before);
            $("#main #header a, #main #header .topband_banner_wrap, #main  #header .header_wrap  li.btn_cart a span.count, #main #header .header_wrap .gnb .artcate .d2-wrap li a").css("color", main_color_before);

            $('.d1-wrap .d3-wrap').each(function () {
                var sdfl = $(this).parent('.d2');
                var sdflt = $(this).parents('.d2').siblings('.d2');
                $(sdfl).css({ "display": "inline-block" });
                $(sdflt).css({ "display": "inline-block" });
            });

            setCategory();

        }
    });

    var ct_cate = $('.title h2 span').text();
    $(".d1-wrap > li.d1 > a").each(function (index) {
        var list_cate = $(this).text();
        if (ct_cate == list_cate) {
            $(this).addClass('current_page');
        }
    });
});



function setCategory() {
    //lnb
    (function () {
        var $this = $('.artcate');
        var $d1 = $this.find('.d1');
        var $d2 = $this.find('.d2');
        var $d3 = $this.find('.d3');

        var speed = 200;


        $('.back_bg').css('height', 0 + "px");
        $d1.bind('mouseenter', function () {
            $(this).addClass('on');
            $(this).find('.d2-wrap').stop(true, true).fadeIn(400);

            var outheight = $(this).find('.d2-wrap').outerHeight(true) + 0;
            $('.back_bg').css('height', outheight + "px").fadeIn(300);


        }).bind('mouseleave', function () {
            $(this).removeClass('on');
            $(this).find('.d2-wrap').stop(true, true).fadeOut(0);
            $('.back_bg').css('height', 0 + "px");
        });

        $d3.bind('mouseenter', function () {
            $d3.css('z-index', 0);
            $(this).css('z-index', 1);
            $(this).find('.d4-wrap').stop(true, true).fadeIn(0);
            $(this).addClass('on');
        }).bind('mouseleave', function () {
            $(this).find('.d4-wrap').stop(true, true).fadeOut(0);
            $(this).removeClass('on');
        });

        //이미지넣기
        var $d1_img = $('.category_img > li');
        $d1.each(function (index) {
            if ($d1_img.eq(index).children().length > 0) {
                if ($(this).find('.d2-wrap').length > 0) {
                    $(this).find('.d2-wrap').append('<div class="img">' + $d1_img.eq(index).html() + '</div>');
                } else {
                    $(this).append('<div class="d2-wrap"></div>');
                    $(this).find('.d2-wrap').append('<div class="img">' + $d1_img.eq(index).html() + '</div>');
                }
            }
        })
    })();

    // 현재 페이지의 카테고리 제목 가져오기
    // 상품 상세 페이지에서는 .title h2 span에 상위 카테고리명(예: Shop)이 들어가
    // Shop 세부메뉴 전체에 nonLink가 붙어 클릭이 막히므로, 목록 페이지에서만 nonLink 적용
    var isListPage = (function () {
        var path = window.location.pathname || '';
        return /\/product\/list(\.[a-z]+)?(\/|$)/i.test(path) || path.indexOf('list.html') !== -1;
    })();
    if (isListPage) {
        var look_cate_ti = $('.title h2 span').text() || '';
        $("#header .header_wrap .gnb .artcate .d2-wrap .d2").each(function (index) {
            var look_cate = $(this).closest('.d2-wrap').prev('a').text();
            if (look_cate_ti == look_cate) {
                $(this).children('a').addClass('nonLink');
            }
        });
        $("#header .nonLink").off('click.nonLink').on('click.nonLink', function (a) {
            a.preventDefault();
        });
    }

}



/* 따닥 효과 
$(document).ready(function(){
    $("#header .header_wrap .gnb .artcate .d1-wrap .d1").mouseover(function(){
        $("#header .header_wrap .gnb .artcate .d2-wrap .d2").each(function (index) {
            if (!$("#header .header_wrap .gnb .artcate .d2-wrap .d2").eq(index).hasClass("showFromBottom")) {
                var row = $(this);
                setTimeout(function () {
                    row.addClass("showFromBottom");
                }, 200*index);  
            }  
        });
    });
    $("#header .header_wrap .gnb .artcate .d1-wrap .d1").mouseleave(function(){
        clearTimeout($(this));
        $("#header .header_wrap .gnb .artcate .d2-wrap .d2").removeClass('showFromBottom');
    });
});

*/